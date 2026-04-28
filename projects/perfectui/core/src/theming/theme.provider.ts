import {
  EnvironmentProviders,
  makeEnvironmentProviders,
  inject,
  provideAppInitializer,
} from '@angular/core';
import { PERFECTUI_CONFIG, DEFAULT_PERFECTUI_CONFIG } from './theme.config';
import { PuiThemeService } from './theme.service';
import type { PerfectUIConfig } from './theme.models';

/**
 * Provides PerfectUI theming configuration
 *
 * @example
 * ```typescript
 * import { providePerfectUI } from '@sunilsolankiji/perfectui/core';
 *
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     providePerfectUI({
 *       theme: 'indigo-pink',
 *       darkMode: 'auto',
 *       density: 'default'
 *     })
 *   ]
 * };
 * ```
 */
export function providePerfectUI(config: PerfectUIConfig = {}): EnvironmentProviders {
  const mergedConfig: PerfectUIConfig = {
    ...DEFAULT_PERFECTUI_CONFIG,
    ...config,
    typography: {
      ...DEFAULT_PERFECTUI_CONFIG.typography,
      ...config.typography,
    },
  };

  return makeEnvironmentProviders([
    {
      provide: PERFECTUI_CONFIG,
      useValue: mergedConfig,
    },
    provideAppInitializer(() => {
      // Eagerly instantiate the theme service so the configured theme,
      // dark mode and density are applied before the app renders.
      inject(PuiThemeService);
    }),
  ]);
}
