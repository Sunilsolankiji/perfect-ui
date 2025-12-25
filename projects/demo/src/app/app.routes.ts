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
  }
];

