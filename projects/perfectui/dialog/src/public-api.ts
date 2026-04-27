/**
 * @sunilsolankiji/perfectui/dialog
 *
 * Dialog and modal perfectui for Angular 19+
 *
 * @example
 * ```typescript
 * // In app.config.ts
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
 *
 * // In component
 * import { DialogService, DIALOG_DATA, DIALOG_REF } from '@sunilsolankiji/perfectui/dialog';
 *
 * @Component({...})
 * export class MyComponent {
 *   private dialog = inject(DialogService);
 *
 *   openAlert() {
 *     this.dialog.alert('Hello!', 'Title');
 *   }
 *
 *   openConfirm() {
 *     this.dialog.confirm('Are you sure?').then(result => {
 *       console.log(result.confirmed);
 *     });
 *   }
 *
 *   openCustomDialog() {
 *     const ref = this.dialog.open(MyDialogComponent, {
 *       data: { userId: 123 },
 *       size: 'lg',
 *     });
 *     ref.afterClosed().then(result => console.log(result));
 *   }
 * }
 * ```
 */

// Models and types
export type {
  DialogPosition,
  DialogSize,
  DialogTheme,
  DialogType,
  DialogButton,
  DialogOptions,
  DialogResult,
  DialogRef,
  Dialog,
} from './dialog.models';

// Configuration
export type { DialogConfig } from './dialog.config';
export { DEFAULT_DIALOG_CONFIG, DIALOG_CONFIG, DIALOG_DATA, DIALOG_REF } from './dialog.config';

// Provider
export { provideDialog } from './dialog.provider';

// Service
export { DialogService } from './dialog.service';

// Components (exported for advanced use cases)
export { DialogComponent } from './dialog.component';
export { DialogContainerComponent } from './dialog-container.component';
