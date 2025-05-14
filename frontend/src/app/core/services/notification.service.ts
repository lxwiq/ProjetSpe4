import { Injectable, signal, DestroyRef, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { environment } from '../../../environments/environment';
import {
  Notification,
  NotificationsResponse,
  MarkAsReadResponse
} from '../models/notification.model';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly API_URL = environment.apiUrl;

  // Signaux pour les notifications et le compteur
  notifications = signal<Notification[]>([]);
  unreadCount = signal<number>(0);

  private destroyRef = inject(DestroyRef);
  private websocketInitialized = false;

  constructor(
    private http: HttpClient,
    private websocketService: WebsocketService
  ) {
    // Initialiser les notifications au démarrage du service
    this.loadNotifications();

    // Initialiser les écouteurs WebSocket
    this.initWebsocketListeners();
  }

  /**
   * Initialise les écouteurs d'événements WebSocket
   */
  private initWebsocketListeners(): void {
    if (this.websocketInitialized) {
      return;
    }

    // Écouter les nouvelles notifications
    this.websocketService.onNotificationReceived()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(notification => {
        console.log('NotificationService: Nouvelle notification reçue via WebSocket', notification);
        this.addNotification(notification);
      });

    // Écouter les notifications en attente
    this.websocketService.onPendingNotifications()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(notifications => {
        console.log('NotificationService: Notifications en attente reçues via WebSocket', notifications);
        this.addNotifications(notifications);
      });

    this.websocketInitialized = true;
  }

  /**
   * Ajoute une notification à la liste
   * @param notification Notification à ajouter
   */
  private addNotification(notification: Notification): void {
    const currentNotifications = this.notifications();

    // Vérifier si la notification existe déjà
    const exists = currentNotifications.some(n => n.id === notification.id);
    if (!exists) {
      // Ajouter la notification au début de la liste
      this.notifications.set([notification, ...currentNotifications]);
      this.updateUnreadCount();
    }
  }

  /**
   * Ajoute plusieurs notifications à la liste
   * @param notifications Notifications à ajouter
   */
  private addNotifications(notifications: Notification[]): void {
    if (!notifications || notifications.length === 0) {
      return;
    }

    const currentNotifications = this.notifications();
    const currentIds = new Set(currentNotifications.map(n => n.id));

    // Filtrer les notifications qui n'existent pas déjà
    const newNotifications = notifications.filter(n => !currentIds.has(n.id));

    if (newNotifications.length > 0) {
      // Ajouter les nouvelles notifications au début de la liste
      this.notifications.set([...newNotifications, ...currentNotifications]);
      this.updateUnreadCount();
    }
  }

  /**
   * Charge les notifications de l'utilisateur
   */
  loadNotifications(limit: number = 10): void {
    this.getNotifications(limit).subscribe({
      next: (notifications) => {
        this.notifications.set(notifications);
        this.updateUnreadCount();
      },
      error: (error) => {
        console.error('Erreur lors du chargement des notifications:', error);
      }
    });
  }

  /**
   * Récupère les notifications de l'utilisateur
   * @param limit Nombre maximum de notifications à récupérer
   * @param offset Offset pour la pagination
   * @param unreadOnly Récupérer uniquement les notifications non lues
   * @returns Observable avec la liste des notifications
   */
  getNotifications(limit: number = 10, offset: number = 0, unreadOnly: boolean = false): Observable<Notification[]> {
    const params = {
      limit: limit.toString(),
      offset: offset.toString(),
      unreadOnly: unreadOnly.toString()
    };

    return this.http.get<NotificationsResponse>(`${this.API_URL}/notifications`, { params, withCredentials: true })
      .pipe(
        map(response => response.data || []),
        catchError(error => {
          console.error('Erreur lors de la récupération des notifications:', error);
          return of([]);
        })
      );
  }

  /**
   * Marque une notification comme lue
   * @param notificationId ID de la notification
   * @returns Observable avec la notification mise à jour
   */
  markAsRead(notificationId: number): Observable<Notification> {
    return this.http.put<{ message: string, data: Notification }>(
      `${this.API_URL}/notifications/${notificationId}/read`,
      {},
      { withCredentials: true }
    ).pipe(
      map(response => response.data),
      tap(notification => {
        // Mettre à jour la liste des notifications
        const currentNotifications = this.notifications();
        const updatedNotifications = currentNotifications.map(n =>
          n.id === notificationId ? { ...n, is_read: true, read_at: new Date().toISOString() } : n
        );
        this.notifications.set(updatedNotifications);
        this.updateUnreadCount();

        // Informer le serveur WebSocket que la notification a été lue
        this.websocketService.emit('notification:mark-read', { notificationId });
      }),
      catchError(error => {
        console.error(`Erreur lors du marquage de la notification ${notificationId} comme lue:`, error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Marque toutes les notifications comme lues
   * @returns Observable avec le nombre de notifications marquées comme lues
   */
  markAllAsRead(): Observable<number> {
    return this.http.put<MarkAsReadResponse>(
      `${this.API_URL}/notifications/read-all`,
      {},
      { withCredentials: true }
    ).pipe(
      map(response => response.data.count),
      tap(count => {
        // Mettre à jour la liste des notifications
        const currentNotifications = this.notifications();
        const updatedNotifications = currentNotifications.map(n =>
          !n.is_read ? { ...n, is_read: true, read_at: new Date().toISOString() } : n
        );
        this.notifications.set(updatedNotifications);
        this.unreadCount.set(0);
      }),
      catchError(error => {
        console.error('Erreur lors du marquage de toutes les notifications comme lues:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Met à jour le compteur de notifications non lues
   */
  private updateUnreadCount(): void {
    const count = this.notifications().filter(n => !n.is_read).length;
    this.unreadCount.set(count);
  }

  /**
   * Récupère le titre et le contenu formatés d'une notification
   * @param notification Notification à formater
   * @returns Objet contenant le titre et le contenu formatés
   */
  getFormattedNotification(notification: Notification): { title: string, content: string, url: string } {
    let title = '';
    let content = '';
    let url = '';

    switch (notification.type) {
      case 'new_message':
        const messageContent = notification.content as any;
        title = `Nouveau message de ${messageContent.senderName}`;
        content = messageContent.preview;
        url = `/messages/conversations/${messageContent.conversationId}`;
        break;
      case 'document_invite':
        const inviteContent = notification.content as any;
        title = `Invitation à collaborer`;
        content = `${inviteContent.inviterName} vous a invité à collaborer sur "${inviteContent.documentTitle}"`;
        url = `/documents/${inviteContent.documentId}`;
        break;
      case 'document_update':
        const updateContent = notification.content as any;
        title = `Mise à jour de document`;
        content = `${updateContent.updaterName} a ${this.getUpdateTypeText(updateContent.updateType)} "${updateContent.documentTitle}"`;
        url = `/documents/${updateContent.documentId}`;
        break;
      case 'conversation_invite':
        const convInviteContent = notification.content as any;
        title = `Invitation à une conversation`;
        content = `Vous avez été ajouté à la conversation "${convInviteContent.conversationName}"`;
        url = `/messages/conversations/${convInviteContent.conversationId}`;
        break;
      case 'incoming_call':
        const callContent = notification.content as any;
        title = `Appel entrant`;
        content = `Appel concernant le document "${callContent.documentTitle}"`;
        url = `/documents/${callContent.documentId}/call/${callContent.callId}`;
        break;
      case 'system':
        const systemContent = notification.content as any;
        title = systemContent.title;
        content = systemContent.message;
        url = systemContent.actionUrl || '/dashboard';
        break;
      default:
        title = 'Notification';
        content = 'Vous avez reçu une notification';
        url = '/dashboard';
    }

    return { title, content, url };
  }

  /**
   * Obtient le texte correspondant au type de mise à jour
   * @param updateType Type de mise à jour
   * @returns Texte correspondant
   */
  private getUpdateTypeText(updateType: string): string {
    switch (updateType) {
      case 'edit': return 'modifié';
      case 'comment': return 'commenté';
      case 'share': return 'partagé';
      default: return 'mis à jour';
    }
  }
}
