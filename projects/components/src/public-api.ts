/**
 * perfectui
 *
 * A modern, tree-shakable UI component library for Angular 19+
 *
 * This is the main entry point that re-exports all components.
 * For better tree-shaking, import from secondary entry points:
 *
 * @example
 * ```typescript
 * // Better tree-shaking (recommended)
 * import { provideDialog, DialogService } from 'perfectui/dialog';
 * import { provideToastr, ToastrService } from 'perfectui/toastr';
 * import { provideOtp, OtpComponent } from 'perfectui/otp';
 *
 * // Or import everything (less tree-shaking)
 * import { provideDialog, provideToastr, provideOtp } from 'perfectui';
 * ```
 */

// Re-export all secondary entry points
export * from 'perfectui/dialog';
export * from 'perfectui/toastr';
export * from 'perfectui/otp';
