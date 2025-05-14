export interface User {
  id: number;
  username: string;
  email: string;
  isAdmin?: boolean;
  full_name?: string;
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
  };
}

export interface SessionCheckResponse {
  message: string;
  data: {
    authenticated?: boolean;
    user?: User;
  };
}
