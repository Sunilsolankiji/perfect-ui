/**
 * @sunilsolankiji/perfectui/toastr
 *
 * Toast notification perfectui for Angular 19+
 *
 * @example
 * ```typescript
 * // In app.config.ts
 * import { provideToastr } from '@sunilsolankiji/perfectui/toastr';
 *
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideToastr({
 *       position: 'top-right',
 *       duration: 5000,
 *       maxToasts: 5,
 *       showProgressBar: true,
 *     }),
 *   ],
 * };
 *
 * // In component
 * import { ToastrService } from '@sunilsolankiji/perfectui/toastr';
 *
 * @Component({...})
 * export class MyComponent {
 *   private toastr = inject(ToastrService);
 *
 *   showSuccess() {
 *     this.toastr.success('Operation completed!', 'Success');
 *   }
 *
 *   showError() {
 *     this.toastr.error('Something went wrong', 'Error');
 *   }
 * }
 * ```
 */

// Models and types
export type {
  ToastType,
  ToastPosition,
  ToastTheme,
  ToastColorConfig,
  ToastThemeColors,
  ToastOptions,
  Toast,
  ToastEvent,
} from './toastr.models';

// Configuration
export type { ToastrConfig } from './toastr.config';
export { DEFAULT_TOASTR_CONFIG, TOASTR_CONFIG } from './toastr.config';

// Provider
export { provideToastr } from './toastr.provider';

// Service
export { ToastrService } from './toastr.service';

// Components (exported for advanced use cases)
export { ToastrComponent } from './toastr.component';
export { ToastrContainerComponent } from './toastr-container.component';
