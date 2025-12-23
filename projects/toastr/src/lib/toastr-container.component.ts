import {
  Component,
  input,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { Toast, ToastPosition } from './toastr.models';
import { ToastrComponent } from './toastr.component';
import { ToastrService } from './toastr.service';

@Component({
  selector: 'pui-toastr-container',
  imports: [ToastrComponent],
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
  styles: [`
    .pui-toastr-container {
      position: fixed;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 16px;
      pointer-events: none;
    }

    .pui-toastr-container > * {
      pointer-events: auto;
    }

    .pui-toastr-top-right {
      top: 0;
      right: 0;
      align-items: flex-end;
    }

    .pui-toastr-top-left {
      top: 0;
      left: 0;
      align-items: flex-start;
    }

    .pui-toastr-top-center {
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      align-items: center;
    }

    .pui-toastr-bottom-right {
      bottom: 0;
      right: 0;
      align-items: flex-end;
      flex-direction: column-reverse;
    }

    .pui-toastr-bottom-left {
      bottom: 0;
      left: 0;
      align-items: flex-start;
      flex-direction: column-reverse;
    }

    .pui-toastr-bottom-center {
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      align-items: center;
      flex-direction: column-reverse;
    }

    @media (max-width: 480px) {
      .pui-toastr-container {
        left: 0;
        right: 0;
        padding: 8px;
        transform: none;
      }

      .pui-toastr-container > * {
        width: 100%;
        max-width: none;
      }
    }
  `]
})
export class ToastrContainerComponent {
  private toastrService = inject(ToastrService);

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

