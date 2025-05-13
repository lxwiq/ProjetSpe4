import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { NotificationService } from './core/services/notification.service';
import { SocketService } from './core/services/socket.service';
import { MessagingService } from './core/services/messaging.service';
import { QuillModule } from 'ngx-quill';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom(QuillModule.forRoot()),
    SocketService,
    NotificationService,
    MessagingService
  ]
};
