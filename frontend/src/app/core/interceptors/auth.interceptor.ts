import {
  HttpRequest,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpErrorResponse
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
import { catchError, filter, take, switchMap, finalize, delay, retry, tap } from 'rxjs/operators';

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
    // Ajouter une stratégie de retry pour les erreurs réseau temporaires
    retry({
      count: 2, // Nombre de tentatives
      delay: (error, retryCount) => {
        // Ne pas réessayer pour les erreurs d'authentification ou les erreurs serveur
        if (error instanceof HttpErrorResponse &&
            (error.status === 401 || error.status === 403 || error.status >= 500)) {
          return throwError(() => error);
        }

        // Délai exponentiel pour les autres erreurs
        const delayMs = retryCount * 1000; // 1s, 2s
        console.log(`AuthInterceptor: Tentative de réessai ${retryCount} dans ${delayMs}ms`);
        return of(null).pipe(delay(delayMs));
      }
    }),
    catchError(error => {
      if (error instanceof HttpErrorResponse) {
        // Gérer les erreurs 401 (Non autorisé)
        if (error.status === 401) {
          return handle401Error(request, next, tokenRefreshService, router);
        }

        // Gérer les erreurs 403 (Accès refusé)
        if (error.status === 403) {
          console.error('AuthInterceptor: Accès refusé (403)', error);
          // Afficher un message à l'utilisateur
          alert('Vous n\'avez pas les droits nécessaires pour effectuer cette action.');
          return throwError(() => error);
        }

        // Gérer les erreurs de connexion
        if (error.status === 0) {
          console.error('AuthInterceptor: Erreur de connexion au serveur', error);
          // Afficher un message à l'utilisateur
          if (!request.url.includes('/check-session')) { // Éviter les alertes pour les vérifications de session
            alert('Impossible de se connecter au serveur. Veuillez vérifier votre connexion internet.');
          }
          return throwError(() => error);
        }

        // Gérer les erreurs serveur (5xx)
        if (error.status >= 500) {
          console.error(`AuthInterceptor: Erreur serveur (${error.status})`, error);
          // Afficher un message à l'utilisateur
          alert('Une erreur est survenue sur le serveur. Veuillez réessayer plus tard.');
          return throwError(() => error);
        }
      }

      // Pour toutes les autres erreurs
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
  console.log('AuthInterceptor: Gestion d\'une erreur 401');

  // Si le rafraîchissement est déjà en cours, attendre qu'il soit terminé
  if (isRefreshing) {
    console.log('AuthInterceptor: Rafraîchissement déjà en cours, mise en attente de la requête');
    return refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap(jwt => {
        console.log('AuthInterceptor: Token rafraîchi, reprise de la requête');
        return next(addToken(request, jwt as string));
      }),
      catchError(error => {
        console.error('AuthInterceptor: Erreur lors de l\'attente du rafraîchissement', error);
        router.navigate(['/login']);
        return throwError(() => error);
      })
    );
  }

  // Sinon, lancer le processus de rafraîchissement
  isRefreshing = true;
  refreshTokenSubject.next(null);

  console.log('AuthInterceptor: Tentative de rafraîchissement du token');

  return tokenRefreshService.refreshToken().pipe(
    tap(response => {
      console.log('AuthInterceptor: Token rafraîchi avec succès', response);
    }),
    switchMap((response: any) => {
      // Extraire le token d'accès de la structure de réponse
      const accessToken = response.data?.accessToken;

      if (!accessToken) {
        console.error('AuthInterceptor: Pas de token d\'accès dans la réponse');
        throw new Error('Pas de token d\'accès dans la réponse');
      }

      console.log('AuthInterceptor: Nouveau token obtenu, reprise de la requête');
      refreshTokenSubject.next(accessToken);
      return next(addToken(request, accessToken));
    }),
    catchError((err) => {
      console.error('AuthInterceptor: Échec du rafraîchissement du token', err);

      // Si l'erreur est liée à l'expiration du token de rafraîchissement
      if (err instanceof HttpErrorResponse &&
          (err.status === 401 || err.error?.message?.includes('expiré'))) {
        console.log('AuthInterceptor: Token de rafraîchissement expiré, redirection vers la page de connexion');
      } else {
        console.error('AuthInterceptor: Erreur inattendue lors du rafraîchissement du token', err);
      }

      // Nettoyer les tokens et rediriger vers la page de connexion
      tokenRefreshService.clearTokens();
      router.navigate(['/login']);
      return throwError(() => err);
    }),
    finalize(() => {
      console.log('AuthInterceptor: Fin du processus de rafraîchissement');
      isRefreshing = false;
    })
  );
}
