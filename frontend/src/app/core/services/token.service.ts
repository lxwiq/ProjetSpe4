import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly ACCESS_TOKEN_KEY = 'access_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private readonly REMEMBER_ME_KEY = 'remember_me';

  constructor() {}

  /**
   * Stocke les tokens d'authentification
   * @param accessToken Token d'accès
   * @param refreshToken Token de rafraîchissement
   * @param rememberMe Si true, les tokens sont stockés de façon persistante
   */
  setTokens(accessToken: string, refreshToken?: string, rememberMe: boolean = false): void {
    console.log('TokenService: Stockage des tokens, rememberMe:', rememberMe);

    // Récupérer la préférence "Remember Me" actuelle
    const currentRememberMe = this.getRememberMe();

    // Si rememberMe n'est pas spécifié mais qu'il était activé précédemment, le conserver
    if (rememberMe === false && currentRememberMe === true) {
      console.log('TokenService: Conservation de la préférence "Remember Me" précédente');
      rememberMe = true;
    }

    // Stocker l'option rememberMe pour une utilisation ultérieure
    this.setRememberMe(rememberMe);

    // Déterminer où stocker les tokens
    const storage = rememberMe ? localStorage : sessionStorage;

    // Nettoyer les tokens existants pour éviter les doublons
    this.clearTokensWithoutRememberMe();

    // Stocker le token d'accès
    if (accessToken) {
      storage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
      console.log('TokenService: Token d\'accès stocké dans', rememberMe ? 'localStorage' : 'sessionStorage');
    } else {
      console.error('TokenService: Tentative de stockage d\'un token d\'accès vide');
    }

    // Stocker le token de rafraîchissement
    if (refreshToken) {
      storage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
      console.log('TokenService: Token de rafraîchissement stocké dans', rememberMe ? 'localStorage' : 'sessionStorage');
    }
  }

  /**
   * Stocke la préférence "Se souvenir de moi"
   * @param rememberMe Valeur de la préférence
   */
  setRememberMe(rememberMe: boolean): void {
    localStorage.setItem(this.REMEMBER_ME_KEY, rememberMe.toString());
    console.log('TokenService: Préférence "Se souvenir de moi" stockée:', rememberMe);
  }

  /**
   * Récupère la préférence "Se souvenir de moi"
   * @returns La valeur de la préférence ou false par défaut
   */
  getRememberMe(): boolean {
    const value = localStorage.getItem(this.REMEMBER_ME_KEY);

    // Si la valeur n'est pas définie mais que nous avons un token dans localStorage,
    // cela signifie probablement que "Remember Me" était activé
    if (value === null) {
      const hasLocalStorageToken = !!localStorage.getItem(this.ACCESS_TOKEN_KEY);
      if (hasLocalStorageToken) {
        console.log('TokenService: Préférence "Se souvenir de moi" déduite des tokens existants');
        this.setRememberMe(true);
        return true;
      }
    }

    const rememberMe = value === 'true';
    console.log('TokenService: Récupération de la préférence "Se souvenir de moi":', rememberMe);
    return rememberMe;
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
   * Supprime tous les tokens stockés sans affecter la préférence "Remember Me"
   */
  clearTokensWithoutRememberMe(): void {
    console.log('TokenService: Suppression des tokens existants sans affecter Remember Me');

    // Nettoyer à la fois localStorage et sessionStorage
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    sessionStorage.removeItem(this.ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(this.REFRESH_TOKEN_KEY);

    console.log('TokenService: Tokens existants supprimés');
  }

  /**
   * Supprime tous les tokens stockés
   */
  clearTokens(): void {
    console.log('TokenService: Suppression de tous les tokens');

    // Nettoyer à la fois localStorage et sessionStorage
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    sessionStorage.removeItem(this.ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(this.REFRESH_TOKEN_KEY);

    // Ne pas supprimer la préférence "Se souvenir de moi" pour la conserver
    // entre les sessions

    console.log('TokenService: Tokens supprimés');
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
