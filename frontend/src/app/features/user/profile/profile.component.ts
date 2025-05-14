import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  profileForm!: FormGroup;
  submitted = false;
  updateSuccess = false;
  updateError = '';

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // Get current user
    this.user = this.authService.currentUser();

    // Initialize form
    this.initForm();

    // If user is not available, check auth status
    if (!this.user) {
      this.authService.checkAuthStatus().subscribe(isAuthenticated => {
        if (isAuthenticated) {
          this.user = this.authService.currentUser();
          this.initForm();
        }
      });
    }
  }

  /**
   * Initialize the profile form with user data
   */
  private initForm(): void {
    if (this.user) {
      this.profileForm = this.formBuilder.group({
        username: [this.user.username, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        email: [this.user.email, [Validators.required, Validators.email, Validators.maxLength(100)]],
        full_name: [this.user.full_name || '', [Validators.maxLength(100)]]
      });
    } else {
      this.profileForm = this.formBuilder.group({
        username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
        full_name: ['', [Validators.maxLength(100)]]
      });
    }
  }

  /**
   * Getter for easy access to form fields
   */
  get f() {
    return this.profileForm.controls;
  }

  /**
   * Handle form submission
   */
  onSubmit(): void {
    this.submitted = true;
    this.updateSuccess = false;
    this.updateError = '';

    // Stop if form is invalid
    if (this.profileForm.invalid) {
      return;
    }

    // TODO: Implement profile update functionality
    console.log('Profile update form submitted:', this.profileForm.value);

    // Simulate successful update
    this.updateSuccess = true;
  }
}
