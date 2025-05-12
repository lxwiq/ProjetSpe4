import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../core/components/button/button.component';

interface User {
  id: number;
  username: string;
  email: string;
  full_name: string;
  is_admin: boolean;
  is_active: boolean;
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div class="p-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Gestion des utilisateurs</h1>
        <app-button (click)="goBack()">Retour</app-button>
      </div>

      <div *ngIf="loading" class="text-center py-8">
        <p>Chargement des utilisateurs...</p>
      </div>

      <div *ngIf="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {{ error }}
      </div>

      <div *ngIf="!loading && !error" class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom d'utilisateur</th>
              <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom complet</th>
              <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin</th>
              <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
              <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let user of users" class="border-b border-gray-200">
              <td class="px-6 py-4 whitespace-nowrap">{{ user.id }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ user.username }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ user.email }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ user.full_name }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span *ngIf="user.is_admin" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Oui</span>
                <span *ngIf="!user.is_admin" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Non</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span *ngIf="user.is_active" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Actif</span>
                <span *ngIf="!user.is_active" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Inactif</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <button *ngIf="user.is_active"
                        (click)="toggleUserStatus(user.id, false)"
                        class="text-red-600 hover:text-red-900 mr-2">
                  Désactiver
                </button>
                <button *ngIf="!user.is_active"
                        (click)="toggleUserStatus(user.id, true)"
                        class="text-green-600 hover:text-green-900 mr-2">
                  Activer
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: []
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  loading = true;
  error = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.error = '';

    this.http.get<any>('http://localhost:3000/admin/users')
      .subscribe({
        next: (response) => {
          this.users = response.data || [];
          this.loading = false;
        },
        error: (err) => {
          this.error = err.message || 'Une erreur est survenue lors du chargement des utilisateurs';
          this.loading = false;
        }
      });
  }

  toggleUserStatus(userId: number, activate: boolean): void {
    const endpoint = activate ?
      `http://localhost:3000/admin/users/${userId}/activate` :
      `http://localhost:3000/admin/users/${userId}/deactivate`;

    this.http.put(endpoint, {})
      .subscribe({
        next: () => {
          // Mettre à jour l'utilisateur dans la liste
          const userIndex = this.users.findIndex(u => u.id === userId);
          if (userIndex !== -1) {
            this.users[userIndex].is_active = activate;
          }
        },
        error: (err) => {
          this.error = err.message || `Une erreur est survenue lors de la modification du statut de l'utilisateur`;
        }
      });
  }

  goBack(): void {
    this.router.navigate(['/admin']);
  }
}
