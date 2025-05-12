import {
  HttpRequest,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpErrorResponse
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<any> => {
  const router = inject(Router);

  // Ajouter withCredentials à toutes les requêtes pour envoyer les cookies
  request = request.clone({
    withCredentials: true
  });

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      // Gérer les erreurs d'authentification (401) et d'autorisation (403)
      if (error.status === 401) {
        // Rediriger vers la page de connexion
        router.navigate(['/login']);
      } else if (error.status === 403) {
        // Accès refusé - rediriger vers la page d'accès refusé
        router.navigate(['/access-denied']);
      }
      return throwError(() => error);
    })
  );
};
