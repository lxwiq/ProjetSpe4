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
  }

  login(email: string, password: string): Observable<any> {
    // Nettoyer les données précédentes avant de se connecter
    this.currentUserSubject.next(null);
    localStorage.removeItem('user_info');
    sessionStorage.clear();

    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }, { withCredentials: true })
      .pipe(
        tap(response => {
          if (response && response.data && response.data.user) {
            this.currentUserSubject.next(response.data.user);
            localStorage.setItem('user_info', JSON.stringify(response.data.user));
            this.isAuthenticatedSubject.next(true);
          }
        }),
        catchError(error => {
          console.error('Login error:', error);
          return of({ error: error.error || 'Une erreur est survenue lors de la connexion' });
        })
      );
  }

  logout(): Observable<any> {
    // Nettoyer les données locales d'abord pour s'assurer que l'utilisateur est déconnecté
    // même si l'appel API échoue
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    localStorage.removeItem('user_info');
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
    return !!this.currentUserSubject.value;
  }

  getToken(): string | null {
    // Récupérer le token JWT depuis les cookies
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'jwt') {
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
    if (userInfo) {
      try {
        const user = JSON.parse(userInfo);

        // Vérifier si l'utilisateur est toujours authentifié côté serveur
        this.verifySession(user);
      } catch (e) {
        localStorage.removeItem('user_info');
      }
    }
  }

  // Vérifier si la session est toujours valide côté serveur
  private verifySession(user: any): void {
    // Appel API pour vérifier si la session est toujours valide
    this.http.get<any>(`${this.apiUrl}/auth/check-session`, { withCredentials: true })
      .subscribe({
        next: (response) => {
          if (response && response.data && response.data.authenticated) {
            // Session valide, mettre à jour l'utilisateur si nécessaire
            this.currentUserSubject.next(user);
            this.isAuthenticatedSubject.next(true);
          } else {
            // Session invalide, supprimer les données locales
            this.currentUserSubject.next(null);
            this.isAuthenticatedSubject.next(false);
            localStorage.removeItem('user_info');
          }
        },
        error: () => {
          // En cas d'erreur, on suppose que l'utilisateur est authentifié localement
          // pour éviter de bloquer l'accès à l'application en cas de problème réseau
          this.currentUserSubject.next(user);
          this.isAuthenticatedSubject.next(true);
        }
      });
  }
}
