import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'expired',
    loadComponent: () =>
      import('./features/shared/pages/wedding-expired-page/wedding-expired-page.component').then(
        (m) => m.WeddingExpiredPageComponent
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('./features/shared/layout/layout.component').then((m) => m.LayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/model-01/pages/model-01-page/model-01-page.component').then(
            (m) => m.Model01PageComponent
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
