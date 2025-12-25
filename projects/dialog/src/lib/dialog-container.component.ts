import { Component, HostListener, ChangeDetectorRef, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dialog, DialogResult } from './dialog.models';
import { DialogComponent } from './dialog.component';

@Component({
  selector: 'pui-dialog-container',
  standalone: true,
  imports: [CommonModule, DialogComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @for (dialog of dialogs; track dialog.id) {
      <div
        class="pui-dialog-backdrop"
        [class]="getBackdropClasses(dialog)"
        [style.animation-duration.ms]="dialog.options.animationDuration"
        (click)="onBackdropClick(dialog)">
        <div
          class="pui-dialog-wrapper"
          [class]="getWrapperClasses(dialog)">
          <pui-dialog
            [dialog]="dialog"
            (closeDialog)="onDialogClose(dialog, $event)">
          </pui-dialog>
        </div>
      </div>
    }
  `,
  styles: [`
    .pui-dialog-backdrop {
      position: fixed;
      inset: 0;
      background: var(--pui-dialog-backdrop-bg, rgba(0, 0, 0, 0.5));
      z-index: var(--pui-dialog-z-index, 9999);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .pui-dialog-backdrop--entering {
      animation: backdropEnter var(--pui-dialog-animation-duration, 200ms) ease-out forwards;
    }

    .pui-dialog-backdrop--leaving {
      animation: backdropLeave var(--pui-dialog-animation-duration, 200ms) ease-in forwards;
    }

    @keyframes backdropEnter {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes backdropLeave {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }

    .pui-dialog-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      padding: 20px;
      box-sizing: border-box;
    }

    .pui-dialog-wrapper--top {
      align-items: flex-start;
      padding-top: 60px;
    }

    .pui-dialog-wrapper--bottom {
      align-items: flex-end;
      padding-bottom: 60px;
    }

    /* Theme classes on backdrop for CSS context */
    .pui-dialog-theme--default {}
    .pui-dialog-theme--dark {
      --pui-dialog-backdrop-bg: rgba(0, 0, 0, 0.7);
    }
    .pui-dialog-theme--minimal {
      --pui-dialog-backdrop-bg: rgba(0, 0, 0, 0.3);
    }
  `]
})
export class DialogContainerComponent {
  private readonly cdr = inject(ChangeDetectorRef);

  dialogs: Dialog[] = [];
  private closeCallbacks = new Map<number, (result: DialogResult) => void>();

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    const topDialog = this.dialogs[this.dialogs.length - 1];
    if (topDialog && topDialog.options.closeOnEscape) {
      this.onDialogClose(topDialog, { confirmed: false });
    }
  }

  addDialog(dialog: Dialog, closeCallback: (result: DialogResult) => void): void {
    this.dialogs.push(dialog);
    this.closeCallbacks.set(dialog.id, closeCallback);

    // Trigger entering animation
    setTimeout(() => {
      dialog.state = 'visible';
      this.cdr.markForCheck();
    }, 10);

    this.cdr.markForCheck();
  }

  removeDialog(id: number): void {
    const index = this.dialogs.findIndex(d => d.id === id);
    if (index > -1) {
      this.dialogs.splice(index, 1);
      this.closeCallbacks.delete(id);
      this.cdr.markForCheck();
    }
  }

  getBackdropClasses(dialog: Dialog): string {
    const classes = [
      `pui-dialog-theme--${dialog.options.theme}`,
      `pui-dialog-backdrop--${dialog.state}`,
    ];

    if (dialog.options.backdropClass) {
      classes.push(dialog.options.backdropClass);
    }

    return classes.join(' ');
  }

  getWrapperClasses(dialog: Dialog): string {
    const classes = [`pui-dialog-wrapper--${dialog.options.position}`];
    return classes.join(' ');
  }

  onBackdropClick(dialog: Dialog): void {
    if (dialog.options.closeOnBackdropClick) {
      this.onDialogClose(dialog, { confirmed: false });
    }
  }

  onDialogClose(dialog: Dialog, result: DialogResult): void {
    // Start leave animation
    dialog.state = 'leaving';
    this.cdr.markForCheck();

    // After animation, remove and resolve
    setTimeout(() => {
      const callback = this.closeCallbacks.get(dialog.id);
      if (callback) {
        callback(result);
      }
      this.removeDialog(dialog.id);
    }, dialog.options.animationDuration);
  }

  hasDialogs(): boolean {
    return this.dialogs.length > 0;
  }
}

