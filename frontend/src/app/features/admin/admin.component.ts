import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { LoggingService } from '../../core/services/logging.service';
import { UserManagementComponent } from './user-management/user-management.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, UserManagementComponent],
  template: `
    <div class="min-h-screen bg-gray-100 p-6">
      <header class="mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Administration</h1>
        @if (authService.currentUser()) {
          <p class="text-gray-600 mt-2">
            Connecté en tant que <span class="font-medium">{{ authService.currentUser()?.username }}</span>
          </p>
        }
      </header>

      <div class="grid grid-cols-1 gap-6">
        <!-- Onglets d'administration -->
        <div class="bg-white rounded-lg shadow-md p-4">
          <div class="flex border-b border-gray-200">
            <button
              (click)="activeTab.set('users')"
              class="py-2 px-4 font-medium text-sm focus:outline-none"
              [class.text-indigo-600]="activeTab() === 'users'"
              [class.border-indigo-600]="activeTab() === 'users'"
              [class.border-b-2]="activeTab() === 'users'"
              [class.text-gray-500]="activeTab() !== 'users'"
            >
              Gestion des utilisateurs
            </button>
            <button
              (click)="activeTab.set('stats')"
              class="py-2 px-4 font-medium text-sm focus:outline-none"
              [class.text-indigo-600]="activeTab() === 'stats'"
              [class.border-indigo-600]="activeTab() === 'stats'"
              [class.border-b-2]="activeTab() === 'stats'"
              [class.text-gray-500]="activeTab() !== 'stats'"
            >
              Statistiques
            </button>
            <button
              (click)="activeTab.set('config')"
              class="py-2 px-4 font-medium text-sm focus:outline-none"
              [class.text-indigo-600]="activeTab() === 'config'"
              [class.border-indigo-600]="activeTab() === 'config'"
              [class.border-b-2]="activeTab() === 'config'"
              [class.text-gray-500]="activeTab() !== 'config'"
            >
              Configuration
            </button>
          </div>
        </div>

        <!-- Contenu des onglets -->
        @if (activeTab() === 'users') {
          <app-user-management></app-user-management>
        } @else if (activeTab() === 'stats') {
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Statistiques</h2>
            <p class="text-gray-600">Les statistiques seront disponibles prochainement.</p>
          </div>
        } @else if (activeTab() === 'config') {
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Configuration</h2>
            <p class="text-gray-600">Les options de configuration seront disponibles prochainement.</p>
          </div>
        }
      </div>
    </div>
  `
})
export class AdminComponent {
  // État de l'onglet actif
  activeTab = signal<'users' | 'stats' | 'config'>('users');

  constructor(
    public authService: AuthService,
    private logger: LoggingService
  ) {
    this.logger.info('Initialisation du composant Admin', {
      component: 'AdminComponent'
    });
    this.logger.debug('Utilisateur admin:', {
      component: 'AdminComponent',
      user: this.authService.currentUser()
    });
  }
}
