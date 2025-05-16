import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MessagingService, Conversation } from '../../../core/services/messaging.service';
import { AuthService } from '../../../core/services/auth.service';
import { LoggingService } from '../../../core/services/logging.service';

@Component({
  selector: 'app-conversation-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.css']
})
export class ConversationListComponent implements OnInit {
  // Signaux pour l'état du composant
  conversations = signal<Conversation[]>([]);
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);

  // Services injectés
  private messagingService = inject(MessagingService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private logger = inject(LoggingService);

  ngOnInit(): void {
    this.loadConversations();
  }

  /**
   * Charge la liste des conversations
   */
  loadConversations(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.messagingService.loadConversations().subscribe({
      next: (conversations) => {
        this.conversations.set(conversations);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.logger.error('Erreur lors du chargement des conversations', {
          component: 'ConversationListComponent',
          error: err
        });
        this.error.set('Impossible de charger les conversations. Veuillez réessayer plus tard.');
        this.isLoading.set(false);
      }
    });
  }

  /**
   * Ouvre une conversation
   * @param conversation Conversation à ouvrir
   */
  openConversation(conversation: Conversation): void {
    this.router.navigate(['/messaging/conversations', conversation.id]);
  }

  /**
   * Crée une nouvelle conversation
   */
  createConversation(): void {
    // TODO: Implémenter la création de conversation
    // Pour l'instant, on pourrait ouvrir une modal ou naviguer vers une page de création
    this.router.navigate(['/messaging/new']);
  }

  /**
   * Récupère le nom d'une conversation
   * @param conversation Conversation
   * @returns Nom de la conversation
   */
  getConversationName(conversation: Conversation): string {
    if (conversation.name) {
      return conversation.name;
    }

    // Pour les conversations 1:1, utiliser le nom de l'autre participant
    if (!conversation.is_group && conversation.conversation_participants.length === 2) {
      const currentUserId = this.getCurrentUserId();
      const otherParticipant = conversation.conversation_participants.find(
        p => p.user_id !== currentUserId
      );

      if (otherParticipant) {
        return otherParticipant.users.full_name || otherParticipant.users.username;
      }
    }

    return 'Conversation sans nom';
  }

  /**
   * Récupère le dernier message d'une conversation
   * @param conversation Conversation
   * @returns Dernier message
   */
  getLastMessage(conversation: Conversation): string {
    if (conversation.messages && conversation.messages.length > 0) {
      const lastMessage = conversation.messages[0]; // Les messages sont triés par date décroissante
      return `${lastMessage.users.username}: ${lastMessage.content}`;
    }

    return 'Aucun message';
  }

  /**
   * Formate une date pour l'affichage
   * @param dateString Date au format ISO
   * @returns Date formatée
   */
  formatDate(dateString?: string): string {
    if (!dateString) return 'Jamais';

    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    // Si moins de 24h, afficher l'heure
    if (diff < 24 * 60 * 60 * 1000) {
      return date.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit'
      });
    }

    // Sinon afficher la date
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  /**
   * Récupère l'ID de l'utilisateur courant
   * @returns ID de l'utilisateur
   */
  getCurrentUserId(): number {
    const user = this.authService.currentUser();
    return user ? user.id : 0;
  }
}
