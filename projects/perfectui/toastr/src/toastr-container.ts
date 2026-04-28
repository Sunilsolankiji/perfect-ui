import {
  Component,
  input,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { Toast, ToastPosition } from './toastr.models';
import { PuiToastr } from './toastr';
import { PuiToastrService } from './toastr.service';

@Component({
  selector: 'pui-toastr-container',
  imports: [PuiToastr],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="pui-toastr-container" [class]="'pui-toastr-' + position()">
      @for (toast of toasts(); track toast.id) {
        <pui-toast
          [toast]="toast"
          (toastClick)="onToastClick(toast)"
          (toastClose)="onToastClose(toast)"
          (toastTimeout)="onToastTimeout(toast)"
        />
      }
    </div>
  `,
  styleUrl: './toastr-container.css'
})
export class PuiToastrContainer {
  private toastrService = inject(PuiToastrService);

  // Signal-based inputs (Angular 19+)
  readonly toasts = input<Toast[]>([]);
  readonly position = input<ToastPosition>('top-right');

  onToastClick(toast: Toast): void {
    this.toastrService.handleClick(toast);
  }

  onToastClose(toast: Toast): void {
    this.toastrService.remove(toast.id);
  }

  onToastTimeout(toast: Toast): void {
    this.toastrService.handleTimeout(toast);
  }
}
