import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Notification, NotificationType } from '../../../models/notification.model';

@Component({
  selector: 'app-notification-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.css']
})
export class NotificationItemComponent {
  @Input() notification!: Notification;
  @Output() delete = new EventEmitter<void>();

  getNotificationRoute(): string[] {
    const type = this.notification.type;
    const content = this.notification.content;

    switch (type) {
      case 'new_message':
        return ['/messaging', content.conversationId.toString()];
      case 'document_invite':
        return ['/documents', content.documentId.toString()];
      case 'conversation_invite':
        return ['/messaging', content.conversationId.toString()];
      case 'incoming_call':
        return ['/documents', content.documentId.toString()];
      default:
        return ['/dashboard'];
    }
  }

  getNotificationIcon(type: NotificationType): string {
    switch (type) {
      case 'new_message':
        return `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        `;
      case 'document_invite':
        return `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        `;
      case 'conversation_invite':
        return `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        `;
      case 'incoming_call':
        return `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        `;
      default:
        return `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        `;
    }
  }

  getNotificationTitle(notification: Notification): string {
    const type = notification.type;
    const content = notification.content;
    const sender = notification.users_notifications_sender_idTousers;
    const senderName = sender ? (sender.full_name || sender.username) : 'Un utilisateur';

    switch (type) {
      case 'new_message':
        return `Nouveau message de ${content.senderName}`;
      case 'document_invite':
        return `Invitation à collaborer sur un document`;
      case 'conversation_invite':
        return `Ajouté à une conversation`;
      case 'incoming_call':
        return `Appel entrant`;
      default:
        return `Nouvelle notification`;
    }
  }

  getNotificationContent(notification: Notification): string {
    const type = notification.type;
    const content = notification.content;

    switch (type) {
      case 'new_message':
        return content.preview || 'Nouveau message';
      case 'document_invite':
        return `Vous avez été invité à collaborer sur le document "${content.documentTitle}" avec les droits de ${this.translatePermission(content.permissionLevel)}.`;
      case 'conversation_invite':
        return `Vous avez été ajouté à la conversation "${content.conversationName}".`;
      case 'incoming_call':
        return `Appel concernant le document "${content.documentTitle}".`;
      default:
        return 'Cliquez pour voir les détails.';
    }
  }

  translatePermission(permission: string): string {
    switch (permission) {
      case 'read':
        return 'lecture';
      case 'write':
        return 'écriture';
      case 'admin':
        return 'administrateur';
      default:
        return permission;
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSecs < 60) {
      return 'À l\'instant';
    } else if (diffMins < 60) {
      return `Il y a ${diffMins} minute${diffMins > 1 ? 's' : ''}`;
    } else if (diffHours < 24) {
      return `Il y a ${diffHours} heure${diffHours > 1 ? 's' : ''}`;
    } else if (diffDays < 7) {
      return `Il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
    } else {
      return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    }
  }

  onDelete(event: Event): void {
    event.stopPropagation();
    this.delete.emit();
  }
}
