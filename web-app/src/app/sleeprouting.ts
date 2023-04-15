import { Routes } from '@angular/router';
import { SleepsComponent } from './pages/sleeps-page/sleeps/sleeps.component';
import { SleepComponent } from './pages/sleep/sleep/sleep.component';
import { CollectDataComponent } from './pages/collect-data/collect-data/collect-data.component';
import { AboutComponent } from './pages/about/about/about.component';

export const SLEEPS_ROUTES: Routes = [
  {
    path: '',
    component: SleepsComponent,
    pathMatch: 'full',
    title: 'Sleeps',
  },
  {
    path: 'new',
    component: CollectDataComponent,
    pathMatch: 'full',
    title: 'New',
  },
  {
    path: ':id',
    component: SleepComponent,
    pathMatch: 'full',
    title: 'Edit package',
  },
];
