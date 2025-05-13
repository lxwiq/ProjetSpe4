import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NotificationService } from '../../../services/notification.service';
import { Notification, NotificationType } from '../../../models/notification.model';
import { Subscription } from 'rxjs';
import { NotificationItemComponent } from '../notification-item/notification-item.component';

@Component({
  selector: 'app-notification-list',
  standalone: true,
  imports: [CommonModule, RouterLink, NotificationItemComponent],
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit, OnDestroy {
  @Output() closeDropdown = new EventEmitter<void>();
  
  notifications: Notification[] = [];
  loading = true;
  private subscription = new Subscription();

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.notificationService.notifications$.subscribe(notifications => {
        this.notifications = notifications;
        this.loading = false;
      })
    );

    // Load notifications
    this.notificationService.loadNotifications();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  markAsRead(notification: Notification): void {
    if (!notification.is_read) {
      this.notificationService.markNotificationAsRead(notification.id);
      this.notificationService.emitMarkAsRead(notification.id);
    }
  }

  deleteNotification(notification: Notification): void {
    this.notificationService.removeNotification(notification.id);
    this.notificationService.emitDeleteNotification(notification.id);
  }

  handleNotificationClick(notification: Notification): void {
    this.markAsRead(notification);
    this.closeDropdown.emit();
  }

  getNotificationRoute(notification: Notification): string[] {
    const type = notification.type;
    const content = notification.content;

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
}
