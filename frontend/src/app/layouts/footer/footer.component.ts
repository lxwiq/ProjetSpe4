import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="app-footer">
      <div class="container">
        <p>&copy; 2024 Application de Collaboration Documentaire</p>
      </div>
    </footer>
  `,
  styles: `
    .app-footer {
      background-color: #f8f9fa;
      padding: 1.5rem 0;
      margin-top: auto;
      border-top: 1px solid #e9ecef;
      text-align: center;
      color: #6c757d;
    }
    
    .container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 15px;
    }
  `
})
export class FooterComponent {}
