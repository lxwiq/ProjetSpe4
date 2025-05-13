import { Routes } from '@angular/router';
import { SigninPageComponent } from './features/signin-page/signin-page.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AccessDeniedComponent } from './features/access-denied/access-denied.component';
import { ProfileComponent } from './features/profile/profile.component';
import { adminGuard } from './core/guards/admin.guard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login', component: SigninPageComponent
  },
  {
    path: 'dashboard', component: DashboardComponent
  },
  {
    path: 'access-denied', component: AccessDeniedComponent
  },
  {
    path: 'profile', component: ProfileComponent, canActivate: [authGuard]
  },
  {
    path: 'settings', redirectTo: 'profile', pathMatch: 'full'
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES),
    canActivate: [adminGuard]
  },
  {
    path: '**', redirectTo: 'dashboard'
  }
];
