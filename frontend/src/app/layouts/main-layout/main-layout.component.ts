import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { AlertComponent } from '../../shared/components/alert/alert.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, AlertComponent],
  template: `
    <div class="app-container">
      <app-navbar [title]="title"></app-navbar>

      <!-- Composant d'alerte pour les messages système -->
      <app-alert></app-alert>

      <main class="app-content">
        <div class="container">
          <router-outlet></router-outlet>
        </div>
      </main>

      <app-footer></app-footer>
    </div>
  `,
  styles: `
    .app-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .app-content {
      flex: 1;
      padding: 2rem 0;
    }

    .container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 15px;
    }
  `
})
export class MainLayoutComponent {
  title = 'Application de Collaboration Documentaire';
}
