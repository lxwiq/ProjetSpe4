import { Injectable, DestroyRef, inject, effect } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, Subject, fromEvent } from 'rxjs';
import { io, Socket } from 'socket.io-client';

import { environment } from '../../../environments/environment';
import { TokenService } from './token.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: Socket | null = null;
  private connected = false;
  private destroyRef = inject(DestroyRef);

  // Sujets pour les événements WebSocket
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
    private authService: AuthService
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
  }

  /**
   * Connecte le socket au serveur
   */
  connect(): void {
    if (this.connected) {
      return;
    }

    const token = this.tokenService.getAccessToken();
    if (!token) {
      console.error('WebsocketService: Pas de token disponible pour la connexion WebSocket');
      return;
    }

    console.log('WebsocketService: Tentative de connexion au serveur WebSocket');

    this.socket = io(environment.apiUrl, {
      auth: { token },
      withCredentials: true
    });

    this.setupSocketEvents();
    this.connected = true;
  }

  /**
   * Déconnecte le socket du serveur
   */
  disconnect(): void {
    if (this.socket) {
      console.log('WebsocketService: Déconnexion du serveur WebSocket');
      this.socket.disconnect();
      this.socket = null;
      this.connected = false;
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
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebsocketService: Erreur de connexion WebSocket', error);
      this.connected = false;
    });

    this.socket.on('disconnect', (reason) => {
      console.log('WebsocketService: Déconnecté du serveur WebSocket', reason);
      this.connected = false;
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
    if (!this.socket || !this.connected) {
      console.error(`WebsocketService: Impossible d'émettre l'événement ${event}, socket non connecté`);
      return;
    }

    this.socket.emit(event, data, callback);
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
