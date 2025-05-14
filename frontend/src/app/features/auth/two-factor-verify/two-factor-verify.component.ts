import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { TwoFactorAuthService } from '../../../core/services/two-factor-auth.service';
import { AuthService } from '../../../core/services/auth.service';
import { TokenService } from '../../../core/services/token.service';

@Component({
  selector: 'app-two-factor-verify',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './two-factor-verify.component.html',
  styles: []
})
export class TwoFactorVerifyComponent implements OnInit {
  loading = false;
  error = '';
  verificationForm!: FormGroup;
  submitted = false;
  tempToken = '';
  returnUrl = '/dashboard';

  constructor(
    private twoFactorAuthService: TwoFactorAuthService,
    private authService: AuthService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get return URL from route parameters or default to '/dashboard'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';

    // Get temp token from route parameters
    this.tempToken = this.route.snapshot.queryParams['token'] || '';

    if (!this.tempToken) {
      this.error = 'Token temporaire manquant. Veuillez vous reconnecter.';
      return;
    }

    this.verificationForm = this.formBuilder.group({
      verificationCode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });
  }

  /**
   * Getter for easy access to form fields
   */
  get f() {
    return this.verificationForm.controls;
  }

  /**
   * Verifies the 2FA code during login
   */
  verifyCode(): void {
    this.submitted = true;

    // Stop if form is invalid
    if (this.verificationForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    const verificationCode = this.verificationForm.value.verificationCode;

    this.twoFactorAuthService.verifyLogin(verificationCode, this.tempToken).subscribe({
      next: (response) => {
        this.loading = false;

        // Extract tokens and user data
        const { user, accessToken, refreshToken } = response.data;

        // Store tokens
        this.tokenService.setTokens(
          accessToken,
          refreshToken,
          true // Assuming "Remember Me" is enabled for 2FA users
        );

        // Update authentication state
        this.authService.setCurrentUser(user);

        // Navigate to return URL
        this.router.navigate([this.returnUrl]);
      },
      error: (error) => {
        this.loading = false;
        this.error = error.error?.message || 'Code de vérification invalide';
        console.error('Error verifying 2FA code:', error);
      }
    });
  }

  /**
   * Navigates back to login page
   */
  backToLogin(): void {
    this.router.navigate(['/login']);
  }
}
