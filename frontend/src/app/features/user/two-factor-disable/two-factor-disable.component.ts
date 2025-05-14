import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { TwoFactorAuthService } from '../../../core/services/two-factor-auth.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-two-factor-disable',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './two-factor-disable.component.html',
  styles: []
})
export class TwoFactorDisableComponent implements OnInit {
  loading = false;
  error = '';
  success = false;
  verificationForm!: FormGroup;
  submitted = false;

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
  }

  /**
   * Getter for easy access to form fields
   */
  get f() {
    return this.verificationForm.controls;
  }

  /**
   * Disables 2FA with the provided verification code
   */
  disableTwoFactor(): void {
    this.submitted = true;

    // Stop if form is invalid
    if (this.verificationForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    const verificationCode = this.verificationForm.value.verificationCode;

    this.twoFactorAuthService.disableTwoFactor(verificationCode).subscribe({
      next: () => {
        this.loading = false;
        this.success = true;

        // Update user state to reflect 2FA is now disabled
        const currentUser = this.authService.currentUser();
        if (currentUser) {
          currentUser.two_factor_enabled = false;
          this.authService.setCurrentUser(currentUser);
        }
      },
      error: (error) => {
        this.loading = false;
        this.error = error.error?.message || 'Code de vérification invalide';
        console.error('Error disabling 2FA:', error);
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
