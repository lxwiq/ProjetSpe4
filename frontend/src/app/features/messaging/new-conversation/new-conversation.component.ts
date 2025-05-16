import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { MessagingService } from '../../../core/services/messaging.service';
import { UserService } from '../../../core/services/user.service';
import { LoggingService } from '../../../core/services/logging.service';
import { User } from '../../../core/models/user.model';

interface ConversationUser extends User {
  selected?: boolean;
}

@Component({
  selector: 'app-new-conversation',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './new-conversation.component.html',
  styleUrls: ['./new-conversation.component.css']
})
export class NewConversationComponent implements OnInit {
  // Signaux pour l'état du composant
  users = signal<ConversationUser[]>([]);
  selectedUsers = signal<ConversationUser[]>([]);
  isLoading = signal<boolean>(true);
  isCreating = signal<boolean>(false);
  error = signal<string | null>(null);

  // Propriétés pour le formulaire
  searchTerm = '';
  conversationName = '';
  isGroup = false;

  // Services injectés
  private messagingService = inject(MessagingService);
  private userService = inject(UserService);
  private router = inject(Router);
  private logger = inject(LoggingService);

  ngOnInit(): void {
    this.loadUsers();
  }

  /**
   * Charge la liste des utilisateurs
   */
  loadUsers(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.userService.getAllUsers().subscribe({
      next: (users: User[]) => {
        this.users.set(users);
        this.isLoading.set(false);
      },
      error: (err: any) => {
        this.logger.error('Erreur lors du chargement des utilisateurs', {
          component: 'NewConversationComponent',
          error: err
        });
        this.error.set('Impossible de charger les utilisateurs. Veuillez réessayer plus tard.');
        this.isLoading.set(false);
      }
    });
  }

  /**
   * Filtre les utilisateurs en fonction du terme de recherche
   * @returns Liste des utilisateurs filtrés
   */
  getFilteredUsers(): ConversationUser[] {
    const term = this.searchTerm.toLowerCase();
    return this.users().filter(user =>
      user.username.toLowerCase().includes(term) ||
      (user.full_name && user.full_name.toLowerCase().includes(term))
    );
  }

  /**
   * Sélectionne ou désélectionne un utilisateur
   * @param user Utilisateur à sélectionner/désélectionner
   */
  toggleUserSelection(user: ConversationUser): void {
    const isSelected = this.selectedUsers().some(u => u.id === user.id);

    if (isSelected) {
      this.selectedUsers.update(users => users.filter(u => u.id !== user.id));
    } else {
      this.selectedUsers.update(users => [...users, user]);
    }
  }

  /**
   * Vérifie si un utilisateur est sélectionné
   * @param user Utilisateur à vérifier
   * @returns true si l'utilisateur est sélectionné
   */
  isUserSelected(user: ConversationUser): boolean {
    return this.selectedUsers().some(u => u.id === user.id);
  }

  /**
   * Crée une nouvelle conversation
   */
  createConversation(): void {
    if (this.selectedUsers().length === 0) {
      this.error.set('Veuillez sélectionner au moins un utilisateur.');
      return;
    }

    this.isCreating.set(true);
    this.error.set(null);

    const participantIds = this.selectedUsers().map(user => user.id);
    const name = this.isGroup ? this.conversationName : undefined;

    this.messagingService.createConversation(participantIds, name, this.isGroup).subscribe({
      next: (conversation) => {
        this.isCreating.set(false);
        this.router.navigate(['/messaging/conversations', conversation.id]);
      },
      error: (err) => {
        this.logger.error('Erreur lors de la création de la conversation', {
          component: 'NewConversationComponent',
          error: err
        });
        this.error.set('Impossible de créer la conversation. Veuillez réessayer plus tard.');
        this.isCreating.set(false);
      }
    });
  }

  /**
   * Retourne à la liste des conversations
   */
  goBack(): void {
    this.router.navigate(['/messaging']);
  }
}
