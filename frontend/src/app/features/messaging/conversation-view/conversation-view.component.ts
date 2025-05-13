import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Conversation, Message } from '../../../core/models/messaging.model';
import { MessagingService } from '../../../core/services/messaging.service';
import { AuthService } from '../../../core/services/auth.service';
import { Subscription } from 'rxjs';
import { MessageItemComponent } from '../message-item/message-item.component';

@Component({
  selector: 'app-conversation-view',
  standalone: true,
  imports: [CommonModule, FormsModule, MessageItemComponent],
  templateUrl: './conversation-view.component.html',
  styleUrls: ['./conversation-view.component.css']
})
export class ConversationViewComponent implements OnInit, OnChanges, OnDestroy {
  @Input() conversation!: Conversation;
  @ViewChild('messageContainer') messageContainer!: ElementRef;
  @ViewChild('messageInput') messageInput!: ElementRef;
  
  messages: Message[] = [];
  newMessage = '';
  loading = true;
  private subscriptions = new Subscription();
  private currentUserId: number;

  constructor(
    private messagingService: MessagingService,
    private authService: AuthService
  ) {
    this.currentUserId = this.authService.getCurrentUser()?.id;
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.messagingService.messages$.subscribe(messages => {
        this.messages = messages;
        this.loading = false;
        this.scrollToBottom();
      })
    );

    this.subscriptions.add(
      this.messagingService.newMessage$.subscribe(() => {
        this.scrollToBottom();
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['conversation'] && this.conversation) {
      this.loading = true;
      this.messagingService.setActiveConversation(this.conversation.id);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  sendMessage(): void {
    if (!this.newMessage.trim()) return;
    
    this.messagingService.sendNewMessage(this.conversation.id, this.newMessage);
    this.newMessage = '';
    
    // Focus the input field after sending
    setTimeout(() => {
      this.messageInput.nativeElement.focus();
    });
  }

  scrollToBottom(): void {
    setTimeout(() => {
      if (this.messageContainer) {
        const element = this.messageContainer.nativeElement;
        element.scrollTop = element.scrollHeight;
      }
    });
  }

  getConversationName(): string {
    return this.messagingService.getConversationName(this.conversation);
  }

  getParticipantsText(): string {
    return this.messagingService.getParticipantsText(this.conversation);
  }

  isCurrentUser(message: Message): boolean {
    return message.sender_id === this.currentUserId;
  }

  trackByMessageId(index: number, message: Message): number {
    return message.id;
  }
}
