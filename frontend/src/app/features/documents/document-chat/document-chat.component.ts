import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChild, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, debounceTime } from 'rxjs';

import { CollaborativeDocumentService } from '../../../core/services/collaborative-document.service';
import { AuthService } from '../../../core/services/auth.service';

interface ChatMessage {
  userId: number;
  username: string;
  content: string;
  timestamp: Date;
  profilePicture?: string | null;
  isCurrentUser?: boolean;
}

@Component({
  selector: 'app-document-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './document-chat.component.html',
  styleUrl: './document-chat.component.css'
})
export class DocumentChatComponent implements OnInit, OnDestroy {
  @Input() documentId!: number;
  @ViewChild('messageContainer') messageContainer!: ElementRef;
  @ViewChild('messageInput') messageInput!: ElementRef;

  messages = signal<ChatMessage[]>([]);
  newMessage = '';
  isOpen = signal<boolean>(false);
  typingUsers = signal<{[key: number]: {username: string, timestamp: number}}>({});

  private typingSubject = new Subject<boolean>();
  private destroyRef = inject(DestroyRef);
  private lastTypingStatus = false;

  constructor(
    private collaborativeService: CollaborativeDocumentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Écouter les messages de chat
    this.collaborativeService.onChatMessage()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(message => {
        const currentUserId = this.getCurrentUserId();
        const chatMessage: ChatMessage = {
          userId: message.userId,
          username: message.username,
          content: message.content,
          timestamp: new Date(message.timestamp),
          profilePicture: message.profilePicture,
          isCurrentUser: message.userId === currentUserId
        };

        this.messages.update(msgs => [...msgs, chatMessage]);
        this.scrollToBottom();

        // Supprimer l'état de frappe de l'utilisateur qui vient d'envoyer un message
        this.removeTypingUser(message.userId);
      });

    // Écouter les notifications de frappe
    this.collaborativeService.onChatTyping()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        if (data.userId === this.getCurrentUserId()) return;

        if (data.isTyping) {
          this.addTypingUser(data.userId, data.username || `Utilisateur ${data.userId}`);
        } else {
          this.removeTypingUser(data.userId);
        }
      });

    // Configurer le debounce pour les notifications de frappe
    this.typingSubject
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        debounceTime(300)
      )
      .subscribe(isTyping => {
        if (this.lastTypingStatus !== isTyping) {
          this.lastTypingStatus = isTyping;
          this.collaborativeService.sendChatTypingStatus(this.documentId, isTyping);
        }
      });
  }

  ngOnDestroy(): void {
    // Nettoyer les ressources
  }

  /**
   * Ajoute un utilisateur à la liste des utilisateurs en train de taper
   */
  private addTypingUser(userId: number, username: string): void {
    this.typingUsers.update(users => ({
      ...users,
      [userId]: { username, timestamp: Date.now() }
    }));

    // Supprimer automatiquement l'utilisateur après 3 secondes
    setTimeout(() => {
      this.removeTypingUser(userId);
    }, 3000);
  }

  /**
   * Supprime un utilisateur de la liste des utilisateurs en train de taper
   */
  private removeTypingUser(userId: number): void {
    this.typingUsers.update(users => {
      const newUsers = { ...users };
      delete newUsers[userId];
      return newUsers;
    });
  }

  /**
   * Récupère l'ID de l'utilisateur courant
   */
  private getCurrentUserId(): number {
    const user = this.authService.currentUser();
    return user ? user.id : 0;
  }

  /**
   * Envoie un message
   */
  sendMessage(): void {
    if (!this.newMessage.trim()) return;

    this.collaborativeService.sendChatMessage(this.documentId, this.newMessage);
    this.newMessage = '';
    this.messageInput.nativeElement.focus();

    // Indiquer que l'utilisateur n'est plus en train de taper
    this.typingSubject.next(false);
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
   * Ouvre ou ferme le chat
   */
  toggleChat(): void {
    this.isOpen.update(open => !open);
    if (this.isOpen()) {
      setTimeout(() => {
        this.scrollToBottom();
        this.messageInput.nativeElement.focus();
      }, 0);
    }
  }

  /**
   * Formate la date pour l'affichage
   */
  formatTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  /**
   * Vérifie s'il y a des utilisateurs en train de taper
   */
  hasTypingUsers(): boolean {
    return Object.keys(this.typingUsers()).length > 0;
  }

  /**
   * Récupère la liste des utilisateurs en train de taper
   */
  getTypingUsersText(): string {
    const users = this.typingUsers();
    const usernames = Object.values(users).map(u => u.username);

    if (usernames.length === 1) {
      return `${usernames[0]} est en train d'écrire...`;
    } else if (usernames.length === 2) {
      return `${usernames[0]} et ${usernames[1]} sont en train d'écrire...`;
    } else if (usernames.length > 2) {
      return `${usernames.length} utilisateurs sont en train d'écrire...`;
    }

    return '';
  }
}
