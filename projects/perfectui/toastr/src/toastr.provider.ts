import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { ToastrConfig, TOASTR_CONFIG, DEFAULT_TOASTR_CONFIG } from './toastr.config';
import { PuiToastrService } from './toastr.service';

/**
 * Provides the toastr service with optional configuration.
 *
 * `PuiToastrService` is **not** registered in the root injector — you must
 * call `provideToastr()` in your `app.config.ts` (or a lazy route's
 * providers) before injecting the service.
 *
 * @example
 * ```typescript
 * import { provideToastr } from '@sunilsolankiji/perfectui/toastr';
 *
 * export const appConfig: ApplicationConfig = {
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
export function provideToastr(config?: Partial<ToastrConfig>): EnvironmentProviders {
  return makeEnvironmentProviders([
    PuiToastrService,
    {
      provide: TOASTR_CONFIG,
      useValue: { ...DEFAULT_TOASTR_CONFIG, ...config },
    },
  ]);
}
