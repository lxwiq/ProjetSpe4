export interface User {
  id: number;
  username: string;
  full_name: string;
  profile_picture?: string;
}

export interface Message {
  id: number;
  conversation_id: number;
  sender_id: number;
  content: string;
  sent_at: string;
  read_at: string | null;
  is_deleted: boolean;
  users: User; // Sender info
}

export interface ConversationParticipant {
  id: number;
  conversation_id: number;
  user_id: number;
  joined_at: string;
  left_at: string | null;
  is_active: boolean;
  users: User; // Participant info
}

export interface Conversation {
  id: number;
  name: string | null;
  is_group: boolean;
  created_at: string;
  updated_at: string;
  created_by: number;
  conversation_participants: ConversationParticipant[];
  messages: Message[];
}

export interface NewConversation {
  participantIds: number[];
  name?: string;
  isGroup: boolean;
}

export interface NewMessage {
  content: string;
}
