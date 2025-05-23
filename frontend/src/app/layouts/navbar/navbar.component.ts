import { Component, Input, OnInit, OnDestroy, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';
import { WebsocketService } from '../../core/services/websocket.service';
import { LoggingService } from '../../core/services/logging.service';
import { User } from '../../core/models/user.model';
import { Notification } from '../../core/models/notification.model';
import { AppLogoComponent } from '../../shared/components/app-logo/app-logo.component';
import { environment } from '../../../environments/environment';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, AppLogoComponent],
  template: `
    <header class="bg-gray-800 text-white shadow-md">
      <div class="w-full px-4 py-3">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-3">
            <app-logo [size]="'32'" [text]="'DocCollab'" [showText]="false" class="md:hidden"></app-logo>
            <app-logo [size]="'32'" [text]="'DocCollab'" [showText]="true" class="hidden md:flex"></app-logo>
          </div>

          <nav class="flex items-center space-x-6">
            @if (authService.isAuthenticated()) {
              <div class="hidden md:flex space-x-8">
                <a routerLink="/dashboard" class="text-gray-300 hover:text-white font-medium transition-colors">Tableau de bord</a>
                <a routerLink="/documents" class="text-gray-300 hover:text-white font-medium transition-colors">Mes documents</a>
                <a routerLink="/messaging" class="text-gray-300 hover:text-white font-medium transition-colors">Messages</a>

                <!-- Lien d'administration visible uniquement pour les admins -->
                @if (isAdmin()) {
                  <a routerLink="/admin" class="text-yellow-400 hover:text-yellow-300 font-medium transition-colors">Administration</a>
                }
              </div>

              <div class="flex items-center space-x-4">
                <!-- Icône de notifications avec compteur -->
                <div class="relative dropdown-container">
                  <div class="flex items-center cursor-pointer p-1 hover:bg-gray-700 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      [class]="bellAnimationActive ? 'h-5 w-5 text-white animate-bell' : 'h-5 w-5 text-gray-300'"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>

                    <!-- Compteur de notifications -->
                    @if (notificationService.unreadCount() > 0) {
                      <span
                        [class]="bellAnimationActive
                          ? 'absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center animate-pulse'
                          : 'absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center'"
                      >
                        {{ notificationService.unreadCount() > 9 ? '9+' : notificationService.unreadCount() }}
                      </span>
                    }
                  </div>

                  <!-- Menu déroulant des notifications -->
                  <div class="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-10 dropdown-menu max-h-96 overflow-y-auto">
                    <div class="px-4 py-2 border-b border-gray-200">
                      <h3 class="text-sm font-semibold text-gray-700">Notifications</h3>
                    </div>

                    @if (notificationService.notifications().length === 0) {
                      <div class="px-4 py-3 text-sm text-gray-500 text-center">
                        Aucune notification
                      </div>
                    } @else {
                      @for (notification of notificationService.notifications(); track notification.id) {
                        <a
                          [routerLink]="getNotificationUrl(notification)"
                          class="block px-4 py-3 border-b border-gray-100 hover:bg-gray-50"
                          [class.bg-blue-50]="!notification.is_read"
                          [class.animate-highlight]="notificationService.newNotification()?.id === notification.id"
                          (click)="markNotificationAsRead(notification)"
                        >
                          <div class="flex items-start">
                            @if (notification.sender && notification.sender.profile_picture) {
                              <img
                                [src]="getSenderProfileImageUrl(notification.sender.profile_picture)"
                                alt="Avatar"
                                class="h-8 w-8 rounded-full mr-3"
                              />
                            } @else {
                              <div class="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium mr-3">
                                {{ getInitials(notification) }}
                              </div>
                            }
                            <div class="flex-1">
                              <p class="text-sm font-medium text-gray-900">{{ getNotificationTitle(notification) }}</p>
                              <p class="text-xs text-gray-500 mt-1">{{ getNotificationContent(notification) }}</p>
                              <p class="text-xs text-gray-400 mt-1">{{ formatDate(notification.created_at) }}</p>
                            </div>
                            @if (!notification.is_read) {
                              <span class="h-2 w-2 bg-blue-500 rounded-full"></span>
                            }
                          </div>
                        </a>
                      }

                      <!-- Bouton "Marquer toutes comme lues" -->
                      @if (notificationService.unreadCount() > 0) {
                        <button
                          (click)="markAllAsRead()"
                          class="w-full text-center px-4 py-2 text-xs font-medium text-blue-600 hover:bg-gray-50 border-t border-gray-100"
                        >
                          Marquer toutes comme lues
                        </button>
                      }
                    }
                  </div>
                </div>

                <!-- Menu utilisateur -->
                <div class="relative dropdown-container">
                  <div class="flex items-center space-x-2 cursor-pointer">
                    <!-- Photo de profil ou avatar par défaut -->
                    @if (getCurrentUser()?.profile_picture) {
                      <img
                        [src]="getProfileImageUrl()"
                        alt="Photo de profil"
                        class="w-8 h-8 rounded-full object-cover border-2 border-indigo-400"
                        (error)="handleImageError($event)"
                      />
                    } @else {
                      <div class="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium border-2 border-indigo-400">
                        {{ getUserInitials() }}
                      </div>
                    }
                    <span class="hidden md:inline text-sm font-medium">{{ getCurrentUser()?.username }}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </div>

                  <!-- Menu déroulant -->
                  <div class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 dropdown-menu">
                    <a routerLink="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Mon profil</a>
                    <a routerLink="/profile/2fa/setup" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sécurité</a>
                    <button (click)="logout()" class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Déconnexion</button>
                  </div>
                </div>
              </div>
            }
          </nav>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .dropdown-container {
      position: relative;
    }

    .dropdown-menu {
      visibility: hidden;
      opacity: 0;
      transition: visibility 0s linear 0.2s, opacity 0.2s;
    }

    .dropdown-container:hover .dropdown-menu,
    .dropdown-menu:hover {
      visibility: visible;
      opacity: 1;
      transition-delay: 0s;
    }

    @keyframes bell-shake {
      0% { transform: rotate(0); }
      10% { transform: rotate(10deg); }
      20% { transform: rotate(-10deg); }
      30% { transform: rotate(10deg); }
      40% { transform: rotate(-10deg); }
      50% { transform: rotate(0); }
      100% { transform: rotate(0); }
    }

    .animate-bell {
      animation: bell-shake 1s ease-in-out;
      animation-iteration-count: 2;
    }

    .animate-pulse {
      animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    @keyframes highlight {
      0% { background-color: rgba(59, 130, 246, 0.3); }
      50% { background-color: rgba(59, 130, 246, 0.1); }
      100% { background-color: rgba(59, 130, 246, 0.3); }
    }

    .animate-highlight {
      animation: highlight 2s ease-in-out;
    }
  `]
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Input() title: string = '';
  private refreshInterval: any;

  // Timestamp pour éviter la mise en cache des images
  private imageTimestamp: number = new Date().getTime();

  // État d'animation pour l'icône de notification
  bellAnimationActive = false;

  // Timeout pour l'animation
  private bellAnimationTimeout: any;

  constructor(
    public authService: AuthService,
    public notificationService: NotificationService,
    private websocketService: WebsocketService,
    private logger: LoggingService
  ) {
    // Réagir aux nouvelles notifications
    effect(() => {
      const newNotification = this.notificationService.newNotification();
      if (newNotification) {
        this.handleNewNotification(newNotification);
      }
    });
  }

  /**
   * Gère l'arrivée d'une nouvelle notification
   * @param notification Nouvelle notification
   */
  private handleNewNotification(notification: Notification): void {
    this.logger.info('Nouvelle notification reçue dans la navbar', {
      component: 'NavbarComponent',
      notificationId: notification.id,
      notificationType: notification.type
    });

    // Activer l'animation de la cloche
    this.startBellAnimation();
  }

  /**
   * Démarre l'animation de la cloche de notification
   */
  private startBellAnimation(): void {
    // Arrêter l'animation précédente si elle est en cours
    if (this.bellAnimationTimeout) {
      clearTimeout(this.bellAnimationTimeout);
    }

    // Activer l'animation
    this.bellAnimationActive = true;

    // Arrêter l'animation après 3 secondes
    this.bellAnimationTimeout = setTimeout(() => {
      this.bellAnimationActive = false;
    }, 3000);
  }

  /**
   * Vérifie si l'utilisateur actuel est un administrateur
   */
  isAdmin(): boolean {
    const user = this.authService.currentUser();
    return user ? user.isAdmin === true : false;
  }

  /**
   * Récupère l'utilisateur actuel
   */
  getCurrentUser(): User | null {
    return this.authService.currentUser();
  }

  /**
   * Génère les initiales de l'utilisateur pour l'avatar par défaut
   */
  getUserInitials(): string {
    const user = this.getCurrentUser();
    if (!user) return '?';

    if (user.full_name) {
      // Si le nom complet existe, prendre les initiales du nom complet
      const names = user.full_name.split(' ');
      if (names.length >= 2) {
        return (names[0][0] + names[1][0]).toUpperCase();
      }
      return names[0][0].toUpperCase();
    }

    // Sinon, prendre la première lettre du nom d'utilisateur
    return user.username[0].toUpperCase();
  }

  /**
   * Initialise le composant
   */
  ngOnInit(): void {
    // Charger les notifications au démarrage
    this.notificationService.loadNotifications();

    // Rafraîchir les notifications toutes les 60 secondes (moins fréquent car nous avons maintenant les WebSockets)
    this.refreshInterval = setInterval(() => {
      this.notificationService.loadNotifications();

      // Mettre à jour le timestamp pour forcer le rechargement des images
      this.imageTimestamp = new Date().getTime();
    }, 60000);

    // S'assurer que la connexion WebSocket est établie si l'utilisateur est authentifié
    if (this.authService.isAuthenticated()) {
      this.websocketService.connect();
    }
  }

  /**
   * Nettoie les ressources lors de la destruction du composant
   */
  ngOnDestroy(): void {
    // Arrêter le rafraîchissement des notifications
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }

    // Arrêter l'animation de la cloche si elle est en cours
    if (this.bellAnimationTimeout) {
      clearTimeout(this.bellAnimationTimeout);
    }
  }

  /**
   * Marque une notification comme lue
   * @param notification Notification à marquer comme lue
   */
  markNotificationAsRead(notification: Notification): void {
    if (!notification.is_read) {
      this.notificationService.markAsRead(notification.id).subscribe();
    }
  }

  /**
   * Marque toutes les notifications comme lues
   */
  markAllAsRead(): void {
    this.notificationService.markAllAsRead().subscribe();
  }

  /**
   * Récupère l'URL associée à une notification
   * @param notification Notification
   * @returns URL de redirection
   */
  getNotificationUrl(notification: Notification): string {
    const formattedNotification = this.notificationService.getFormattedNotification(notification);

    // Vérifier que l'URL est valide et ne contient pas "undefined" ou "NaN"
    const url = formattedNotification.url;
    if (!url || url.includes('undefined') || url.includes('NaN')) {
      // Rediriger vers une page par défaut en fonction du type de notification
      if (notification.type === 'document_invite' || notification.type === 'document_update') {
        return '/documents';
      } else if (notification.type === 'new_message' || notification.type === 'conversation_invite') {
        return '/messaging';
      } else {
        return '/dashboard';
      }
    }

    return url;
  }

  /**
   * Récupère le titre d'une notification
   * @param notification Notification
   * @returns Titre formaté
   */
  getNotificationTitle(notification: Notification): string {
    const formattedNotification = this.notificationService.getFormattedNotification(notification);
    return formattedNotification.title;
  }

  /**
   * Récupère le contenu d'une notification
   * @param notification Notification
   * @returns Contenu formaté
   */
  getNotificationContent(notification: Notification): string {
    const formattedNotification = this.notificationService.getFormattedNotification(notification);
    return formattedNotification.content;
  }

  /**
   * Récupère les initiales de l'expéditeur d'une notification
   * @param notification Notification
   * @returns Initiales
   */
  getInitials(notification: Notification): string {
    if (notification.sender) {
      if (notification.sender.full_name) {
        const names = notification.sender.full_name.split(' ');
        if (names.length >= 2) {
          return (names[0][0] + names[1][0]).toUpperCase();
        }
        return names[0][0].toUpperCase();
      }
      return notification.sender.username[0].toUpperCase();
    }

    return '?';
  }

  /**
   * Formate une date pour l'affichage
   * @param dateString Date au format ISO
   * @returns Date formatée
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

  /**
   * Déconnecte l'utilisateur
   */
  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        // Navigation handled by the service
      },
      error: () => {
        // Error handling done in the service
      }
    });
  }

  /**
   * Récupère l'URL complète de l'image de profil de l'utilisateur actuel
   * @returns URL complète de l'image de profil
   */
  getProfileImageUrl(): string {
    const user = this.getCurrentUser();

    if (!user?.profile_picture) {
      return '';
    }

    // Si l'URL est déjà complète (commence par http:// ou https://)
    if (user.profile_picture.startsWith('http://') || user.profile_picture.startsWith('https://')) {
      return `${user.profile_picture}?t=${this.imageTimestamp}`;
    }

    // Sinon, préfixer avec l'URL de base de l'API et ajouter un timestamp pour éviter la mise en cache
    const fullUrl = `${environment.apiUrl}${user.profile_picture}?t=${this.imageTimestamp}`;
    return fullUrl;
  }

  /**
   * Récupère l'URL complète de l'image de profil d'un expéditeur de notification
   * @param profilePicturePath Chemin de l'image de profil
   * @returns URL complète de l'image de profil
   */
  getSenderProfileImageUrl(profilePicturePath: string): string {
    if (!profilePicturePath) {
      return '';
    }

    // Si l'URL est déjà complète (commence par http:// ou https://)
    if (profilePicturePath.startsWith('http://') || profilePicturePath.startsWith('https://')) {
      return `${profilePicturePath}?t=${this.imageTimestamp}`;
    }

    // Sinon, préfixer avec l'URL de base de l'API et ajouter un timestamp pour éviter la mise en cache
    return `${environment.apiUrl}${profilePicturePath}?t=${this.imageTimestamp}`;
  }

  /**
   * Gère les erreurs de chargement d'image
   * @param event Événement d'erreur
   */
  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;

    // Forcer l'affichage de l'avatar par défaut en supprimant l'image de profil de l'utilisateur actuel
    const user = this.getCurrentUser();
    if (user) {
      // Temporairement pour l'affichage uniquement, ne modifie pas les données réelles
      imgElement.style.display = 'none';
      // On pourrait créer dynamiquement un élément div avec les initiales, mais pour simplifier,
      // on va juste masquer l'image pour que l'avatar par défaut s'affiche au prochain rendu
    }
  }
}
