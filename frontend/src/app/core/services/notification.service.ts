import { Injectable, signal, DestroyRef, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { environment } from '../../../environments/environment';
import {
  Notification,
  NotificationType,
  NotificationsResponse,
  MarkAsReadResponse
} from '../models/notification.model';
import { WebsocketService } from './websocket.service';
import { LoggingService } from './logging.service';
import { EventBusService } from './event-bus.service';
import { AuthService } from './auth.service';

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
    private websocketService: WebsocketService,
    private eventBus: EventBusService,
    private authService: AuthService
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
      // Vérifier si le fichier existe avant de créer l'élément Audio
      const soundPath = '/assets/sounds/notification.mp3';

      // Créer l'élément audio avec gestion d'erreur
      this.notificationSound = new Audio(soundPath);
      this.notificationSound.volume = 0.5; // Volume à 50%

      // Ajouter un gestionnaire d'erreur pour le chargement du son
      this.notificationSound.addEventListener('error', (e) => {
        this.logger.error('Erreur lors du chargement du son de notification', {
          service: 'NotificationService',
          error: e
        });
        // Désactiver le son en cas d'erreur
        this.notificationSound = null;
      });

      this.logger.info('Son de notification initialisé', {
        service: 'NotificationService',
        path: soundPath
      });
    } catch (error) {
      this.logger.error('Erreur lors de l\'initialisation du son de notification', {
        service: 'NotificationService',
        error
      });
      this.notificationSound = null;
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

        // Essayer de jouer le son avec gestion d'erreur
        const playPromise = this.notificationSound.play();

        // La méthode play() retourne une promesse
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            this.logger.error('Erreur lors de la lecture du son de notification', {
              service: 'NotificationService',
              error
            });

            // Si l'erreur est liée à l'interaction utilisateur, on peut l'ignorer
            // Sinon, désactiver le son pour éviter de futures erreurs
            if (error.name !== 'NotAllowedError') {
              this.notificationSound = null;
            }
          });
        }
      } catch (error) {
        this.logger.error('Erreur lors de la lecture du son de notification', {
          service: 'NotificationService',
          error
        });
        // Désactiver le son en cas d'erreur
        this.notificationSound = null;
      }
    } else {
      this.logger.debug('Son de notification non disponible', {
        service: 'NotificationService'
      });
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

      // Si c'est une notification d'appel, émettre un événement spécifique
      if (processedNotification.type === 'incoming_call') {
        try {
          const content = typeof processedNotification.content === 'string'
            ? JSON.parse(processedNotification.content)
            : processedNotification.content;

          this.logger.info('Notification d\'appel reçue, émission d\'un événement', {
            service: 'NotificationService',
            callId: content.callId,
            documentId: content.documentId
          });

          // Émettre un événement pour informer les composants d'appel
          this.eventBus.emit('incoming_call', {
            callId: content.callId,
            documentId: content.documentId,
            callerId: content.callerId,
            documentTitle: content.documentTitle
          });
        } catch (error) {
          this.logger.error('Erreur lors du traitement de la notification d\'appel', {
            service: 'NotificationService',
            error
          });
        }
      }
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

        // Traiter les notifications d'appel
        newNotifications.forEach(notification => {
          if (notification.type === 'incoming_call') {
            try {
              const content = typeof notification.content === 'string'
                ? JSON.parse(notification.content)
                : notification.content;

              this.logger.info('Notification d\'appel reçue dans un lot, émission d\'un événement', {
                service: 'NotificationService',
                callId: content.callId,
                documentId: content.documentId
              });

              // Émettre un événement pour informer les composants d'appel
              this.eventBus.emit('incoming_call', {
                callId: content.callId,
                documentId: content.documentId,
                callerId: content.callerId,
                documentTitle: content.documentTitle
              });
            } catch (error) {
              this.logger.error('Erreur lors du traitement de la notification d\'appel dans un lot', {
                service: 'NotificationService',
                error
              });
            }
          }
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
   * Crée une notification locale (sans appel API)
   * @param notification Données de la notification à créer
   */
  createNotification(notificationData: { type: string, content: any, sender_id?: number }): void {
    // Créer un objet notification avec les données fournies
    const notification: Notification = {
      id: Date.now(), // ID temporaire basé sur le timestamp
      user_id: this.getCurrentUserId(),
      type: notificationData.type as NotificationType,
      content: notificationData.content,
      sender_id: notificationData.sender_id,
      created_at: new Date().toISOString(),
      is_read: false
    };

    // Si un sender_id est fourni, essayer de récupérer les informations de l'expéditeur
    if (notificationData.sender_id) {
      // Ici, on pourrait appeler un service pour récupérer les informations de l'expéditeur
      // Mais pour simplifier, on laisse le champ sender vide pour l'instant
    }

    // Ajouter la notification à la liste
    this.addNotification(notification);

    this.logger.info('Notification locale créée', {
      service: 'NotificationService',
      notificationType: notification.type
    });
  }

  /**
   * Récupère l'ID de l'utilisateur courant
   * @returns ID de l'utilisateur
   */
  private getCurrentUserId(): number {
    // Utiliser le service d'authentification pour récupérer l'ID de l'utilisateur courant
    const user = this.authService.currentUser();
    return user ? user.id : 0;
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
          url = `/messaging/conversations/${conversationId}`;
          console.log(`NotificationService: URL de message valide générée: ${url}`);
        } else {
          console.error(`NotificationService: ID de conversation invalide dans la notification: ${conversationId}`);
          url = '/messaging'; // Rediriger vers la liste des conversations en cas d'ID invalide
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
          url = `/messaging/conversations/${convId}`;
          console.log(`NotificationService: URL d'invitation à une conversation valide générée: ${url}`);
        } else {
          console.error(`NotificationService: ID de conversation invalide dans la notification: ${convId}`);
          url = '/messaging'; // Rediriger vers la liste des conversations en cas d'ID invalide
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
