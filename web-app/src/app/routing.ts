import { Routes } from '@angular/router';
import { AuthGuard } from './share/guards/auth.guard';
import { DataGuard } from './share/guards/data.guard';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'about',
  },
  {
    path: 'signup',
    pathMatch: 'full',
    loadComponent: () =>
      import('./register/register/register.component').then(
        (m) => m.RegisterComponent
      ),
    title: 'Register',
    canActivate: [DataGuard],
  },
  {
    path: 'signin',
    pathMatch: 'full',
    loadComponent: () =>
      import('./auth/auth/auth.component').then((m) => m.AuthComponent),
    title: 'Auth',
    canActivate: [DataGuard],
  },

  {
    path: 'sleeps',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/sleeps-page/sleeps/sleeps.component').then(
        (c) => c.SleepsComponent
      ),
    title: 'Auth',
    canActivate: [AuthGuard],
  },
  {
    path: 'sleep/new',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/collect-data/collect-data/collect-data.component').then(
        (c) => c.CollectDataComponent
      ),
    title: 'New sleep',
    canActivate: [AuthGuard],
  },
  {
    path: 'sleep/:id',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/sleep/sleep/sleep.component').then(
        (c) => c.SleepComponent
      ),
    title: 'Sleep',
    canActivate: [AuthGuard],
  },

  {
    path: 'advice/:id',
    loadComponent: () =>
      import('./pages/advice/advice/advice.component').then(
        (c) => c.AdviceComponent
      ),

    pathMatch: 'full',
    title: 'Advice',
    canActivate: [AuthGuard],
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about/about.component').then(
        (c) => c.AboutComponent
      ),
    pathMatch: 'full',
    title: 'About',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
