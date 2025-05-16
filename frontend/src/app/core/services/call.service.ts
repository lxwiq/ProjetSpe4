import { Injectable, DestroyRef, inject, signal, computed } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, Subject, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { WebsocketService } from './websocket.service';
import { AuthService } from './auth.service';
import { EventBusService } from './event-bus.service';
import {
  Call,
  CallParticipant,
  SignalingData,
  VoiceActivityData,
  IncomingCallData
} from '../models/call.model';

@Injectable({
  providedIn: 'root'
})
export class CallService {
  // Signaux privés pour l'état des appels
  private callId = signal<string | null>(null);
  private documentId = signal<number | null>(null);
  private localStream = signal<MediaStream | null>(null);
  private peerConnectionsMap = signal<Map<number, RTCPeerConnection>>(new Map());
  private participantsList = signal<CallParticipant[]>([]);
  private connectionState = signal<'disconnected' | 'connecting' | 'connected'>('disconnected');
  private activeCallData = signal<Call | null>(null);

  // Signaux publics (en lecture seule)
  public isMuted = signal<boolean>(false);
  public isInCall = computed(() => {
    // L'utilisateur est dans l'appel si callId n'est pas null ET si l'utilisateur actuel est un participant actif
    const callId = this.callId();
    if (!callId) return false;

    const currentUserId = this.authService.currentUser()?.id;
    if (!currentUserId) return false;

    // Vérifier si l'utilisateur est un participant actif
    const participants = this.participantsList();
    return participants.some(p => p.user_id === currentUserId && p.is_active);
  });
  public participants = this.participantsList.asReadonly();
  public activeCall = this.activeCallData.asReadonly();

  // Configuration WebRTC
  private audioContext: AudioContext | null = null;
  private audioAnalysers: Map<number, AnalyserNode> = new Map();
  private voiceActivityDetectionInterval: any = null;
  private destroyRef = inject(DestroyRef);

  // Sujets pour les événements d'appel (pour compatibilité avec le code existant)
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
    private authService: AuthService,
    private eventBus: EventBusService
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
        console.log('[APPEL VOCAL] Notification reçue: nouvel appel démarré', {
          callId: data.callId,
          documentId: data.documentId,
          initiatedBy: data.initiatedBy
        });

        // Si l'utilisateur est déjà dans un appel, ignorer
        if (this.isInCall()) {
          console.log('[APPEL VOCAL] Déjà dans un appel, notification ignorée');
          return;
        }

        // Vérifier si l'appel concerne le document actif
        const currentDocumentId = this.getCurrentDocumentId();
        if (currentDocumentId && parseInt(data.documentId) === currentDocumentId) {
          console.log('[APPEL VOCAL] Appel disponible pour le document actif', {
            documentId: currentDocumentId,
            callId: data.callId
          });

          // Notifier l'interface utilisateur qu'un appel est disponible
          const call: Call = {
            id: parseInt(data.callId),
            document_id: parseInt(data.documentId),
            initiated_by: data.initiatedBy,
            started_at: new Date().toISOString(),
            call_type: 'audio',
            status: 'active'
          };

          // Mettre à jour l'état de l'appel actif
          this.activeCallData.set(call as Call);

          // Ne pas définir callId et documentId ici pour ne pas marquer l'utilisateur comme étant dans l'appel
          // L'utilisateur doit explicitement rejoindre l'appel
          // this.callId.set(data.callId);
          // this.documentId.set(parseInt(data.documentId));

          // Ajouter l'initiateur comme participant
          this.addParticipant(data.initiatedBy, parseInt(data.callId));

          console.log('[APPEL VOCAL] État de l\'appel mis à jour', {
            callId: call.id,
            documentId: call.document_id,
            participants: this.participants().map(p => p.user_id)
          });

          // Émettre un événement pour informer les composants d'appel
          const incomingCallData: IncomingCallData = {
            callId: call.id,
            documentId: call.document_id,
            callerId: call.initiated_by,
            documentTitle: 'Document actif' // Nous n'avons pas le titre ici, mais ce n'est pas grave
          };
          this.eventBus.emit('incoming_call', incomingCallData);
        } else {
          console.log('[APPEL VOCAL] Appel ignoré (document différent)', {
            callDocumentId: data.documentId,
            currentDocumentId
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

    // Essayer d'abord le format standard /documents/{id}
    let match = path.match(/\/documents\/(\d+)/);
    if (match) {
      return parseInt(match[1]);
    }

    // Essayer ensuite le format d'URL d'appel /documents/{id}/call/{callId}
    match = path.match(/\/documents\/(\d+)\/call\/\d+/);
    if (match) {
      return parseInt(match[1]);
    }

    // Si nous sommes ici, essayer de récupérer l'ID du document depuis l'URL de l'appel
    // Format: /documents/{documentId}/call/{callId}
    const callMatch = path.match(/\/documents\/(\d+)\/call\//);
    if (callMatch) {
      return parseInt(callMatch[1]);
    }

    console.log('[APPEL VOCAL] Impossible de déterminer l\'ID du document depuis l\'URL:', path);
    return null;
  }

  /**
   * Démarre un nouvel appel pour un document
   * @param documentId ID du document
   * @returns Observable avec les informations de l'appel
   */
  startCall(documentId: number): Observable<Call> {
    return new Observable(observer => {
      if (!documentId || isNaN(documentId)) {
        console.log('[APPEL VOCAL] Erreur: ID de document invalide', { documentId });
        observer.error(new Error('ID de document invalide'));
        return;
      }

      console.log(`[APPEL VOCAL] Démarrage d'un appel pour le document ${documentId}`);

      // Demander l'accès au microphone
      this.requestAudioAccess().then(stream => {
        this.localStream.set(stream);
        console.log('[APPEL VOCAL] Accès au microphone accordé');

        // Émettre l'événement pour démarrer l'appel
        this.websocketService.emit('call:start', { documentId }, (response: any) => {
          if (response && response.success) {
            console.log('[APPEL VOCAL] Appel démarré avec succès', {
              callId: response.data.callId,
              documentId: response.data.documentId,
              participants: response.data.participants
            });

            // Vérifier que les données de l'appel sont valides
            if (!response.data || !response.data.callId) {
              console.log('[APPEL VOCAL] Erreur: Données d\'appel invalides', { response: response.data });
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

            this.callId.set(response.data.callId.toString());
            this.documentId.set(documentId);
            this.activeCallData.set(call as Call);

            console.log('[APPEL VOCAL] Utilisateur a démarré l\'appel', {
              callId: response.data.callId,
              documentId,
              userId: this.authService.currentUser()?.id
            });

            // Ajouter l'utilisateur actuel comme participant
            const currentUser = this.authService.currentUser();
            if (currentUser) {
              this.addParticipant(currentUser.id, call.id);
              console.log('[APPEL VOCAL] Utilisateur ajouté comme participant', {
                userId: currentUser.id,
                callId: call.id
              });
            }

            // Configurer la détection d'activité vocale
            this.setupVoiceActivityDetection();
            console.log('[APPEL VOCAL] Détection d\'activité vocale configurée');

            observer.next(call);
            observer.complete();
          } else {
            const errorMessage = response?.error || 'Erreur inconnue';
            console.log('[APPEL VOCAL] Erreur lors du démarrage de l\'appel', { error: errorMessage });
            this.cleanupAudioResources();
            observer.error(new Error(errorMessage));
          }
        });
      }).catch(error => {
        console.log('[APPEL VOCAL] Erreur lors de l\'accès au microphone', { error: error.message });
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
        console.log('[APPEL VOCAL] Erreur: ID d\'appel invalide', { callId });
        observer.error(new Error('ID d\'appel invalide'));
        return;
      }

      console.log(`[APPEL VOCAL] Tentative de rejoindre l'appel ${callId}`);

      // Vérifier si nous avons déjà un appel actif dans l'interface
      let activeCall = this.activeCall();

      // Si aucun appel actif n'est trouvé, essayons de récupérer les informations de l'appel depuis le serveur
      if (!activeCall) {
        console.log('[APPEL VOCAL] Aucun appel actif trouvé localement, tentative de récupération depuis le serveur');

        // Créer un appel temporaire pour permettre la connexion
        // Nous récupérerons les détails complets depuis la réponse du serveur
        let currentDocumentId = this.getCurrentDocumentId();

        // Si nous ne pouvons pas déterminer l'ID du document depuis l'URL, essayons d'utiliser l'ID de l'appel
        // pour récupérer les informations de l'appel depuis le serveur
        if (!currentDocumentId) {
          console.log('[APPEL VOCAL] Avertissement: Impossible de déterminer l\'ID du document depuis l\'URL');
          console.log('[APPEL VOCAL] Tentative de récupération des informations de l\'appel depuis le serveur');

          // Utiliser un ID temporaire qui sera mis à jour avec les données du serveur
          currentDocumentId = 0;
        }

        // Créer un objet Call temporaire avec les informations minimales nécessaires
        const tempCall: Call = {
          id: callId,
          document_id: currentDocumentId,
          initiated_by: 0, // Sera mis à jour avec les données du serveur
          started_at: new Date().toISOString(),
          call_type: 'audio',
          status: 'active'
        };

        // Mettre à jour l'état avec cet appel temporaire
        this.activeCallData.set(tempCall);
        activeCall = tempCall;

        console.log('[APPEL VOCAL] Appel temporaire créé pour permettre la connexion', {
          callId,
          documentId: currentDocumentId
        });
      }

      // Demander l'accès au microphone
      this.requestAudioAccess().then(stream => {
        this.localStream.set(stream);
        console.log('[APPEL VOCAL] Accès au microphone accordé pour rejoindre l\'appel');

        // Émettre l'événement pour rejoindre l'appel
        this.websocketService.emit('call:join', { callId }, (response: any) => {
          if (response && response.success) {
            console.log('[APPEL VOCAL] Appel rejoint avec succès', {
              callId: response.data.callId,
              participants: response.data.participants
            });

            // Mettre à jour l'état avec les données complètes de l'appel
            if (response.data && response.data.callDetails) {
              // Si le serveur renvoie les détails complets de l'appel, les utiliser
              const callDetails = response.data.callDetails;

              // Récupérer l'ID du document depuis les détails de l'appel
              const documentId = callDetails.document_id || response.data.documentId || (activeCall ? activeCall.document_id : 0);

              const updatedCall: Call = {
                id: callId,
                document_id: documentId,
                initiated_by: callDetails.initiated_by || (activeCall ? activeCall.initiated_by : 0),
                started_at: callDetails.started_at || (activeCall ? activeCall.started_at : new Date().toISOString()),
                call_type: callDetails.call_type || 'audio',
                status: callDetails.status || 'active'
              };
              this.activeCallData.set(updatedCall);
              activeCall = updatedCall;

              console.log('[APPEL VOCAL] Détails de l\'appel mis à jour avec les données du serveur', {
                callId,
                documentId: updatedCall.document_id,
                initiatedBy: updatedCall.initiated_by,
                documentTitle: callDetails.document?.title || 'Document sans titre'
              });
            }

            // Mettre à jour l'état de l'appel
            this.callId.set(callId.toString());
            this.documentId.set(activeCall ? activeCall.document_id : 0);

            console.log('[APPEL VOCAL] Utilisateur a rejoint l\'appel', {
              callId,
              documentId: activeCall ? activeCall.document_id : 0,
              userId: this.authService.currentUser()?.id
            });

            // Établir des connexions avec les participants existants
            const participants = response.data?.participants;
            const currentUserId = this.authService.currentUser()?.id;

            // Vider la liste des participants actuels pour la réinitialiser avec les données du serveur
            this.participantsList.set([]);

            if (participants && Array.isArray(participants)) {
              console.log('[APPEL VOCAL] Connexion avec les participants existants', {
                participants,
                count: participants.length
              });

              // Ajouter tous les participants existants à la liste
              participants.forEach(participant => {
                // Si c'est un objet participant complet
                if (typeof participant === 'object' && participant.userId) {
                  this.addParticipant(participant.userId, callId);

                  // Établir une connexion WebRTC si ce n'est pas l'utilisateur actuel
                  if (participant.userId !== currentUserId) {
                    this.createPeerConnection(participant.userId, false);
                  }
                }
                // Si c'est juste un ID d'utilisateur
                else if (typeof participant === 'number' || (typeof participant === 'string' && !isNaN(parseInt(participant)))) {
                  const userId = typeof participant === 'number' ? participant : parseInt(participant);
                  this.addParticipant(userId, callId);

                  // Établir une connexion WebRTC si ce n'est pas l'utilisateur actuel
                  if (userId !== currentUserId) {
                    this.createPeerConnection(userId, false);
                  }
                }
              });
            } else {
              console.log('[APPEL VOCAL] Aucun participant existant ou format invalide', {
                responseData: response.data
              });
            }

            // Ajouter l'utilisateur actuel comme participant s'il n'est pas déjà présent
            if (currentUserId) {
              this.addParticipant(currentUserId, callId);
            }

            // Journaliser les participants actuels pour débogage
            console.log('[APPEL VOCAL] Liste des participants après avoir rejoint l\'appel', {
              participants: this.participantsList().map(p => ({ userId: p.user_id, isActive: p.is_active }))
            });

            // Configurer la détection d'activité vocale
            this.setupVoiceActivityDetection();

            // S'assurer que activeCall n'est pas null avant de le renvoyer
            if (activeCall) {
              observer.next(activeCall);
            } else {
              // Créer un objet Call minimal si activeCall est null
              const fallbackCall: Call = {
                id: callId,
                document_id: this.getCurrentDocumentId() || 0,
                initiated_by: 0,
                started_at: new Date().toISOString(),
                call_type: 'audio',
                status: 'active'
              };
              observer.next(fallbackCall);
            }
            observer.complete();
          } else {
            const errorMessage = response?.error || 'Erreur inconnue';
            console.log('[APPEL VOCAL] Erreur lors de la connexion à l\'appel', { error: errorMessage });
            this.cleanupAudioResources();
            observer.error(new Error(errorMessage));
          }
        });
      }).catch(error => {
        console.log('[APPEL VOCAL] Erreur lors de l\'accès au microphone', { error: error.message });
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
          console.log('[APPEL VOCAL] Appel quitté avec succès', { callId: call.id });
          this.handleCallEnded();
          observer.next(true);
          observer.complete();
        } else {
          console.log('[APPEL VOCAL] Erreur lors de la déconnexion de l\'appel', {
            callId: call.id,
            error: response.error
          });
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

    const stream = this.localStream();
    if (stream) {
      stream.getAudioTracks().forEach(track => {
        track.enabled = !shouldMute;
      });

      this.isMuted.set(shouldMute);
      console.log(`[APPEL VOCAL] Microphone ${shouldMute ? 'désactivé' : 'activé'}`);
    }
  }

  /**
   * Change le périphérique d'entrée audio
   * @param deviceId ID du périphérique
   * @returns Promise qui se résout lorsque le périphérique est changé
   */
  async changeInputDevice(deviceId: string): Promise<void> {
    if (!deviceId) {
      console.error('CallService: ID de périphérique invalide');
      throw new Error('ID de périphérique invalide');
    }

    if (!this.isInCall()) {
      console.warn('CallService: Pas dans un appel, impossible de changer de périphérique');
      return;
    }

    try {
      console.log(`CallService: Changement de périphérique d'entrée audio vers ${deviceId}`);

      // Récupérer l'état du microphone actuel
      const wasMuted = this.isMuted();

      // Arrêter les pistes actuelles
      const stream = this.localStream();
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

      // Demander l'accès au nouveau périphérique
      const constraints: MediaStreamConstraints = {
        audio: { deviceId: { exact: deviceId } },
        video: false
      };

      const newStream = await navigator.mediaDevices.getUserMedia(constraints);
      this.localStream.set(newStream);

      // Appliquer l'état du microphone
      if (wasMuted) {
        this.toggleMute(true);
      }

      // Mettre à jour les connexions existantes
      const connections = this.peerConnectionsMap();
      connections.forEach((peerConnection, userId) => {
        // Supprimer les anciennes pistes
        const senders = peerConnection.getSenders();
        senders.forEach(sender => {
          if (sender.track && sender.track.kind === 'audio') {
            peerConnection.removeTrack(sender);
          }
        });

        // Ajouter les nouvelles pistes
        newStream.getAudioTracks().forEach(track => {
          peerConnection.addTrack(track, newStream);
        });
      });

      // Mettre à jour la détection d'activité vocale
      this.setupVoiceActivityDetection();

      console.log('CallService: Périphérique d\'entrée audio changé avec succès');
    } catch (error) {
      console.error('CallService: Erreur lors du changement de périphérique d\'entrée audio', error);
      throw error;
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

  private createPeerConnection(userId: number, isInitiator: boolean): RTCPeerConnection {
    // Récupérer les connexions existantes
    const connections = this.peerConnectionsMap();

    // Vérifier si une connexion existe déjà pour cet utilisateur
    if (connections.has(userId)) {
      console.log(`[APPEL VOCAL] Connexion existante avec l'utilisateur ${userId}, réutilisation`);
      return connections.get(userId)!;
    }

    console.log(`[APPEL VOCAL] Création d'une nouvelle connexion avec l'utilisateur ${userId}`, {
      isInitiator,
      currentUserId: this.authService.currentUser()?.id
    });

    // Créer une nouvelle connexion avec la configuration STUN/TURN
    const peerConnection = new RTCPeerConnection(this.rtcConfig);

    // Ajouter les pistes audio locales
    const stream = this.localStream();
    if (stream) {
      stream.getAudioTracks().forEach(track => {
        console.log(`[APPEL VOCAL] Ajout de la piste audio locale à la connexion avec l'utilisateur ${userId}`, {
          trackId: track.id,
          trackLabel: track.label,
          trackEnabled: track.enabled
        });
        peerConnection.addTrack(track, stream);
      });
    } else {
      console.warn(`[APPEL VOCAL] Pas de flux local disponible pour l'utilisateur ${userId}`);
    }

    // Gérer les pistes distantes
    peerConnection.ontrack = (event) => {
      console.log(`[APPEL VOCAL] Piste reçue de l'utilisateur ${userId}`, {
        trackId: event.track.id,
        trackKind: event.track.kind,
        trackLabel: event.track.label,
        hasStreams: event.streams.length > 0
      });

      // Mettre à jour le participant avec le flux audio
      if (event.streams && event.streams.length > 0) {
        this.updateParticipantStream(userId, event.streams[0]);
      } else {
        console.warn(`[APPEL VOCAL] Piste reçue sans flux pour l'utilisateur ${userId}`);
      }
    };

    // Gérer les candidats ICE
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        console.log(`[APPEL VOCAL] Candidat ICE généré pour l'utilisateur ${userId}`, {
          candidateType: event.candidate.type,
          candidateProtocol: event.candidate.protocol,
          candidateAddress: event.candidate.address
        });

        // Envoyer le candidat à l'autre utilisateur
        this.sendSignalingData({
          type: 'ice-candidate',
          candidate: event.candidate,
          targetUserId: userId
        });
      }
    };

    // Gérer les changements d'état de connexion ICE
    peerConnection.oniceconnectionstatechange = () => {
      console.log(`[APPEL VOCAL] État de connexion ICE changé pour l'utilisateur ${userId}:`, peerConnection.iceConnectionState);

      // Mettre à jour l'état global de connexion
      if (peerConnection.iceConnectionState === 'connected' || peerConnection.iceConnectionState === 'completed') {
        this.connectionState.set('connected');
      } else if (peerConnection.iceConnectionState === 'checking') {
        this.connectionState.set('connecting');
      } else if (peerConnection.iceConnectionState === 'disconnected' ||
                 peerConnection.iceConnectionState === 'failed' ||
                 peerConnection.iceConnectionState === 'closed') {
        // Ne pas changer l'état global ici, car d'autres connexions peuvent être actives
      }
    };

    // Gérer les changements d'état de connexion
    peerConnection.onconnectionstatechange = () => {
      console.log(`[APPEL VOCAL] État de connexion changé pour l'utilisateur ${userId}:`, peerConnection.connectionState);

      if (peerConnection.connectionState === 'disconnected' ||
          peerConnection.connectionState === 'failed' ||
          peerConnection.connectionState === 'closed') {
        console.log(`[APPEL VOCAL] Connexion perdue avec l'utilisateur ${userId}, nettoyage`);
        this.closePeerConnection(userId);
      }
    };

    // Gérer les changements d'état de signalisation
    peerConnection.onsignalingstatechange = () => {
      console.log(`[APPEL VOCAL] État de signalisation changé pour l'utilisateur ${userId}:`, peerConnection.signalingState);
    };

    // Gérer les négociations nécessaires
    peerConnection.onnegotiationneeded = () => {
      console.log(`[APPEL VOCAL] Négociation nécessaire pour l'utilisateur ${userId}`);
      if (isInitiator) {
        this.createAndSendOffer(userId, peerConnection);
      }
    };

    // Stocker la connexion
    this.peerConnectionsMap.update(connections => {
      const newConnections = new Map(connections);
      newConnections.set(userId, peerConnection);
      return newConnections;
    });

    // Si nous sommes l'initiateur, créer et envoyer une offre
    if (isInitiator) {
      this.createAndSendOffer(userId, peerConnection);
    }

    return peerConnection;
  }

  private async createAndSendOffer(userId: number, peerConnection: RTCPeerConnection): Promise<void> {
    try {
      const offer = await peerConnection.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: false
      });

      await peerConnection.setLocalDescription(offer);

      console.log(`[APPEL VOCAL] Offre créée pour l'utilisateur ${userId}`, offer);

      // Envoyer l'offre à l'autre utilisateur
      this.sendSignalingData({
        type: 'offer',
        offer,
        targetUserId: userId
      });
    } catch (error) {
      console.error(`[APPEL VOCAL] Erreur lors de la création de l'offre pour l'utilisateur ${userId}`, error);
    }
  }

  private async handleSignalingData(data: any): Promise<void> {
    const { sourceUserId, type } = data;

    // Ignorer les signaux de nous-mêmes
    if (sourceUserId === this.authService.currentUser()?.id) {
      return;
    }

    console.log(`[APPEL VOCAL] Signal reçu de l'utilisateur ${sourceUserId}`, {
      type,
      callId: data.callId,
      hasOffer: !!data.offer,
      hasAnswer: !!data.answer,
      hasCandidate: !!data.candidate
    });

    // Vérifier si nous sommes dans un appel actif
    const activeCall = this.activeCall();
    if (!activeCall) {
      console.warn(`[APPEL VOCAL] Signal reçu mais aucun appel actif`);
      return;
    }

    // Vérifier si le signal concerne l'appel actif
    if (data.callId && data.callId.toString() !== this.callId()) {
      console.warn(`[APPEL VOCAL] Signal reçu pour un appel différent`, {
        receivedCallId: data.callId,
        activeCallId: this.callId()
      });
      return;
    }

    // Récupérer les connexions peer
    const connections = this.peerConnectionsMap();
    let peerConnection = connections.get(sourceUserId);

    // Créer une connexion si elle n'existe pas encore
    if (!peerConnection) {
      console.log(`[APPEL VOCAL] Création d'une nouvelle connexion pour le signal reçu de l'utilisateur ${sourceUserId}`);
      peerConnection = this.createPeerConnection(sourceUserId, false);

      // Ajouter l'utilisateur comme participant s'il n'est pas déjà présent
      this.addParticipant(sourceUserId, activeCall.id);
    }

    try {
      switch (type) {
        case 'offer':
          console.log(`[APPEL VOCAL] Offre reçue de l'utilisateur ${sourceUserId}`, {
            sdpType: data.offer.type,
            hasSdp: !!data.offer.sdp
          });

          // Vérifier l'état de signalisation avant d'appliquer l'offre
          if (peerConnection.signalingState !== 'stable') {
            console.log(`[APPEL VOCAL] État de signalisation non stable (${peerConnection.signalingState}), réinitialisation`);
            await peerConnection.setLocalDescription({type: 'rollback'});
          }

          await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
          const answer = await peerConnection.createAnswer();
          await peerConnection.setLocalDescription(answer);

          console.log(`[APPEL VOCAL] Réponse créée pour l'utilisateur ${sourceUserId}`, {
            sdpType: answer.type,
            hasSdp: !!answer.sdp
          });

          this.sendSignalingData({
            type: 'answer',
            answer,
            targetUserId: sourceUserId
          });
          break;

        case 'answer':
          console.log(`[APPEL VOCAL] Réponse reçue de l'utilisateur ${sourceUserId}`, {
            sdpType: data.answer.type,
            hasSdp: !!data.answer.sdp
          });

          // Vérifier que nous avons une offre en attente
          if (peerConnection.signalingState === 'have-local-offer') {
            await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
            console.log(`[APPEL VOCAL] Réponse appliquée, état de signalisation: ${peerConnection.signalingState}`);
          } else {
            console.warn(`[APPEL VOCAL] Réponse reçue mais aucune offre en attente, état: ${peerConnection.signalingState}`);
          }
          break;

        case 'ice-candidate':
          console.log(`[APPEL VOCAL] Candidat ICE reçu de l'utilisateur ${sourceUserId}`, {
            candidateType: data.candidate.type,
            candidateProtocol: data.candidate.protocol,
            candidateAddress: data.candidate.address
          });

          // Vérifier que la description distante est définie avant d'ajouter des candidats ICE
          if (peerConnection.remoteDescription) {
            await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
            console.log(`[APPEL VOCAL] Candidat ICE ajouté avec succès`);
          } else {
            console.warn(`[APPEL VOCAL] Impossible d'ajouter le candidat ICE: pas de description distante`);
          }
          break;

        default:
          console.warn(`[APPEL VOCAL] Type de signal inconnu: ${type}`);
      }
    } catch (error) {
      console.error(`[APPEL VOCAL] Erreur lors du traitement du signal de l'utilisateur ${sourceUserId}`, error);
    }
  }

  private sendSignalingData(data: any): void {
    const callId = this.callId();
    if (!callId) {
      console.error('[APPEL VOCAL] Impossible d\'envoyer un signal: aucun appel actif');
      return;
    }

    this.websocketService.emit('call:signal', {
      ...data,
      callId
    }, (response: any) => {
      if (!response || !response.success) {
        console.error('[APPEL VOCAL] Erreur lors de l\'envoi du signal:', response?.error || 'Erreur inconnue');
      }
    });
  }

  private setupVoiceActivityDetection(): void {
    const stream = this.localStream();
    if (!stream || !window.AudioContext) {
      console.warn('[APPEL VOCAL] AudioContext non supporté ou flux local non disponible');
      return;
    }

    try {
      this.audioContext = new AudioContext();
      const analyser = this.audioContext.createAnalyser();
      const microphone = this.audioContext.createMediaStreamSource(stream);

      microphone.connect(analyser);
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.4;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      // Stocker l'analyseur pour l'utilisateur actuel
      const currentUserId = this.authService.currentUser()?.id;
      if (currentUserId) {
        this.audioAnalysers.set(currentUserId, analyser);
      }

      let isSpeaking = false;
      let voiceActivityTimeout: any = null;

      // Détecter l'activité vocale à intervalles réguliers
      this.voiceActivityDetectionInterval = setInterval(() => {
        if (this.isMuted()) {
          // Si le microphone est désactivé, ne pas détecter d'activité
          if (isSpeaking) {
            isSpeaking = false;
            this.emitVoiceActivity(false);
          }
          return;
        }

        analyser.getByteFrequencyData(dataArray);

        // Calculer le niveau sonore moyen
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }

        const average = sum / bufferLength;
        const threshold = 20; // Seuil de détection (ajuster selon les besoins)
        const newIsSpeaking = average > threshold;

        // Si l'état a changé, envoyer une mise à jour avec un délai
        if (newIsSpeaking !== isSpeaking) {
          // Ajouter un délai pour éviter les changements trop rapides
          if (voiceActivityTimeout) {
            clearTimeout(voiceActivityTimeout);
          }

          voiceActivityTimeout = setTimeout(() => {
            if (newIsSpeaking !== isSpeaking) {
              isSpeaking = newIsSpeaking;
              this.emitVoiceActivity(isSpeaking);
            }
          }, 300);
        }
      }, 100); // Vérifier toutes les 100ms

      // Nettoyer lors de la destruction
      this.destroyRef.onDestroy(() => {
        if (this.voiceActivityDetectionInterval) {
          clearInterval(this.voiceActivityDetectionInterval);
        }
        if (voiceActivityTimeout) {
          clearTimeout(voiceActivityTimeout);
        }
      });
    } catch (error) {
      console.error('[APPEL VOCAL] Erreur lors de la configuration de la détection d\'activité vocale', error);
    }
  }

  private emitVoiceActivity(isSpeaking: boolean): void {
    const currentUserId = this.authService.currentUser()?.id;
    const callId = this.callId();

    if (currentUserId && callId) {
      // Mettre à jour l'état du participant local
      this.updateParticipantSpeakingState(currentUserId, isSpeaking);

      // Émettre l'événement pour la compatibilité avec le code existant
      this.voiceActivity.next({
        callId: parseInt(callId),
        userId: currentUserId,
        isSpeaking
      });

      // Envoyer l'état aux autres participants
      this.websocketService.emit('call:voice-activity', {
        callId,
        isSpeaking
      }, (response: any) => {
        if (!response || !response.success) {
          console.warn('[APPEL VOCAL] Erreur lors de l\'envoi de l\'activité vocale:', response?.error || 'Erreur inconnue');
        }
      });
    }
  }

  private addParticipant(userId: number, callId: number): void {
    if (!userId || isNaN(userId) || !callId || isNaN(callId)) {
      console.error('[APPEL VOCAL] ID utilisateur ou ID appel invalide', { userId, callId });
      return;
    }

    console.log(`[APPEL VOCAL] Ajout du participant ${userId} à l'appel ${callId}`);

    const currentParticipants = this.participantsList();

    // Vérifier si le participant existe déjà
    const existingParticipantIndex = currentParticipants.findIndex(p => p.user_id === userId);

    if (existingParticipantIndex === -1) {
      // Nouveau participant
      const newParticipant: CallParticipant = {
        user_id: userId,
        call_id: callId,
        joined_at: new Date().toISOString(),
        is_active: true,
        is_speaking: false,
        is_muted: false
      };

      this.participantsList.update(participants => [...participants, newParticipant]);
      this.callJoined.next(newParticipant);
      console.log(`[APPEL VOCAL] Participant ${userId} ajouté à l'appel ${callId}`);

      // Notifier les autres composants que la liste des participants a changé
      this.notifyParticipantsChanged();
    } else if (!currentParticipants[existingParticipantIndex].is_active) {
      // Participant existant mais inactif - le réactiver
      this.participantsList.update(participants => {
        return participants.map(p => {
          if (p.user_id === userId) {
            const updatedParticipant = {
              ...p,
              is_active: true,
              joined_at: new Date().toISOString(),
              left_at: undefined
            };
            this.callJoined.next(updatedParticipant);
            return updatedParticipant;
          }
          return p;
        });
      });
      console.log(`[APPEL VOCAL] Participant ${userId} réactivé dans l'appel ${callId}`);

      // Notifier les autres composants que la liste des participants a changé
      this.notifyParticipantsChanged();
    } else {
      console.log(`[APPEL VOCAL] Participant ${userId} déjà actif dans l'appel ${callId}`);
    }

    // Journaliser la liste complète des participants pour débogage
    console.log('[APPEL VOCAL] Liste des participants après ajout/mise à jour', {
      participants: this.participantsList().map(p => ({ userId: p.user_id, isActive: p.is_active }))
    });
  }

  /**
   * Notifie les autres composants que la liste des participants a changé
   * en forçant une mise à jour du signal
   */
  private notifyParticipantsChanged(): void {
    // Forçer une mise à jour du signal en créant une nouvelle référence
    this.participantsList.update(participants => [...participants]);
  }

  private removeParticipant(userId: number): void {
    const currentParticipants = this.participantsList();
    const participant = currentParticipants.find(p => p.user_id === userId);

    if (participant) {
      console.log(`[APPEL VOCAL] Suppression du participant ${userId}`);

      // Mettre à jour l'état du participant
      const updatedParticipant = {
        ...participant,
        is_active: false,
        left_at: new Date().toISOString()
      };

      // Mettre à jour la liste des participants
      this.participantsList.update(participants =>
        participants.map(p => p.user_id === userId ? updatedParticipant : p)
      );

      this.callLeft.next(updatedParticipant);

      // Nettoyer la connexion
      this.closePeerConnection(userId);

      // Notifier les autres composants que la liste des participants a changé
      this.notifyParticipantsChanged();

      // Journaliser la liste complète des participants pour débogage
      console.log('[APPEL VOCAL] Liste des participants après suppression', {
        participants: this.participantsList().map(p => ({ userId: p.user_id, isActive: p.is_active }))
      });
    } else {
      console.log(`[APPEL VOCAL] Tentative de suppression d'un participant inexistant: ${userId}`);
    }
  }

  /**
   * Ajoute ou met à jour le flux audio d'un participant
   * @param userId ID de l'utilisateur
   * @param stream Flux audio
   */
  private updateParticipantStream(userId: number, stream: MediaStream): void {
    this.participantsList.update(participants =>
      participants.map(p =>
        p.user_id === userId
          ? { ...p, stream }
          : p
      )
    );
  }

  /**
   * Met à jour l'état de parole d'un participant
   * @param userId ID de l'utilisateur
   * @param isSpeaking true si l'utilisateur parle
   */
  private updateParticipantSpeakingState(userId: number, isSpeaking: boolean): void {
    this.participantsList.update(participants =>
      participants.map(p =>
        p.user_id === userId
          ? { ...p, is_speaking: isSpeaking }
          : p
      )
    );
  }

  /**
   * Ferme une connexion peer
   * @param userId ID de l'utilisateur
   */
  private closePeerConnection(userId: number): void {
    const connections = this.peerConnectionsMap();
    const peerConnection = connections.get(userId);

    if (peerConnection) {
      peerConnection.close();

      this.peerConnectionsMap.update(connections => {
        const newConnections = new Map(connections);
        newConnections.delete(userId);
        return newConnections;
      });

      console.log(`[APPEL VOCAL] Connexion avec l'utilisateur ${userId} fermée`);
    }
  }

  private handleCallEnded(): void {
    // Nettoyer toutes les ressources
    this.cleanupAudioResources();

    // Fermer toutes les connexions peer
    const connections = this.peerConnectionsMap();
    connections.forEach((connection, userId) => {
      this.closePeerConnection(userId);
    });

    // Réinitialiser l'état
    this.callId.set(null);
    this.documentId.set(null);
    this.participantsList.set([]);
    this.connectionState.set('disconnected');

    console.log('[APPEL VOCAL] Appel terminé, ressources nettoyées');
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
    const stream = this.localStream();
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      this.localStream.set(null);
    }

    // Réinitialiser l'état du micro
    this.isMuted.set(false);
  }
}
