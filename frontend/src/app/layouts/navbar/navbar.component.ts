import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <header class="app-header">
      <div class="container">
        <div class="header-content">
          <h1 class="app-title">{{ title }}</h1>
          
          <nav class="main-nav">
            @if (authService.isAuthenticated()) {
              <a routerLink="/dashboard" class="nav-link">Tableau de bord</a>
              <a routerLink="/documents" class="nav-link">Mes documents</a>
              <a routerLink="/messages" class="nav-link">Messages</a>
              
              <!-- Lien d'administration visible uniquement pour les admins -->
              @if (isAdmin()) {
                <a routerLink="/admin" class="nav-link admin-link">Administration</a>
              }
              
              <div class="user-menu">
                <span class="username">
                  @if (authService.currentUser()) {
                    {{ authService.currentUser()?.username }}
                  }
                </span>
                <button class="logout-btn" (click)="logout()">Déconnexion</button>
              </div>
            }
          </nav>
        </div>
      </div>
    </header>
  `,
  styles: `
    .app-header {
      background-color: #2c3e50;
      color: white;
      padding: 1rem 0;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .app-title {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 600;
    }
    
    .main-nav {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }
    
    .nav-link {
      color: white;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s;
    }
    
    .nav-link:hover {
      color: #3498db;
    }
    
    .admin-link {
      color: #f39c12;
    }
    
    .admin-link:hover {
      color: #f1c40f;
    }
    
    .user-menu {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-left: 1.5rem;
    }
    
    .username {
      font-weight: 500;
    }
    
    .logout-btn {
      background-color: #e74c3c;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      transition: background-color 0.2s;
    }
    
    .logout-btn:hover {
      background-color: #c0392b;
    }
  `
})
export class NavbarComponent {
  @Input() title: string = '';
  
  constructor(public authService: AuthService) {}
  
  isAdmin(): boolean {
    const user = this.authService.currentUser();
    return user ? user.isAdmin === true : false;
  }
  
  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        // Navigation handled by the service
      },
      error: () => {
        // Error handling done in the service
      }
    });
  }
}
