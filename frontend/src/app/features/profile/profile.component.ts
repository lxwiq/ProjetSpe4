import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../core/components/button/button.component';
import { ProfileService } from '../../core/services/profile.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  passwordForm!: FormGroup;
  user: User | null = null;
  isLoading = false;
  successMessage = '';
  errorMessage = '';
  activeTab = 'profile'; // 'profile' ou 'security'

  // Pour l'upload d'image
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.initForms();
    this.loadUserProfile();
  }

  initForms(): void {
    this.profileForm = this.fb.group({
      username: ['', [Validators.required]],
      full_name: [''],
      email: ['', [Validators.required, Validators.email]]
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (newPassword !== confirmPassword) {
      return { 'passwordMismatch': true };
    }

    return null;
  }

  loadUserProfile(): void {
    this.isLoading = true;
    this.profileService.getUserProfile().subscribe({
      next: (user) => {
        this.user = user;
        if (user) {
          this.profileForm.patchValue({
            username: user.username || '',
            full_name: user.full_name || '',
            email: user.email || ''
          });
          this.previewUrl = user.profile_image || null;
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement du profil';
        this.isLoading = false;
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];

      // Créer une prévisualisation de l'image
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  uploadImage(): void {
    if (!this.selectedFile) {
      return;
    }

    this.isLoading = true;
    this.profileService.uploadProfileImage(this.selectedFile).subscribe({
      next: (response) => {
        this.successMessage = 'Image de profil mise à jour avec succès';
        this.errorMessage = '';
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de l\'upload de l\'image';
        this.successMessage = '';
        this.isLoading = false;
      }
    });
  }

  updateProfile(): void {
    if (this.profileForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.profileService.updateProfile(this.profileForm.value).subscribe({
      next: (user) => {
        this.user = user;
        this.successMessage = 'Profil mis à jour avec succès';
        this.errorMessage = '';
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de la mise à jour du profil';
        this.successMessage = '';
        this.isLoading = false;
      }
    });
  }

  changePassword(): void {
    if (this.passwordForm.invalid) {
      return;
    }

    this.isLoading = true;
    const { currentPassword, newPassword } = this.passwordForm.value;

    this.profileService.changePassword(currentPassword, newPassword).subscribe({
      next: (response) => {
        this.successMessage = 'Mot de passe mis à jour avec succès';
        this.errorMessage = '';
        this.passwordForm.reset();
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du changement de mot de passe';
        this.successMessage = '';
        this.isLoading = false;
      }
    });
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.successMessage = '';
    this.errorMessage = '';
  }

  getUserInitial(): string {
    if (this.user && this.user.username && this.user.username.length > 0) {
      return this.user.username.charAt(0).toUpperCase();
    }
    return 'U';
  }
}
