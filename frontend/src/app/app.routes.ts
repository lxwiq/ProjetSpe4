import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  // Route de connexion sans layout
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
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
