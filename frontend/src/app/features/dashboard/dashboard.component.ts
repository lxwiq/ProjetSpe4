import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  user: User | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    console.log('Initialisation du composant Dashboard');

    // Récupérer l'utilisateur actuel
    this.user = this.authService.currentUser();
    console.log('Utilisateur actuel dans Dashboard:', this.user);

    // Si l'utilisateur n'est pas disponible, vérifier l'état d'authentification
    if (!this.user) {
      console.log('Utilisateur non disponible, vérification de l\'état d\'authentification');
      this.authService.checkAuthStatus().subscribe(isAuthenticated => {
        console.log('Résultat de la vérification d\'authentification:', isAuthenticated);
        if (isAuthenticated) {
          this.user = this.authService.currentUser();
          console.log('Utilisateur mis à jour:', this.user);
        } else {
          console.error('Non authentifié, redirection vers login');
          this.router.navigate(['/login']);
        }
      });
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: () => {
        // Même en cas d'erreur, on redirige vers la page de login
        this.router.navigate(['/login']);
      }
    });
  }
}
