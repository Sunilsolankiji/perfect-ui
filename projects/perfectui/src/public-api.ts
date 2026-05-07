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
 * import { providePerfectUI, PuiThemeService } from '@sunilsolankiji/perfectui/core';
 *
 * // Components
 * import { provideDialog, PuiDialogService } from '@sunilsolankiji/perfectui/dialog';
 * import { provideToastr, PuiToastrService } from '@sunilsolankiji/perfectui/toastr';
 * import { provideOtp, PuiOtp } from '@sunilsolankiji/perfectui/otp';
 * import { PuiSelect } from '@sunilsolankiji/perfectui/select';
 * import { PuiTabs, PuiTab } from '@sunilsolankiji/perfectui/tabs';
 * ```
 *
 * Or import a prebuilt theme CSS:
 * @import '@sunilsolankiji/perfectui/themes/indigo-pink.css';
 */

/** Library version */
export const VERSION = '3.1.1';
