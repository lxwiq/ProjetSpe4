export interface Document {
  id: number;
  title: string;
  content?: string;
  file_path?: string;
  file_type?: string;
  file_size?: number;
  owner_id: number;
  parent_folder_id?: number;
  is_folder: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  last_modified_by?: number;
  auto_save_interval?: number;
  
  // Propriétés supplémentaires pour l'affichage
  owner_username?: string;
  last_modified_by_username?: string;
  children?: Document[];
}
