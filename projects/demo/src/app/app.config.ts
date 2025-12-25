import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideToastr } from '@perfectui/toastr';
import { provideDialog } from '@perfectui/dialog';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideToastr({
      position: 'top-right',
      duration: 5000,
      maxToasts: 5,
      showProgressBar: true,
      showCloseButton: true,
    }),
    provideDialog({
      size: 'md',
      theme: 'default',
      closeOnBackdropClick: true,
      closeOnEscape: true,
      showCloseButton: true,
    }),
  ]
};

