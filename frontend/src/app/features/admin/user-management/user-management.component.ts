import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService, CreateUserRequest } from '../../../core/services/admin.service';
import { LoggingService } from '../../../core/services/logging.service';
import { AlertService } from '../../../core/services/alert.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-management.component.html'
})
export class UserManagementComponent implements OnInit {
  // Services
  private adminService = inject(AdminService);
  private logger = inject(LoggingService);
  private alertService = inject(AlertService);
  private fb = inject(FormBuilder);

  // State
  users = signal<User[]>([]);
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);
  successMessage = signal<string | null>(null);
  showCreateForm = signal<boolean>(false);
  createUserForm!: FormGroup;
  formSubmitted = signal<boolean>(false);

  ngOnInit(): void {
    this.initForm();
    this.loadUsers();
  }

  /**
   * Initialise le formulaire de création d'utilisateur
   */
  private initForm(): void {
    this.createUserForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
      full_name: ['', [Validators.maxLength(100)]],
      is_admin: [false]
    });
  }

  /**
   * Charge la liste des utilisateurs
   */
  loadUsers(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.adminService.getAllUsers().subscribe({
      next: (users) => {
        this.users.set(users);
        this.isLoading.set(false);
        this.logger.info('Utilisateurs chargés avec succès', {
          component: 'UserManagementComponent',
          count: users.length
        });
      },
      error: (err) => {
        this.error.set('Erreur lors du chargement des utilisateurs. Veuillez réessayer.');
        this.isLoading.set(false);
        this.logger.error('Erreur lors du chargement des utilisateurs', {
          component: 'UserManagementComponent',
          error: err
        });
      }
    });
  }

  /**
   * Affiche ou masque le formulaire de création d'utilisateur
   */
  toggleCreateForm(): void {
    this.showCreateForm.update(value => !value);
    if (!this.showCreateForm()) {
      this.resetForm();
    }
  }

  /**
   * Réinitialise le formulaire
   */
  resetForm(): void {
    this.createUserForm.reset({
      username: '',
      email: '',
      password: '',
      full_name: '',
      is_admin: false
    });
    this.formSubmitted.set(false);
    this.error.set(null);
    this.successMessage.set(null);
  }

  /**
   * Soumet le formulaire de création d'utilisateur
   */
  onSubmit(): void {
    this.formSubmitted.set(true);
    this.error.set(null);
    this.successMessage.set(null);

    if (this.createUserForm.invalid) {
      return;
    }

    const userData: CreateUserRequest = this.createUserForm.value;

    this.adminService.createUser(userData).subscribe({
      next: (user) => {
        this.alertService.success(`L'utilisateur ${user.username} a été créé avec succès.`);
        this.loadUsers();
        this.resetForm();
        this.showCreateForm.set(false);
        this.logger.info('Utilisateur créé avec succès', {
          component: 'UserManagementComponent',
          user: user.id
        });
      },
      error: (err) => {
        this.error.set(err.error?.message || 'Erreur lors de la création de l\'utilisateur. Veuillez réessayer.');
        this.alertService.error(err.error?.message || 'Erreur lors de la création de l\'utilisateur. Veuillez réessayer.');
        this.logger.error('Erreur lors de la création de l\'utilisateur', {
          component: 'UserManagementComponent',
          error: err
        });
      }
    });
  }

  /**
   * Bloque un utilisateur
   */
  blockUser(userId: number): void {
    this.adminService.deactivateUser(userId).subscribe({
      next: () => {
        this.alertService.success('L\'utilisateur a été bloqué avec succès.');
        this.loadUsers();
        this.logger.info('Utilisateur bloqué avec succès', {
          component: 'UserManagementComponent',
          userId
        });
      },
      error: (err) => {
        this.alertService.error(err.error?.message || 'Erreur lors du blocage de l\'utilisateur. Veuillez réessayer.');
        this.logger.error('Erreur lors du blocage de l\'utilisateur', {
          component: 'UserManagementComponent',
          userId,
          error: err
        });
      }
    });
  }

  /**
   * Débloque un utilisateur
   */
  unblockUser(userId: number): void {
    this.adminService.activateUser(userId).subscribe({
      next: () => {
        this.alertService.success('L\'utilisateur a été débloqué avec succès.');
        this.loadUsers();
        this.logger.info('Utilisateur débloqué avec succès', {
          component: 'UserManagementComponent',
          userId
        });
      },
      error: (err) => {
        this.alertService.error(err.error?.message || 'Erreur lors du déblocage de l\'utilisateur. Veuillez réessayer.');
        this.logger.error('Erreur lors du déblocage de l\'utilisateur', {
          component: 'UserManagementComponent',
          userId,
          error: err
        });
      }
    });
  }

  /**
   * Retourne les contrôles du formulaire
   */
  get f() {
    return this.createUserForm.controls;
  }
}
