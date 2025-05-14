import { Component, Input, OnInit, OnDestroy, DestroyRef, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { CallService } from '../../../core/services/call.service';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';
import { Call, CallParticipant, VoiceActivityData } from '../../../core/models/call.model';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-voice-call',
  standalone: true,
  imports: [CommonModule],
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

  // Utilisateurs
  userMap = signal<Map<number, User>>(new Map());

  // Calcul du nombre de participants
  participantCount = computed(() => this.participants().filter(p => p.is_active).length);

  // Référence pour le nettoyage
  private destroyRef = inject(DestroyRef);

  // Audio
  private audioElements: Map<number, HTMLAudioElement> = new Map();

  constructor(
    private callService: CallService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Utiliser effect pour réagir aux changements des signaux du service
    effect(() => {
      const call = this.callService.activeCall();
      this.call.set(call);
      this.isCallAvailable.set(!!call && call?.document_id === this.documentId);
    });

    effect(() => {
      this.isInCall.set(this.callService.isInCall());
    });

    effect(() => {
      this.isMuted.set(this.callService.isMuted());
    });

    effect(() => {
      const participants = this.callService.participants();
      this.participants.set(participants);
      this.updateAudioElements(participants);
      this.loadMissingUserInfo(participants);
    });

    // S'abonner aux événements d'appel
    this.callService.onCallJoined()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((participant: CallParticipant) => {
        console.log('Participant a rejoint l\'appel:', participant);
      });

    this.callService.onCallLeft()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((participant: CallParticipant) => {
        console.log('Participant a quitté l\'appel:', participant);
      });

    this.callService.onVoiceActivity()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data: VoiceActivityData) => {
        console.log('Activité vocale détectée:', data);
      });

    // Vérifier si un appel est disponible pour ce document
    this.checkForActiveCall();

    // Vérifier si nous devons démarrer un appel automatiquement
    this.checkAutoStartCall();
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
  }

  /**
   * Vérifie s'il y a un appel actif pour ce document
   */
  private checkForActiveCall(): void {
    // Cette méthode pourrait faire une requête API pour vérifier
    // s'il y a un appel actif pour ce document
    // Pour l'instant, nous nous fions aux événements WebSocket
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
      console.log('VoiceCallComponent: Déjà dans un appel');
      return;
    }

    this.callService.startCall(this.documentId).subscribe({
      next: (call) => {
        console.log('VoiceCallComponent: Appel démarré avec succès', call);
      },
      error: (error) => {
        console.error('VoiceCallComponent: Erreur lors du démarrage de l\'appel', error);
      }
    });
  }

  /**
   * Rejoint un appel existant
   */
  joinCall(): void {
    if (this.isInCall() || !this.call()) {
      return;
    }

    this.callService.joinCall(this.call()!.id).subscribe({
      next: (call) => {
        console.log('VoiceCallComponent: Appel rejoint avec succès', call);
      },
      error: (error) => {
        console.error('VoiceCallComponent: Erreur lors de la connexion à l\'appel', error);
      }
    });
  }

  /**
   * Quitte l'appel actif
   */
  leaveCall(): void {
    if (!this.isInCall()) {
      return;
    }

    this.callService.leaveCall().subscribe({
      next: (success) => {
        console.log('VoiceCallComponent: Appel quitté avec succès');
      },
      error: (error) => {
        console.error('VoiceCallComponent: Erreur lors de la déconnexion de l\'appel', error);
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
}
