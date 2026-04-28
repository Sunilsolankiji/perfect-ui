import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { providePerfectUI } from '@sunilsolankiji/perfectui/core';
import { provideToastr } from '@sunilsolankiji/perfectui/toastr';
import { provideDialog } from '@sunilsolankiji/perfectui/dialog';
import { provideOtp } from '@sunilsolankiji/perfectui/otp';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withHashLocation()),
    // PerfectUI theming - handles theme, dark mode, and density
    providePerfectUI({
      theme: 'deep-purple-amber',
      darkMode: 'auto',
      density: 'default',
    }),
    // Component services are registered explicitly via their provideX()
    // functions (services are NOT providedIn: 'root'). Demo pages inject
    // PuiToastrService / PuiDialogService / PuiOtpService, so opt in here.
    provideToastr(),
    provideDialog(),
    provideOtp(),
  ]
};

