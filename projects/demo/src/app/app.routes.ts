import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'toastr',
    pathMatch: 'full'
  },
  {
    path: 'toastr',
    loadComponent: () => import('./pages/toastr-demo/toastr-demo').then(m => m.ToastrDemo)
  },
  {
    path: 'dialog',
    loadComponent: () => import('./pages/dialog-demo/dialog-demo').then(m => m.DialogDemo)
  },
  {
    path: 'otp',
    loadComponent: () => import('./pages/otp-demo/otp-demo').then(m => m.OtpDemoComponent)
  },
  {
    path: 'select',
    loadComponent: () => import('./pages/select-demo/select-demo').then(m => m.SelectDemoComponent)
  },
  {
    path: 'tabs',
    loadComponent: () => import('./pages/tabs-demo/tabs-demo').then(m => m.TabsDemoComponent)
  },
  {
    path: 'theme',
    loadComponent: () => import('./pages/theme-config/theme-config').then(m => m.ThemeConfigComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFoundComponent)
  }
];

