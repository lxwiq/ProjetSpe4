import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessagingService } from '../../../core/services/messaging.service';
import { UsersService } from '../../../core/services/users.service';
import { AuthService } from '../../../core/services/auth.service';

interface User {
  id: number;
  username: string;
  full_name: string;
  profile_picture?: string;
}

@Component({
  selector: 'app-new-conversation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-conversation.component.html',
  styleUrls: ['./new-conversation.component.css']
})
export class NewConversationComponent implements OnInit {
  @Output() conversationCreated = new EventEmitter<number>();
  @Output() cancel = new EventEmitter<void>();

  users: User[] = [];
  filteredUsers: User[] = [];
  selectedUsers: User[] = [];
  searchTerm = '';
  isGroup = false;
  groupName = '';
  loading = true;
  creating = false;
  error = '';

  constructor(
    private messagingService: MessagingService,
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.usersService.getUsers().subscribe({
      next: (users) => {
        const currentUserId = this.authService.getCurrentUser()?.id;
        this.users = users.filter((user: User) => user.id !== currentUserId);
        this.filteredUsers = [...this.users];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.error = 'Erreur lors du chargement des utilisateurs';
        this.loading = false;
      }
    });
  }

  filterUsers(): void {
    if (!this.searchTerm.trim()) {
      this.filteredUsers = this.users.filter(user =>
        !this.selectedUsers.some(selected => selected.id === user.id)
      );
      return;
    }

    const search = this.searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      (user.username.toLowerCase().includes(search) ||
       user.full_name.toLowerCase().includes(search)) &&
      !this.selectedUsers.some(selected => selected.id === user.id)
    );
  }

  selectUser(user: User): void {
    this.selectedUsers.push(user);
    this.filteredUsers = this.filteredUsers.filter(u => u.id !== user.id);
    this.searchTerm = '';
  }

  removeUser(user: User): void {
    this.selectedUsers = this.selectedUsers.filter(u => u.id !== user.id);
    this.filteredUsers.push(user);
    this.filterUsers();
  }

  createConversation(): void {
    if (this.selectedUsers.length === 0) {
      this.error = 'Veuillez sélectionner au moins un utilisateur';
      return;
    }

    if (this.isGroup && !this.groupName.trim()) {
      this.error = 'Veuillez entrer un nom pour le groupe';
      return;
    }

    this.creating = true;
    this.error = '';

    const participantIds = this.selectedUsers.map(user => user.id);
    const name = this.isGroup ? this.groupName.trim() : undefined;

    this.messagingService.createNewConversation(participantIds, name, this.isGroup);

    // Subscribe to conversations to get the new conversation ID
    const subscription = this.messagingService.conversations$.subscribe(conversations => {
      if (conversations.length > 0) {
        // Find the conversation with the selected participants
        const conversation = conversations.find(c => {
          if (this.isGroup && c.name === name && c.is_group) {
            return true;
          }

          if (!this.isGroup && !c.is_group && c.conversation_participants.length === 2) {
            const participantIds = c.conversation_participants.map(p => p.user_id);
            return participantIds.includes(this.selectedUsers[0].id);
          }

          return false;
        });

        if (conversation) {
          this.conversationCreated.emit(conversation.id);
          subscription.unsubscribe();
        }
      }
    });
  }

  cancelCreation(): void {
    this.cancel.emit();
  }
}
