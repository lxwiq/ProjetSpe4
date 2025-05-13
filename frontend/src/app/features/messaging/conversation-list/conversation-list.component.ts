import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Conversation } from '../../../core/models/messaging.model';
import { MessagingService } from '../../../core/services/messaging.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-conversation-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.css']
})
export class ConversationListComponent {
  @Input() conversations: Conversation[] = [];
  @Input() activeConversationId: number | undefined;
  @Output() conversationSelected = new EventEmitter<number>();

  constructor(
    private messagingService: MessagingService,
    private authService: AuthService
  ) {}

  selectConversation(conversationId: number): void {
    this.conversationSelected.emit(conversationId);
  }

  getConversationName(conversation: Conversation): string {
    return this.messagingService.getConversationName(conversation);
  }

  getParticipantsText(conversation: Conversation): string {
    return this.messagingService.getParticipantsText(conversation);
  }

  getLastMessagePreview(conversation: Conversation): string {
    return this.messagingService.getLastMessagePreview(conversation);
  }

  getLastMessageTime(conversation: Conversation): string {
    return this.messagingService.getLastMessageTime(conversation);
  }

  hasUnreadMessages(conversation: Conversation): boolean {
    if (!conversation.messages || conversation.messages.length === 0) {
      return false;
    }
    
    const currentUserId = this.authService.getCurrentUser()?.id;
    return conversation.messages.some(message => 
      message.sender_id !== currentUserId && !message.read_at
    );
  }

  getAvatarInitial(conversation: Conversation): string {
    if (conversation.is_group) {
      return conversation.name ? conversation.name.charAt(0).toUpperCase() : 'G';
    }
    
    const currentUserId = this.authService.getCurrentUser()?.id;
    const otherParticipant = conversation.conversation_participants.find(
      p => p.user_id !== currentUserId
    );
    
    if (otherParticipant) {
      const name = otherParticipant.users.full_name || otherParticipant.users.username;
      return name.charAt(0).toUpperCase();
    }
    
    return 'U';
  }
}
