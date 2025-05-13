import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private currentUserSubject = new BehaviorSubject<any>(null);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  public currentUser$ = this.currentUserSubject.asObservable();
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    // Vérifier si l'utilisateur est déjà connecté au démarrage
    this.checkAuthStatus();

    // Vérifier l'état d'authentification à chaque changement de focus de la fenêtre
    window.addEventListener('focus', () => {
      this.checkAuthStatus();
    });
  }

  // Méthode pour essayer de reconnecter automatiquement l'utilisateur
  autoLogin(): void {
    const rememberMe = localStorage.getItem('remember_me') === 'true';
    const token = localStorage.getItem('auth_token');
    const userInfo = localStorage.getItem('user_info');

    if (rememberMe && token && userInfo) {
      try {
        const user = JSON.parse(userInfo);

        // Mettre à jour l'état d'authentification
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);

        // Vérifier si la session est toujours valide côté serveur
        this.verifySession(user, rememberMe);
      } catch (e) {
        console.error('Erreur lors de la reconnexion automatique:', e);
      }
    }
  }

  login(email: string, password: string, rememberMe: boolean = false): Observable<any> {
    // Nettoyer les données précédentes avant de se connecter
    this.currentUserSubject.next(null);
    localStorage.removeItem('user_info');
    localStorage.removeItem('remember_me');
    sessionStorage.clear();

    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }, { withCredentials: true })
      .pipe(
        tap(response => {
          if (response && response.data) {
            // Stocker l'utilisateur
            if (response.data.user) {
              this.currentUserSubject.next(response.data.user);
              localStorage.setItem('user_info', JSON.stringify(response.data.user));
            }

            // Stocker le token si présent dans la réponse
            if (response.data.token) {
              localStorage.setItem('auth_token', response.data.token);
            }

            // Si "Se souvenir de moi" est coché, stocker cette préférence
            if (rememberMe) {
              localStorage.setItem('remember_me', 'true');
            }

            this.isAuthenticatedSubject.next(true);
          }
        }),
        catchError(error => {
          console.error('Login error:', error);

          // Gérer les différents types d'erreurs d'authentification
          let errorMessage = 'Une erreur est survenue lors de la connexion';

          if (error.status === 401) {
            // Erreur d'authentification (mot de passe incorrect)
            errorMessage = error.error?.message || 'Identifiants incorrects';
          } else if (error.status === 403) {
            // Compte verrouillé
            errorMessage = error.error?.message || 'Compte temporairement verrouillé';
          } else if (error.status === 404) {
            // Utilisateur non trouvé
            errorMessage = 'Utilisateur non trouvé';
          } else if (error.error) {
            // Autres erreurs avec un message
            errorMessage = error.error.message || error.error;
          }

          return of({ error: errorMessage });
        })
      );
  }

  logout(): Observable<any> {
    // Nettoyer les données locales d'abord pour s'assurer que l'utilisateur est déconnecté
    // même si l'appel API échoue
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    localStorage.removeItem('user_info');
    localStorage.removeItem('remember_me');
    localStorage.removeItem('auth_token'); // Supprimer le token
    sessionStorage.clear(); // Nettoyer également le sessionStorage

    // Supprimer tous les cookies liés à l'authentification
    this.clearAuthCookies();

    // Ensuite, essayer de se déconnecter côté serveur
    return this.http.post<any>(`${this.apiUrl}/login/logout`, {}, { withCredentials: true })
      .pipe(
        tap(() => {
          // La navigation est déjà effectuée ici pour éviter les problèmes de timing
          this.router.navigate(['/login']);
        }),
        catchError(error => {
          console.error('Logout error:', error);
          // Même en cas d'erreur, on redirige vers la page de connexion
          this.router.navigate(['/login']);
          return of({ success: true }); // Simuler un succès pour le frontend
        })
      );
  }

  // Méthode pour supprimer tous les cookies liés à l'authentification
  private clearAuthCookies(): void {
    // Supprimer tous les cookies en les expirant
    document.cookie.split(';').forEach(cookie => {
      document.cookie = cookie.replace(/^ +/, '').replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
    });
  }

  isLoggedIn(): boolean {
    // Vérifier d'abord l'état d'authentification du BehaviorSubject
    if (this.isAuthenticatedSubject.value) {
      return true;
    }

    // Ensuite, vérifier si un token est présent dans le localStorage et si "Se souvenir de moi" est activé
    const token = localStorage.getItem('auth_token');
    const rememberMe = localStorage.getItem('remember_me') === 'true';

    return !!(token && rememberMe);
  }

  getToken(): string | null {
    // Essayer d'abord de récupérer le token depuis le localStorage
    const token = localStorage.getItem('auth_token');
    if (token) {
      return token;
    }

    // Sinon, essayer de récupérer depuis les cookies (comme fallback)
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'jwt_token') {
        return value;
      }
    }
    return null;
  }

  isAdmin(): boolean {
    const currentUser = this.currentUserSubject.value;
    return currentUser ? currentUser.isAdmin === true : false;
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  private checkAuthStatus(): void {
    const userInfo = localStorage.getItem('user_info');
    const rememberMe = localStorage.getItem('remember_me') === 'true';
    const token = localStorage.getItem('auth_token');

    if (userInfo) {
      try {
        const user = JSON.parse(userInfo);

        // Vérifier si l'utilisateur est toujours authentifié côté serveur
        this.verifySession(user, rememberMe);
      } catch (e) {
        console.error('Erreur lors de la vérification du statut d\'authentification:', e);
        this.clearAuthData();
      }
    } else if (rememberMe && token) {
      // Si "Se souvenir de moi" est activé et qu'un token est présent, essayer de reconnecter automatiquement
      this.autoLogin();
    } else {
      // Aucune information utilisateur, s'assurer que l'état d'authentification est à false
      this.isAuthenticatedSubject.next(false);
    }
  }

  private clearAuthData(): void {
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);

    // Vérifier si "Se souvenir de moi" est activé
    const rememberMe = localStorage.getItem('remember_me') === 'true';

    // Supprimer les informations utilisateur
    localStorage.removeItem('user_info');

    // Si "Se souvenir de moi" n'est pas activé, supprimer également le token
    if (!rememberMe) {
      localStorage.removeItem('auth_token');
    }
    // Ne pas supprimer remember_me pour conserver la préférence de l'utilisateur
  }

  // Vérifier si la session est toujours valide côté serveur
  private verifySession(user: any, rememberMe: boolean): void {
    // Appel API pour vérifier si la session est toujours valide
    this.http.get<any>(`${this.apiUrl}/auth/check-session`, { withCredentials: true })
      .subscribe({
        next: (response) => {
          if (response && response.data && response.data.authenticated) {
            // Session valide, mettre à jour l'utilisateur si nécessaire
            const updatedUser = response.data.user || user;
            this.currentUserSubject.next(updatedUser);
            this.isAuthenticatedSubject.next(true);

            // Mettre à jour les informations utilisateur dans le stockage local
            localStorage.setItem('user_info', JSON.stringify(updatedUser));
          } else {
            // Session invalide
            if (rememberMe) {
              // Si "Se souvenir de moi" est activé, conserver l'état d'authentification côté client
              // mais mettre à jour l'état pour refléter que la session côté serveur n'est plus valide
              this.isAuthenticatedSubject.next(false);

              // Conserver les informations utilisateur pour permettre la reconnexion automatique
              this.currentUserSubject.next(user);
            } else {
              // Si "Se souvenir de moi" n'est pas activé, supprimer les données locales
              this.clearAuthData();
              this.router.navigate(['/login']);
            }
          }
        },
        error: (error) => {
          console.error('Erreur lors de la vérification de la session:', error);

          // En cas d'erreur, conserver l'état d'authentification si "Se souvenir de moi" est activé
          if (rememberMe) {
            // Mettre à jour l'état pour refléter que la session côté serveur n'est plus valide
            this.isAuthenticatedSubject.next(false);

            // Conserver les informations utilisateur pour permettre la reconnexion automatique
            this.currentUserSubject.next(user);
          } else {
            // Si "Se souvenir de moi" n'est pas activé, supprimer les données locales
            this.clearAuthData();
            this.router.navigate(['/login']);
          }
        }
      });
  }
}
