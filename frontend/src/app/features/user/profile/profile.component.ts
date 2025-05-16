import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';
import { TwoFactorAuthService } from '../../../core/services/two-factor-auth.service';
import { User } from '../../../core/models/user.model';
import { environment } from '../../../../environments/environment';

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

  // Profile picture properties
  @ViewChild('fileInput') fileInput!: ElementRef;
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  isUploading = false;

  // Timestamp pour éviter la mise en cache des images
  private imageTimestamp: number = new Date().getTime();

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private twoFactorAuthService: TwoFactorAuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // Récupérer l'utilisateur actuel
    this.user = this.authService.currentUser();
    console.log('ProfileComponent - User from AuthService:', this.user);
    console.log('ProfileComponent - User has profile_picture:', this.user?.profile_picture ? 'Yes' : 'No');

    // Initialiser le formulaire
    this.initForm();

    // Vérifier le statut 2FA
    this.check2FAStatus();

    // If user is not available, check auth status
    if (!this.user) {
      this.authService.checkAuthStatus().subscribe(isAuthenticated => {
        if (isAuthenticated) {
          this.user = this.authService.currentUser();
          console.log('ProfileComponent - User after checkAuthStatus:', this.user);
          console.log('ProfileComponent - User has profile_picture after checkAuthStatus:', this.user?.profile_picture ? 'Yes' : 'No');
          this.initForm();
          this.check2FAStatus();
        }
      });
    }
  }

  /**
   * Vérifie le statut 2FA auprès du backend et met à jour l'état local
   */
  private check2FAStatus(): void {
    if (!this.user) return;

    this.twoFactorAuthService.checkStatus().subscribe({
      next: (response) => {
        console.log('2FA status response:', response);
        if (this.user) {
          // Mettre à jour le statut 2FA dans l'objet utilisateur local
          this.user.two_factor_enabled = response.data.enabled;

          // Mettre à jour l'utilisateur dans le service d'authentification
          this.authService.setCurrentUser(this.user);
        }
      },
      error: (error) => {
        console.error('Error checking 2FA status:', error);
      }
    });
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
    this.isUploading = true;

    // Stop if form is invalid
    if (this.profileForm.invalid) {
      this.isUploading = false;
      return;
    }

    // Create FormData object for the API request
    const formData = new FormData();
    formData.append('username', this.profileForm.value.username);
    formData.append('email', this.profileForm.value.email);

    if (this.profileForm.value.full_name) {
      formData.append('full_name', this.profileForm.value.full_name);
    }

    // Add the profile picture if one was selected
    if (this.selectedFile) {
      formData.append('profile_picture', this.selectedFile);
    }

    // Send the update request
    this.userService.updateUserProfile(formData).subscribe({
      next: (updatedUser) => {
        // Update the current user in the AuthService
        this.authService.setCurrentUser(updatedUser);

        // Update the local user object
        this.user = updatedUser;

        // Mettre à jour le timestamp pour forcer le rechargement de l'image
        this.imageTimestamp = new Date().getTime();

        // Show success message
        this.updateSuccess = true;
        this.isUploading = false;

        // Reset the file selection
        this.selectedFile = null;
        this.imagePreview = null;
      },
      error: (error) => {
        console.error('Error updating profile:', error);
        this.updateError = error.error?.message || 'Une erreur est survenue lors de la mise à jour du profil.';
        this.isUploading = false;
      }
    });
  }

  /**
   * Trigger the file input click event
   */
  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  /**
   * Handle file selection
   * @param event File input change event
   */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Check if the file is an image
      if (!file.type.match(/image\/(jpeg|jpg|png|gif)/)) {
        this.updateError = 'Veuillez sélectionner une image valide (JPEG, PNG ou GIF).';
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        this.updateError = 'L\'image ne doit pas dépasser 5 Mo.';
        return;
      }

      this.selectedFile = file;
      this.updateError = '';

      // Create a preview of the selected image
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  /**
   * Remove the selected file
   */
  removeSelectedFile(): void {
    this.selectedFile = null;
    this.imagePreview = null;
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

  /**
   * Update just the profile picture
   */
  updateProfilePicture(): void {
    if (!this.selectedFile) {
      this.updateError = 'Veuillez sélectionner une image.';
      return;
    }

    this.isUploading = true;
    this.updateSuccess = false;
    this.updateError = '';

    this.userService.updateProfilePicture(this.selectedFile).subscribe({
      next: (updatedUser) => {
        console.log('Profile picture updated, received user:', updatedUser);

        // Update the current user in the AuthService
        this.authService.setCurrentUser(updatedUser);

        // Update the local user object
        this.user = updatedUser;
        console.log('Local user object updated:', this.user);

        // Mettre à jour le timestamp pour forcer le rechargement de l'image
        this.imageTimestamp = new Date().getTime();

        // Show success message
        this.updateSuccess = true;
        this.isUploading = false;

        // Reset the file selection
        this.selectedFile = null;
        this.imagePreview = null;
        if (this.fileInput) {
          this.fileInput.nativeElement.value = '';
        }
      },
      error: (error) => {
        console.error('Error updating profile picture:', error);
        this.updateError = error.error?.message || 'Une erreur est survenue lors de la mise à jour de la photo de profil.';
        this.isUploading = false;
      }
    });
  }

  /**
   * Get the full URL for the profile image
   * @returns The complete URL to the profile image
   */
  getProfileImageUrl(): string {
    console.log('Profile picture path:', this.user?.profile_picture);

    if (!this.user?.profile_picture) {
      console.log('No profile picture found');
      return '';
    }

    // Si l'URL est déjà complète (commence par http:// ou https://)
    if (this.user.profile_picture.startsWith('http://') || this.user.profile_picture.startsWith('https://')) {
      console.log('Using absolute URL:', this.user.profile_picture);
      return `${this.user.profile_picture}?t=${this.imageTimestamp}`;
    }

    // Sinon, préfixer avec l'URL de base de l'API et ajouter un timestamp pour éviter la mise en cache
    const fullUrl = `${environment.apiUrl}${this.user.profile_picture}?t=${this.imageTimestamp}`;
    console.log('Using constructed URL:', fullUrl);
    return fullUrl;
  }

  /**
   * Handle image loading error
   * @param event Error event
   */
  handleImageError(event: Event): void {
    console.error('Error loading profile image:', event);
    const imgElement = event.target as HTMLImageElement;
    console.log('Image URL that failed to load:', imgElement.src);

    // Optionally, set a default image or show the avatar with initials
    // For now, we'll just log the error
  }
}
