import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { tap, catchError, finalize, filter, take } from 'rxjs/operators';

import { TokenService } from './token.service';
import { environment } from '../../../environments/environment';

/**
 * Service dédié au rafraîchissement des tokens
 * Utilisé pour éviter les dépendances circulaires avec AuthService
 */
@Injectable({
  providedIn: 'root'
})
export class TokenRefreshService {
  private readonly API_URL = environment.apiUrl;

  // Sujet pour suivre l'état du rafraîchissement du token
  private refreshingToken = new BehaviorSubject<boolean>(false);
  private refreshTokenPromise: Promise<any> | null = null;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  /**
   * Vérifie si le token est en cours de rafraîchissement
   * @returns Observable qui émet true si le token est en cours de rafraîchissement
   */
  isRefreshing(): Observable<boolean> {
    return this.refreshingToken.asObservable();
  }

  /**
   * Attend que le token soit rafraîchi
   * @returns Observable qui émet une fois que le token a été rafraîchi
   */
  waitForTokenRefresh(): Observable<any> {
    return this.refreshingToken.pipe(
      filter(isRefreshing => !isRefreshing),
      take(1)
    );
  }

  /**
   * Rafraîchit le token d'accès
   * @returns Observable avec les nouveaux tokens
   */
  refreshToken(): Observable<any> {
    console.log('TokenRefreshService: Tentative de rafraîchissement du token');

    // Si un rafraîchissement est déjà en cours, retourner un observable qui attend la fin
    if (this.refreshingToken.value) {
      console.log('TokenRefreshService: Rafraîchissement déjà en cours, attente...');
      return this.waitForTokenRefresh();
    }

    // Indiquer que le rafraîchissement est en cours
    this.refreshingToken.next(true);

    // Récupérer le token de rafraîchissement depuis le stockage local
    const refreshToken = this.tokenService.getRefreshToken();

    // Si pas de token de rafraîchissement, impossible de rafraîchir
    if (!refreshToken) {
      console.error('TokenRefreshService: Pas de token de rafraîchissement disponible');
      this.refreshingToken.next(false);
      return throwError(() => new Error('Pas de token de rafraîchissement disponible'));
    }

    // Récupérer la préférence "Se souvenir de moi"
    const rememberMe = this.tokenService.getRememberMe();
    console.log('TokenRefreshService: Rafraîchissement du token avec rememberMe:', rememberMe);

    // Préparer la requête avec le token de rafraîchissement
    const payload = { refreshToken };
    console.log('TokenRefreshService: Payload de la requête:', payload);

    // Utiliser withCredentials pour envoyer les cookies avec la requête
    // Même si nous n'avons pas de token de rafraîchissement dans le stockage local,
    // il pourrait être présent dans un cookie HTTP-only
    return this.http.post(`${this.API_URL}/token/refresh`, payload, { withCredentials: true })
      .pipe(
        tap((response: any) => {
          console.log('TokenRefreshService: Réponse du serveur:', response);

          // Extraire les données de la structure imbriquée
          if (response.data && response.data.accessToken) {
            // Utiliser la préférence "Se souvenir de moi" stockée
            this.tokenService.setTokens(
              response.data.accessToken,
              response.data.refreshToken,
              rememberMe
            );
            console.log('TokenRefreshService: Tokens rafraîchis avec rememberMe:', rememberMe);

            // Émettre un événement pour indiquer que les tokens ont été rafraîchis
            document.dispatchEvent(new CustomEvent('tokens-refreshed', {
              detail: { accessToken: response.data.accessToken }
            }));
          } else {
            console.error('TokenRefreshService: Réponse invalide du serveur:', response);
          }
        }),
        catchError(error => {
          console.error('TokenRefreshService: Erreur lors du rafraîchissement du token:', error);
          this.clearTokens();
          return throwError(() => error);
        }),
        finalize(() => {
          // Indiquer que le rafraîchissement est terminé
          this.refreshingToken.next(false);
        })
      );
  }

  /**
   * Rafraîchit le token d'accès de manière synchronisée (une seule requête à la fois)
   * @returns Promise avec les nouveaux tokens
   */
  refreshTokenSync(): Promise<any> {
    // Si une promesse existe déjà, la retourner
    if (this.refreshTokenPromise) {
      return this.refreshTokenPromise;
    }

    // Créer une nouvelle promesse
    this.refreshTokenPromise = new Promise((resolve, reject) => {
      this.refreshToken().subscribe({
        next: (response) => {
          resolve(response);
          this.refreshTokenPromise = null;
        },
        error: (error) => {
          reject(error);
          this.refreshTokenPromise = null;
        }
      });
    });

    return this.refreshTokenPromise;
  }

  /**
   * Supprime tous les tokens
   */
  clearTokens(): void {
    this.tokenService.clearTokens();
  }
}
