import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

/**
 * Interface for 2FA setup response
 */
export interface TwoFactorSetupResponse {
  message: string;
  data: {
    qrCode: string;
    secret: string;
  };
}

/**
 * Interface for 2FA verification response
 */
export interface TwoFactorVerifyResponse {
  message: string;
}

/**
 * Interface for 2FA status response
 */
export interface TwoFactorStatusResponse {
  message: string;
  data: {
    enabled: boolean;
  };
}

/**
 * Service for handling Two-Factor Authentication operations
 */
@Injectable({
  providedIn: 'root'
})
export class TwoFactorAuthService {
  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Initiates 2FA setup process
   * @returns Observable with QR code and secret
   */
  setupTwoFactor(): Observable<TwoFactorSetupResponse> {
    return this.http.get<TwoFactorSetupResponse>(`${this.API_URL}/2fa/setup`, { withCredentials: true });
  }

  /**
   * Verifies and completes 2FA setup
   * @param token Verification code from authenticator app
   * @param secret The secret key generated during setup
   * @returns Observable with verification result
   */
  verifySetup(token: string, secret: string): Observable<TwoFactorVerifyResponse> {
    return this.http.post<TwoFactorVerifyResponse>(
      `${this.API_URL}/2fa/verify-setup`,
      { token, secret },
      { withCredentials: true }
    );
  }

  /**
   * Disables 2FA for the current user
   * @param token Verification code from authenticator app
   * @returns Observable with operation result
   */
  disableTwoFactor(token: string): Observable<TwoFactorVerifyResponse> {
    return this.http.post<TwoFactorVerifyResponse>(
      `${this.API_URL}/2fa/disable`,
      { token },
      { withCredentials: true }
    );
  }

  /**
   * Verifies 2FA token during login
   * @param token Verification code from authenticator app
   * @param tempToken Temporary token received after initial login
   * @returns Observable with verification result
   */
  verifyLogin(token: string, tempToken: string): Observable<any> {
    return this.http.post<any>(
      `${this.API_URL}/2fa/verify-login`,
      { token, tempToken },
      { withCredentials: true }
    );
  }

  /**
   * Checks the current 2FA status for the user
   * @returns Observable with the 2FA status
   */
  checkStatus(): Observable<TwoFactorStatusResponse> {
    return this.http.get<TwoFactorStatusResponse>(
      `${this.API_URL}/2fa/status`,
      { withCredentials: true }
    );
  }
}
