/**
 * Interface représentant une notification
 */
export interface Notification {
  id: number;
  user_id: number;
  type: NotificationType;
  content: any; // Contenu parsé de la notification
  sender_id?: number;
  sender?: NotificationSender;
  created_at: string;
  is_read: boolean;
  read_at?: string;
}

/**
 * Types de notifications supportés par l'application
 */
export type NotificationType = 
  | 'new_message'
  | 'document_invite'
  | 'document_update'
  | 'conversation_invite'
  | 'incoming_call'
  | 'system';

/**
 * Interface représentant l'expéditeur d'une notification
 */
export interface NotificationSender {
  id: number;
  username: string;
  full_name?: string;
  profile_picture?: string;
}

/**
 * Interface pour les notifications de nouveaux messages
 */
export interface MessageNotificationContent {
  messageId: number;
  conversationId: number;
  senderId: number;
  senderName: string;
  conversationName: string;
  isGroup: boolean;
  preview: string;
}

/**
 * Interface pour les notifications d'invitation à un document
 */
export interface DocumentInviteNotificationContent {
  documentId: number;
  documentTitle: string;
  inviterId: number;
  inviterName: string;
}

/**
 * Interface pour les notifications de mise à jour de document
 */
export interface DocumentUpdateNotificationContent {
  documentId: number;
  documentTitle: string;
  updaterId: number;
  updaterName: string;
  updateType: 'edit' | 'comment' | 'share';
}

/**
 * Interface pour les notifications d'invitation à une conversation
 */
export interface ConversationInviteNotificationContent {
  conversationId: number;
  inviterId: number;
  conversationName: string;
}

/**
 * Interface pour les notifications d'appel entrant
 */
export interface CallNotificationContent {
  callId: number;
  callerId: number;
  documentId: number;
  documentTitle: string;
}

/**
 * Interface pour les notifications système
 */
export interface SystemNotificationContent {
  title: string;
  message: string;
  actionUrl?: string;
}

/**
 * Réponse de l'API pour les notifications
 */
export interface NotificationsResponse {
  message: string;
  data: Notification[];
}

/**
 * Réponse de l'API pour le marquage des notifications comme lues
 */
export interface MarkAsReadResponse {
  message: string;
  data: {
    count: number;
  };
}
