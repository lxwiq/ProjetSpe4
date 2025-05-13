import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { AuthService } from './auth.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket | null = null;
  private connectedSubject = new BehaviorSubject<boolean>(false);
  
  // Observable pour l'état de connexion
  public connected$ = this.connectedSubject.asObservable();

  constructor(private authService: AuthService) {
    // Initialiser la connexion si l'utilisateur est déjà connecté
    if (this.authService.isLoggedIn()) {
      this.connect();
    }
    
    // S'abonner aux changements d'état d'authentification
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.connect();
      } else {
        this.disconnect();
      }
    });
  }

  /**
   * Connecte au serveur WebSocket
   */
  private connect(): void {
    if (this.socket) {
      this.disconnect();
    }

    // Options de connexion avec gestion des erreurs et reconnexion automatique
    this.socket = io('http://localhost:3000', {
      auth: {
        token: this.authService.getToken()
      },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 20000
    });
    
    // Gestionnaires d'événements pour le débogage
    this.socket.on('connect', () => {
      console.log('Socket.io connected successfully');
      this.connectedSubject.next(true);
    });
    
    this.socket.on('connect_error', (error) => {
      console.error('Socket.io connection error:', error);
      this.connectedSubject.next(false);
    });
    
    this.socket.on('disconnect', (reason) => {
      console.log('Socket.io disconnected:', reason);
      this.connectedSubject.next(false);
    });
  }

  /**
   * Déconnecte du serveur WebSocket
   */
  private disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.connectedSubject.next(false);
    }
  }

  /**
   * Retourne l'instance de socket
   */
  getSocket(): Socket | null {
    return this.socket;
  }

  /**
   * Écoute un événement
   * @param eventName Nom de l'événement
   * @returns Observable qui émet les données de l'événement
   */
  on<T>(eventName: string): Observable<T> {
    return new Observable<T>(observer => {
      if (!this.socket) {
        observer.error('Socket not connected');
        return;
      }
      
      this.socket.on(eventName, (data: T) => {
        observer.next(data);
      });
      
      return () => {
        if (this.socket) {
          this.socket.off(eventName);
        }
      };
    });
  }

  /**
   * Émet un événement
   * @param eventName Nom de l'événement
   * @param data Données à envoyer
   */
  emit(eventName: string, data: any): void {
    if (this.socket) {
      this.socket.emit(eventName, data);
    } else {
      console.error('Cannot emit event: socket not connected');
    }
  }

  /**
   * Émet un événement et attend une réponse
   * @param eventName Nom de l'événement
   * @param data Données à envoyer
   * @returns Promise qui résout avec la réponse
   */
  emitWithAck<T>(eventName: string, data: any): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      if (!this.socket) {
        reject('Socket not connected');
        return;
      }
      
      this.socket.emit(eventName, data, (response: any) => {
        if (response && response.success) {
          resolve(response.data);
        } else {
          reject(response?.error || 'Unknown error');
        }
      });
    });
  }

  /**
   * Rejoint une salle
   * @param room Nom de la salle
   */
  joinRoom(room: string): void {
    if (this.socket) {
      this.socket.emit('join', { room });
    }
  }

  /**
   * Quitte une salle
   * @param room Nom de la salle
   */
  leaveRoom(room: string): void {
    if (this.socket) {
      this.socket.emit('leave', { room });
    }
  }
}
