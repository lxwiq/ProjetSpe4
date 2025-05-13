import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ButtonComponent } from '../../../core/components/button/button.component';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterLink, ButtonComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styles: []
})
export class AdminDashboardComponent implements OnInit {
  // Dashboard statistics
  totalUsers: number = 0;
  totalDocuments: number = 0;
  storageUsed: string = '0 MB';
  todayActivity: number = 0;

  // User creation modal
  showUserModal: boolean = false;
  userForm!: FormGroup;
  isSubmitting: boolean = false;
  error: string = '';
  success: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initUserForm();
    this.loadDashboardStats();
  }

  initUserForm(): void {
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      full_name: [''],
      is_admin: [false]
    });
  }

  loadDashboardStats(): void {
    // Load users count
    this.http.get<any>('http://localhost:3000/admin/users')
      .subscribe({
        next: (response) => {
          this.totalUsers = response.data?.length || 0;
        },
        error: (err) => {
          console.error('Erreur lors du chargement des utilisateurs', err);
        }
      });

    // Load documents count and storage used
    this.http.get<any>('http://localhost:3000/admin/stats')
      .subscribe({
        next: (response) => {
          if (response.data) {
            this.totalDocuments = response.data.documentCount || 0;
            this.storageUsed = response.data.storageUsed || '0 MB';
            this.todayActivity = response.data.todayActivity || 0;
          }
        },
        error: (err) => {
          console.error('Erreur lors du chargement des statistiques', err);
        }
      });
  }

  createUser(): void {
    this.error = '';
    this.success = '';
    this.showUserModal = true;
  }

  closeUserModal(): void {
    this.showUserModal = false;
    this.userForm.reset({
      is_admin: false
    });
  }

  submitUserForm(): void {
    if (this.userForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.error = '';
    this.success = '';

    this.http.post('http://localhost:3000/admin/users', this.userForm.value)
      .subscribe({
        next: (response: any) => {
          this.success = 'Utilisateur créé avec succès';
          this.isSubmitting = false;

          // Reload dashboard stats to update user count
          this.loadDashboardStats();

          // Reset form and close modal after a short delay
          setTimeout(() => {
            this.closeUserModal();
          }, 2000);
        },
        error: (err) => {
          this.error = err.error?.message || 'Une erreur est survenue lors de la création de l\'utilisateur';
          this.isSubmitting = false;
        }
      });
  }

  backupSystem(): void {
    // Placeholder for backup system functionality
    console.log('Backup system functionality not implemented yet');
  }

  generateReport(): void {
    // Placeholder for report generation functionality
    console.log('Report generation functionality not implemented yet');
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
