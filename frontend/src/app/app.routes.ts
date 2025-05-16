import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  // Routes d'authentification sans layout
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'verify-2fa',
    loadComponent: () => import('./features/auth/two-factor-verify/two-factor-verify.component').then(m => m.TwoFactorVerifyComponent)
  },

  // Routes avec layout principal
  {
    path: '',
    loadComponent: () => import('./layouts/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'admin',
        loadComponent: () => import('./features/admin/admin.component').then(m => m.AdminComponent),
        canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'profile',
        loadComponent: () => import('./features/user/profile/profile.component').then(m => m.ProfileComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'profile/2fa/setup',
        loadComponent: () => import('./features/user/two-factor-setup/two-factor-setup.component').then(m => m.TwoFactorSetupComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'profile/2fa/disable',
        loadComponent: () => import('./features/user/two-factor-disable/two-factor-disable.component').then(m => m.TwoFactorDisableComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'documents',
        loadComponent: () => import('./features/documents/document-list/document-list.component').then(m => m.DocumentListComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'documents/:id',
        loadComponent: () => import('./features/documents/document-viewer/document-viewer.component').then(m => m.DocumentViewerComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'documents/edit/:id',
        loadComponent: () => import('./features/documents/document-editor/document-editor.component').then(m => m.DocumentEditorComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'messaging',
        loadComponent: () => import('./features/messaging/conversation-list/conversation-list.component').then(m => m.ConversationListComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'messaging/new',
        loadComponent: () => import('./features/messaging/new-conversation/new-conversation.component').then(m => m.NewConversationComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'messaging/conversations/:id',
        loadComponent: () => import('./features/messaging/conversation/conversation.component').then(m => m.ConversationComponent),
        canActivate: [AuthGuard]
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },

  // Route par défaut
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
