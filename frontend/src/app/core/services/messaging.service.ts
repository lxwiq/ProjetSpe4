import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { Conversation, Message, NewConversation, NewMessage } from '../models/messaging.model';
import { AuthService } from './auth.service';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  private apiUrl = 'http://localhost:3000/messaging';
  private socketSubscriptions = new Subscription();

  // Observable sources
  private conversationsSubject = new BehaviorSubject<Conversation[]>([]);
  private activeConversationSubject = new BehaviorSubject<Conversation | null>(null);
  private messagesSubject = new BehaviorSubject<Message[]>([]);
  private newMessageSubject = new Subject<Message>();

  // Observable streams
  conversations$ = this.conversationsSubject.asObservable();
  activeConversation$ = this.activeConversationSubject.asObservable();
  messages$ = this.messagesSubject.asObservable();
  newMessage$ = this.newMessageSubject.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private socketService: SocketService
  ) {
    // Subscribe to socket connection status
    this.socketService.connected$.subscribe(connected => {
      if (connected) {
        this.setupSocketListeners();
        this.loadConversations();
      } else {
        this.clearSocketSubscriptions();
      }
    });

    // Subscribe to auth state changes
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.loadConversations();
      } else {
        this.clearData();
      }
    });
  }

  private setupSocketListeners(): void {
    // Clear previous subscriptions
    this.clearSocketSubscriptions();

    // Listen for new messages
    this.socketSubscriptions.add(
      this.socketService.on<{ message: Message }>('message:received').subscribe(data => {
        this.handleNewMessage(data.message);
      })
    );

    // Listen for message read status updates
    this.socketSubscriptions.add(
      this.socketService.on<{ conversationId: number, userId: number }>('message:read').subscribe(data => {
        this.handleMessageRead(data.conversationId, data.userId);
      })
    );

    // Listen for conversation updates
    this.socketSubscriptions.add(
      this.socketService.on<{ conversation: Conversation }>('conversation:updated').subscribe(data => {
        this.handleConversationUpdate(data.conversation);
      })
    );
  }

  private clearSocketSubscriptions(): void {
    this.socketSubscriptions.unsubscribe();
    this.socketSubscriptions = new Subscription();
  }

  private clearData(): void {
    this.conversationsSubject.next([]);
    this.activeConversationSubject.next(null);
    this.messagesSubject.next([]);
  }

  private handleNewMessage(message: Message): void {
    // Add to messages list if it's for the active conversation
    const activeConversation = this.activeConversationSubject.value;
    if (activeConversation && activeConversation.id === message.conversation_id) {
      const currentMessages = this.messagesSubject.value;
      this.messagesSubject.next([message, ...currentMessages]);

      // Mark as read
      this.markMessagesAsRead(message.conversation_id);
    }

    // Update conversations list
    const conversations = this.conversationsSubject.value;
    const updatedConversations = conversations.map(conversation => {
      if (conversation.id === message.conversation_id) {
        return {
          ...conversation,
          messages: [message, ...(conversation.messages || [])].slice(0, 20),
          updated_at: message.sent_at
        };
      }
      return conversation;
    });

    // Sort conversations by updated_at
    updatedConversations.sort((a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    );

    this.conversationsSubject.next(updatedConversations);

    // Emit new message event
    this.newMessageSubject.next(message);
  }

  private handleMessageRead(conversationId: number, userId: number): void {
    // Update messages read status
    const messages = this.messagesSubject.value;
    const updatedMessages = messages.map(message => {
      if (message.conversation_id === conversationId &&
          message.sender_id !== userId &&
          !message.read_at) {
        return {
          ...message,
          read_at: new Date().toISOString()
        };
      }
      return message;
    });

    this.messagesSubject.next(updatedMessages);
  }

  private handleConversationUpdate(updatedConversation: Conversation): void {
    // Update in conversations list
    const conversations = this.conversationsSubject.value;
    const conversationIndex = conversations.findIndex(c => c.id === updatedConversation.id);

    if (conversationIndex >= 0) {
      const updatedConversations = [...conversations];
      updatedConversations[conversationIndex] = updatedConversation;
      this.conversationsSubject.next(updatedConversations);
    } else {
      this.conversationsSubject.next([updatedConversation, ...conversations]);
    }

    // Update active conversation if needed
    const activeConversation = this.activeConversationSubject.value;
    if (activeConversation && activeConversation.id === updatedConversation.id) {
      this.activeConversationSubject.next(updatedConversation);
    }
  }

  // API methods
  loadConversations(): void {
    this.getConversations().subscribe({
      next: (conversations) => {
        this.conversationsSubject.next(conversations);
      },
      error: (error) => {
        console.error('Error loading conversations:', error);
      }
    });
  }

  getConversations(): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(`${this.apiUrl}/conversations`);
  }

  getConversation(conversationId: number): Observable<Conversation> {
    return this.http.get<Conversation>(`${this.apiUrl}/conversations/${conversationId}`);
  }

  createConversation(newConversation: NewConversation): Observable<Conversation> {
    return this.http.post<Conversation>(`${this.apiUrl}/conversations`, newConversation);
  }

  getMessages(conversationId: number, limit: number = 50, offset: number = 0): Observable<Message[]> {
    const params = {
      limit: limit.toString(),
      offset: offset.toString()
    };
    return this.http.get<Message[]>(`${this.apiUrl}/conversations/${conversationId}/messages`, { params });
  }

  sendMessage(conversationId: number, newMessage: NewMessage): Observable<Message> {
    return this.http.post<Message>(`${this.apiUrl}/conversations/${conversationId}/messages`, newMessage);
  }

  addParticipant(conversationId: number, userId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/conversations/${conversationId}/participants`, { userId });
  }

  leaveConversation(conversationId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/conversations/${conversationId}/participants`);
  }

  // Helper methods
  setActiveConversation(conversationId: number): void {
    // Find conversation in list
    const conversations = this.conversationsSubject.value;
    const conversation = conversations.find(c => c.id === conversationId);

    if (conversation) {
      this.activeConversationSubject.next(conversation);

      // Load messages
      this.getMessages(conversationId).subscribe({
        next: (messages) => {
          this.messagesSubject.next(messages);

          // Mark messages as read
          this.markMessagesAsRead(conversationId);
        },
        error: (error) => {
          console.error('Error loading messages:', error);
        }
      });

      // Join conversation room via socket
      this.socketService.emit('conversation:join', { conversationId });
    }
  }

  clearActiveConversation(): void {
    const activeConversation = this.activeConversationSubject.value;

    if (activeConversation) {
      this.socketService.emit('conversation:leave', { conversationId: activeConversation.id });
    }

    this.activeConversationSubject.next(null);
    this.messagesSubject.next([]);
  }

  sendNewMessage(conversationId: number, content: string): void {
    if (!content.trim()) return;

    const newMessage: NewMessage = { content };

    this.sendMessage(conversationId, newMessage).subscribe({
      next: (message) => {
        // Message will be handled by socket event
        this.socketService.emit('message:send', { conversationId, content });
      },
      error: (error) => {
        console.error('Error sending message:', error);
      }
    });
  }

  markMessagesAsRead(conversationId: number): void {
    this.socketService.emit('message:mark-read', { conversationId });
  }

  createNewConversation(participants: number[], name?: string, isGroup: boolean = false): void {
    const newConversation: NewConversation = {
      participantIds: participants,
      name,
      isGroup
    };

    this.createConversation(newConversation).subscribe({
      next: (conversation) => {
        // Add to conversations list
        const conversations = this.conversationsSubject.value;
        this.conversationsSubject.next([conversation, ...conversations]);

        // Set as active conversation
        this.setActiveConversation(conversation.id);

        // Join conversation room via socket
        this.socketService.emit('conversation:join', { conversationId: conversation.id });
      },
      error: (error) => {
        console.error('Error creating conversation:', error);
      }
    });
  }

  getConversationName(conversation: Conversation): string {
    if (conversation.name) {
      return conversation.name;
    }

    if (!conversation.is_group) {
      // For direct conversations, use the other participant's name
      const currentUserId = this.authService.getCurrentUser()?.id;
      const otherParticipant = conversation.conversation_participants.find(
        p => p.user_id !== currentUserId
      );

      if (otherParticipant) {
        return otherParticipant.users.full_name || otherParticipant.users.username;
      }
    }

    return 'Conversation';
  }

  getParticipantsText(conversation: Conversation): string {
    if (conversation.is_group) {
      const count = conversation.conversation_participants.length;
      return `${count} participant${count > 1 ? 's' : ''}`;
    }

    return '';
  }

  getLastMessagePreview(conversation: Conversation): string {
    if (conversation.messages && conversation.messages.length > 0) {
      const lastMessage = conversation.messages[0];
      const sender = lastMessage.users;
      const senderName = sender.full_name || sender.username;
      const currentUserId = this.authService.getCurrentUser()?.id;
      const isSentByCurrentUser = lastMessage.sender_id === currentUserId;

      const prefix = isSentByCurrentUser ? 'Vous: ' : `${senderName}: `;
      const content = lastMessage.content.length > 30
        ? lastMessage.content.substring(0, 30) + '...'
        : lastMessage.content;

      return prefix + content;
    }

    return 'Pas de messages';
  }

  getLastMessageTime(conversation: Conversation): string {
    if (conversation.messages && conversation.messages.length > 0) {
      const lastMessage = conversation.messages[0];
      return this.formatDate(lastMessage.sent_at);
    }

    return this.formatDate(conversation.created_at);
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
      return `Il y a ${diffMins} min`;
    } else if (diffHours < 24) {
      return `Il y a ${diffHours}h`;
    } else if (diffDays < 7) {
      return `Il y a ${diffDays}j`;
    } else {
      return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    }
  }
}
