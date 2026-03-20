import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideToastr } from '@sunilsolankiji/perfectui/toastr';
import { provideDialog } from '@sunilsolankiji/perfectui/dialog';
import { provideOtp } from '@sunilsolankiji/perfectui/otp';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withHashLocation()),
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
    provideOtp({
      length: 6,
      inputType: 'numeric',
      theme: 'default',
      size: 'medium',
      autoFocus: true,
    }),
  ]
};

