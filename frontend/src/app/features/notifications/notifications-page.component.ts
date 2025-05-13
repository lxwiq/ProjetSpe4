import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../core/services/notification.service';
import { Notification } from '../../core/models/notification.model';
import { Subscription } from 'rxjs';
import { NotificationItemComponent } from '../../core/components/notifications/notification-item/notification-item.component';

@Component({
  selector: 'app-notifications-page',
  standalone: true,
  imports: [CommonModule, NotificationItemComponent],
  templateUrl: './notifications-page.component.html',
  styleUrls: ['./notifications-page.component.css']
})
export class NotificationsPageComponent implements OnInit, OnDestroy {
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

    // Load all notifications
    this.notificationService.loadNotifications(false);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  markAllAsRead(): void {
    this.notificationService.markAllNotificationsAsRead();
    this.notificationService.emitMarkAllAsRead();
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
}
