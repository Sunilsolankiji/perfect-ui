import { EnvironmentProviders, makeEnvironmentProviders, inject, APP_INITIALIZER } from '@angular/core';
import { PERFECTUI_CONFIG, DEFAULT_PERFECTUI_CONFIG } from './theme.config';
import { ThemeService } from './theme.service';
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
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        const themeService = inject(ThemeService);
        return () => Promise.resolve();
      },
      multi: true,
    },
  ]);
}
