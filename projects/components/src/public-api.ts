/**
 * @sunilsolankiji/perfectui
 *
 * A modern, tree-shakable UI component library for Angular 19+
 *
 * Import from secondary entry points for optimal tree-shaking:
 *
 * @example
 * ```typescript
 * // Theming (optional)
 * import { providePerfectUI, ThemeService } from '@sunilsolankiji/perfectui/core';
 *
 * // Components
 * import { provideDialog, DialogService } from '@sunilsolankiji/perfectui/dialog';
 * import { provideToastr, ToastrService } from '@sunilsolankiji/perfectui/toastr';
 * import { provideOtp, OtpComponent } from '@sunilsolankiji/perfectui/otp';
 * ```
 *
 * Or import a prebuilt theme CSS:
 * @import '@sunilsolankiji/perfectui/themes/indigo-pink.css';
 */

/** Library version */
export const VERSION = '2.0.0';

// Import directly from secondary entry points for tree-shaking:
// - @sunilsolankiji/perfectui/core (theming)
// - @sunilsolankiji/perfectui/dialog
// - @sunilsolankiji/perfectui/toastr
// - @sunilsolankiji/perfectui/otp

