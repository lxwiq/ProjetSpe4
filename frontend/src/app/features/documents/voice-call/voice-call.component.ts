import { Component, Input, OnInit, OnDestroy, DestroyRef, inject, signal, computed, effect, runInInjectionContext, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';

import { CallService } from '../../../core/services/call.service';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';
import { LoggingService } from '../../../core/services/logging.service';
import { EventBusService } from '../../../core/services/event-bus.service';
import { Call, CallParticipant, VoiceActivityData, IncomingCallData } from '../../../core/models/call.model';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-voice-call',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './voice-call.component.html',
  styleUrls: ['./voice-call.component.css']
})
export class VoiceCallComponent implements OnInit, OnDestroy {
  @Input() documentId!: number;
  @Input() activeUsers: number[] = [];

  // Signaux pour l'état de l'appel
  call = signal<Call | null>(null);
  participants = signal<CallParticipant[]>([]);
  isInCall = signal<boolean>(false);
  isMuted = signal<boolean>(false);
  isCallAvailable = signal<boolean>(false);

  // Signaux pour l'état de la connexion WebRTC
  isConnected = signal<boolean>(false);
  connectionStatus = signal<string>('disconnected'); // 'disconnected', 'connecting', 'connected'

  // Signaux pour les paramètres audio
  availableInputDevices = signal<MediaDeviceInfo[]>([]);
  availableOutputDevices = signal<MediaDeviceInfo[]>([]);
  selectedInputDevice = signal<string>('');
  selectedOutputDevice = signal<string>('');
  inputVolume = signal<number>(100);
  outputVolume = signal<number>(100);
  showAudioSettings = signal<boolean>(false);

  // Utilisateurs
  userMap = signal<Map<number, User>>(new Map());

  // Calcul du nombre de participants
  participantCount = computed(() => {
    const count = this.participants().filter(p => p.is_active).length;
    console.log('VoiceCallComponent: Nombre de participants actifs:', count, this.participants());
    return count;
  });

  // Référence pour le nettoyage (déjà injectée plus bas)

  // Audio
  private audioElements: Map<number, HTMLAudioElement> = new Map();
  private audioContext: AudioContext | null = null;
  private inputGainNode: GainNode | null = null;

  constructor(
    private callService: CallService,
    private authService: AuthService,
    private userService: UserService,
    private logger: LoggingService,
    private eventBus: EventBusService
  ) {}

  // Injection pour les effets
  private destroyRef = inject(DestroyRef);
  private injector = inject(Injector);

  ngOnInit(): void {
    // Créer les effets dans le contexte d'injection
    runInInjectionContext(this.injector, () => {
      // Effet pour surveiller l'appel actif
      effect(() => {
        const call = this.callService.activeCall();
        this.call.set(call);

        // Vérifier si un appel est disponible pour ce document
        // Assurons-nous que les deux IDs sont du même type (number) pour la comparaison
        const isAvailable = !!call && Number(call?.document_id) === Number(this.documentId);

        // Mettre à jour l'état de disponibilité de l'appel
        this.isCallAvailable.set(isAvailable);

        console.log('[APPEL VOCAL] État de l\'appel mis à jour', {
          callId: call?.id,
          documentId: call?.document_id,
          currentDocumentId: this.documentId,
          isCallAvailable: isAvailable,
          isInCall: this.callService.isInCall()
        });
      });

      // Effet pour surveiller l'état de participation à l'appel
      effect(() => {
        this.isInCall.set(this.callService.isInCall());

        // Mettre à jour l'état de connexion
        if (this.isInCall()) {
          this.connectionStatus.set('connected');
          this.isConnected.set(true);
        } else {
          this.connectionStatus.set('disconnected');
          this.isConnected.set(false);
        }
      });

      // Effet pour surveiller l'état de sourdine
      effect(() => {
        this.isMuted.set(this.callService.isMuted());
      });

      // Effet pour surveiller les participants
      effect(() => {
        const participants = this.callService.participants();
        this.participants.set(participants);
        this.updateAudioElements(participants);
        this.loadMissingUserInfo(participants);

        // Log des participants actifs
        const activeParticipants = participants.filter(p => p.is_active);
        this.logger.info('Participants actifs dans l\'appel', {
          component: 'VoiceCallComponent',
          count: activeParticipants.length,
          participantIds: activeParticipants.map(p => p.user_id)
        });
      });

      // Effet pour surveiller le nombre de participants
      effect(() => {
        const count = this.participantCount();
        this.logger.info('Nombre de participants mis à jour', {
          component: 'VoiceCallComponent',
          participantCount: count
        });
      });
    });

    // S'abonner aux événements d'appel
    this.callService.onCallJoined()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((participant: CallParticipant) => {
        this.logger.info('Participant a rejoint l\'appel', {
          component: 'VoiceCallComponent',
          participantId: participant.user_id
        });
      });

    this.callService.onCallLeft()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((participant: CallParticipant) => {
        this.logger.info('Participant a quitté l\'appel', {
          component: 'VoiceCallComponent',
          participantId: participant.user_id
        });
      });

    this.callService.onVoiceActivity()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data: VoiceActivityData) => {
        this.logger.debug('Activité vocale détectée', {
          component: 'VoiceCallComponent',
          userId: data.userId,
          isSpeaking: data.isSpeaking
        });
      });

    // Vérifier si un appel est disponible pour ce document
    this.checkForActiveCall();

    // Vérifier si nous devons démarrer un appel automatiquement
    this.checkAutoStartCall();

    // Charger les périphériques audio disponibles
    this.loadAvailableAudioDevices();

    // Écouter les changements de périphériques
    if (navigator.mediaDevices && navigator.mediaDevices.ondevicechange) {
      navigator.mediaDevices.ondevicechange = () => {
        this.loadAvailableAudioDevices();
      };
    }

    // Écouter les événements d'appel entrant
    this.eventBus.on<IncomingCallData>('incoming_call')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((callData) => {
        this.logger.info('Notification d\'appel reçue via EventBus', {
          component: 'VoiceCallComponent',
          callId: callData.callId,
          documentId: callData.documentId,
          currentDocumentId: this.documentId
        });

        // Vérifier si l'appel concerne ce document
        if (Number(callData.documentId) === Number(this.documentId)) {
          this.logger.info('Appel disponible pour ce document', {
            component: 'VoiceCallComponent',
            callId: callData.callId,
            documentId: callData.documentId
          });

          // Créer un objet Call pour mettre à jour l'état
          const call: Call = {
            id: parseInt(callData.callId.toString()),
            document_id: parseInt(callData.documentId.toString()),
            initiated_by: callData.callerId,
            started_at: new Date().toISOString(),
            call_type: 'audio',
            status: 'active'
          };

          // Mettre à jour l'état de l'appel
          this.call.set(call);
          this.isCallAvailable.set(true);

          this.logger.info('L\'interface d\'appel a été mise à jour pour afficher l\'appel disponible', {
            component: 'VoiceCallComponent',
            callId: call.id,
            documentId: call.document_id,
            isCallAvailable: this.isCallAvailable()
          });
        }
      });
  }

  ngOnDestroy(): void {
    // Quitter l'appel si nous sommes dedans
    if (this.isInCall()) {
      this.leaveCall();
    }

    // Nettoyer les éléments audio
    this.audioElements.forEach(element => {
      element.srcObject = null;
      element.remove();
    });
    this.audioElements.clear();

    // Nettoyer le contexte audio
    if (this.audioContext) {
      this.audioContext.close().catch(err => {
        this.logger.error('Erreur lors de la fermeture du contexte audio', {
          component: 'VoiceCallComponent',
          error: err
        });
      });
    }

    // Supprimer l'écouteur d'événements de changement de périphérique
    if (navigator.mediaDevices && navigator.mediaDevices.ondevicechange) {
      navigator.mediaDevices.ondevicechange = null;
    }
  }

  /**
   * Vérifie s'il y a un appel actif pour ce document
   */
  private checkForActiveCall(): void {
    // Vérifier si un appel est déjà disponible via le service
    const activeCall = this.callService.activeCall();

    if (activeCall) {
      const isForCurrentDocument = Number(activeCall.document_id) === Number(this.documentId);
      const isUserInCall = this.callService.isInCall();

      console.log('[APPEL VOCAL] Appel actif détecté lors de l\'initialisation', {
        callId: activeCall.id,
        documentId: activeCall.document_id,
        currentDocumentId: this.documentId,
        isMatch: isForCurrentDocument,
        isUserInCall: isUserInCall
      });

      // Mettre à jour l'état si l'appel concerne ce document
      if (isForCurrentDocument) {
        this.isCallAvailable.set(true);

        // Mettre à jour l'état de l'appel
        this.call.set(activeCall);

        console.log('[APPEL VOCAL] Appel disponible pour ce document', {
          callId: activeCall.id,
          documentId: activeCall.document_id,
          isUserInCall: isUserInCall,
          buttonShouldShow: isUserInCall ? 'Aucun (déjà dans l\'appel)' : 'Rejoindre l\'appel'
        });
      }
    } else {
      console.log('[APPEL VOCAL] Aucun appel actif détecté lors de l\'initialisation');
      this.isCallAvailable.set(false);
    }
  }

  /**
   * Vérifie si nous devons démarrer un appel automatiquement
   * basé sur le nombre d'utilisateurs actifs
   */
  private checkAutoStartCall(): void {
    // S'assurer que activeUsers est un tableau
    if (!this.activeUsers || !Array.isArray(this.activeUsers)) {
      console.warn('VoiceCallComponent: activeUsers n\'est pas un tableau valide', this.activeUsers);
      return;
    }

    // Si au moins 2 utilisateurs sont actifs sur le document
    if (this.activeUsers.length >= 2) {
      console.log('VoiceCallComponent: Plusieurs utilisateurs actifs détectés', this.activeUsers);
      // Vérifier si nous sommes déjà dans un appel
      if (!this.isInCall() && !this.isCallAvailable()) {
        console.log('VoiceCallComponent: Démarrage automatique d\'un appel dans 2 secondes');
        // Démarrer un appel après un court délai
        setTimeout(() => {
          this.startCall();
        }, 2000);
      }
    } else {
      console.log('VoiceCallComponent: Pas assez d\'utilisateurs actifs pour démarrer un appel', this.activeUsers);
    }
  }

  /**
   * Démarre un nouvel appel
   */
  startCall(): void {
    if (this.isInCall()) {
      console.log('[APPEL VOCAL] Déjà dans un appel, action ignorée');
      return;
    }

    console.log('[APPEL VOCAL] Tentative de démarrage d\'un appel pour le document', {
      documentId: this.documentId
    });

    this.callService.startCall(this.documentId).subscribe({
      next: (call) => {
        console.log('[APPEL VOCAL] Appel démarré avec succès', {
          callId: call.id,
          documentId: call.document_id,
          initiatedBy: call.initiated_by
        });
      },
      error: (error) => {
        console.log('[APPEL VOCAL] Erreur lors du démarrage de l\'appel', {
          error: error.message,
          documentId: this.documentId
        });
        alert('Erreur lors du démarrage de l\'appel: ' + (error.message || JSON.stringify(error)));
      }
    });
  }

  /**
   * Rejoint un appel existant
   */
  joinCall(): void {
    const currentCall = this.call();
    const isCurrentlyInCall = this.isInCall();
    const isCallAvailable = this.isCallAvailable();

    console.log('[APPEL VOCAL] Tentative de rejoindre l\'appel - État actuel', {
      isInCall: isCurrentlyInCall,
      hasCall: !!currentCall,
      callId: currentCall?.id,
      isCallAvailable: isCallAvailable
    });

    // Vérifier si l'utilisateur est déjà dans un appel ou s'il n'y a pas d'appel disponible
    if (isCurrentlyInCall) {
      console.log('[APPEL VOCAL] Déjà dans un appel, impossible d\'en rejoindre un autre');
      return;
    }

    if (!currentCall || !isCallAvailable) {
      console.log('[APPEL VOCAL] Aucun appel disponible à rejoindre');
      return;
    }

    const callId = currentCall.id;
    console.log('[APPEL VOCAL] Tentative de rejoindre l\'appel', {
      callId,
      documentId: currentCall.document_id
    });

    // Mettre à jour l'état de connexion
    this.connectionStatus.set('connecting');

    this.callService.joinCall(callId).subscribe({
      next: (call) => {
        console.log('[APPEL VOCAL] Appel rejoint avec succès', {
          callId: call.id,
          documentId: call.document_id,
          participants: this.callService.participants().length
        });

        // Mettre à jour l'état de connexion
        this.connectionStatus.set('connected');
      },
      error: (error) => {
        console.log('[APPEL VOCAL] Erreur lors de la connexion à l\'appel', {
          error: error.message,
          callId
        });

        // Réinitialiser l'état de connexion
        this.connectionStatus.set('disconnected');

        // Afficher un message d'erreur à l'utilisateur
        alert('Erreur lors de la connexion à l\'appel: ' + (error.message || 'Erreur inconnue'));
      }
    });
  }

  /**
   * Quitte l'appel actif
   */
  leaveCall(): void {
    if (!this.isInCall()) {
      console.log('[APPEL VOCAL] Impossible de quitter l\'appel (pas dans un appel)');
      return;
    }

    const callId = this.call()?.id;
    console.log('[APPEL VOCAL] Tentative de quitter l\'appel', { callId });

    this.callService.leaveCall().subscribe({
      next: (success) => {
        console.log('[APPEL VOCAL] Appel quitté avec succès', { callId });
      },
      error: (error) => {
        console.log('[APPEL VOCAL] Erreur lors de la déconnexion de l\'appel', {
          error: error.message,
          callId
        });
      }
    });
  }

  /**
   * Active/désactive le microphone
   */
  toggleMute(): void {
    this.callService.toggleMute();
  }



  /**
   * Met à jour les éléments audio pour les participants
   * @param participants Liste des participants
   */
  private updateAudioElements(participants: CallParticipant[]): void {
    // Créer ou mettre à jour les éléments audio pour chaque participant
    participants.forEach(participant => {
      if (participant.stream && participant.is_active) {
        // Ne pas créer d'élément audio pour nous-mêmes
        if (participant.user_id === this.authService.currentUser()?.id) {
          return;
        }

        // Créer un élément audio s'il n'existe pas
        if (!this.audioElements.has(participant.user_id)) {
          const audioElement = new Audio();
          audioElement.autoplay = true;
          audioElement.muted = false;
          audioElement.srcObject = participant.stream;

          this.audioElements.set(participant.user_id, audioElement);
        } else {
          // Mettre à jour le flux si nécessaire
          const audioElement = this.audioElements.get(participant.user_id)!;
          if (audioElement.srcObject !== participant.stream) {
            audioElement.srcObject = participant.stream;
          }
        }
      }
    });

    // Supprimer les éléments audio des participants qui ont quitté
    this.audioElements.forEach((element, userId) => {
      const participant = participants.find(p => p.user_id === userId);
      if (!participant || !participant.is_active) {
        element.srcObject = null;
        element.remove();
        this.audioElements.delete(userId);
      }
    });
  }

  /**
   * Charge les informations des utilisateurs manquantes
   * @param participants Liste des participants
   */
  private loadMissingUserInfo(participants: CallParticipant[]): void {
    const currentUserMap = this.userMap();
    const missingUserIds: number[] = [];

    // Identifier les utilisateurs dont nous n'avons pas encore les informations
    participants.forEach(participant => {
      if (participant.is_active && !currentUserMap.has(participant.user_id)) {
        missingUserIds.push(participant.user_id);
      }
    });

    // Si aucun utilisateur manquant, ne rien faire
    if (missingUserIds.length === 0) {
      return;
    }

    // Charger les informations des utilisateurs manquants
    this.userService.getUsersByIds(missingUserIds).subscribe({
      next: (users) => {
        const newUserMap = new Map(currentUserMap);

        users.forEach(user => {
          newUserMap.set(user.id, user);
        });

        this.userMap.set(newUserMap);
      },
      error: (error) => {
        console.error('VoiceCallComponent: Erreur lors du chargement des informations utilisateurs', error);
      }
    });
  }

  /**
   * Récupère les informations d'un utilisateur
   * @param userId ID de l'utilisateur
   * @returns Informations de l'utilisateur ou null
   */
  getUserInfo(userId: number): User | null {
    return this.userMap().get(userId) || null;
  }

  /**
   * Vérifie si un participant est en train de parler
   * @param userId ID de l'utilisateur
   * @returns true si l'utilisateur parle
   */
  isSpeaking(userId: number): boolean {
    const participant = this.participants().find(p => p.user_id === userId);
    return participant ? !!participant.is_speaking : false;
  }

  /**
   * Vérifie si un participant a son micro coupé
   * @param userId ID de l'utilisateur
   * @returns true si le micro est coupé
   */
  isUserMuted(userId: number): boolean {
    const participant = this.participants().find(p => p.user_id === userId);
    return participant ? !!participant.is_muted : false;
  }

  /**
   * Vérifie si l'utilisateur est l'utilisateur courant
   * @param userId ID de l'utilisateur
   * @returns true si c'est l'utilisateur courant
   */
  isCurrentUser(userId: number): boolean {
    const currentUser = this.authService.currentUser();
    return currentUser ? currentUser.id === userId : false;
  }

  /**
   * Récupère l'initiale d'un utilisateur
   * @param userId ID de l'utilisateur
   * @returns Initiale de l'utilisateur ou '?'
   */
  getUserInitial(userId: number): string {
    const user = this.getUserInfo(userId);
    if (user?.username) {
      return user.username.charAt(0).toUpperCase();
    }
    return '?';
  }

  /**
   * Récupère le nom d'affichage d'un utilisateur
   * @param userId ID de l'utilisateur
   * @returns Nom d'affichage de l'utilisateur
   */
  getUserDisplayName(userId: number): string {
    const user = this.getUserInfo(userId);
    return user?.username || `Utilisateur ${userId}`;
  }

  /**
   * Charge les périphériques audio disponibles
   */
  async loadAvailableAudioDevices(): Promise<void> {
    try {
      // Vérifier que l'API est disponible
      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        this.logger.warn('L\'API MediaDevices n\'est pas disponible', {
          component: 'VoiceCallComponent'
        });
        return;
      }

      // Demander les permissions si nécessaire
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // Énumérer les périphériques
      const devices = await navigator.mediaDevices.enumerateDevices();

      // Filtrer les périphériques audio
      const inputDevices = devices.filter(device => device.kind === 'audioinput');
      const outputDevices = devices.filter(device => device.kind === 'audiooutput');

      this.logger.info('Périphériques audio détectés', {
        component: 'VoiceCallComponent',
        inputCount: inputDevices.length,
        outputCount: outputDevices.length
      });

      // Mettre à jour les signaux
      this.availableInputDevices.set(inputDevices);
      this.availableOutputDevices.set(outputDevices);

      // Sélectionner les périphériques par défaut si aucun n'est sélectionné
      if (!this.selectedInputDevice() && inputDevices.length > 0) {
        this.selectedInputDevice.set(inputDevices[0].deviceId);
      }

      if (!this.selectedOutputDevice() && outputDevices.length > 0) {
        this.selectedOutputDevice.set(outputDevices[0].deviceId);
      }
    } catch (error) {
      this.logger.error('Erreur lors du chargement des périphériques audio', {
        component: 'VoiceCallComponent',
        error
      });
    }
  }

  /**
   * Change le périphérique d'entrée audio
   * @param deviceId ID du périphérique
   */
  async changeInputDevice(deviceId: string): Promise<void> {
    try {
      this.logger.info('Changement de périphérique d\'entrée audio', {
        component: 'VoiceCallComponent',
        deviceId
      });

      // Mettre à jour le signal
      this.selectedInputDevice.set(deviceId);

      // Si nous sommes dans un appel, appliquer le changement
      if (this.isInCall()) {
        await this.callService.changeInputDevice(deviceId);
      }
    } catch (error) {
      this.logger.error('Erreur lors du changement de périphérique d\'entrée', {
        component: 'VoiceCallComponent',
        error
      });
    }
  }

  /**
   * Change le périphérique de sortie audio
   * @param deviceId ID du périphérique
   */
  async changeOutputDevice(deviceId: string): Promise<void> {
    try {
      this.logger.info('Changement de périphérique de sortie audio', {
        component: 'VoiceCallComponent',
        deviceId
      });

      // Mettre à jour le signal
      this.selectedOutputDevice.set(deviceId);

      // Appliquer le changement à tous les éléments audio
      this.audioElements.forEach(element => {
        if (element.setSinkId) {
          element.setSinkId(deviceId).catch(err => {
            this.logger.error('Erreur lors du changement de périphérique de sortie', {
              component: 'VoiceCallComponent',
              error: err
            });
          });
        }
      });
    } catch (error) {
      this.logger.error('Erreur lors du changement de périphérique de sortie', {
        component: 'VoiceCallComponent',
        error
      });
    }
  }

  /**
   * Ajuste le volume d'entrée (microphone)
   * @param value Valeur du volume (0-100)
   */
  adjustInputVolume(value: number): void {
    try {
      this.logger.debug('Ajustement du volume d\'entrée', {
        component: 'VoiceCallComponent',
        value
      });

      // Mettre à jour le signal
      this.inputVolume.set(value);

      // Si nous avons un nœud de gain, ajuster le gain
      if (this.inputGainNode) {
        // Convertir la valeur de pourcentage (0-100) en gain (0-2)
        const gain = value / 50;
        this.inputGainNode.gain.value = gain;
      }
    } catch (error) {
      this.logger.error('Erreur lors de l\'ajustement du volume d\'entrée', {
        component: 'VoiceCallComponent',
        error
      });
    }
  }

  /**
   * Ajuste le volume de sortie (haut-parleurs)
   * @param value Valeur du volume (0-100)
   */
  adjustOutputVolume(value: number): void {
    try {
      this.logger.debug('Ajustement du volume de sortie', {
        component: 'VoiceCallComponent',
        value
      });

      // Mettre à jour le signal
      this.outputVolume.set(value);

      // Appliquer le volume à tous les éléments audio
      this.audioElements.forEach(element => {
        element.volume = value / 100;
      });
    } catch (error) {
      this.logger.error('Erreur lors de l\'ajustement du volume de sortie', {
        component: 'VoiceCallComponent',
        error
      });
    }
  }

  /**
   * Affiche ou masque le panneau des paramètres audio
   */
  toggleAudioSettings(): void {
    this.showAudioSettings.update(value => !value);
  }

  /**
   * Gère le clic sur le bouton d'appel (démarrer ou rejoindre)
   */
  handleCallButtonClick(): void {
    const isAvailable = this.isCallAvailable();
    const callData = this.call();

    console.log('[APPEL VOCAL] Clic sur le bouton d\'appel', {
      isCallAvailable: isAvailable,
      callId: callData?.id,
      documentId: this.documentId,
      isInCall: this.isInCall(),
      buttonText: isAvailable ? 'Rejoindre l\'appel' : 'Démarrer un appel vocal'
    });

    if (isAvailable) {
      console.log('[APPEL VOCAL] Tentative de rejoindre l\'appel existant', {
        callId: callData?.id,
        documentId: callData?.document_id
      });
      this.joinCall();
    } else {
      console.log('[APPEL VOCAL] Tentative de démarrer un nouvel appel', {
        documentId: this.documentId
      });
      this.startCall();
    }
  }
}
