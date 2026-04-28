import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { OtpConfig, OTP_CONFIG, DEFAULT_OTP_CONFIG } from './otp.config';
import { PuiOtpService } from './otp.service';

/**
 * Provides the OTP component with optional configuration.
 *
 * Registers `PuiOtpService` in the current injector. The `<pui-otp>`
 * component itself is standalone and can be used **without** calling
 * `provideOtp()` — call this only when you want to set global defaults
 * or inject `PuiOtpService` for programmatic helpers (`generateOtp`,
 * `validateOtp`, etc.).
 *
 * @example
 * ```typescript
 * import { provideOtp } from '@sunilsolankiji/perfectui/otp';
 *
 * export const appConfig: ApplicationConfig = {
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
 */
export function provideOtp(config?: Partial<OtpConfig>): EnvironmentProviders {
  return makeEnvironmentProviders([
    PuiOtpService,
    {
      provide: OTP_CONFIG,
      useValue: { ...DEFAULT_OTP_CONFIG, ...config },
    },
  ]);
}
