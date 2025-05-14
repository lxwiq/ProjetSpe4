import {
  HttpRequest,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpErrorResponse
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';

import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';

// Variable pour suivre l'état du rafraîchissement du token
let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const AuthInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<any> => {
  const tokenService = inject(TokenService);
  const authService = inject(AuthService);

  // Ajouter le token d'authentification si disponible
  const token = tokenService.getAccessToken();
  if (token) {
    request = addToken(request, token);
  }

  // Ajouter withCredentials pour envoyer les cookies avec les requêtes
  request = request.clone({
    withCredentials: true
  });

  return next(request).pipe(
    catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        // Gérer les erreurs 401 (Non autorisé)
        return handle401Error(request, next, tokenService, authService);
      }
      return throwError(() => error);
    })
  );
};

function addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
}

function handle401Error(
  request: HttpRequest<any>,
  next: HttpHandlerFn,
  tokenService: TokenService,
  authService: AuthService
): Observable<any> {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    return authService.refreshToken().pipe(
      switchMap((response: any) => {
        isRefreshing = false;
        // Extraire le token d'accès de la structure de réponse
        const accessToken = response.data?.accessToken;
        refreshTokenSubject.next(accessToken);
        return next(addToken(request, accessToken));
      }),
      catchError((err) => {
        isRefreshing = false;
        authService.logout().subscribe();
        return throwError(() => err);
      })
    );
  } else {
    return refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap(jwt => {
        return next(addToken(request, jwt as string));
      })
    );
  }
}
