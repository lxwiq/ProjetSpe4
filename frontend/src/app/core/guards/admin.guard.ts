import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (!authService.isLoggedIn()) {
    // L'utilisateur n'est pas connecté, rediriger vers la page de connexion
    router.navigate(['/login']);
    return false;
  }
  
  if (!authService.isAdmin()) {
    // L'utilisateur est connecté mais n'est pas administrateur
    // Rediriger vers une page d'accès refusé ou le tableau de bord
    router.navigate(['/access-denied']);
    return false;
  }
  
  // L'utilisateur est connecté et est administrateur
  return true;
};
