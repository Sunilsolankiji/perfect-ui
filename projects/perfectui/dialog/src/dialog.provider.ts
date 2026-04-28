import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { DialogConfig, DIALOG_CONFIG, DEFAULT_DIALOG_CONFIG } from './dialog.config';
import { PuiDialogService } from './dialog.service';

/**
 * Provides the dialog service with optional configuration.
 *
 * `PuiDialogService` is **not** registered in the root injector — you must
 * call `provideDialog()` in your `app.config.ts` (or a lazy route's
 * providers) before injecting the service.
 *
 * @example
 * ```typescript
 * import { provideDialog } from '@sunilsolankiji/perfectui/dialog';
 *
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideDialog({
 *       size: 'md',
 *       theme: 'default',
 *       closeOnBackdropClick: true,
 *     }),
 *   ],
 * };
 * ```
 */
export function provideDialog(config?: Partial<DialogConfig>): EnvironmentProviders {
  return makeEnvironmentProviders([
    PuiDialogService,
    {
      provide: DIALOG_CONFIG,
      useValue: { ...DEFAULT_DIALOG_CONFIG, ...config },
    },
  ]);
}
