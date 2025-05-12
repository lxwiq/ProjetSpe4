import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../core/components/button/button.component';

@Component({
  selector: 'app-access-denied',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div class="flex flex-col items-center justify-center min-h-[80vh] p-4">
      <div class="text-red-500 text-6xl mb-4">
        <i class="fas fa-exclamation-triangle"></i>
      </div>
      <h1 class="text-2xl font-bold mb-2">Accès refusé</h1>
      <p class="text-gray-600 mb-6">Vous n'avez pas les permissions nécessaires pour accéder à cette page.</p>
      <app-button (click)="goBack()">Retour au tableau de bord</app-button>
    </div>
  `,
  styles: []
})
export class AccessDeniedComponent {
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
