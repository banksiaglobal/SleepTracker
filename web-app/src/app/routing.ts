import { Routes } from '@angular/router';
import { AuthGuard } from './share/guards/auth.guard';
import { DataGuard } from './share/guards/data.guard';

export const APP_ROUTES: Routes = [
  {
    path: 'signup',
    pathMatch: 'full',
    redirectTo: 'info',
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
    path: 'data',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/collect-data/collect-data/collect-data.component').then(
        (m) => m.CollectDataComponent
      ),
    title: 'Data',
    canActivate: [AuthGuard],
  },
  {
    path: 'advice',
    loadComponent: () =>
      import('./pages/advice/advice/advice.component').then(
        (c) => c.AdviceComponent
      ),

    pathMatch: 'full',
    title: 'Advice',
    canActivate: [AuthGuard],
  },
  {
    path: 'sleeps',
    loadComponent: () =>
      import('./pages/sleeps/sleeps.component').then((c) => c.SleepsComponent),
    pathMatch: 'full',
    title: 'Sleeps',
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
    redirectTo: 'about',
  },
];
