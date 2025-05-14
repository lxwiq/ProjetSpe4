import { Injectable, DestroyRef, inject, effect, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, Subject, fromEvent, interval } from 'rxjs';
import { io, Socket } from 'socket.io-client';

import { environment } from '../../../environments/environment';
import { TokenService } from './token.service';
import { AuthService } from './auth.service';
import { TokenRefreshService } from './token-refresh.service';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: Socket | null = null;
  private connected = signal<boolean>(false);
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectInterval = 5000; // 5 secondes
  private reconnectTimer: any = null;
  private destroyRef = inject(DestroyRef);
  private pendingEmits: Array<{event: string, data: any, callback?: (response: any) => void}> = [];

  // Sujets pour les événements WebSocket
  private connectionStatus = new Subject<boolean>();
  private notificationReceived = new Subject<any>();
  private pendingNotifications = new Subject<any[]>();
  private documentUserJoined = new Subject<any>();
  private documentUserLeft = new Subject<any>();
  private documentContentChanged = new Subject<any>();
  private documentSaved = new Subject<any>();
  private documentInvitation = new Subject<any>();
  private callStarted = new Subject<any>();
  private callEnded = new Subject<any>();
  private callJoined = new Subject<any>();
  private callLeft = new Subject<any>();
  private callSignal = new Subject<any>();
  private callVoiceActivity = new Subject<any>();
  private messageReceived = new Subject<any>();

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private tokenRefreshService: TokenRefreshService,
    private logger: LoggingService
  ) {
    // Utiliser effect() pour réagir aux changements du signal isAuthenticated
    effect(() => {
      const isAuthenticated = this.authService.isAuthenticated();
      this.logger.info('État d\'authentification changé', {
        service: 'WebsocketService',
        isAuthenticated
      });

      if (isAuthenticated) {
        this.connect();
      } else {
        this.disconnect();
      }
    });

    // Écouter l'événement de rafraîchissement des tokens
    document.addEventListener('tokens-refreshed', (event: any) => {
      this.logger.info('Tokens rafraîchis, reconnexion du WebSocket', {
        service: 'WebsocketService'
      });
      this.reconnectWithNewToken(event.detail?.accessToken);
    });

    // Vérifier périodiquement la connexion WebSocket
    interval(30000) // Vérifier toutes les 30 secondes
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        if (this.authService.isAuthenticated() && !this.isConnected()) {
          this.logger.info('Connexion WebSocket perdue, tentative de reconnexion', {
            service: 'WebsocketService'
          });
          this.reconnect();
        }
      });
  }

  /**
   * Vérifie si le socket est connecté
   * @returns true si le socket est connecté
   */
  isConnected(): boolean {
    return this.connected() && this.socket?.connected === true;
  }

  /**
   * Obtient un observable sur l'état de la connexion
   * @returns Observable qui émet true quand connecté, false quand déconnecté
   */
  onConnectionStatus(): Observable<boolean> {
    return this.connectionStatus.asObservable();
  }

  /**
   * Connecte le socket au serveur
   */
  connect(): void {
    if (this.connected()) {
      return;
    }

    const token = this.tokenService.getAccessToken();
    if (!token) {
      this.logger.error('Pas de token disponible pour la connexion WebSocket', {
        service: 'WebsocketService'
      });
      return;
    }

    this.logger.info('Tentative de connexion au serveur WebSocket', {
      service: 'WebsocketService'
    });

    try {
      this.socket = io(environment.apiUrl, {
        auth: { token },
        withCredentials: true,
        reconnection: true,
        reconnectionAttempts: 3,
        reconnectionDelay: 1000,
        timeout: 10000
      });

      this.setupSocketEvents();
      this.connected.set(true);
      this.connectionStatus.next(true);
      this.reconnectAttempts = 0;
    } catch (error) {
      this.logger.error('Erreur lors de la création du socket', {
        service: 'WebsocketService',
        error
      });
      this.connected.set(false);
      this.connectionStatus.next(false);
      this.scheduleReconnect();
    }
  }

  /**
   * Reconnecte le socket avec un nouveau token
   * @param newToken Nouveau token d'accès
   */
  private reconnectWithNewToken(newToken?: string): void {
    this.logger.info('Reconnexion avec un nouveau token', {
      service: 'WebsocketService'
    });

    // Déconnecter d'abord
    this.disconnect();

    // Attendre un peu avant de se reconnecter
    setTimeout(() => {
      this.connect();

      // Rejouer les émissions en attente
      this.replayPendingEmits();
    }, 500);
  }

  /**
   * Planifie une tentative de reconnexion
   */
  private scheduleReconnect(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }

    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.logger.info(`Planification de la reconnexion dans ${this.reconnectInterval / 1000} secondes (tentative ${this.reconnectAttempts + 1}/${this.maxReconnectAttempts})`, {
        service: 'WebsocketService',
        reconnectAttempts: this.reconnectAttempts,
        maxReconnectAttempts: this.maxReconnectAttempts,
        reconnectInterval: this.reconnectInterval
      });

      this.reconnectTimer = setTimeout(() => {
        this.reconnect();
      }, this.reconnectInterval);

      // Augmenter l'intervalle pour la prochaine tentative (backoff exponentiel)
      this.reconnectInterval = Math.min(this.reconnectInterval * 1.5, 60000); // Max 1 minute
    } else {
      this.logger.error('Nombre maximum de tentatives de reconnexion atteint', {
        service: 'WebsocketService',
        reconnectAttempts: this.reconnectAttempts
      });

      // Essayer de rafraîchir le token
      this.tokenRefreshService.refreshToken().subscribe({
        next: () => {
          this.logger.info('Token rafraîchi, réinitialisation des tentatives de reconnexion', {
            service: 'WebsocketService'
          });
          this.reconnectAttempts = 0;
          this.reconnectInterval = 5000;
          this.scheduleReconnect();
        },
        error: (error) => {
          this.logger.error('Échec du rafraîchissement du token', {
            service: 'WebsocketService',
            error
          });
        }
      });
    }
  }

  /**
   * Tente de reconnecter le socket
   */
  private reconnect(): void {
    if (this.connected() || !this.authService.isAuthenticated()) {
      return;
    }

    this.reconnectAttempts++;
    this.logger.info(`Tentative de reconnexion ${this.reconnectAttempts}/${this.maxReconnectAttempts}`, {
      service: 'WebsocketService',
      reconnectAttempts: this.reconnectAttempts,
      maxReconnectAttempts: this.maxReconnectAttempts
    });

    this.connect();

    if (!this.connected()) {
      this.scheduleReconnect();
    } else {
      this.logger.info('Reconnexion réussie', {
        service: 'WebsocketService'
      });
      this.reconnectAttempts = 0;
      this.reconnectInterval = 5000;

      // Rejouer les émissions en attente
      this.replayPendingEmits();
    }
  }

  /**
   * Rejoue les émissions en attente
   */
  private replayPendingEmits(): void {
    if (this.pendingEmits.length > 0) {
      this.logger.info(`Rejeu de ${this.pendingEmits.length} émissions en attente`, {
        service: 'WebsocketService',
        pendingEmitsCount: this.pendingEmits.length
      });

      const emits = [...this.pendingEmits];
      this.pendingEmits = [];

      emits.forEach(({event, data, callback}) => {
        this.emit(event, data, callback);
      });
    }
  }

  /**
   * Déconnecte le socket du serveur
   */
  disconnect(): void {
    if (this.socket) {
      this.logger.info('Déconnexion du serveur WebSocket', {
        service: 'WebsocketService'
      });
      this.socket.disconnect();
      this.socket = null;
      this.connected.set(false);
      this.connectionStatus.next(false);
    }

    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }

  /**
   * Configure les événements du socket
   */
  private setupSocketEvents(): void {
    if (!this.socket) {
      return;
    }

    // Événements de connexion
    this.socket.on('connect', () => {
      this.logger.info('Connecté au serveur WebSocket', {
        service: 'WebsocketService'
      });
      this.connected.set(true);
      this.connectionStatus.next(true);
      this.reconnectAttempts = 0;
      this.reconnectInterval = 5000;

      // Rejouer les émissions en attente
      this.replayPendingEmits();
    });

    this.socket.on('connect_error', (error) => {
      this.logger.error('Erreur de connexion WebSocket', {
        service: 'WebsocketService',
        error
      });
      this.connected.set(false);
      this.connectionStatus.next(false);

      // Vérifier si l'erreur est liée à l'authentification
      if (error.message && error.message.includes('Authentication error')) {
        this.logger.info('Erreur d\'authentification, tentative de rafraîchissement du token', {
          service: 'WebsocketService'
        });

        this.tokenRefreshService.refreshToken().subscribe({
          next: () => {
            this.logger.info('Token rafraîchi, tentative de reconnexion', {
              service: 'WebsocketService'
            });
            setTimeout(() => this.reconnect(), 1000);
          },
          error: (refreshError) => {
            this.logger.error('Échec du rafraîchissement du token', {
              service: 'WebsocketService',
              error: refreshError
            });
            this.scheduleReconnect();
          }
        });
      } else {
        this.scheduleReconnect();
      }
    });

    this.socket.on('disconnect', (reason) => {
      this.logger.info('Déconnecté du serveur WebSocket', {
        service: 'WebsocketService',
        reason
      });
      this.connected.set(false);
      this.connectionStatus.next(false);

      // Si la déconnexion est due à une erreur, tenter de se reconnecter
      if (reason === 'io server disconnect' || reason === 'transport close' || reason === 'ping timeout') {
        this.logger.info('Déconnexion due à une erreur, tentative de reconnexion', {
          service: 'WebsocketService',
          reason
        });
        this.scheduleReconnect();
      }
    });

    // Événements de notification
    this.socket.on('notification:received', (data) => {
      this.logger.debug('Notification reçue', {
        service: 'WebsocketService',
        notification: data.notification
      });
      this.notificationReceived.next(data.notification);
    });

    this.socket.on('notification:pending', (data) => {
      this.logger.debug('Notifications en attente reçues', {
        service: 'WebsocketService',
        count: data.notifications?.length
      });
      this.pendingNotifications.next(data.notifications);
    });

    // Événements de document
    this.socket.on('document:user-joined', (data) => {
      this.logger.debug('Utilisateur a rejoint le document', {
        service: 'WebsocketService',
        documentId: data.documentId,
        userId: data.userId
      });
      this.documentUserJoined.next(data);
    });

    this.socket.on('document:user-left', (data) => {
      this.logger.debug('Utilisateur a quitté le document', {
        service: 'WebsocketService',
        documentId: data.documentId,
        userId: data.userId
      });
      this.documentUserLeft.next(data);
    });

    this.socket.on('document:content-changed', (data) => {
      this.logger.debug('Contenu du document modifié', {
        service: 'WebsocketService',
        documentId: data.documentId
      });
      this.documentContentChanged.next(data);
    });

    this.socket.on('document:saved', (data) => {
      this.logger.debug('Document sauvegardé', {
        service: 'WebsocketService',
        documentId: data.documentId
      });
      this.documentSaved.next(data);
    });

    this.socket.on('document:invitation', (data) => {
      this.logger.debug('Invitation à un document reçue', {
        service: 'WebsocketService',
        documentId: data.documentId
      });
      this.documentInvitation.next(data);
    });

    // Événements d'appel
    this.socket.on('call:started', (data) => {
      this.logger.debug('Appel démarré', {
        service: 'WebsocketService',
        callId: data.callId
      });
      this.callStarted.next(data);
    });

    this.socket.on('call:ended', (data) => {
      this.logger.debug('Appel terminé', {
        service: 'WebsocketService',
        callId: data.callId
      });
      this.callEnded.next(data);
    });

    this.socket.on('call:joined', (data) => {
      this.logger.debug('Utilisateur a rejoint l\'appel', {
        service: 'WebsocketService',
        callId: data.callId,
        userId: data.userId
      });
      this.callJoined.next(data);
    });

    this.socket.on('call:left', (data) => {
      this.logger.debug('Utilisateur a quitté l\'appel', {
        service: 'WebsocketService',
        callId: data.callId,
        userId: data.userId
      });
      this.callLeft.next(data);
    });

    this.socket.on('call:signal', (data) => {
      this.logger.debug('Signal d\'appel reçu', {
        service: 'WebsocketService',
        callId: data.callId,
        fromUserId: data.fromUserId
      });
      this.callSignal.next(data);
    });

    this.socket.on('call:voice-activity', (data) => {
      this.logger.debug('Activité vocale détectée', {
        service: 'WebsocketService',
        callId: data.callId,
        userId: data.userId
      });
      this.callVoiceActivity.next(data);
    });

    // Événements de messagerie
    this.socket.on('message:received', (data) => {
      this.logger.debug('Message reçu', {
        service: 'WebsocketService',
        conversationId: data.conversationId
      });
      this.messageReceived.next(data);
    });
  }

  /**
   * Émet un événement au serveur
   * @param event Nom de l'événement
   * @param data Données à envoyer
   * @param callback Fonction de rappel (optionnelle)
   */
  emit(event: string, data: any, callback?: (response: any) => void): void {
    if (!this.socket || !this.isConnected()) {
      this.logger.warn(`Impossible d'émettre l'événement ${event}, socket non connecté. Mise en file d'attente.`, {
        service: 'WebsocketService',
        event
      });

      // Stocker l'émission pour la rejouer plus tard
      this.pendingEmits.push({event, data, callback});

      // Tenter de se reconnecter
      this.reconnect();
      return;
    }

    try {
      this.socket.emit(event, data, (response: any) => {
        // Vérifier si la réponse indique une erreur d'authentification
        if (response && response.error &&
            (response.error.includes('Authentication') || response.error.includes('token'))) {
          this.logger.warn('Erreur d\'authentification lors de l\'émission, tentative de rafraîchissement du token', {
            service: 'WebsocketService',
            event,
            error: response.error
          });

          // Stocker l'émission pour la rejouer après le rafraîchissement du token
          this.pendingEmits.push({event, data, callback});

          // Rafraîchir le token
          this.tokenRefreshService.refreshToken().subscribe();
        } else if (callback) {
          callback(response);
        }
      });
    } catch (error) {
      this.logger.error(`Erreur lors de l'émission de l'événement ${event}`, {
        service: 'WebsocketService',
        event,
        error
      });

      // Stocker l'émission pour la rejouer plus tard
      this.pendingEmits.push({event, data, callback});

      // Tenter de se reconnecter
      this.reconnect();
    }
  }

  // Observables pour les événements WebSocket
  onNotificationReceived(): Observable<any> {
    return this.notificationReceived.asObservable();
  }

  onPendingNotifications(): Observable<any[]> {
    return this.pendingNotifications.asObservable();
  }

  onDocumentUserJoined(): Observable<any> {
    return this.documentUserJoined.asObservable();
  }

  onDocumentUserLeft(): Observable<any> {
    return this.documentUserLeft.asObservable();
  }

  onDocumentContentChanged(): Observable<any> {
    return this.documentContentChanged.asObservable();
  }

  onDocumentSaved(): Observable<any> {
    return this.documentSaved.asObservable();
  }

  onDocumentInvitation(): Observable<any> {
    return this.documentInvitation.asObservable();
  }

  onCallStarted(): Observable<any> {
    return this.callStarted.asObservable();
  }

  onCallEnded(): Observable<any> {
    return this.callEnded.asObservable();
  }

  onCallJoined(): Observable<any> {
    return this.callJoined.asObservable();
  }

  onCallLeft(): Observable<any> {
    return this.callLeft.asObservable();
  }

  onCallSignal(): Observable<any> {
    return this.callSignal.asObservable();
  }

  onCallVoiceActivity(): Observable<any> {
    return this.callVoiceActivity.asObservable();
  }

  onMessageReceived(): Observable<any> {
    return this.messageReceived.asObservable();
  }
}
