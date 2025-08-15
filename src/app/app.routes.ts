import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./routes/home/home').then((m) => m.Home),
    data: {
      title: 'Hybiza Race — Evento de fitness en Ibiza',
    },
  },
  {
    path: 'voluntarios',
    loadComponent: () =>
      import('./routes/volunteers/volunteers').then((m) => m.Volunteers),
    data: {
      title: 'Voluntarios — Hybiza Race',
    },
  },
  {
    path: 'tienda',
    loadComponent: () => import('./routes/shop/shop').then((m) => m.Shop),
    data: {
      title: 'Tienda Oficial — Hybiza Race',
    },
  },
];
