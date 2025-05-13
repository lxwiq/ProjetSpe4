export interface User {
  id: number;
  username: string;
  email: string;
  full_name?: string;
  profile_image?: string;
  isAdmin?: boolean;
  is_active?: boolean;
}
