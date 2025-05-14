import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="admin-container">
      <header class="admin-header">
        <h1>Administration</h1>
      </header>
      
      <div class="admin-content">
        <div class="admin-card">
          <h2>Panneau d'administration</h2>
          <p>Bienvenue dans le panneau d'administration. Cette page est accessible uniquement aux administrateurs.</p>
          
          @if (authService.currentUser()) {
            <div class="admin-info">
              <p><strong>Administrateur connecté :</strong> {{ authService.currentUser()?.username }}</p>
            </div>
          }
          
          <div class="admin-sections">
            <div class="admin-section">
              <h3>Gestion des utilisateurs</h3>
              <p>Gérez les utilisateurs, leurs rôles et leurs permissions.</p>
              <button class="admin-btn">Gérer les utilisateurs</button>
            </div>
            
            <div class="admin-section">
              <h3>Statistiques</h3>
              <p>Consultez les statistiques d'utilisation de l'application.</p>
              <button class="admin-btn">Voir les statistiques</button>
            </div>
            
            <div class="admin-section">
              <h3>Configuration</h3>
              <p>Configurez les paramètres de l'application.</p>
              <button class="admin-btn">Configurer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    .admin-container {
      padding: 1rem 0;
    }
    
    .admin-header {
      margin-bottom: 2rem;
    }
    
    .admin-header h1 {
      color: #2c3e50;
      font-size: 2rem;
      margin: 0;
    }
    
    .admin-card {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      padding: 2rem;
    }
    
    .admin-card h2 {
      color: #2c3e50;
      margin-top: 0;
      margin-bottom: 1rem;
    }
    
    .admin-info {
      background-color: #f8f9fa;
      border-radius: 4px;
      padding: 1rem;
      margin: 1.5rem 0;
    }
    
    .admin-sections {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-top: 2rem;
    }
    
    .admin-section {
      background-color: #f8f9fa;
      border-radius: 8px;
      padding: 1.5rem;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    
    .admin-section:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    }
    
    .admin-section h3 {
      color: #2c3e50;
      margin-top: 0;
    }
    
    .admin-btn {
      background-color: #3498db;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      transition: background-color 0.2s;
      margin-top: 1rem;
    }
    
    .admin-btn:hover {
      background-color: #2980b9;
    }
  `
})
export class AdminComponent {
  constructor(public authService: AuthService) {
    console.log('Initialisation du composant Admin');
    console.log('Utilisateur admin:', this.authService.currentUser());
  }
}
