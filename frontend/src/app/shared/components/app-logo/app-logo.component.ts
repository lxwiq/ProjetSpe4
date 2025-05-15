import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a [routerLink]="routerLink" class="flex items-center">
      <svg 
        [attr.width]="size" 
        [attr.height]="size" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        [class]="colorClass"
      >
        <!-- Documents empilés avec icône de partage -->
        <path 
          d="M7 18H17V6H7V18Z" 
          stroke="currentColor" 
          stroke-width="2" 
          fill="none"
        />
        <path 
          d="M5 20H15V8H5V20Z" 
          stroke="currentColor" 
          stroke-width="2" 
          fill="none"
        />
        <path 
          d="M9 14H13" 
          stroke="currentColor" 
          stroke-width="2" 
          stroke-linecap="round"
        />
        <path 
          d="M9 11H13" 
          stroke="currentColor" 
          stroke-width="2" 
          stroke-linecap="round"
        />
        <path 
          d="M16 12L19 9M19 9L16 6M19 9H12" 
          stroke="currentColor" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round"
        />
      </svg>
      @if (showText) {
        <span [class]="textClass">{{ text }}</span>
      }
    </a>
  `,
  styles: [`
    a {
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  `]
})
export class AppLogoComponent {
  @Input() size: string = '32';
  @Input() showText: boolean = true;
  @Input() text: string = 'DocCollab';
  @Input() colorClass: string = 'text-white';
  @Input() textClass: string = 'text-white font-bold text-lg';
  @Input() routerLink: string = '/dashboard';
}
