import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly ACCESS_TOKEN_KEY = 'access_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';

  constructor() {}

  /**
   * Stocke les tokens d'authentification
   * @param accessToken Token d'accès
   * @param refreshToken Token de rafraîchissement
   * @param rememberMe Si true, les tokens sont stockés de façon persistante
   */
  setTokens(accessToken: string, refreshToken?: string, rememberMe: boolean = false): void {
    console.log('Stockage des tokens, rememberMe:', rememberMe);

    const storage = rememberMe ? localStorage : sessionStorage;

    if (accessToken) {
      storage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
      console.log('Token d\'accès stocké');
    } else {
      console.error('Tentative de stockage d\'un token d\'accès vide');
    }

    if (refreshToken) {
      storage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
      console.log('Token de rafraîchissement stocké');
    }
  }

  /**
   * Récupère le token d'accès
   * @returns Le token d'accès ou null s'il n'existe pas
   */
  getAccessToken(): string | null {
    const localToken = localStorage.getItem(this.ACCESS_TOKEN_KEY);
    const sessionToken = sessionStorage.getItem(this.ACCESS_TOKEN_KEY);
    const token = localToken || sessionToken;

    console.log('Récupération du token d\'accès:', !!token);
    return token;
  }

  /**
   * Récupère le token de rafraîchissement
   * @returns Le token de rafraîchissement ou null s'il n'existe pas
   */
  getRefreshToken(): string | null {
    const localToken = localStorage.getItem(this.REFRESH_TOKEN_KEY);
    const sessionToken = sessionStorage.getItem(this.REFRESH_TOKEN_KEY);
    const token = localToken || sessionToken;

    console.log('Récupération du token de rafraîchissement:', !!token);
    return token;
  }

  /**
   * Supprime tous les tokens stockés
   */
  clearTokens(): void {
    console.log('Suppression de tous les tokens');

    // Nettoyer à la fois localStorage et sessionStorage
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    sessionStorage.removeItem(this.ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(this.REFRESH_TOKEN_KEY);

    console.log('Tokens supprimés');
  }

  /**
   * Vérifie si l'utilisateur est connecté en vérifiant la présence d'un token
   * @returns true si un token d'accès existe
   */
  isLoggedIn(): boolean {
    const isLoggedIn = !!this.getAccessToken();
    console.log('Vérification si l\'utilisateur est connecté:', isLoggedIn);
    return isLoggedIn;
  }
}
