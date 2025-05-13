import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../services/notification.service';
import { NotificationListComponent } from '../notification-list/notification-list.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notification-bell',
  standalone: true,
  imports: [CommonModule, NotificationListComponent],
  templateUrl: './notification-bell.component.html',
  styleUrls: ['./notification-bell.component.css']
})
export class NotificationBellComponent implements OnInit, OnDestroy {
  unreadCount = 0;
  isDropdownOpen = false;
  private subscription = new Subscription();

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    // Subscribe to unread count changes
    this.subscription.add(
      this.notificationService.unreadCount$.subscribe(count => {
        this.unreadCount = count;
      })
    );

    // Subscribe to new notifications
    this.subscription.add(
      this.notificationService.newNotification$.subscribe(() => {
        // Could add a visual or audio alert here
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown(): void {
    this.isDropdownOpen = false;
  }

  markAllAsRead(): void {
    this.notificationService.markAllNotificationsAsRead();
    this.notificationService.emitMarkAllAsRead();
  }
}
