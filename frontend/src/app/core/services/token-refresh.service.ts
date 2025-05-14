import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

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

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  /**
   * Rafraîchit le token d'accès
   * @returns Observable avec les nouveaux tokens
   */
  refreshToken(): Observable<any> {
    console.log('TokenRefreshService: Tentative de rafraîchissement du token');

    // Récupérer le token de rafraîchissement depuis le stockage local
    const refreshToken = this.tokenService.getRefreshToken();

    // Récupérer la préférence "Se souvenir de moi"
    const rememberMe = this.tokenService.getRememberMe();
    console.log('TokenRefreshService: Rafraîchissement du token avec rememberMe:', rememberMe);

    // Préparer la requête avec ou sans le token de rafraîchissement
    const payload = refreshToken ? { refreshToken } : {};
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
          } else {
            console.error('TokenRefreshService: Réponse invalide du serveur:', response);
          }
        }),
        catchError(error => {
          console.error('TokenRefreshService: Erreur lors du rafraîchissement du token:', error);
          this.clearTokens();
          return throwError(() => error);
        })
      );
  }

  /**
   * Supprime tous les tokens
   */
  clearTokens(): void {
    this.tokenService.clearTokens();
  }
}
