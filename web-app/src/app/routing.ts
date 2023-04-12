import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
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
  },
  {
    path: 'data',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/collect-data/collect-data/collect-data.component').then(
        (m) => m.CollectDataComponent
      ),
    title: 'Data',
  },
  {
    path: 'advice',
    // loadComponent: () => import('./modules/start-menu/user-page/sign-up/signup/signup.component'),

    pathMatch: 'full',
    title: 'Registration',
  },
  {
    path: 'about',
    // loadComponent: () => import('./modules/start-menu/about-page/about-page.component'),
    pathMatch: 'full',
    title: 'About',
  },
  {
    path: '**',
    redirectTo: 'data',
  },
];
