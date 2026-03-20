import { Provider } from '@angular/core';
import { OtpConfig, OTP_CONFIG, DEFAULT_OTP_CONFIG } from './otp.config';

/**
 * Provides the OTP component with optional configuration.
 *
 * @example
 * ```typescript
 * // In your app.config.ts
 * import { provideOtp } from '@perfectui/otp';
 *
 * export const appConfig = {
 *   providers: [
 *     provideOtp({
 *       length: 6,
 *       inputType: 'numeric',
 *       theme: 'outline',
 *       size: 'medium',
 *       autoFocus: true,
 *     }),
 *   ],
 * };
 * ```
 *
 * @example
 * ```typescript
 * // With masked input for security
 * provideOtp({
 *   length: 4,
 *   masked: true,
 *   maskChar: '*',
 *   autoSubmit: true,
 * })
 * ```
 *
 * @example
 * ```typescript
 * // With separator for credit card style
 * provideOtp({
 *   length: 16,
 *   separatorAfter: 4,
 *   separatorChar: '-',
 * })
 * ```
 */
export function provideOtp(config?: Partial<OtpConfig>): Provider[] {
  return [
    {
      provide: OTP_CONFIG,
      useValue: { ...DEFAULT_OTP_CONFIG, ...config },
    },
  ];
}
