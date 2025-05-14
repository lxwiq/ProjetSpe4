/**
 * Interface représentant un appel vocal
 */
export interface Call {
  id: number;
  document_id: number;
  initiated_by: number;
  started_at: string;
  ended_at?: string;
  call_type: CallType;
  status: CallStatus;
  
  // Relations
  initiator?: CallUser;
  participants?: CallParticipant[];
}

/**
 * Types d'appels supportés
 */
export type CallType = 'audio' | 'video';

/**
 * Statuts possibles pour un appel
 */
export type CallStatus = 'active' | 'ended' | 'failed';

/**
 * Interface représentant un utilisateur dans le contexte d'un appel
 */
export interface CallUser {
  id: number;
  username: string;
  full_name?: string;
  profile_picture?: string;
}

/**
 * Interface représentant un participant à un appel
 */
export interface CallParticipant {
  user_id: number;
  call_id: number;
  joined_at: string;
  left_at?: string;
  is_active: boolean;
  is_speaking?: boolean;
  is_muted?: boolean;
  user?: CallUser;
  stream?: MediaStream;
  peerConnection?: RTCPeerConnection;
}

/**
 * Interface pour les réponses de l'API concernant les appels
 */
export interface CallResponse {
  message: string;
  data: Call;
}

/**
 * Interface pour les réponses de l'API concernant les participants à un appel
 */
export interface CallParticipantsResponse {
  message: string;
  data: CallParticipant[];
}

/**
 * Interface pour les événements de signalisation WebRTC
 */
export interface SignalingData {
  callId: number;
  userId: number;
  signal: RTCSessionDescriptionInit | RTCIceCandidateInit;
  type?: 'offer' | 'answer' | 'candidate';
}

/**
 * Interface pour les informations d'activité vocale
 */
export interface VoiceActivityData {
  callId: number;
  userId: number;
  isSpeaking: boolean;
}
