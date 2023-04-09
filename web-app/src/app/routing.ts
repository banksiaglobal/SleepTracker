import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'info',
  },
  {
    path: 'info',
    pathMatch: 'full',
    title: 'Info',
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
    redirectTo: 'info',
  },
];
