import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
    private authService: AuthService
  ) {
    // Rediriger vers le dashboard si déjà connecté
    if (this.authService.isAuthenticated()) {
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
  }

  // Getter pour accéder facilement aux champs du formulaire
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // Arrêter si le formulaire est invalide
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.login({
      email: this.f['email'].value,
      password: this.f['password'].value,
      rememberMe: this.f['rememberMe'].value
    }).subscribe({
      next: (response) => {
        console.log('Connexion réussie:', response);
        this.loading = false; // Réinitialiser l'état de chargement

        // Vérifier que l'utilisateur est bien authentifié avant de rediriger
        if (this.authService.isAuthenticated()) {
          console.log('Redirection vers:', this.returnUrl);
          this.router.navigate([this.returnUrl]);
        } else {
          console.error('Authentification réussie mais isAuthenticated() retourne false');
          this.error = 'Erreur lors de la mise à jour de l\'état d\'authentification';
        }
      },
      error: error => {
        console.error('Erreur de connexion:', error);
        this.error = error.error?.message || 'Une erreur est survenue lors de la connexion';
        this.loading = false;
      },
      complete: () => {
        console.log('Observable de connexion complété');
      }
    });
  }
}
