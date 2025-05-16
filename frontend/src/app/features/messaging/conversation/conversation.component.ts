import { Component, OnInit, OnDestroy, ElementRef, ViewChild, inject, signal, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, debounceTime } from 'rxjs';

import { MessagingService, Conversation, Message } from '../../../core/services/messaging.service';
import { AuthService } from '../../../core/services/auth.service';
import { LoggingService } from '../../../core/services/logging.service';

@Component({
  selector: 'app-conversation',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit, OnDestroy {
  @ViewChild('messageContainer') messageContainer!: ElementRef;
  @ViewChild('messageInput') messageInput!: ElementRef;

  // Signaux pour l'état du composant
  conversation = signal<Conversation | null>(null);
  messages = signal<Message[]>([]);
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);
  isSending = signal<boolean>(false);

  // Propriétés pour le formulaire
  newMessage = '';

  // Propriétés pour la gestion de la frappe
  private typingSubject = new Subject<boolean>();
  private destroyRef = inject(DestroyRef);
  private lastTypingStatus = false;

  // Services injectés
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private messagingService = inject(MessagingService);
  private authService = inject(AuthService);
  private logger = inject(LoggingService);

  ngOnInit(): void {
    // Récupérer l'ID de la conversation depuis l'URL
    this.route.paramMap.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(params => {
      const id = params.get('id');
      if (id) {
        const conversationId = parseInt(id, 10);
        this.loadConversation(conversationId);
      } else {
        this.error.set('ID de conversation non spécifié');
        this.isLoading.set(false);
      }
    });

    // S'abonner aux messages reçus
    this.messagingService.onMessageReceived().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(message => {
      this.addMessage(message);
      this.scrollToBottom();
    });

    // Configurer le debounce pour les notifications de frappe
    this.typingSubject.pipe(
      takeUntilDestroyed(this.destroyRef),
      debounceTime(300)
    ).subscribe(isTyping => {
      if (this.lastTypingStatus !== isTyping) {
        this.lastTypingStatus = isTyping;
        // TODO: Implémenter l'envoi de notification de frappe via WebSocket
      }
    });
  }

  ngOnDestroy(): void {
    // Nettoyer les ressources
  }

  /**
   * Charge une conversation
   * @param conversationId ID de la conversation
   */
  loadConversation(conversationId: number): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.messagingService.getConversation(conversationId).subscribe({
      next: (conversation) => {
        this.conversation.set(conversation);

        // Charger les messages
        this.loadMessages(conversationId);
      },
      error: (err) => {
        this.logger.error('Erreur lors du chargement de la conversation', {
          component: 'ConversationComponent',
          conversationId,
          error: err
        });
        this.error.set('Impossible de charger la conversation. Veuillez réessayer plus tard.');
        this.isLoading.set(false);
      }
    });
  }

  /**
   * Charge les messages d'une conversation
   * @param conversationId ID de la conversation
   */
  loadMessages(conversationId: number): void {
    this.messagingService.getMessages(conversationId).subscribe({
      next: (messages) => {
        // Inverser l'ordre pour afficher les plus récents en bas
        this.messages.set([...messages].reverse());
        this.isLoading.set(false);

        // Faire défiler vers le bas après le chargement
        setTimeout(() => this.scrollToBottom(), 100);
      },
      error: (err) => {
        this.logger.error('Erreur lors du chargement des messages', {
          component: 'ConversationComponent',
          conversationId,
          error: err
        });
        this.error.set('Impossible de charger les messages. Veuillez réessayer plus tard.');
        this.isLoading.set(false);
      }
    });
  }

  /**
   * Envoie un message
   */
  sendMessage(): void {
    if (!this.newMessage.trim() || !this.conversation()) return;

    const conversationId = this.conversation()!.id;
    this.isSending.set(true);

    this.messagingService.sendMessage(conversationId, this.newMessage).subscribe({
      next: (message) => {
        this.addMessage(message);
        this.newMessage = '';
        this.isSending.set(false);

        // Donner le focus à l'input
        if (this.messageInput) {
          this.messageInput.nativeElement.focus();
        }

        // Faire défiler vers le bas
        this.scrollToBottom();

        // Indiquer que l'utilisateur n'est plus en train de taper
        this.typingSubject.next(false);
      },
      error: (err) => {
        this.logger.error('Erreur lors de l\'envoi du message', {
          component: 'ConversationComponent',
          conversationId,
          error: err
        });
        this.isSending.set(false);
      }
    });
  }

  /**
   * Ajoute un message à la liste
   * @param message Message à ajouter
   */
  private addMessage(message: Message): void {
    this.messages.update(msgs => [...msgs, message]);
  }

  /**
   * Gère l'événement de frappe
   */
  onTyping(): void {
    this.typingSubject.next(this.newMessage.trim().length > 0);
  }

  /**
   * Fait défiler la liste des messages vers le bas
   */
  private scrollToBottom(): void {
    setTimeout(() => {
      if (this.messageContainer) {
        const element = this.messageContainer.nativeElement;
        element.scrollTop = element.scrollHeight;
      }
    }, 0);
  }

  /**
   * Retourne à la liste des conversations
   */
  goBack(): void {
    this.router.navigate(['/messaging']);
  }

  /**
   * Récupère le nom d'une conversation
   * @returns Nom de la conversation
   */
  getConversationName(): string {
    const conversation = this.conversation();
    if (!conversation) return 'Conversation';

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
   * Vérifie si un message a été envoyé par l'utilisateur courant
   * @param message Message à vérifier
   * @returns true si le message a été envoyé par l'utilisateur courant
   */
  isCurrentUserMessage(message: Message): boolean {
    return message.sender_id === this.getCurrentUserId();
  }

  /**
   * Formate une date pour l'affichage
   * @param dateString Date au format ISO
   * @returns Date formatée
   */
  formatDate(dateString?: string): string {
    if (!dateString) return '';

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
