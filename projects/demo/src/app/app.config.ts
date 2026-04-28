import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { providePerfectUI } from '@sunilsolankiji/perfectui/core';
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
  ]
};

