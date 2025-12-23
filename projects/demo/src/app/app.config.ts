import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideToastr } from '@perfectui/toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideToastr({
      position: 'top-right',
      duration: 5000,
      maxToasts: 5,
      showProgressBar: true,
      showCloseButton: true,
    }),
  ]
};

