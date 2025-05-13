export interface Notification {
  id: number;
  user_id: number;
  type: NotificationType;
  content: any;
  sender_id: number | null;
  created_at: string;
  read_at: string | null;
  is_read: boolean;
  users_notifications_sender_idTousers?: {
    id: number;
    username: string;
    full_name: string;
    profile_picture?: string;
  };
}

export type NotificationType = 
  | 'new_message' 
  | 'conversation_invite' 
  | 'document_invite' 
  | 'incoming_call';

export interface NotificationContent {
  // Base properties that might be in any notification
  [key: string]: any;
}

export interface MessageNotificationContent extends NotificationContent {
  messageId: number;
  conversationId: number;
  senderId: number;
  senderName: string;
  conversationName: string;
  isGroup: boolean;
  preview: string;
}

export interface DocumentInviteNotificationContent extends NotificationContent {
  documentId: number;
  inviterId: number;
  documentTitle: string;
  permissionLevel: string;
}

export interface ConversationInviteNotificationContent extends NotificationContent {
  conversationId: number;
  inviterId: number;
  conversationName: string;
}

export interface CallNotificationContent extends NotificationContent {
  callId: number;
  callerId: number;
  documentId: number;
  documentTitle: string;
}
