import { Component, OnInit, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { AuthService } from '../../core/services/auth.service';
import { DocumentService } from '../../core/services/document.service';
import { NotificationService } from '../../core/services/notification.service';
import { CollaborativeDocumentService } from '../../core/services/collaborative-document.service';
import { WebsocketService } from '../../core/services/websocket.service';
import { LoggingService } from '../../core/services/logging.service';

import { User } from '../../core/models/user.model';
import { Document, ActiveDocumentUser } from '../../core/models/document.model';
import { Notification } from '../../core/models/notification.model';

import { DocumentCardComponent } from './components/document-card/document-card.component';
import { CreateDocumentModalComponent } from './components/create-document-modal/create-document-modal.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterModule,
    DocumentCardComponent,
    CreateDocumentModalComponent
  ],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  // Inject services
  private router = inject(Router);
  private authService = inject(AuthService);
  private documentService = inject(DocumentService);
  private notificationService = inject(NotificationService);
  private collaborativeService = inject(CollaborativeDocumentService);
  private websocketService = inject(WebsocketService);
  private logger = inject(LoggingService);

  // State signals
  user = signal<User | null>(null);
  documents = signal<Document[]>([]);
  recentDocuments = signal<Document[]>([]);
  notifications = signal<Notification[]>([]);
  activeDocuments = signal<{ document: Document, users: ActiveDocumentUser[] }[]>([]);
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);
  showCreateModal = signal<boolean>(false);

  // Computed values
  documentCount = computed(() => this.documents().length);
  folderCount = computed(() => this.documents().filter(doc => doc.is_folder).length);
  collaborativeDocumentCount = computed(() =>
    this.documents().filter(doc => doc.collaborators && doc.collaborators.length > 0).length
  );
  unreadNotificationCount = computed(() =>
    this.notifications().filter(notification => !notification.is_read).length
  );

  constructor() {
    // Initialize user from auth service
    this.user.set(this.authService.currentUser());

    // Log component initialization
    this.logger.info('Dashboard component initialized', {
      component: 'DashboardComponent',
      user: this.user()?.id
    });

    // Effect to handle authentication changes
    effect(() => {
      const isAuthenticated = this.authService.isAuthenticated();
      if (!isAuthenticated) {
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnInit(): void {
    // If user is not available, check auth status
    if (!this.user()) {
      this.authService.checkAuthStatus().subscribe({
        next: (isAuthenticated) => {
          if (isAuthenticated) {
            this.user.set(this.authService.currentUser());
            this.loadDashboardData();
          } else {
            this.router.navigate(['/login']);
          }
        },
        error: (error) => {
          this.logger.error('Failed to check authentication status', {
            component: 'DashboardComponent',
            error
          });
          this.error.set('Failed to authenticate. Please try again.');
          this.isLoading.set(false);
        }
      });
    } else {
      // Load dashboard data if user is already available
      this.loadDashboardData();
    }

    // Subscribe to WebSocket connection status
    this.websocketService.onConnectionStatus()
      .pipe(takeUntilDestroyed())
      .subscribe(connected => {
        this.logger.debug('WebSocket connection status changed', {
          component: 'DashboardComponent',
          connected
        });
      });
  }

  /**
   * Load all dashboard data
   */
  private loadDashboardData(): void {
    this.isLoading.set(true);
    this.error.set(null);

    // Load documents
    this.loadDocuments();

    // Load notifications
    this.loadNotifications();

    // Load active collaborative documents
    this.loadActiveDocuments();
  }

  /**
   * Load user's documents
   */
  private loadDocuments(): void {
    this.documentService.getAllDocuments().subscribe({
      next: (documents) => {
        this.documents.set(documents);

        // Set recent documents (last 5)
        const sorted = [...documents].sort((a, b) => {
          const dateA = a.updated_at ? new Date(a.updated_at).getTime() : 0;
          const dateB = b.updated_at ? new Date(b.updated_at).getTime() : 0;
          return dateB - dateA;
        });

        this.recentDocuments.set(sorted.slice(0, 5));
        this.isLoading.set(false);

        this.logger.info('Documents loaded successfully', {
          component: 'DashboardComponent',
          count: documents.length
        });
      },
      error: (error) => {
        this.logger.error('Failed to load documents', {
          component: 'DashboardComponent',
          error
        });
        this.error.set('Failed to load documents. Please try again.');
        this.isLoading.set(false);
      }
    });
  }

  /**
   * Load user's notifications
   */
  private loadNotifications(): void {
    // Use the notifications from the notification service
    this.notifications.set(this.notificationService.notifications());

    // Subscribe to notification changes
    effect(() => {
      this.notifications.set(this.notificationService.notifications());
    });
  }

  /**
   * Load active collaborative documents
   */
  private loadActiveDocuments(): void {
    // This would typically come from a service that tracks active documents
    // For now, we'll use a placeholder implementation
    // In a real implementation, this would be populated from WebSocket events
  }

  /**
   * Open the create document modal
   */
  openCreateDocumentModal(): void {
    this.showCreateModal.set(true);
  }

  /**
   * Handle document creation
   */
  handleDocumentCreated(document: Document): void {
    this.showCreateModal.set(false);
    this.loadDocuments();

    // Navigate to the new document
    this.router.navigate(['/documents', document.id]);
  }

  /**
   * Close the create document modal
   */
  closeCreateDocumentModal(): void {
    this.showCreateModal.set(false);
  }

  /**
   * Get the title of a notification
   * @param notification Notification
   * @returns Formatted title
   */
  getNotificationTitle(notification: Notification): string {
    return this.notificationService.getFormattedNotification(notification).title;
  }

  /**
   * Format a date for display
   * @param dateString Date string
   * @returns Formatted date
   */
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) {
      return 'À l\'instant';
    } else if (diffMins < 60) {
      return `Il y a ${diffMins} minute${diffMins > 1 ? 's' : ''}`;
    } else if (diffHours < 24) {
      return `Il y a ${diffHours} heure${diffHours > 1 ? 's' : ''}`;
    } else if (diffDays < 7) {
      return `Il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
    } else {
      return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }
  }
}
