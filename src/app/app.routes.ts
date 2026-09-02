import { Routes } from '@angular/router';
import { weddingPageRoute } from './app.routes.generated';

export const routes: Routes = [
  {
    path: 'expired',
    loadComponent: () =>
      import('./main/pages/wedding-expired-page/wedding-expired-page.component').then(
        (m) => m.WeddingExpiredPageComponent
      ),
  },
  {
    path: '',
    loadComponent: () => import('./main/layout/layout.component').then((m) => m.LayoutComponent),
    children: [weddingPageRoute],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
