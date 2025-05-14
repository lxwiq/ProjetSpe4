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
import { TokenRefreshService } from '../services/token-refresh.service';
import { Router } from '@angular/router';

// Variable pour suivre l'état du rafraîchissement du token
let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const AuthInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<any> => {
  const tokenService = inject(TokenService);
  const tokenRefreshService = inject(TokenRefreshService);
  const router = inject(Router);

  // Ignorer les requêtes de rafraîchissement de token pour éviter les boucles infinies
  if (request.url.includes('/token/refresh')) {
    return next(request);
  }

  // Toujours ajouter withCredentials pour envoyer les cookies avec les requêtes
  request = request.clone({
    withCredentials: true
  });

  // Si nous avons un token stocké localement, l'ajouter à l'en-tête Authorization
  // Cela permet de gérer à la fois les cookies HTTP-only et les tokens stockés localement
  const token = tokenService.getAccessToken();
  if (token) {
    console.log('AuthInterceptor: Ajout du token à l\'en-tête Authorization');
    request = addToken(request, token);
  } else {
    console.log('AuthInterceptor: Pas de token local, utilisation des cookies uniquement');
  }

  return next(request).pipe(
    catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        // Gérer les erreurs 401 (Non autorisé)
        return handle401Error(request, next, tokenRefreshService, router);
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
  tokenRefreshService: TokenRefreshService,
  router: Router
): Observable<any> {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    return tokenRefreshService.refreshToken().pipe(
      switchMap((response: any) => {
        isRefreshing = false;
        // Extraire le token d'accès de la structure de réponse
        const accessToken = response.data?.accessToken;
        refreshTokenSubject.next(accessToken);
        return next(addToken(request, accessToken));
      }),
      catchError((err) => {
        isRefreshing = false;
        // Au lieu d'appeler authService.logout(), on nettoie les tokens et on redirige
        tokenRefreshService.clearTokens();
        router.navigate(['/login']);
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
