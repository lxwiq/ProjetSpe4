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
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    // Vérifier si l'utilisateur est déjà connecté au démarrage
    this.checkAuthStatus();
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }, { withCredentials: true })
      .pipe(
        tap(response => {
          if (response && response.data && response.data.user) {
            this.currentUserSubject.next(response.data.user);
            localStorage.setItem('user_info', JSON.stringify(response.data.user));
          }
        }),
        catchError(error => {
          console.error('Login error:', error);
          return of({ error: error.error || 'Une erreur est survenue lors de la connexion' });
        })
      );
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login/logout`, {}, { withCredentials: true })
      .pipe(
        tap(() => {
          this.currentUserSubject.next(null);
          localStorage.removeItem('user_info');
          this.router.navigate(['/login']);
        }),
        catchError(error => {
          console.error('Logout error:', error);
          return of({ error: error.error || 'Une erreur est survenue lors de la déconnexion' });
        })
      );
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
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
        this.currentUserSubject.next(user);
      } catch (e) {
        localStorage.removeItem('user_info');
      }
    }
  }
}
