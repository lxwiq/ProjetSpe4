/**
 * Interface représentant un document
 */
export interface Document {
  id: number;
  title: string;
  content?: string;
  file_path?: string;
  file_type?: string;
  file_size?: number;
  owner_id: number;
  parent_folder_id?: number;
  is_folder?: boolean;
  is_deleted?: boolean;
  created_at?: string;
  updated_at?: string;
  last_modified_by?: number;
  auto_save_interval?: number;
  
  // Relations
  owner?: DocumentUser;
  last_modifier?: DocumentUser;
  collaborators?: DocumentCollaborator[];
  parent_folder?: Document;
}

/**
 * Interface représentant un utilisateur dans le contexte des documents
 */
export interface DocumentUser {
  id: number;
  username: string;
  full_name?: string;
  profile_picture?: string;
}

/**
 * Interface représentant un collaborateur sur un document
 */
export interface DocumentCollaborator {
  user_id: number;
  document_id: number;
  permission_level: DocumentPermissionLevel;
  is_active: boolean;
  invited_at?: string;
  user?: DocumentUser;
}

/**
 * Types de permissions pour les documents
 */
export type DocumentPermissionLevel = 'read' | 'write' | 'admin';

/**
 * Interface représentant une version d'un document
 */
export interface DocumentVersion {
  id: number;
  document_id: number;
  version_number: number;
  content?: string;
  modified_by: number;
  modification_date?: string;
  change_summary?: string;
  modifier?: DocumentUser;
}

/**
 * Interface représentant un utilisateur actif sur un document
 */
export interface ActiveDocumentUser {
  id: number;
  username: string;
  full_name?: string;
  profile_picture?: string;
  cursor_position?: CursorPosition;
  last_activity?: string;
}

/**
 * Interface représentant la position d'un curseur dans un document
 */
export interface CursorPosition {
  index: number;
  length?: number;
}

/**
 * Interface représentant une modification de document
 */
export interface DocumentDelta {
  ops: any[];
  userId: number;
  timestamp: string;
}

/**
 * Interface pour les réponses de l'API concernant les documents
 */
export interface DocumentResponse {
  message: string;
  data: Document | Document[];
}

/**
 * Interface pour les réponses de l'API concernant les collaborateurs
 */
export interface CollaboratorsResponse {
  message: string;
  data: DocumentCollaborator[];
}

/**
 * Interface pour les réponses de l'API concernant les utilisateurs actifs
 */
export interface ActiveUsersResponse {
  message: string;
  data: ActiveDocumentUser[];
}

/**
 * Interface pour la création d'un document
 */
export interface CreateDocumentRequest {
  title: string;
  content?: string;
  parentFolderId?: number;
  isFolder?: boolean;
  file?: File;
}

/**
 * Interface pour la mise à jour d'un document
 */
export interface UpdateDocumentRequest {
  title?: string;
  content?: string;
}

/**
 * Interface pour l'invitation d'un collaborateur
 */
export interface InviteCollaboratorRequest {
  invitedUserId: number;
  permissionLevel?: DocumentPermissionLevel;
}
