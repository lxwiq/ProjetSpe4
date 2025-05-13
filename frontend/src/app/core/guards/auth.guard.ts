import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Vérifier l'état d'authentification en utilisant l'observable
  return authService.isAuthenticated$.pipe(
    take(1),
    map(isAuthenticated => {
      if (isAuthenticated) {
        // L'utilisateur est connecté
        return true;
      } else {
        // L'utilisateur n'est pas connecté, vérifier s'il est connecté localement
        if (authService.isLoggedIn()) {
          return true;
        }

        // Rediriger vers la page de connexion
        router.navigate(['/login']);
        return false;
      }
    })
  );
};
