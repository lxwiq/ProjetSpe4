import { Injectable, DestroyRef, inject, effect, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, Subject, fromEvent, interval } from 'rxjs';
import { io, Socket } from 'socket.io-client';

import { environment } from '../../../environments/environment';
import { TokenService } from './token.service';
import { AuthService } from './auth.service';
import { TokenRefreshService } from './token-refresh.service';

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
  private messageReceived = new Subject<any>();

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private tokenRefreshService: TokenRefreshService
  ) {
    // Utiliser effect() pour réagir aux changements du signal isAuthenticated
    effect(() => {
      const isAuthenticated = this.authService.isAuthenticated();
      console.log('WebsocketService: État d\'authentification changé:', isAuthenticated);

      if (isAuthenticated) {
        this.connect();
      } else {
        this.disconnect();
      }
    });

    // Écouter l'événement de rafraîchissement des tokens
    document.addEventListener('tokens-refreshed', (event: any) => {
      console.log('WebsocketService: Tokens rafraîchis, reconnexion du WebSocket');
      this.reconnectWithNewToken(event.detail?.accessToken);
    });

    // Vérifier périodiquement la connexion WebSocket
    interval(30000) // Vérifier toutes les 30 secondes
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        if (this.authService.isAuthenticated() && !this.isConnected()) {
          console.log('WebsocketService: Connexion WebSocket perdue, tentative de reconnexion');
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
      console.error('WebsocketService: Pas de token disponible pour la connexion WebSocket');
      return;
    }

    console.log('WebsocketService: Tentative de connexion au serveur WebSocket');

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
      console.error('WebsocketService: Erreur lors de la création du socket', error);
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
    console.log('WebsocketService: Reconnexion avec un nouveau token');

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
      console.log(`WebsocketService: Planification de la reconnexion dans ${this.reconnectInterval / 1000} secondes (tentative ${this.reconnectAttempts + 1}/${this.maxReconnectAttempts})`);

      this.reconnectTimer = setTimeout(() => {
        this.reconnect();
      }, this.reconnectInterval);

      // Augmenter l'intervalle pour la prochaine tentative (backoff exponentiel)
      this.reconnectInterval = Math.min(this.reconnectInterval * 1.5, 60000); // Max 1 minute
    } else {
      console.error('WebsocketService: Nombre maximum de tentatives de reconnexion atteint');

      // Essayer de rafraîchir le token
      this.tokenRefreshService.refreshToken().subscribe({
        next: () => {
          console.log('WebsocketService: Token rafraîchi, réinitialisation des tentatives de reconnexion');
          this.reconnectAttempts = 0;
          this.reconnectInterval = 5000;
          this.scheduleReconnect();
        },
        error: (error) => {
          console.error('WebsocketService: Échec du rafraîchissement du token', error);
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
    console.log(`WebsocketService: Tentative de reconnexion ${this.reconnectAttempts}/${this.maxReconnectAttempts}`);

    this.connect();

    if (!this.connected()) {
      this.scheduleReconnect();
    } else {
      console.log('WebsocketService: Reconnexion réussie');
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
      console.log(`WebsocketService: Rejeu de ${this.pendingEmits.length} émissions en attente`);

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
      console.log('WebsocketService: Déconnexion du serveur WebSocket');
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
      console.log('WebsocketService: Connecté au serveur WebSocket');
      this.connected.set(true);
      this.connectionStatus.next(true);
      this.reconnectAttempts = 0;
      this.reconnectInterval = 5000;

      // Rejouer les émissions en attente
      this.replayPendingEmits();
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebsocketService: Erreur de connexion WebSocket', error);
      this.connected.set(false);
      this.connectionStatus.next(false);

      // Vérifier si l'erreur est liée à l'authentification
      if (error.message && error.message.includes('Authentication error')) {
        console.log('WebsocketService: Erreur d\'authentification, tentative de rafraîchissement du token');

        this.tokenRefreshService.refreshToken().subscribe({
          next: () => {
            console.log('WebsocketService: Token rafraîchi, tentative de reconnexion');
            setTimeout(() => this.reconnect(), 1000);
          },
          error: (refreshError) => {
            console.error('WebsocketService: Échec du rafraîchissement du token', refreshError);
            this.scheduleReconnect();
          }
        });
      } else {
        this.scheduleReconnect();
      }
    });

    this.socket.on('disconnect', (reason) => {
      console.log('WebsocketService: Déconnecté du serveur WebSocket', reason);
      this.connected.set(false);
      this.connectionStatus.next(false);

      // Si la déconnexion est due à une erreur, tenter de se reconnecter
      if (reason === 'io server disconnect' || reason === 'transport close' || reason === 'ping timeout') {
        console.log('WebsocketService: Déconnexion due à une erreur, tentative de reconnexion');
        this.scheduleReconnect();
      }
    });

    // Événements de notification
    this.socket.on('notification:received', (data) => {
      console.log('WebsocketService: Notification reçue', data);
      this.notificationReceived.next(data.notification);
    });

    this.socket.on('notification:pending', (data) => {
      console.log('WebsocketService: Notifications en attente reçues', data);
      this.pendingNotifications.next(data.notifications);
    });

    // Événements de document
    this.socket.on('document:user-joined', (data) => {
      console.log('WebsocketService: Utilisateur a rejoint le document', data);
      this.documentUserJoined.next(data);
    });

    this.socket.on('document:user-left', (data) => {
      console.log('WebsocketService: Utilisateur a quitté le document', data);
      this.documentUserLeft.next(data);
    });

    this.socket.on('document:content-changed', (data) => {
      console.log('WebsocketService: Contenu du document modifié', data);
      this.documentContentChanged.next(data);
    });

    this.socket.on('document:saved', (data) => {
      console.log('WebsocketService: Document sauvegardé', data);
      this.documentSaved.next(data);
    });

    this.socket.on('document:invitation', (data) => {
      console.log('WebsocketService: Invitation à un document reçue', data);
      this.documentInvitation.next(data);
    });

    // Événements d'appel
    this.socket.on('call:started', (data) => {
      console.log('WebsocketService: Appel démarré', data);
      this.callStarted.next(data);
    });

    this.socket.on('call:ended', (data) => {
      console.log('WebsocketService: Appel terminé', data);
      this.callEnded.next(data);
    });

    this.socket.on('call:joined', (data) => {
      console.log('WebsocketService: Utilisateur a rejoint l\'appel', data);
      this.callJoined.next(data);
    });

    this.socket.on('call:left', (data) => {
      console.log('WebsocketService: Utilisateur a quitté l\'appel', data);
      this.callLeft.next(data);
    });

    this.socket.on('call:signal', (data) => {
      console.log('WebsocketService: Signal d\'appel reçu', data);
      this.callSignal.next(data);
    });

    // Événements de messagerie
    this.socket.on('message:received', (data) => {
      console.log('WebsocketService: Message reçu', data);
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
      console.warn(`WebsocketService: Impossible d'émettre l'événement ${event}, socket non connecté. Mise en file d'attente.`);

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
          console.warn('WebsocketService: Erreur d\'authentification lors de l\'émission, tentative de rafraîchissement du token');

          // Stocker l'émission pour la rejouer après le rafraîchissement du token
          this.pendingEmits.push({event, data, callback});

          // Rafraîchir le token
          this.tokenRefreshService.refreshToken().subscribe();
        } else if (callback) {
          callback(response);
        }
      });
    } catch (error) {
      console.error(`WebsocketService: Erreur lors de l'émission de l'événement ${event}`, error);

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

  onMessageReceived(): Observable<any> {
    return this.messageReceived.asObservable();
  }
}
