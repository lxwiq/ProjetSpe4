import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { User, LoginRequest, LoginResponse, SessionCheckResponse } from '../models/user.model';
import { TokenService } from './token.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = environment.apiUrl;

  // Utilisation des signaux pour l'état d'authentification (Angular 18)
  isAuthenticated = signal<boolean>(false);
  currentUser = signal<User | null>(null);

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {
    // Initialiser l'état d'authentification
    this.isAuthenticated.set(this.tokenService.isLoggedIn());
    this.checkAuthStatus().subscribe();
  }

  /**
   * Authentifie un utilisateur
   * @param credentials Identifiants de connexion
   * @returns Observable avec la réponse de connexion
   */
  login(credentials: LoginRequest): Observable<LoginResponse> {
    console.log('Tentative de connexion avec:', credentials.email);

    // Utiliser withCredentials pour envoyer et recevoir les cookies
    return this.http.post<LoginResponse>(`${this.API_URL}/login`, credentials, { withCredentials: true })
      .pipe(
        tap(response => {
          console.log('Réponse de connexion reçue:', response);

          // Extraire les données de la structure imbriquée
          const { user, requireTwoFactor, accessToken, refreshToken } = response.data;

          if (!requireTwoFactor && accessToken) {
            console.log('Stockage des tokens et mise à jour de l\'utilisateur');

            // Stocker les tokens
            this.tokenService.setTokens(
              accessToken,
              refreshToken,
              credentials.rememberMe
            );

            // Mettre à jour l'état d'authentification
            this.setCurrentUser(user);

            console.log('État d\'authentification mis à jour:', {
              isAuthenticated: this.isAuthenticated(),
              user: this.currentUser()
            });
          } else if (requireTwoFactor) {
            console.log('Authentification à deux facteurs requise');
          } else {
            console.error('Tokens manquants dans la réponse');
          }
        }),
        catchError(error => {
          console.error('Erreur lors de la connexion:', error);
          return throwError(() => error);
        })
      );
  }

  /**
   * Déconnecte l'utilisateur
   * @returns Observable avec la réponse de déconnexion
   */
  logout(): Observable<any> {
    // Utiliser withCredentials pour envoyer les cookies avec la requête
    return this.http.post(`${this.API_URL}/auth/logout`, {}, { withCredentials: true })
      .pipe(
        tap(() => {
          this.clearAuthState();
        }),
        catchError(error => {
          // Même en cas d'erreur, on nettoie l'état d'authentification côté client
          this.clearAuthState();
          return throwError(() => error);
        })
      );
  }

  /**
   * Vérifie l'état de la session utilisateur
   * @returns Observable indiquant si l'utilisateur est authentifié
   */
  checkAuthStatus(): Observable<boolean> {
    console.log('Vérification de l\'état d\'authentification');

    const token = this.tokenService.getAccessToken();
    console.log('Token d\'accès présent:', !!token);

    if (!token) {
      console.log('Pas de token d\'accès, nettoyage de l\'état d\'authentification');
      this.clearAuthState();
      return of(false);
    }

    console.log('Envoi de la requête de vérification de session');
    // Utiliser withCredentials pour envoyer les cookies avec la requête
    return this.http.get<SessionCheckResponse>(`${this.API_URL}/auth/check-session`, { withCredentials: true })
      .pipe(
        tap(response => {
          console.log('Réponse de vérification de session reçue:', response);
        }),
        map(response => {
          // Extraire les données de la structure imbriquée
          const { valid, user } = response.data;
          console.log('Session valide:', valid, 'Utilisateur:', user);

          if (valid && user) {
            console.log('Session valide, mise à jour de l\'utilisateur');
            this.setCurrentUser(user);
            return true;
          } else {
            console.log('Session invalide, nettoyage de l\'état d\'authentification');
            this.clearAuthState();
            return false;
          }
        }),
        catchError((error) => {
          console.error('Erreur lors de la vérification de la session:', error);
          this.clearAuthState();
          return of(false);
        })
      );
  }

  /**
   * Rafraîchit le token d'accès
   * @returns Observable avec les nouveaux tokens
   */
  refreshToken(): Observable<any> {
    const refreshToken = this.tokenService.getRefreshToken();
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    // Utiliser withCredentials pour envoyer les cookies avec la requête
    return this.http.post(`${this.API_URL}/token/refresh`, { refreshToken }, { withCredentials: true })
      .pipe(
        tap((response: any) => {
          // Extraire les données de la structure imbriquée
          if (response.data && response.data.accessToken) {
            this.tokenService.setTokens(response.data.accessToken, response.data.refreshToken);
          }
        }),
        catchError(error => {
          this.clearAuthState();
          return throwError(() => error);
        })
      );
  }

  /**
   * Met à jour l'état d'authentification avec les informations utilisateur
   * @param user Utilisateur connecté
   */
  private setCurrentUser(user: User): void {
    console.log('Mise à jour de l\'utilisateur courant:', user);

    // Vérifier que l'utilisateur est valide
    if (!user || !user.id) {
      console.error('Tentative de définir un utilisateur invalide:', user);
      return;
    }

    // Mettre à jour l'état d'authentification
    this.isAuthenticated.set(true);
    this.currentUser.set(user);

    console.log('État d\'authentification mis à jour avec succès');
  }

  /**
   * Nettoie l'état d'authentification
   */
  private clearAuthState(): void {
    this.tokenService.clearTokens();
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
  }
}
