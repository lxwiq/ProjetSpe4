import { Injectable, signal, DestroyRef, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { environment } from '../../../environments/environment';
import {
  Notification,
  NotificationsResponse,
  MarkAsReadResponse
} from '../models/notification.model';
import { WebsocketService } from './websocket.service';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly API_URL = environment.apiUrl;

  // Signaux pour les notifications et le compteur
  notifications = signal<Notification[]>([]);
  unreadCount = signal<number>(0);

  // Signal pour les nouvelles notifications (pour les animations)
  newNotification = signal<Notification | null>(null);

  // Observable pour les nouvelles notifications (pour les composants qui veulent s'abonner)
  private newNotificationSubject = new Subject<Notification>();
  newNotificationReceived = this.newNotificationSubject.asObservable();

  private destroyRef = inject(DestroyRef);
  private websocketInitialized = false;
  private logger = inject(LoggingService);
  private notificationSound: HTMLAudioElement | null = null;

  constructor(
    private http: HttpClient,
    private websocketService: WebsocketService
  ) {
    // Initialiser le son de notification
    this.initNotificationSound();
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
   * Initialise le son de notification
   */
  private initNotificationSound(): void {
    try {
      this.notificationSound = new Audio('/assets/sounds/notification.mp3');
      this.notificationSound.volume = 0.5; // Volume à 50%
      this.logger.info('Son de notification initialisé', {
        service: 'NotificationService'
      });
    } catch (error) {
      this.logger.error('Erreur lors de l\'initialisation du son de notification', {
        service: 'NotificationService',
        error
      });
    }
  }

  /**
   * Joue le son de notification
   */
  private playNotificationSound(): void {
    if (this.notificationSound) {
      try {
        // Réinitialiser le son pour pouvoir le jouer plusieurs fois
        this.notificationSound.currentTime = 0;
        this.notificationSound.play().catch(error => {
          this.logger.error('Erreur lors de la lecture du son de notification', {
            service: 'NotificationService',
            error
          });
        });
      } catch (error) {
        this.logger.error('Erreur lors de la lecture du son de notification', {
          service: 'NotificationService',
          error
        });
      }
    }
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
      // S'assurer que le contenu est correctement parsé
      const processedNotification = this.ensureContentIsParsed(notification);

      // Ajouter la notification au début de la liste
      this.notifications.set([processedNotification, ...currentNotifications]);
      this.updateUnreadCount();

      // Signaler qu'une nouvelle notification a été reçue
      this.newNotification.set(processedNotification);
      this.newNotificationSubject.next(processedNotification);

      // Jouer le son de notification
      this.playNotificationSound();

      this.logger.info('Nouvelle notification reçue et traitée', {
        service: 'NotificationService',
        notificationId: processedNotification.id,
        notificationType: processedNotification.type
      });
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
    const newNotifications = notifications
      .filter(n => !currentIds.has(n.id))
      .map(n => this.ensureContentIsParsed(n)); // S'assurer que le contenu est correctement parsé

    if (newNotifications.length > 0) {
      // Ajouter les nouvelles notifications au début de la liste
      this.notifications.set([...newNotifications, ...currentNotifications]);
      this.updateUnreadCount();

      // Signaler la dernière notification reçue pour l'animation
      if (newNotifications.length > 0) {
        const latestNotification = newNotifications[0];
        this.newNotification.set(latestNotification);
        this.newNotificationSubject.next(latestNotification);

        // Jouer le son de notification (une seule fois même s'il y a plusieurs notifications)
        this.playNotificationSound();

        this.logger.info(`${newNotifications.length} nouvelles notifications reçues et traitées`, {
          service: 'NotificationService'
        });
      }
    }
  }

  /**
   * S'assure que le contenu de la notification est un objet et non une chaîne JSON
   * @param notification Notification à traiter
   * @returns Notification avec le contenu parsé
   */
  private ensureContentIsParsed(notification: Notification): Notification {
    if (typeof notification.content === 'string') {
      try {
        console.log('NotificationService: Parsing notification content from JSON string during add');
        return {
          ...notification,
          content: JSON.parse(notification.content)
        };
      } catch (error) {
        console.error('NotificationService: Erreur lors du parsing du contenu de la notification:', error);
        // Retourner la notification telle quelle en cas d'erreur
        return notification;
      }
    }
    return notification;
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

        // Réinitialiser le signal de nouvelle notification si c'est celle qui était affichée
        const currentNewNotification = this.newNotification();
        if (currentNewNotification && currentNewNotification.id === notificationId) {
          this.newNotification.set(null);
        }

        // Informer le serveur WebSocket que la notification a été lue
        this.websocketService.emit('notification:mark-read', { notificationId });
      }),
      catchError(error => {
        this.logger.error(`Erreur lors du marquage de la notification ${notificationId} comme lue:`, {
          service: 'NotificationService',
          error
        });
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

        // Réinitialiser le signal de nouvelle notification
        this.newNotification.set(null);
      }),
      catchError(error => {
        this.logger.error('Erreur lors du marquage de toutes les notifications comme lues:', {
          service: 'NotificationService',
          error
        });
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

    // S'assurer que le contenu est un objet, pas une chaîne JSON
    let parsedContent: any;
    try {
      // Si le contenu est une chaîne, essayer de le parser comme JSON
      if (typeof notification.content === 'string') {
        console.log('NotificationService: Parsing notification content from JSON string');
        parsedContent = JSON.parse(notification.content);
      } else {
        // Sinon, utiliser le contenu tel quel
        parsedContent = notification.content;
      }
    } catch (error) {
      console.error('NotificationService: Erreur lors du parsing du contenu de la notification:', error);
      parsedContent = {}; // Utiliser un objet vide en cas d'erreur
    }

    switch (notification.type) {
      case 'new_message':
        const messageContent = parsedContent;
        title = `Nouveau message de ${messageContent.senderName || 'Utilisateur inconnu'}`;
        content = messageContent.preview || 'Nouveau message';

        // Vérifier que l'ID de la conversation est valide
        const conversationId = messageContent.conversationId;
        if (conversationId && !isNaN(conversationId) && conversationId > 0) {
          url = `/messages/conversations/${conversationId}`;
          console.log(`NotificationService: URL de message valide générée: ${url}`);
        } else {
          console.error(`NotificationService: ID de conversation invalide dans la notification: ${conversationId}`);
          url = '/messages/conversations'; // Rediriger vers la liste des conversations en cas d'ID invalide
        }
        break;
      case 'document_invite':
        const inviteContent = parsedContent;
        title = `Invitation à collaborer`;
        content = `${inviteContent.inviterName || 'Un utilisateur'} vous a invité à collaborer sur "${inviteContent.documentTitle || 'un document'}"`;

        // Vérifier que l'ID du document est valide
        const documentId = inviteContent.documentId;
        if (documentId && !isNaN(documentId) && documentId > 0) {
          url = `/documents/${documentId}`;
          console.log(`NotificationService: URL d'invitation valide générée: ${url}`);
        } else {
          console.error(`NotificationService: ID de document invalide dans la notification: ${documentId}`);
          url = '/documents'; // Rediriger vers la liste des documents en cas d'ID invalide
        }
        break;

      case 'document_update':
        const updateContent = parsedContent;
        title = `Mise à jour de document`;
        content = `${updateContent.updaterName || 'Un utilisateur'} a ${this.getUpdateTypeText(updateContent.updateType)} "${updateContent.documentTitle || 'un document'}"`;

        // Vérifier que l'ID du document est valide
        const updateDocId = updateContent.documentId;
        if (updateDocId && !isNaN(updateDocId) && updateDocId > 0) {
          url = `/documents/${updateDocId}`;
          console.log(`NotificationService: URL de mise à jour valide générée: ${url}`);
        } else {
          console.error(`NotificationService: ID de document invalide dans la notification: ${updateDocId}`);
          url = '/documents'; // Rediriger vers la liste des documents en cas d'ID invalide
        }
        break;
      case 'conversation_invite':
        const convInviteContent = parsedContent;
        title = `Invitation à une conversation`;
        content = `Vous avez été ajouté à la conversation "${convInviteContent.conversationName || 'sans nom'}"`;

        // Vérifier que l'ID de la conversation est valide
        const convId = convInviteContent.conversationId;
        if (convId && !isNaN(convId) && convId > 0) {
          url = `/messages/conversations/${convId}`;
          console.log(`NotificationService: URL d'invitation à une conversation valide générée: ${url}`);
        } else {
          console.error(`NotificationService: ID de conversation invalide dans la notification: ${convId}`);
          url = '/messages/conversations'; // Rediriger vers la liste des conversations en cas d'ID invalide
        }
        break;
      case 'incoming_call':
        const callContent = parsedContent;
        title = `Appel entrant`;
        content = `Appel concernant le document "${callContent.documentTitle || 'sans titre'}"`;

        // Vérifier que les IDs du document et de l'appel sont valides
        const callDocId = callContent.documentId;
        const callId = callContent.callId;

        if (callDocId && !isNaN(callDocId) && callDocId > 0 && callId && !isNaN(callId) && callId > 0) {
          url = `/documents/${callDocId}/call/${callId}`;
          console.log(`NotificationService: URL d'appel valide générée: ${url}`);
        } else {
          console.error(`NotificationService: IDs invalides dans la notification d'appel: document=${callDocId}, call=${callId}`);
          url = '/documents'; // Rediriger vers la liste des documents en cas d'ID invalide
        }
        break;
      case 'system':
        const systemContent = parsedContent;
        title = systemContent.title || 'Notification système';
        content = systemContent.message || 'Vous avez reçu une notification système';
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
