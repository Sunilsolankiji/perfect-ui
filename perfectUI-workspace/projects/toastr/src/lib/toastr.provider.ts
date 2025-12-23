import { Provider } from '@angular/core';
import { ToastrConfig, TOASTR_CONFIG, DEFAULT_TOASTR_CONFIG } from './toastr.config';

/**
 * Provides the toastr service with optional configuration.
 *
 * @example
 * ```typescript
 * // In your app.config.ts
 * import { provideToastr } from '@perfectUI/toastr';
 *
 * export const appConfig = {
 *   providers: [
 *     provideToastr({
 *       position: 'top-right',
 *       duration: 5000,
 *       maxToasts: 5,
 *     }),
 *   ],
 * };
 * ```
 */
export function provideToastr(config?: Partial<ToastrConfig>): Provider[] {
  return [
    {
      provide: TOASTR_CONFIG,
      useValue: { ...DEFAULT_TOASTR_CONFIG, ...config },
    },
  ];
}

