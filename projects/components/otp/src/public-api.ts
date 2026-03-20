/**
 * @sunilsolankiji/perfectui/otp
 *
 * OTP (One-Time Password) input component for Angular 19+
 *
 * @example
 * ```typescript
 * // In app.config.ts
 * import { provideOtp } from '@sunilsolankiji/perfectui/otp';
 *
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideOtp({
 *       length: 6,
 *       inputType: 'numeric',
 *       theme: 'outline',
 *       autoFocus: true,
 *     }),
 *   ],
 * };
 *
 * // In component template
 * import { OtpComponent } from '@sunilsolankiji/perfectui/otp';
 *
 * @Component({
 *   imports: [OtpComponent],
 *   template: `
 *     <pui-otp
 *       [(ngModel)]="otpValue"
 *       [length]="6"
 *       (complete)="onOtpComplete($event)"
 *     />
 *   `
 * })
 * export class MyComponent {
 *   otpValue = '';
 *
 *   onOtpComplete(event: OtpCompleteEvent) {
 *     console.log('OTP completed:', event.value);
 *   }
 * }
 * ```
 */

// Models and types
export type {
  OtpInputType,
  OtpTheme,
  OtpSize,
  OtpStatus,
  OtpCompleteEvent,
  OtpChangeEvent,
  OtpInputStyle,
} from './otp.models';

// Configuration
export type { OtpConfig } from './otp.config';
export { DEFAULT_OTP_CONFIG, OTP_CONFIG } from './otp.config';

// Provider
export { provideOtp } from './otp.provider';

// Service
export { OtpService } from './otp.service';

// Component
export { OtpComponent } from './otp.component';
