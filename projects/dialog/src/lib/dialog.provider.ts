import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { DialogConfig, DIALOG_CONFIG } from './dialog.config';

/**
 * Provides the dialog service with optional configuration
 *
 * @example
 * ```typescript
 * // In app.config.ts
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
export function provideDialog(config?: DialogConfig): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: DIALOG_CONFIG,
      useValue: config ?? {},
    },
  ]);
}

