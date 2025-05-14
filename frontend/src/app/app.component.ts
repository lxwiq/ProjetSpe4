import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Application de Collaboration Documentaire';

  constructor(public authService: AuthService) {}

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
