import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { CollaborativeDocumentService } from '../../../core/services/collaborative-document.service';
import { LoggingService } from '../../../core/services/logging.service';
import { AlertService } from '../../../core/services/alert.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-invite-collaborators-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './invite-collaborators-modal.component.html'
})
export class InviteCollaboratorsModalComponent implements OnInit {
  @Input() documentId!: number;
  @Input() documentTitle: string = '';
  @Output() close = new EventEmitter<void>();
  
  // Services injectés
  private userService = inject(UserService);
  private collaborativeService = inject(CollaborativeDocumentService);
  private logger = inject(LoggingService);
  private alertService = inject(AlertService);
  
  // État du composant
  users: User[] = [];
  selectedUserIds: number[] = [];
  isLoading = false;
  searchTerm = '';
  error: string | null = null;
  isSending = false;
  
  ngOnInit(): void {
    this.loadUsers();
  }
  
  /**
   * Charge la liste des utilisateurs
   */
  loadUsers(): void {
    this.isLoading = true;
    this.error = null;
    
    this.userService.getAllActiveUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.isLoading = false;
        this.logger.info('Utilisateurs chargés avec succès', {
          component: 'InviteCollaboratorsModalComponent',
          count: users.length
        });
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des utilisateurs. Veuillez réessayer.';
        this.isLoading = false;
        this.logger.error('Erreur lors du chargement des utilisateurs', {
          component: 'InviteCollaboratorsModalComponent',
          error: err
        });
      }
    });
  }
  
  /**
   * Recherche des utilisateurs
   */
  searchUsers(): void {
    if (!this.searchTerm || this.searchTerm.trim().length < 2) {
      this.loadUsers();
      return;
    }
    
    this.isLoading = true;
    this.userService.searchUsers(this.searchTerm).subscribe({
      next: (users) => {
        this.users = users;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors de la recherche des utilisateurs.';
        this.isLoading = false;
        this.logger.error('Erreur lors de la recherche des utilisateurs', {
          component: 'InviteCollaboratorsModalComponent',
          error: err
        });
      }
    });
  }
  
  /**
   * Gère la sélection/désélection d'un utilisateur
   */
  toggleUserSelection(userId: number): void {
    const index = this.selectedUserIds.indexOf(userId);
    if (index === -1) {
      this.selectedUserIds.push(userId);
    } else {
      this.selectedUserIds.splice(index, 1);
    }
  }
  
  /**
   * Vérifie si un utilisateur est sélectionné
   */
  isUserSelected(userId: number): boolean {
    return this.selectedUserIds.includes(userId);
  }
  
  /**
   * Envoie les invitations aux utilisateurs sélectionnés
   */
  sendInvitations(): void {
    if (this.selectedUserIds.length === 0) {
      this.alertService.warning('Veuillez sélectionner au moins un utilisateur.');
      return;
    }
    
    this.isSending = true;
    this.error = null;
    
    // Envoyer les invitations une par une
    const invitationPromises = this.selectedUserIds.map(userId => {
      return new Promise<void>((resolve, reject) => {
        this.collaborativeService.inviteUserToDocument(this.documentId, userId).subscribe({
          next: () => resolve(),
          error: (err) => reject(err)
        });
      });
    });
    
    // Attendre que toutes les invitations soient envoyées
    Promise.all(invitationPromises)
      .then(() => {
        this.alertService.success(`Invitations envoyées avec succès à ${this.selectedUserIds.length} utilisateur(s).`);
        this.isSending = false;
        this.close.emit();
      })
      .catch(err => {
        this.error = 'Erreur lors de l\'envoi des invitations. Veuillez réessayer.';
        this.isSending = false;
        this.logger.error('Erreur lors de l\'envoi des invitations', {
          component: 'InviteCollaboratorsModalComponent',
          error: err
        });
      });
  }
  
  /**
   * Ferme la boîte de dialogue
   */
  closeModal(): void {
    this.close.emit();
  }
}
