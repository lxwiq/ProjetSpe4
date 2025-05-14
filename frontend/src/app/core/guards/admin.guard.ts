import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { map, take, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const AdminGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('AdminGuard: Vérification des droits d\'administration pour', state.url);

  // Vérification rapide basée sur l'état local
  const user = authService.currentUser();
  if (user && user.isAdmin === true) {
    console.log('AdminGuard: Utilisateur est admin, accès autorisé');
    return true;
  }

  // Vérification complète avec le serveur
  return authService.checkAuthStatus().pipe(
    take(1),
    tap(isAuthenticated => {
      console.log('AdminGuard: Résultat de checkAuthStatus:', isAuthenticated);
    }),
    map(isAuthenticated => {
      if (isAuthenticated) {
        const user = authService.currentUser();
        if (user && user.isAdmin === true) {
          console.log('AdminGuard: Utilisateur est admin, accès autorisé');
          return true;
        } else {
          console.log('AdminGuard: Utilisateur n\'est pas admin, accès refusé');
          // Rediriger vers le tableau de bord
          return router.createUrlTree(['/dashboard']);
        }
      } else {
        console.log('AdminGuard: Non authentifié, redirection vers login');
        // Rediriger vers la page de connexion avec l'URL de retour
        return router.createUrlTree(['/login'], {
          queryParams: { returnUrl: state.url }
        });
      }
    })
  );
};
