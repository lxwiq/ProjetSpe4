import { Injectable, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, Subject, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { WebsocketService } from './websocket.service';
import { AuthService } from './auth.service';
import {
  Call,
  CallParticipant,
  SignalingData,
  VoiceActivityData
} from '../models/call.model';

@Injectable({
  providedIn: 'root'
})
export class CallService {
  // Signaux pour l'état des appels
  activeCall = signal<Call | null>(null);
  participants = signal<CallParticipant[]>([]);
  isInCall = signal<boolean>(false);
  isMuted = signal<boolean>(false);

  // Configuration WebRTC
  private peerConnections: Map<number, RTCPeerConnection> = new Map();
  private localStream: MediaStream | null = null;
  private audioContext: AudioContext | null = null;
  private audioAnalysers: Map<number, AnalyserNode> = new Map();
  private voiceActivityDetectionInterval: any = null;
  private destroyRef = inject(DestroyRef);

  // Sujets pour les événements d'appel
  private callJoined = new Subject<CallParticipant>();
  private callLeft = new Subject<CallParticipant>();
  private voiceActivity = new Subject<VoiceActivityData>();

  // Configuration WebRTC
  private readonly rtcConfig: RTCConfiguration = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' }
    ]
  };

  constructor(
    private websocketService: WebsocketService,
    private authService: AuthService
  ) {
    this.setupWebSocketListeners();
  }

  /**
   * Configure les écouteurs d'événements WebSocket
   */
  private setupWebSocketListeners(): void {
    // Écouter les événements d'appel
    this.websocketService.onCallStarted()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        console.log('CallService: Nouvel appel démarré', data);
        // Si l'utilisateur est déjà dans un appel, ignorer
        if (this.isInCall()) {
          console.log('CallService: Déjà dans un appel, ignorer le nouvel appel');
          return;
        }

        // Vérifier si l'appel concerne le document actif
        const currentDocumentId = this.getCurrentDocumentId();
        if (currentDocumentId && data.documentId === currentDocumentId) {
          console.log('CallService: Appel pour le document actif, proposer de rejoindre');
          // Notifier l'interface utilisateur qu'un appel est disponible
          this.activeCall.set({
            id: data.callId,
            document_id: data.documentId,
            initiated_by: data.initiatedBy,
            started_at: new Date().toISOString(),
            call_type: 'audio',
            status: 'active'
          });
        }
      });

    // Écouter les événements de fin d'appel
    this.websocketService.onCallEnded()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        console.log('CallService: Appel terminé', data);
        if (this.activeCall() && this.activeCall()!.id === data.callId) {
          this.handleCallEnded();
        }
      });

    // Écouter les événements d'utilisateurs rejoignant l'appel
    this.websocketService.onCallJoined()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        console.log('CallService: Utilisateur a rejoint l\'appel', data);
        if (this.activeCall() && this.activeCall()!.id === data.callId) {
          // Si nous sommes dans l'appel, établir une connexion avec le nouvel utilisateur
          if (this.isInCall() && data.userId !== this.authService.currentUser()?.id) {
            this.createPeerConnection(data.userId, true);
          }

          // Ajouter le participant à la liste
          this.addParticipant(data.userId, data.callId);
        }
      });

    // Écouter les événements d'utilisateurs quittant l'appel
    this.websocketService.onCallLeft()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        console.log('CallService: Utilisateur a quitté l\'appel', data);
        if (this.activeCall() && this.activeCall()!.id === data.callId) {
          this.removeParticipant(data.userId);
        }
      });

    // Écouter les signaux WebRTC
    this.websocketService.onCallSignal()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        console.log('CallService: Signal WebRTC reçu', data);
        if (this.activeCall() && this.activeCall()!.id === data.callId) {
          this.handleSignalingData(data);
        }
      });
  }

  /**
   * Récupère l'ID du document actif
   * @returns ID du document actif ou null
   */
  private getCurrentDocumentId(): number | null {
    // Cette méthode devrait être implémentée pour récupérer l'ID du document actif
    // depuis le service de document ou le routeur
    const path = window.location.pathname;
    const match = path.match(/\/documents\/(\d+)/);
    return match ? parseInt(match[1]) : null;
  }

  /**
   * Démarre un nouvel appel pour un document
   * @param documentId ID du document
   * @returns Observable avec les informations de l'appel
   */
  startCall(documentId: number): Observable<Call> {
    return new Observable(observer => {
      if (!documentId || isNaN(documentId)) {
        console.error('CallService: ID de document invalide', documentId);
        observer.error(new Error('ID de document invalide'));
        return;
      }

      console.log(`CallService: Démarrage d'un appel pour le document ${documentId}`);

      // Demander l'accès au microphone
      this.requestAudioAccess().then(stream => {
        this.localStream = stream;

        // Émettre l'événement pour démarrer l'appel
        this.websocketService.emit('call:start', { documentId }, (response: any) => {
          if (response && response.success) {
            console.log('CallService: Appel démarré avec succès', response.data);

            // Vérifier que les données de l'appel sont valides
            if (!response.data || !response.data.callId) {
              console.error('CallService: Données d\'appel invalides', response.data);
              this.cleanupAudioResources();
              observer.error(new Error('Données d\'appel invalides'));
              return;
            }

            // Mettre à jour l'état
            const call: Call = {
              id: response.data.callId,
              document_id: documentId,
              initiated_by: this.authService.currentUser()?.id || 0,
              started_at: new Date().toISOString(),
              call_type: 'audio',
              status: 'active'
            };

            this.activeCall.set(call);
            this.isInCall.set(true);

            // Ajouter l'utilisateur actuel comme participant
            const currentUser = this.authService.currentUser();
            if (currentUser) {
              this.addParticipant(currentUser.id, call.id);
            }

            // Configurer la détection d'activité vocale
            this.setupVoiceActivityDetection();

            observer.next(call);
            observer.complete();
          } else {
            const errorMessage = response?.error || 'Erreur inconnue';
            console.error('CallService: Erreur lors du démarrage de l\'appel', errorMessage);
            this.cleanupAudioResources();
            observer.error(new Error(errorMessage));
          }
        });
      }).catch(error => {
        console.error('CallService: Erreur lors de l\'accès au microphone', error);
        observer.error(new Error('Impossible d\'accéder au microphone. Veuillez vérifier les permissions.'));
      });
    });
  }

  /**
   * Rejoint un appel existant
   * @param callId ID de l'appel
   * @returns Observable avec les informations de l'appel
   */
  joinCall(callId: number): Observable<Call> {
    return new Observable(observer => {
      if (!callId || isNaN(callId)) {
        console.error('CallService: ID d\'appel invalide', callId);
        observer.error(new Error('ID d\'appel invalide'));
        return;
      }

      console.log(`CallService: Rejoindre l'appel ${callId}`);

      // Vérifier si nous avons déjà un appel actif
      if (!this.activeCall()) {
        console.error('CallService: Aucun appel actif à rejoindre');
        observer.error(new Error('Aucun appel actif à rejoindre'));
        return;
      }

      // Demander l'accès au microphone
      this.requestAudioAccess().then(stream => {
        this.localStream = stream;

        // Émettre l'événement pour rejoindre l'appel
        this.websocketService.emit('call:join', { callId }, (response: any) => {
          if (response && response.success) {
            console.log('CallService: Appel rejoint avec succès', response.data);

            // Mettre à jour l'état
            const call = this.activeCall();
            if (!call) {
              console.error('CallService: Appel non disponible après avoir rejoint');
              this.cleanupAudioResources();
              observer.error(new Error('Appel non disponible'));
              return;
            }

            this.isInCall.set(true);

            // Établir des connexions avec les participants existants
            const participants = response.data?.participants;
            const currentUserId = this.authService.currentUser()?.id;

            if (participants && Array.isArray(participants)) {
              console.log('CallService: Connexion avec les participants existants', participants);
              participants.forEach(userId => {
                if (userId !== currentUserId) {
                  this.createPeerConnection(userId, false);
                }
              });
            } else {
              console.log('CallService: Aucun participant existant ou format invalide', response.data);
            }

            // Ajouter l'utilisateur actuel comme participant s'il n'est pas déjà présent
            if (currentUserId) {
              this.addParticipant(currentUserId, call.id);
            }

            // Configurer la détection d'activité vocale
            this.setupVoiceActivityDetection();

            observer.next(call);
            observer.complete();
          } else {
            const errorMessage = response?.error || 'Erreur inconnue';
            console.error('CallService: Erreur lors de la connexion à l\'appel', errorMessage);
            this.cleanupAudioResources();
            observer.error(new Error(errorMessage));
          }
        });
      }).catch(error => {
        console.error('CallService: Erreur lors de l\'accès au microphone', error);
        observer.error(new Error('Impossible d\'accéder au microphone. Veuillez vérifier les permissions.'));
      });
    });
  }

  /**
   * Quitte l'appel actif
   * @returns Observable indiquant le succès de l'opération
   */
  leaveCall(): Observable<boolean> {
    const call = this.activeCall();
    if (!call) {
      return of(false);
    }

    return new Observable(observer => {
      this.websocketService.emit('call:leave', { callId: call.id }, (response: any) => {
        if (response.success) {
          console.log('CallService: Appel quitté avec succès');
          this.handleCallEnded();
          observer.next(true);
          observer.complete();
        } else {
          console.error('CallService: Erreur lors de la déconnexion de l\'appel', response.error);
          observer.error(new Error(response.error));
        }
      });
    });
  }

  /**
   * Active ou désactive le microphone
   * @param mute Indique si le microphone doit être désactivé
   */
  toggleMute(mute?: boolean): void {
    const shouldMute = mute !== undefined ? mute : !this.isMuted();

    if (this.localStream) {
      this.localStream.getAudioTracks().forEach(track => {
        track.enabled = !shouldMute;
      });

      this.isMuted.set(shouldMute);
      console.log(`CallService: Microphone ${shouldMute ? 'désactivé' : 'activé'}`);
    }
  }

  // Méthodes pour les observables d'événements
  onCallJoined(): Observable<CallParticipant> {
    return this.callJoined.asObservable();
  }

  onCallLeft(): Observable<CallParticipant> {
    return this.callLeft.asObservable();
  }

  onVoiceActivity(): Observable<VoiceActivityData> {
    return this.voiceActivity.asObservable();
  }

  // Méthodes privées pour la gestion WebRTC
  private async requestAudioAccess(): Promise<MediaStream> {
    try {
      return await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    } catch (error) {
      console.error('Erreur lors de l\'accès au microphone:', error);
      throw error;
    }
  }

  private createPeerConnection(userId: number, isInitiator: boolean): void {
    if (this.peerConnections.has(userId)) {
      console.log(`CallService: Connexion existante avec l'utilisateur ${userId}, réutilisation`);
      return;
    }

    console.log(`CallService: Création d'une nouvelle connexion avec l'utilisateur ${userId}`);

    const peerConnection = new RTCPeerConnection(this.rtcConfig);
    this.peerConnections.set(userId, peerConnection);

    // Ajouter les pistes audio locales
    if (this.localStream) {
      this.localStream.getAudioTracks().forEach(track => {
        peerConnection.addTrack(track, this.localStream!);
      });
    }

    // Gérer les pistes distantes
    peerConnection.ontrack = (event) => {
      console.log(`CallService: Piste reçue de l'utilisateur ${userId}`, event);

      // Mettre à jour le participant avec le flux audio
      const currentParticipants = this.participants();
      const updatedParticipants = currentParticipants.map(p => {
        if (p.user_id === userId) {
          return { ...p, stream: event.streams[0] };
        }
        return p;
      });

      this.participants.set(updatedParticipants);
    };

    // Gérer les candidats ICE
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        console.log(`CallService: Candidat ICE généré pour l'utilisateur ${userId}`, event.candidate);

        // Envoyer le candidat à l'autre utilisateur
        this.sendSignalingData({
          callId: this.activeCall()!.id,
          userId: userId,
          signal: event.candidate,
          type: 'candidate'
        });
      }
    };

    // Gérer les changements d'état de connexion
    peerConnection.onconnectionstatechange = () => {
      console.log(`CallService: État de connexion changé pour l'utilisateur ${userId}:`, peerConnection.connectionState);

      if (peerConnection.connectionState === 'disconnected' ||
          peerConnection.connectionState === 'failed' ||
          peerConnection.connectionState === 'closed') {
        this.cleanupPeerConnection(userId);
      }
    };

    // Si nous sommes l'initiateur, créer et envoyer une offre
    if (isInitiator) {
      this.createAndSendOffer(userId, peerConnection);
    }
  }

  private async createAndSendOffer(userId: number, peerConnection: RTCPeerConnection): Promise<void> {
    try {
      const offer = await peerConnection.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: false
      });

      await peerConnection.setLocalDescription(offer);

      console.log(`CallService: Offre créée pour l'utilisateur ${userId}`, offer);

      // Envoyer l'offre à l'autre utilisateur
      this.sendSignalingData({
        callId: this.activeCall()!.id,
        userId: userId,
        signal: offer,
        type: 'offer'
      });
    } catch (error) {
      console.error(`CallService: Erreur lors de la création de l'offre pour l'utilisateur ${userId}`, error);
    }
  }

  private async handleSignalingData(data: SignalingData): Promise<void> {
    const { userId, signal, type } = data;

    // Ignorer les signaux de nous-mêmes
    if (userId === this.authService.currentUser()?.id) {
      return;
    }

    // Créer une connexion si elle n'existe pas
    if (!this.peerConnections.has(userId)) {
      this.createPeerConnection(userId, false);
    }

    const peerConnection = this.peerConnections.get(userId)!;

    try {
      if (type === 'offer') {
        console.log(`CallService: Offre reçue de l'utilisateur ${userId}`, signal);

        await peerConnection.setRemoteDescription(new RTCSessionDescription(signal as RTCSessionDescriptionInit));

        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);

        console.log(`CallService: Réponse créée pour l'utilisateur ${userId}`, answer);

        // Envoyer la réponse à l'autre utilisateur
        this.sendSignalingData({
          callId: this.activeCall()!.id,
          userId: userId,
          signal: answer,
          type: 'answer'
        });
      } else if (type === 'answer') {
        console.log(`CallService: Réponse reçue de l'utilisateur ${userId}`, signal);

        await peerConnection.setRemoteDescription(new RTCSessionDescription(signal as RTCSessionDescriptionInit));
      } else if (type === 'candidate') {
        console.log(`CallService: Candidat ICE reçu de l'utilisateur ${userId}`, signal);

        try {
          await peerConnection.addIceCandidate(new RTCIceCandidate(signal as RTCIceCandidateInit));
        } catch (error) {
          console.error(`CallService: Erreur lors de l'ajout du candidat ICE de l'utilisateur ${userId}`, error);
        }
      }
    } catch (error) {
      console.error(`CallService: Erreur lors du traitement du signal de l'utilisateur ${userId}`, error);
    }
  }

  private sendSignalingData(data: SignalingData): void {
    this.websocketService.emit('call:signal', data);
  }

  private setupVoiceActivityDetection(): void {
    if (!this.localStream || !window.AudioContext) {
      console.warn('CallService: AudioContext non supporté ou flux local non disponible');
      return;
    }

    try {
      this.audioContext = new AudioContext();
      const analyser = this.audioContext.createAnalyser();
      const microphone = this.audioContext.createMediaStreamSource(this.localStream);

      microphone.connect(analyser);
      analyser.fftSize = 512;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      // Stocker l'analyseur pour l'utilisateur actuel
      const currentUserId = this.authService.currentUser()?.id;
      if (currentUserId) {
        this.audioAnalysers.set(currentUserId, analyser);
      }

      // Détecter l'activité vocale à intervalles réguliers
      this.voiceActivityDetectionInterval = setInterval(() => {
        if (this.isMuted()) {
          // Si le microphone est désactivé, ne pas détecter d'activité
          this.emitVoiceActivity(false);
          return;
        }

        analyser.getByteFrequencyData(dataArray);

        // Calculer le niveau sonore moyen
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }

        const average = sum / bufferLength;
        const isSpeaking = average > 20; // Seuil de détection

        this.emitVoiceActivity(isSpeaking);
      }, 200); // Vérifier toutes les 200ms
    } catch (error) {
      console.error('CallService: Erreur lors de la configuration de la détection d\'activité vocale', error);
    }
  }

  private emitVoiceActivity(isSpeaking: boolean): void {
    const currentUserId = this.authService.currentUser()?.id;
    const callId = this.activeCall()?.id;

    if (currentUserId && callId) {
      // Mettre à jour l'état du participant local
      const currentParticipants = this.participants();
      const updatedParticipants = currentParticipants.map(p => {
        if (p.user_id === currentUserId) {
          if (p.is_speaking !== isSpeaking) {
            // Émettre l'événement uniquement si l'état a changé
            this.voiceActivity.next({
              callId,
              userId: currentUserId,
              isSpeaking
            });

            // Envoyer l'état aux autres participants
            this.websocketService.emit('call:voice-activity', {
              callId,
              isSpeaking
            });
          }

          return { ...p, is_speaking: isSpeaking };
        }
        return p;
      });

      this.participants.set(updatedParticipants);
    }
  }

  private addParticipant(userId: number, callId: number): void {
    if (!userId || isNaN(userId) || !callId || isNaN(callId)) {
      console.error('CallService: ID utilisateur ou ID appel invalide', { userId, callId });
      return;
    }

    console.log(`CallService: Ajout du participant ${userId} à l'appel ${callId}`);

    const currentParticipants = this.participants();

    // Vérifier si le participant existe déjà
    if (!currentParticipants.some(p => p.user_id === userId)) {
      const newParticipant: CallParticipant = {
        user_id: userId,
        call_id: callId,
        joined_at: new Date().toISOString(),
        is_active: true,
        is_speaking: false,
        is_muted: false
      };

      this.participants.set([...currentParticipants, newParticipant]);
      this.callJoined.next(newParticipant);
      console.log(`CallService: Participant ${userId} ajouté à l'appel ${callId}`);
    } else {
      console.log(`CallService: Participant ${userId} déjà présent dans l'appel ${callId}`);
    }
  }

  private removeParticipant(userId: number): void {
    const currentParticipants = this.participants();
    const participant = currentParticipants.find(p => p.user_id === userId);

    if (participant) {
      // Mettre à jour l'état du participant
      const updatedParticipant = {
        ...participant,
        is_active: false,
        left_at: new Date().toISOString()
      };

      // Mettre à jour la liste des participants
      const updatedParticipants = currentParticipants.map(p =>
        p.user_id === userId ? updatedParticipant : p
      );

      this.participants.set(updatedParticipants);
      this.callLeft.next(updatedParticipant);

      // Nettoyer la connexion
      this.cleanupPeerConnection(userId);
    }
  }

  private cleanupPeerConnection(userId: number): void {
    const peerConnection = this.peerConnections.get(userId);

    if (peerConnection) {
      peerConnection.close();
      this.peerConnections.delete(userId);
      console.log(`CallService: Connexion avec l'utilisateur ${userId} fermée`);
    }
  }

  private handleCallEnded(): void {
    // Nettoyer toutes les ressources
    this.cleanupAudioResources();

    // Réinitialiser l'état
    this.activeCall.set(null);
    this.isInCall.set(false);
    this.participants.set([]);

    console.log('CallService: Appel terminé, ressources nettoyées');
  }

  private cleanupAudioResources(): void {
    // Arrêter la détection d'activité vocale
    if (this.voiceActivityDetectionInterval) {
      clearInterval(this.voiceActivityDetectionInterval);
      this.voiceActivityDetectionInterval = null;
    }

    // Fermer le contexte audio
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }

    // Nettoyer les analyseurs
    this.audioAnalysers.clear();

    // Arrêter les pistes audio locales
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
      this.localStream = null;
    }

    // Fermer toutes les connexions pair-à-pair
    this.peerConnections.forEach((connection, userId) => {
      this.cleanupPeerConnection(userId);
    });

    this.peerConnections.clear();
  }
}
