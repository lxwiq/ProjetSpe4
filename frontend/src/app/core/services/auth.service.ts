import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { User, LoginRequest, LoginResponse, SessionCheckResponse } from '../models/user.model';
import { TokenService } from './token.service';
import { TokenRefreshService } from './token-refresh.service';
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
    private tokenService: TokenService,
    private tokenRefreshService: TokenRefreshService,
    private router: Router
  ) {
    // Initialiser l'état d'authentification
    this.initAuthState();
  }

  /**
   * Initialise l'état d'authentification au démarrage de l'application
   */
  private initAuthState(): void {
    console.log('AuthService: Initialisation de l\'état d\'authentification');

    // Vérifier si nous avons des tokens stockés localement
    const hasAccessToken = !!this.tokenService.getAccessToken();
    const hasRefreshToken = !!this.tokenService.getRefreshToken();
    const rememberMe = this.tokenService.getRememberMe();

    console.log('AuthService: Tokens disponibles:', {
      accessToken: hasAccessToken,
      refreshToken: hasRefreshToken,
      rememberMe: rememberMe
    });

    // Définir une fonction pour vérifier l'état de la session
    const checkSession = () => {
      console.log('AuthService: Vérification de la session...');
      this.checkAuthStatus().subscribe({
        next: (isValid) => {
          console.log('AuthService: Résultat de la vérification de session:', isValid);
          if (!isValid) {
            // Si la session n'est pas valide mais que nous avons un token de rafraîchissement,
            // essayer de rafraîchir le token
            if (this.tokenService.getRefreshToken() || rememberMe) {
              console.log('AuthService: Session invalide mais token de rafraîchissement disponible. Tentative de rafraîchissement...');
              this.refreshTokenAndCheckSession();
            } else {
              console.log('AuthService: Session invalide et pas de token de rafraîchissement. Redirection vers login.');
              this.clearAuthState();
              this.router.navigate(['/login']);
            }
          }
        },
        error: (error) => {
          console.error('AuthService: Erreur lors de la vérification de session:', error);
          // En cas d'erreur, essayer de rafraîchir le token si possible
          if (this.tokenService.getRefreshToken() || rememberMe) {
            console.log('AuthService: Erreur de session mais token de rafraîchissement disponible. Tentative de rafraîchissement...');
            this.refreshTokenAndCheckSession();
          } else {
            console.log('AuthService: Erreur de session et pas de token de rafraîchissement. Redirection vers login.');
            this.clearAuthState();
            this.router.navigate(['/login']);
          }
        }
      });
    };

    // Définir une fonction pour rafraîchir le token et vérifier la session
    this.refreshTokenAndCheckSession = () => {
      console.log('AuthService: Tentative de rafraîchissement du token...');

      // Récupérer la préférence "Remember Me"
      const rememberMe = this.tokenService.getRememberMe();
      console.log('AuthService: Rafraîchissement avec Remember Me:', rememberMe);

      this.tokenRefreshService.refreshToken().subscribe({
        next: (response) => {
          console.log('AuthService: Token rafraîchi avec succès, réponse:', response);

          // Vérifier si la réponse contient un message d'erreur
          if (response && response.message && response.message.toLowerCase().includes('erreur')) {
            console.error('AuthService: Message d\'erreur dans la réponse:', response.message);
            this.clearAuthState();
            this.router.navigate(['/login']);
            return;
          }

          // Après le rafraîchissement, vérifier l'état de la session
          setTimeout(() => {
            // Attendre un court instant pour que les cookies soient correctement enregistrés
            this.checkAuthStatus().subscribe({
              next: (isValid) => {
                console.log('AuthService: Résultat de la vérification après rafraîchissement:', isValid);
                if (!isValid) {
                  // Essayer une seconde fois avant d'abandonner
                  console.log('AuthService: Première vérification échouée, nouvelle tentative...');
                  setTimeout(() => {
                    this.checkAuthStatus().subscribe({
                      next: (isValidRetry) => {
                        console.log('AuthService: Résultat de la seconde vérification:', isValidRetry);
                        if (!isValidRetry) {
                          console.log('AuthService: Session toujours invalide après rafraîchissement. Redirection vers login.');
                          this.clearAuthState();
                          this.router.navigate(['/login']);
                        }
                      },
                      error: (error) => {
                        console.error('AuthService: Erreur lors de la seconde vérification:', error);
                        this.clearAuthState();
                        this.router.navigate(['/login']);
                      }
                    });
                  }, 500);
                }
              },
              error: (error) => {
                console.error('AuthService: Erreur lors de la vérification après rafraîchissement:', error);
                this.clearAuthState();
                this.router.navigate(['/login']);
              }
            });
          }, 300);
        },
        error: (error) => {
          console.error('AuthService: Échec du rafraîchissement du token:', error);
          this.clearAuthState();
          this.router.navigate(['/login']);
        }
      });
    };

    // Stratégie d'initialisation
    if (hasAccessToken) {
      // Si un token d'accès est disponible, vérifier sa validité
      console.log('AuthService: Token d\'accès disponible, vérification de sa validité');
      this.isAuthenticated.set(true);
      checkSession();
    } else if (hasRefreshToken || rememberMe) {
      // Si seulement un token de rafraîchissement est disponible ou si "Remember Me" est activé,
      // essayer de rafraîchir le token
      console.log('AuthService: Pas de token d\'accès, mais token de rafraîchissement ou Remember Me disponible');
      this.refreshTokenAndCheckSession();
    } else {
      // Aucun token disponible, l'utilisateur n'est pas authentifié
      console.log('AuthService: Aucun token disponible, utilisateur non authentifié');
      this.clearAuthState();
    }
  }

  // Déclaration de la méthode refreshTokenAndCheckSession avec initialisation par défaut
  private refreshTokenAndCheckSession: () => void = () => {
    console.log('AuthService: Méthode refreshTokenAndCheckSession appelée avant initialisation');
  };

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

          // Vérifier si l'utilisateur est actif (non bloqué)
          if (user && user.is_active === false) {
            console.error('Tentative de connexion avec un compte bloqué:', user.username);
            this.handleBlockedUser();
            return;
          }

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

          // Vérifier si l'erreur est due à un compte bloqué
          if (error.error && error.error.message && error.error.message.toLowerCase().includes('bloqué')) {
            // Simplement laisser l'erreur se propager
            console.error('Tentative de connexion avec un compte bloqué');
          }

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
          this.router.navigate(['/login']);
        }),
        catchError(error => {
          // Même en cas d'erreur, on nettoie l'état d'authentification côté client
          this.clearAuthState();
          this.router.navigate(['/login']);
          return throwError(() => error);
        })
      );
  }

  /**
   * Vérifie l'état de la session utilisateur
   * @returns Observable indiquant si l'utilisateur est authentifié
   */
  checkAuthStatus(): Observable<boolean> {
    console.log('AuthService: Vérification de l\'état d\'authentification');

    // Vérifier si nous avons un token d'accès dans le stockage local
    const token = this.tokenService.getAccessToken();
    console.log('AuthService: Token d\'accès présent dans le stockage local:', !!token);

    // Vérifier si "Remember Me" est activé
    const rememberMe = this.tokenService.getRememberMe();
    console.log('AuthService: Remember Me activé:', rememberMe);

    // Même si nous n'avons pas de token dans le stockage local,
    // nous pourrions en avoir un dans un cookie HTTP-only si "Remember Me" est activé
    if (!token && !rememberMe) {
      console.log('AuthService: Pas de token d\'accès et Remember Me désactivé, nettoyage de l\'état d\'authentification');
      this.clearAuthState();
      return of(false);
    }

    console.log('AuthService: Envoi de la requête de vérification de session');
    // Utiliser withCredentials pour envoyer les cookies avec la requête
    return this.http.get<SessionCheckResponse>(`${this.API_URL}/auth/check-session`, { withCredentials: true })
      .pipe(
        tap(response => {
          console.log('AuthService: Réponse de vérification de session reçue:', response);
        }),
        map(response => {
          // Extraire les données de la structure imbriquée
          const { authenticated, user } = response.data;
          console.log('AuthService: Session authentifiée:', authenticated, 'Utilisateur:', user);

          // Si le message est "Session valide", on considère que la session est valide
          // même si authenticated n'est pas explicitement défini
          const isSessionValid = authenticated === true ||
                                (response.message === 'Session valide' && user);

          if (isSessionValid && user) {
            console.log('AuthService: Session valide, vérification du statut du compte');

            // Vérifier si l'utilisateur est actif (non bloqué)
            if (user.is_active === false) {
              console.error('AuthService: Compte bloqué détecté lors de la vérification de session');
              this.handleBlockedUser();
              return false;
            }

            console.log('AuthService: Compte actif, mise à jour de l\'utilisateur');
            this.setCurrentUser(user);
            return true;
          } else {
            console.log('AuthService: Session invalide, tentative de rafraîchissement du token');
            // Au lieu de nettoyer immédiatement l'état d'authentification,
            // nous allons essayer de rafraîchir le token si "Remember Me" est activé
            if (rememberMe || this.tokenService.getRefreshToken()) {
              // Le rafraîchissement sera géré par l'appelant
              return false;
            } else {
              console.log('AuthService: Pas de token de rafraîchissement, nettoyage de l\'état d\'authentification');
              this.clearAuthState();
              return false;
            }
          }
        }),
        catchError((error) => {
          console.error('AuthService: Erreur lors de la vérification de la session:', error);

          // Si l'erreur est due à un token expiré (401) ou à une autre erreur,
          // essayer de rafraîchir le token si "Remember Me" est activé ou si nous avons un token de rafraîchissement
          if ((error.status === 401 || error.status === 403) &&
              (this.tokenService.getRefreshToken() || rememberMe)) {
            console.log('AuthService: Token expiré ou erreur d\'autorisation, tentative de rafraîchissement...');
            // Le rafraîchissement sera géré par l'appelant
            return of(false);
          }

          console.log('AuthService: Erreur non récupérable, nettoyage de l\'état d\'authentification');
          this.clearAuthState();
          return of(false);
        })
      );
  }



  /**
   * Met à jour l'état d'authentification avec les informations utilisateur
   * @param user Utilisateur connecté
   */
  setCurrentUser(user: User): void {
    console.log('Mise à jour de l\'utilisateur courant:', user);

    // Vérifier que l'utilisateur est valide
    if (!user || !user.id) {
      console.error('Tentative de définir un utilisateur invalide:', user);
      return;
    }

    // Vérifier si l'utilisateur est actif (non bloqué)
    if (user.is_active === false) {
      console.error('Tentative de connexion avec un compte bloqué:', user.username);
      this.handleBlockedUser();
      return;
    }

    // Mettre à jour l'état d'authentification
    this.isAuthenticated.set(true);
    this.currentUser.set(user);

    console.log('État d\'authentification mis à jour avec succès');
  }

  /**
   * Gère le cas d'un utilisateur bloqué
   */
  private handleBlockedUser(): void {
    // Nettoyer l'état d'authentification
    this.clearAuthState();

    // Rediriger vers la page de connexion
    this.router.navigate(['/login']);
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
