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
  styles: []
})
export class DashboardComponent {
  user: User | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    // Récupérer l'utilisateur actuel
    this.user = this.authService.currentUser();

    // Si l'utilisateur n'est pas disponible, vérifier l'état d'authentification
    if (!this.user) {
      this.authService.checkAuthStatus().subscribe(isAuthenticated => {
        if (isAuthenticated) {
          this.user = this.authService.currentUser();
        } else {
          this.router.navigate(['/login']);
        }
      });
    }
  }
}
