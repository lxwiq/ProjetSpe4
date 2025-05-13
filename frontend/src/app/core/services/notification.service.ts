import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { Notification } from '../models/notification.model';
import { AuthService } from './auth.service';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:3000/notifications';
  private socketSubscriptions = new Subscription();

  // Observable sources
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  private unreadCountSubject = new BehaviorSubject<number>(0);
  private newNotificationSubject = new Subject<Notification>();

  // Observable streams
  notifications$ = this.notificationsSubject.asObservable();
  unreadCount$ = this.unreadCountSubject.asObservable();
  newNotification$ = this.newNotificationSubject.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private socketService: SocketService
  ) {
    // Subscribe to socket connection status
    this.socketService.connected$.subscribe(connected => {
      if (connected) {
        this.setupSocketListeners();
        this.loadNotifications();
      } else {
        this.clearSocketSubscriptions();
      }
    });

    // Subscribe to auth state changes
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.loadNotifications();
      } else {
        this.clearNotifications();
      }
    });
  }

  private setupSocketListeners(): void {
    // Clear previous subscriptions
    this.clearSocketSubscriptions();

    // Listen for new notifications
    this.socketSubscriptions.add(
      this.socketService.on<{ notification: Notification }>('notification:received').subscribe(data => {
        this.handleNewNotification(data.notification);
      })
    );

    // Listen for pending notifications
    this.socketSubscriptions.add(
      this.socketService.on<{ notifications: Notification[] }>('notification:pending').subscribe(data => {
        this.handlePendingNotifications(data.notifications);
      })
    );
  }

  private clearSocketSubscriptions(): void {
    this.socketSubscriptions.unsubscribe();
    this.socketSubscriptions = new Subscription();
  }

  private handleNewNotification(notification: Notification): void {
    // Add to notifications list
    const currentNotifications = this.notificationsSubject.value;
    this.notificationsSubject.next([notification, ...currentNotifications]);

    // Update unread count
    this.updateUnreadCount();

    // Emit new notification event
    this.newNotificationSubject.next(notification);
  }

  private handlePendingNotifications(notifications: Notification[]): void {
    if (notifications && notifications.length > 0) {
      // Add to notifications list
      const currentNotifications = this.notificationsSubject.value;
      this.notificationsSubject.next([...notifications, ...currentNotifications]);

      // Update unread count
      this.updateUnreadCount();
    }
  }

  private updateUnreadCount(): void {
    const unreadCount = this.notificationsSubject.value.filter(n => !n.is_read).length;
    this.unreadCountSubject.next(unreadCount);
  }

  private clearNotifications(): void {
    this.notificationsSubject.next([]);
    this.unreadCountSubject.next(0);
  }

  // Load notifications from the API
  loadNotifications(unreadOnly: boolean = false): void {
    this.getNotifications(unreadOnly).subscribe({
      next: (notifications) => {
        this.notificationsSubject.next(notifications);
        this.updateUnreadCount();
      },
      error: (error) => {
        console.error('Error loading notifications:', error);
      }
    });
  }

  // API methods
  getNotifications(unreadOnly: boolean = false, limit: number = 20, offset: number = 0): Observable<Notification[]> {
    const params = {
      unreadOnly: unreadOnly.toString(),
      limit: limit.toString(),
      offset: offset.toString()
    };
    return this.http.get<Notification[]>(this.apiUrl, { params });
  }

  markAsRead(notificationId: number): Observable<Notification> {
    return this.http.put<Notification>(`${this.apiUrl}/${notificationId}/read`, {});
  }

  markAllAsRead(): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/read-all`, {});
  }

  deleteNotification(notificationId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${notificationId}`);
  }

  // Helper methods for UI
  markNotificationAsRead(notificationId: number): void {
    this.markAsRead(notificationId).subscribe({
      next: (updatedNotification) => {
        // Update the notification in the list
        const notifications = this.notificationsSubject.value.map(n =>
          n.id === notificationId ? { ...n, is_read: true, read_at: new Date().toISOString() } : n
        );
        this.notificationsSubject.next(notifications);
        this.updateUnreadCount();
      },
      error: (error) => {
        console.error('Error marking notification as read:', error);
      }
    });
  }

  markAllNotificationsAsRead(): void {
    this.markAllAsRead().subscribe({
      next: () => {
        // Update all notifications in the list
        const notifications = this.notificationsSubject.value.map(n =>
          ({ ...n, is_read: true, read_at: new Date().toISOString() })
        );
        this.notificationsSubject.next(notifications);
        this.unreadCountSubject.next(0);
      },
      error: (error) => {
        console.error('Error marking all notifications as read:', error);
      }
    });
  }

  removeNotification(notificationId: number): void {
    this.deleteNotification(notificationId).subscribe({
      next: () => {
        // Remove the notification from the list
        const notifications = this.notificationsSubject.value.filter(n => n.id !== notificationId);
        this.notificationsSubject.next(notifications);
        this.updateUnreadCount();
      },
      error: (error) => {
        console.error('Error deleting notification:', error);
      }
    });
  }

  // Socket event emitters
  emitMarkAsRead(notificationId: number): void {
    this.socketService.emit('notification:mark-read', { notificationId });
  }

  emitMarkAllAsRead(): void {
    this.socketService.emit('notification:mark-all-read', {});
  }

  emitDeleteNotification(notificationId: number): void {
    this.socketService.emit('notification:delete', { notificationId });
  }
}
