export interface User {
  id: number;
  username: string;
  email: string;
  isAdmin?: boolean;
  full_name?: string;
  two_factor_enabled?: boolean;
  profile_picture?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  message: string;
  data: {
    user: User;
    requireTwoFactor: boolean;
    accessToken?: string;
    refreshToken?: string;
    tempToken?: string; // Temporary token for 2FA verification
  };
}

export interface SessionCheckResponse {
  message: string;
  data: {
    authenticated?: boolean;
    user?: User;
  };
}
