import {Component, OnInit} from '@angular/core';
import {ButtonComponent} from '../../core/components/button/button.component';
import {AuthService} from '../../core/services/auth.service';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin-page',
  imports: [
    ButtonComponent,
    ReactiveFormsModule
  ],
  templateUrl: './signin-page.component.html',
  styleUrl: './signin-page.component.css'
})
export class SigninPageComponent implements OnInit {
  mail = new FormControl('');
  password = new FormControl('');
  rememberMe = new FormControl(false);
  loginError: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    // Vérifier si l'utilisateur est déjà connecté
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit() {
    this.loginError = '';
    this.isLoading = true;

    // Vérifier que les champs ne sont pas vides
    if (!this.mail.value || !this.password.value) {
      this.loginError = 'Veuillez remplir tous les champs';
      this.isLoading = false;
      return;
    }

    this.authService.login(this.mail.value, this.password.value).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.error) {
          this.loginError = response.error;
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.loginError = error.message || 'Une erreur est survenue lors de la connexion';
      }
    });
  }
}
