import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, map, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { WebsocketService } from './websocket.service';
import { LoggingService } from './logging.service';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';
import { MessageNotificationContent } from '../models/notification.model';

export interface Conversation {
  id: number;
  name?: string;
  is_group: boolean;
  created_at: string;
  updated_at: string;
  created_by: number;
  conversation_participants: ConversationParticipant[];
  messages: Message[];
}

export interface ConversationParticipant {
  id: number;
  conversation_id: number;
  user_id: number;
  joined_at: string;
  is_active: boolean;
  users: {
    id: number;
    username: string;
    full_name?: string;
    profile_picture?: string;
  };
}

export interface Message {
  id: number;
  conversation_id: number;
  sender_id: number;
  content: string;
  sent_at: string;
  read_at?: string;
  is_deleted: boolean;
  users: {
    id: number;
    username: string;
    full_name?: string;
    profile_picture?: string;
  };
}

export interface ConversationResponse {
  message: string;
  data: Conversation | Conversation[];
}

export interface MessageResponse {
  message: string;
  data: Message | Message[];
}

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  private readonly API_URL = environment.apiUrl;

  // Signaux pour l'état des conversations
  conversations = signal<Conversation[]>([]);
  currentConversation = signal<Conversation | null>(null);
  isLoadingConversations = signal<boolean>(false);
  isLoadingMessages = signal<boolean>(false);

  // Sujets pour les événements de messagerie
  private messageReceived = new Subject<Message>();
  private conversationUpdated = new Subject<Conversation>();

  // Services injectés
  private http = inject(HttpClient);
  private websocketService = inject(WebsocketService);
  private logger = inject(LoggingService);
  private authService = inject(AuthService);
  private notificationService = inject(NotificationService);

  constructor() {
    // S'abonner aux événements de messagerie via WebSocket
    this.websocketService.fromEvent('message:received').subscribe((data: any) => {
      this.logger.debug('Message reçu via WebSocket', {
        service: 'MessagingService',
        conversationId: data.conversationId
      });

      const message = data.message;
      const conversationId = data.conversationId;
      const currentUserId = this.getCurrentUserId();

      // Vérifier si le message n'est pas envoyé par l'utilisateur courant
      if (message.sender_id !== currentUserId) {
        // Mettre à jour la liste des messages si la conversation est active
        if (this.currentConversation() && this.currentConversation()?.id === conversationId) {
          this.messageReceived.next(message);

          // Ajouter le message à la conversation courante
          const currentConv = this.currentConversation();
          if (currentConv) {
            const updatedMessages = [...currentConv.messages, message];
            this.currentConversation.set({
              ...currentConv,
              messages: updatedMessages,
              updated_at: new Date().toISOString()
            });
          }
        } else {
          // Si l'utilisateur n'est pas dans la conversation, créer une notification
          this.createMessageNotification(message, conversationId);
        }
      }

      // Mettre à jour la liste des conversations
      this.loadConversations();
    });
  }

  /**
   * Récupère toutes les conversations de l'utilisateur
   * @returns Observable avec la liste des conversations
   */
  loadConversations(): Observable<Conversation[]> {
    this.isLoadingConversations.set(true);

    return this.http.get<Conversation[]>(`${this.API_URL}/messaging/conversations`, {
      withCredentials: true
    }).pipe(
      map(conversations => {
        this.conversations.set(conversations);
        this.isLoadingConversations.set(false);
        return conversations;
      }),
      catchError(error => {
        this.logger.error('Erreur lors du chargement des conversations', {
          service: 'MessagingService',
          error
        });
        this.isLoadingConversations.set(false);
        return throwError(() => error);
      })
    );
  }

  /**
   * Récupère une conversation par son ID
   * @param conversationId ID de la conversation
   * @returns Observable avec la conversation
   */
  getConversation(conversationId: number): Observable<Conversation> {
    return this.http.get<Conversation>(`${this.API_URL}/messaging/conversations/${conversationId}`, {
      withCredentials: true
    }).pipe(
      map(conversation => {
        this.currentConversation.set(conversation);
        return conversation;
      }),
      catchError(error => {
        this.logger.error('Erreur lors du chargement de la conversation', {
          service: 'MessagingService',
          conversationId,
          error
        });
        return throwError(() => error);
      })
    );
  }

  /**
   * Récupère les messages d'une conversation
   * @param conversationId ID de la conversation
   * @param limit Nombre de messages à récupérer
   * @param offset Offset pour la pagination
   * @returns Observable avec la liste des messages
   */
  getMessages(conversationId: number, limit: number = 50, offset: number = 0): Observable<Message[]> {
    this.isLoadingMessages.set(true);

    return this.http.get<Message[]>(
      `${this.API_URL}/messaging/conversations/${conversationId}/messages?limit=${limit}&offset=${offset}`,
      { withCredentials: true }
    ).pipe(
      map(messages => {
        this.isLoadingMessages.set(false);

        // Mettre à jour les messages de la conversation courante
        const currentConv = this.currentConversation();
        if (currentConv && currentConv.id === conversationId) {
          this.currentConversation.set({
            ...currentConv,
            messages: messages
          });
        }

        return messages;
      }),
      catchError(error => {
        this.logger.error('Erreur lors du chargement des messages', {
          service: 'MessagingService',
          conversationId,
          error
        });
        this.isLoadingMessages.set(false);
        return throwError(() => error);
      })
    );
  }

  /**
   * Envoie un message dans une conversation
   * @param conversationId ID de la conversation
   * @param content Contenu du message
   * @returns Observable avec le message créé
   */
  sendMessage(conversationId: number, content: string): Observable<Message> {
    if (!content.trim()) {
      return throwError(() => new Error('Le contenu du message ne peut pas être vide'));
    }

    return this.http.post<Message>(
      `${this.API_URL}/messaging/conversations/${conversationId}/messages`,
      { content },
      { withCredentials: true }
    ).pipe(
      map(message => {
        // Ajouter le message à la conversation courante
        const currentConv = this.currentConversation();
        if (currentConv && currentConv.id === conversationId) {
          const updatedMessages = [...currentConv.messages, message];
          this.currentConversation.set({
            ...currentConv,
            messages: updatedMessages,
            updated_at: new Date().toISOString()
          });
        }

        return message;
      }),
      catchError(error => {
        this.logger.error('Erreur lors de l\'envoi du message', {
          service: 'MessagingService',
          conversationId,
          error
        });
        return throwError(() => error);
      })
    );
  }

  /**
   * Crée une nouvelle conversation
   * @param participantIds IDs des participants (incluant l'utilisateur courant)
   * @param name Nom de la conversation (optionnel, pour les groupes)
   * @param isGroup Indique si c'est une conversation de groupe
   * @returns Observable avec la conversation créée
   */
  createConversation(participantIds: number[], name?: string, isGroup: boolean = false): Observable<Conversation> {
    return this.http.post<Conversation>(
      `${this.API_URL}/messaging/conversations`,
      { participantIds, name, isGroup },
      { withCredentials: true }
    ).pipe(
      map(conversation => {
        // Mettre à jour la liste des conversations
        this.loadConversations();
        return conversation;
      }),
      catchError(error => {
        this.logger.error('Erreur lors de la création de la conversation', {
          service: 'MessagingService',
          error
        });
        return throwError(() => error);
      })
    );
  }

  /**
   * Observable pour les messages reçus
   * @returns Observable avec les messages reçus
   */
  onMessageReceived(): Observable<Message> {
    return this.messageReceived.asObservable();
  }

  /**
   * Observable pour les mises à jour de conversation
   * @returns Observable avec les conversations mises à jour
   */
  onConversationUpdated(): Observable<Conversation> {
    return this.conversationUpdated.asObservable();
  }

  /**
   * Crée une notification pour un nouveau message
   * @param message Message reçu
   * @param conversationId ID de la conversation
   */
  private createMessageNotification(message: Message, conversationId: number): void {
    // Récupérer la conversation pour obtenir les détails
    this.getConversation(conversationId).subscribe({
      next: (conversation) => {
        // Créer le contenu de la notification
        const notificationContent: MessageNotificationContent = {
          messageId: message.id,
          conversationId: conversationId,
          senderId: message.sender_id,
          senderName: message.users.username,
          conversationName: this.getConversationName(conversation),
          isGroup: conversation.is_group,
          preview: this.truncateMessage(message.content)
        };

        // Créer la notification via le service de notification
        this.notificationService.createNotification({
          type: 'new_message',
          content: notificationContent,
          sender_id: message.sender_id
        });

        this.logger.debug('Notification de message créée', {
          service: 'MessagingService',
          conversationId,
          messageId: message.id
        });
      },
      error: (error) => {
        this.logger.error('Erreur lors de la création de la notification de message', {
          service: 'MessagingService',
          conversationId,
          error
        });
      }
    });
  }

  /**
   * Tronque un message pour l'aperçu dans les notifications
   * @param message Message à tronquer
   * @returns Message tronqué
   */
  private truncateMessage(message: string): string {
    const maxLength = 50;
    if (message.length <= maxLength) {
      return message;
    }
    return message.substring(0, maxLength) + '...';
  }

  /**
   * Récupère le nom d'une conversation
   * @param conversation Conversation
   * @returns Nom de la conversation
   */
  private getConversationName(conversation: Conversation): string {
    if (conversation.name) {
      return conversation.name;
    }

    // Pour les conversations 1:1, utiliser le nom de l'autre participant
    if (!conversation.is_group && conversation.conversation_participants.length === 2) {
      const currentUserId = this.getCurrentUserId();
      const otherParticipant = conversation.conversation_participants.find(
        p => p.user_id !== currentUserId
      );

      if (otherParticipant) {
        return otherParticipant.users.full_name || otherParticipant.users.username;
      }
    }

    return 'Conversation sans nom';
  }

  /**
   * Récupère l'ID de l'utilisateur courant
   * @returns ID de l'utilisateur
   */
  getCurrentUserId(): number {
    const user = this.authService.currentUser();
    return user ? user.id : 0;
  }
}
