import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { LoggingService } from '../../../core/services/logging.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private logger: LoggingService
  ) {
    // Rediriger vers le dashboard si déjà connecté
    if (this.authService.isAuthenticated()) {
      this.logger.info('Utilisateur déjà connecté, redirection vers le dashboard', {
        component: 'LoginComponent'
      });
      this.router.navigate(['/dashboard']);
    }

    // Initialiser le formulaire
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });

    // Récupérer l'URL de retour des paramètres de requête ou utiliser la valeur par défaut
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    this.logger.debug('URL de retour initialisée', {
      component: 'LoginComponent',
      returnUrl: this.returnUrl
    });
  }

  // Getter pour accéder facilement aux champs du formulaire
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // Arrêter si le formulaire est invalide
    if (this.loginForm.invalid) {
      this.logger.debug('Formulaire de connexion invalide', {
        component: 'LoginComponent',
        formErrors: this.loginForm.errors
      });
      return;
    }

    this.loading = true;
    this.error = '';

    this.logger.info('Tentative de connexion', {
      component: 'LoginComponent',
      email: this.f['email'].value,
      rememberMe: this.f['rememberMe'].value
    });

    this.authService.login({
      email: this.f['email'].value,
      password: this.f['password'].value,
      rememberMe: this.f['rememberMe'].value
    }).subscribe({
      next: (response) => {
        this.logger.info('Connexion réussie', {
          component: 'LoginComponent',
          userId: response.data?.user?.id
        });
        this.loading = false; // Réinitialiser l'état de chargement

        // Vérifier si l'authentification à deux facteurs est requise
        if (response.data.requireTwoFactor) {
          this.logger.info('Authentification à deux facteurs requise', {
            component: 'LoginComponent'
          });
          // Rediriger vers la page de vérification 2FA avec le token temporaire
          this.router.navigate(['/verify-2fa'], {
            queryParams: {
              token: response.data.tempToken,
              returnUrl: this.returnUrl
            }
          });
        }
        // Sinon, vérifier que l'utilisateur est bien authentifié avant de rediriger
        else if (this.authService.isAuthenticated()) {
          this.logger.info('Redirection après connexion', {
            component: 'LoginComponent',
            returnUrl: this.returnUrl
          });
          this.router.navigate([this.returnUrl]);
        } else {
          this.logger.error('Authentification réussie mais isAuthenticated() retourne false', {
            component: 'LoginComponent'
          });
          this.error = 'Erreur lors de la mise à jour de l\'état d\'authentification';
        }
      },
      error: error => {
        this.logger.error('Erreur de connexion', {
          component: 'LoginComponent',
          error
        });
        this.error = error.error?.message || 'Une erreur est survenue lors de la connexion';
        this.loading = false;
      },
      complete: () => {
        this.logger.debug('Observable de connexion complété', {
          component: 'LoginComponent'
        });
      }
    });
  }
}
