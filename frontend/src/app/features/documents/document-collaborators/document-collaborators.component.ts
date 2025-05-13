import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DocumentsService, DocumentCollaborators, Collaborator } from '../../../core/services/documents.service';
import { UsersService } from '../../../core/services/users.service';
import { User } from '../../../core/models/user.model';
import { SocketService } from '../../../core/services/socket.service';
import { Subscription } from 'rxjs';

// Interface pour les utilisateurs actifs
interface ActiveUser {
  id: number;
  name: string;
  color: string;
  isTyping?: boolean;
}

@Component({
  selector: 'app-document-collaborators',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './document-collaborators.component.html',
  styleUrls: ['./document-collaborators.component.css']
})
export class DocumentCollaboratorsComponent implements OnInit, OnDestroy {
  @Input() documentId!: number;

  collaborators: DocumentCollaborators | null = null;
  users: User[] = [];
  filteredUsers: User[] = [];
  searchQuery: string = '';
  selectedUserId: number | null = null;
  selectedPermission: string = 'read';

  // Liste des utilisateurs actifs
  activeCollaborators: ActiveUser[] = [];

  isLoading: boolean = false;
  isSearching: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  // Abonnements aux événements socket
  private socketSubscriptions: Subscription[] = [];

  permissionOptions = [
    { value: 'read', label: 'Lecture seule' },
    { value: 'write', label: 'Lecture et écriture' },
    { value: 'admin', label: 'Administrateur' }
  ];

  constructor(
    private documentsService: DocumentsService,
    private usersService: UsersService,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.loadCollaborators();
    this.setupSocketListeners();
  }

  ngOnDestroy(): void {
    // Nettoyer les abonnements socket
    this.socketSubscriptions.forEach(sub => sub.unsubscribe());
  }

  /**
   * Configure les écouteurs d'événements socket
   */
  private setupSocketListeners(): void {
    // Écouter les événements d'arrivée d'utilisateur
    const userJoinedSub = this.socketService.on<any>('document:user-joined').subscribe(data => {
      this.handleUserJoined(data);
    });

    // Écouter les événements de départ d'utilisateur
    const userLeftSub = this.socketService.on<any>('document:user-left').subscribe(data => {
      this.handleUserLeft(data);
    });

    // Écouter les événements de frappe
    const typingUpdateSub = this.socketService.on<any>('document:typing').subscribe(data => {
      this.updateUserTypingStatus(data);
    });

    // Stocker les abonnements pour les nettoyer plus tard
    this.socketSubscriptions.push(
      userJoinedSub,
      userLeftSub,
      typingUpdateSub
    );
  }

  /**
   * Gère l'arrivée d'un nouvel utilisateur
   */
  private handleUserJoined(data: any): void {
    const { userId, username, activeUsers } = data;

    // Mettre à jour la liste des utilisateurs actifs
    if (activeUsers) {
      this.updateActiveUsersList(activeUsers);
    } else if (userId && username) {
      // Ajouter un seul utilisateur
      this.addActiveUser(userId, username);
    }
  }

  /**
   * Gère le départ d'un utilisateur
   */
  private handleUserLeft(data: any): void {
    const { userId } = data;

    // Supprimer l'utilisateur de la liste des utilisateurs actifs
    this.activeCollaborators = this.activeCollaborators.filter(user => user.id !== userId);
  }

  /**
   * Met à jour le statut de frappe d'un utilisateur
   */
  private updateUserTypingStatus(data: any): void {
    const { userId, isTyping } = data;

    // Trouver l'utilisateur dans la liste des utilisateurs actifs
    const userIndex = this.activeCollaborators.findIndex(user => user.id === userId);

    if (userIndex !== -1) {
      // Mettre à jour le statut de frappe
      this.activeCollaborators[userIndex].isTyping = isTyping;
    }
  }

  /**
   * Met à jour la liste complète des utilisateurs actifs
   */
  private updateActiveUsersList(activeUsers: any[]): void {
    // Convertir la liste des utilisateurs actifs en objets ActiveUser
    this.activeCollaborators = activeUsers.map(user => ({
      id: user.id,
      name: user.username,
      color: user.color || this.getRandomColor(),
      isTyping: user.isTyping || false
    }));
  }

  /**
   * Ajoute un utilisateur actif à la liste
   */
  private addActiveUser(userId: number, username: string): void {
    // Vérifier si l'utilisateur est déjà dans la liste
    if (!this.activeCollaborators.some(user => user.id === userId)) {
      this.activeCollaborators.push({
        id: userId,
        name: username,
        color: this.getRandomColor(),
        isTyping: false
      });
    }
  }

  /**
   * Génère une couleur aléatoire
   */
  private getRandomColor(): string {
    const colors = [
      '#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3',
      '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  loadCollaborators(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.documentsService.getDocumentCollaborators(this.documentId).subscribe({
      next: (data) => {
        this.collaborators = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des collaborateurs';
        this.isLoading = false;
        console.error('Error loading collaborators:', error);
      }
    });
  }

  searchUsers(): void {
    if (!this.searchQuery.trim()) {
      this.filteredUsers = [];
      return;
    }

    this.isSearching = true;
    this.usersService.searchUsers(this.searchQuery).subscribe({
      next: (users) => {
        // Filtrer les utilisateurs qui sont déjà collaborateurs
        const existingUserIds = this.collaborators?.collaborators.map(c => c.user.id) || [];
        const ownerId = this.collaborators?.owner.id;

        this.filteredUsers = users.filter(user =>
          !existingUserIds.includes(user.id) && user.id !== ownerId
        );

        this.isSearching = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de la recherche d\'utilisateurs';
        this.isSearching = false;
        console.error('Error searching users:', error);
      }
    });
  }

  selectUser(user: User): void {
    this.selectedUserId = user.id;
    this.searchQuery = user.username;
    this.filteredUsers = [];
  }

  inviteUser(): void {
    if (!this.selectedUserId) {
      this.errorMessage = 'Veuillez sélectionner un utilisateur';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.documentsService.inviteUserToDocument(
      this.documentId,
      this.selectedUserId,
      this.selectedPermission
    ).subscribe({
      next: (response) => {
        this.successMessage = 'Utilisateur invité avec succès';
        this.loadCollaborators(); // Recharger la liste des collaborateurs
        this.resetForm();
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de l\'invitation de l\'utilisateur';
        this.isLoading = false;
        console.error('Error inviting user:', error);
      }
    });
  }

  removeCollaborator(collaboratorId: number): void {
    if (!confirm('Êtes-vous sûr de vouloir retirer ce collaborateur ?')) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.documentsService.removeCollaborator(this.documentId, collaboratorId).subscribe({
      next: () => {
        this.successMessage = 'Collaborateur retiré avec succès';
        this.loadCollaborators(); // Recharger la liste des collaborateurs
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du retrait du collaborateur';
        this.isLoading = false;
        console.error('Error removing collaborator:', error);
      }
    });
  }

  resetForm(): void {
    this.selectedUserId = null;
    this.searchQuery = '';
    this.selectedPermission = 'read';
  }

  getPermissionLabel(permission: string): string {
    const option = this.permissionOptions.find(opt => opt.value === permission);
    return option ? option.label : permission;
  }
}
