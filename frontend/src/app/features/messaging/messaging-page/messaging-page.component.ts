import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MessagingService } from '../../../core/services/messaging.service';
import { Conversation } from '../../../core/models/messaging.model';
import { Subscription } from 'rxjs';
import { ConversationListComponent } from '../conversation-list/conversation-list.component';
import { ConversationViewComponent } from '../conversation-view/conversation-view.component';
import { NewConversationComponent } from '../new-conversation/new-conversation.component';

@Component({
  selector: 'app-messaging-page',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    ConversationListComponent,
    ConversationViewComponent,
    NewConversationComponent
  ],
  templateUrl: './messaging-page.component.html',
  styleUrls: ['./messaging-page.component.css']
})
export class MessagingPageComponent implements OnInit, OnDestroy {
  conversations: Conversation[] = [];
  activeConversation: Conversation | null = null;
  isNewConversationOpen = false;
  private subscriptions = new Subscription();

  constructor(
    private messagingService: MessagingService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to conversations
    this.subscriptions.add(
      this.messagingService.conversations$.subscribe(conversations => {
        this.conversations = conversations;
      })
    );

    // Subscribe to active conversation
    this.subscriptions.add(
      this.messagingService.activeConversation$.subscribe(conversation => {
        this.activeConversation = conversation;
      })
    );

    // Load conversations
    this.messagingService.loadConversations();

    // Check if a conversation ID is in the route
    this.subscriptions.add(
      this.route.paramMap.subscribe(params => {
        const conversationId = params.get('id');
        if (conversationId) {
          this.setActiveConversation(parseInt(conversationId));
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.messagingService.clearActiveConversation();
  }

  setActiveConversation(conversationId: number): void {
    this.messagingService.setActiveConversation(conversationId);
    this.router.navigate(['/messaging', conversationId]);
    this.isNewConversationOpen = false;
  }

  openNewConversation(): void {
    this.isNewConversationOpen = true;
    this.messagingService.clearActiveConversation();
    this.router.navigate(['/messaging']);
  }

  closeNewConversation(): void {
    this.isNewConversationOpen = false;
  }

  onConversationCreated(conversationId: number): void {
    this.isNewConversationOpen = false;
    this.setActiveConversation(conversationId);
  }
}
