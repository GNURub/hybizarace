import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./routes/home/home').then((m) => m.Home),
    data: {
      title: 'Hybiza Race — Evento de fitness en Ibiza',
    },
  },
];
