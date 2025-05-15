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
import { DocumentUploadModalComponent } from './components/document-upload-modal/document-upload-modal.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterModule,
    DocumentCardComponent,
    CreateDocumentModalComponent,
    DocumentUploadModalComponent
  ],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  // Injection des services
  private router = inject(Router);
  private authService = inject(AuthService);
  private documentService = inject(DocumentService);
  private notificationService = inject(NotificationService);
  private collaborativeService = inject(CollaborativeDocumentService);
  private websocketService = inject(WebsocketService);
  private logger = inject(LoggingService);

  // Signaux d'état
  user = signal<User | null>(null);
  documents = signal<Document[]>([]);
  recentDocuments = signal<Document[]>([]);
  notifications = signal<Notification[]>([]);
  activeDocuments = signal<{ document: Document, users: ActiveDocumentUser[] }[]>([]);
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);
  showCreateModal = signal<boolean>(false);
  showUploadModal = signal<boolean>(false);

  // Valeurs calculées
  documentCount = computed(() => this.documents().length);
  folderCount = computed(() => this.documents().filter(doc => doc.is_folder).length);
  // Compteur de documents collaboratifs supprimé dans le cadre de la suppression du système de permissions
  collaborativeDocumentCount = computed(() => 0);
  unreadNotificationCount = computed(() =>
    this.notifications().filter(notification => !notification.is_read).length
  );

  constructor() {
    // Initialiser l'utilisateur à partir du service d'authentification
    this.user.set(this.authService.currentUser());

    // Journaliser l'initialisation du composant
    this.logger.info('Dashboard component initialized', {
      component: 'DashboardComponent',
      user: this.user()?.id
    });

    // Effet pour gérer les changements d'authentification
    effect(() => {
      const isAuthenticated = this.authService.isAuthenticated();
      if (!isAuthenticated) {
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnInit(): void {
    // Si l'utilisateur n'est pas disponible, vérifier l'état d'authentification
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
      // Charger les données du tableau de bord si l'utilisateur est déjà disponible
      this.loadDashboardData();
    }

    // S'abonner au statut de connexion WebSocket
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

    // Charger les documents
    this.loadDocuments();

    // Charger les notifications
    this.loadNotifications();

    // Charger les documents collaboratifs actifs
    this.loadActiveDocuments();
  }

  /**
   * Load user's documents
   */
  private loadDocuments(): void {
    this.documentService.getAllDocuments().subscribe({
      next: (documents) => {
        this.documents.set(documents);

        // Définir les documents récents (5 derniers)
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
    // Utiliser les notifications du service de notification
    this.notifications.set(this.notificationService.notifications());

    // S'abonner aux changements de notifications
    effect(() => {
      this.notifications.set(this.notificationService.notifications());
    });
  }

  /**
   * Load active collaborative documents
   */
  private loadActiveDocuments(): void {
    // Cela viendrait normalement d'un service qui suit les documents actifs
    // Pour l'instant, nous utilisons une implémentation temporaire
    // Dans une implémentation réelle, cela serait alimenté par des événements WebSocket
  }

  /**
   * Open the create document modal
   */
  openCreateDocumentModal(): void {
    this.showCreateModal.set(true);
  }

  /**
   * Open the upload document modal
   */
  openUploadDocumentModal(): void {
    this.showUploadModal.set(true);
  }

  /**
   * Handle document creation
   */
  handleDocumentCreated(document: Document): void {
    this.showCreateModal.set(false);
    this.loadDocuments();

    // Naviguer vers le nouveau document (les documents texte vont à l'éditeur)
    this.router.navigate(['/documents/edit', document.id]);
  }

  /**
   * Handle document upload
   */
  handleDocumentUploaded(document: Document): void {
    this.showUploadModal.set(false);
    this.loadDocuments();

    // Naviguer vers la visionneuse de document qui déterminera la vue appropriée
    this.router.navigate(['/documents', document.id]);
  }

  /**
   * Close the create document modal
   */
  closeCreateDocumentModal(): void {
    this.showCreateModal.set(false);
  }

  /**
   * Close the upload document modal
   */
  closeUploadDocumentModal(): void {
    this.showUploadModal.set(false);
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
