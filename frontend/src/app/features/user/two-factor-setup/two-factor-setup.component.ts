import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { TwoFactorAuthService } from '../../../core/services/two-factor-auth.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-two-factor-setup',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './two-factor-setup.component.html',
  styles: []
})
export class TwoFactorSetupComponent implements OnInit {
  loading = false;
  error = '';
  success = false;
  qrCodeUrl = '';
  secret = '';
  verificationForm!: FormGroup;
  submitted = false;
  setupStep = 1; // 1: Initial, 2: QR Code displayed, 3: Verification

  constructor(
    private twoFactorAuthService: TwoFactorAuthService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.verificationForm = this.formBuilder.group({
      verificationCode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });

    // Start the 2FA setup process
    this.setupTwoFactor();
  }

  /**
   * Getter for easy access to form fields
   */
  get f() {
    return this.verificationForm.controls;
  }

  /**
   * Initiates the 2FA setup process
   */
  setupTwoFactor(): void {
    this.loading = true;
    this.error = '';

    this.twoFactorAuthService.setupTwoFactor().subscribe({
      next: (response) => {
        this.loading = false;
        this.qrCodeUrl = response.data.qrCode;
        this.secret = response.data.secret;
        this.setupStep = 2;
      },
      error: (error) => {
        this.loading = false;
        this.error = error.error?.message || 'Une erreur est survenue lors de la configuration de la 2FA';
        console.error('Error setting up 2FA:', error);
      }
    });
  }

  /**
   * Verifies the 2FA setup with the provided verification code
   */
  verifySetup(): void {
    this.submitted = true;

    // Stop if form is invalid
    if (this.verificationForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    const verificationCode = this.verificationForm.value.verificationCode;

    // Pass both the verification code and the secret
    this.twoFactorAuthService.verifySetup(verificationCode, this.secret).subscribe({
      next: () => {
        this.loading = false;
        this.success = true;
        this.setupStep = 3;

        // Update user state to reflect 2FA is now enabled
        const currentUser = this.authService.currentUser();
        if (currentUser) {
          currentUser.two_factor_enabled = true;
          this.authService.setCurrentUser(currentUser);
        }
      },
      error: (error) => {
        this.loading = false;
        this.error = error.error?.message || 'Code de vérification invalide';
        console.error('Error verifying 2FA setup:', error);
      }
    });
  }

  /**
   * Navigates back to the profile page
   */
  goToProfile(): void {
    this.router.navigate(['/profile']);
  }
}
