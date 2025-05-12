import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ButtonComponent } from '../../../core/components/button/button.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterLink, ButtonComponent],
  template: `
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-6">Tableau de bord administrateur</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-xl font-semibold mb-4">Gestion des utilisateurs</h2>
          <p class="mb-4">Gérer les comptes utilisateurs, activer/désactiver des comptes.</p>
          <a routerLink="/admin/users" class="text-blue-600 hover:underline">Gérer les utilisateurs →</a>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-xl font-semibold mb-4">Statistiques</h2>
          <p class="mb-4">Consulter les statistiques d'utilisation de la plateforme.</p>
          <a routerLink="/admin/stats" class="text-blue-600 hover:underline">Voir les statistiques →</a>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-xl font-semibold mb-4">Configuration</h2>
          <p class="mb-4">Paramètres généraux de l'application.</p>
          <a routerLink="/admin/settings" class="text-blue-600 hover:underline">Configurer l'application →</a>
        </div>
      </div>

      <div class="mt-8">
        <app-button (click)="goBack()">Retour au tableau de bord</app-button>
      </div>
    </div>
  `,
  styles: []
})
export class AdminDashboardComponent {
  constructor(private authService: AuthService, private router: Router) {}

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
