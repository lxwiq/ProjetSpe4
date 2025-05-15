import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { map, take, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('AuthGuard: Vérification de l\'authentification pour', state.url);
  console.log('AuthGuard: État actuel:', {
    isAuthenticated: authService.isAuthenticated(),
    user: authService.currentUser()
  });

  // Vérification rapide basée sur l'état local
  if (authService.isAuthenticated()) {
    console.log('AuthGuard: Déjà authentifié localement, accès autorisé');
    return true;
  }

  // Vérification complète avec le serveur
  return authService.checkAuthStatus().pipe(
    take(1),
    tap(isAuthenticated => {
      console.log('AuthGuard: Résultat de checkAuthStatus:', isAuthenticated);
    }),
    map(isAuthenticated => {
      if (isAuthenticated) {
        console.log('AuthGuard: Authentifié, accès autorisé');
        return true;
      } else {
        console.log('AuthGuard: Non authentifié, redirection vers login');
        // Rediriger vers la page de connexion avec l'URL de retour
        return router.createUrlTree(['/login'], {
          queryParams: { returnUrl: state.url }
        });
      }
    })
  );
};
