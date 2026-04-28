import { Component, HostListener, ChangeDetectorRef, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dialog, DialogResult } from './dialog.models';
import { PuiDialog } from './dialog';

@Component({
  selector: 'pui-dialog-container',
  standalone: true,
  imports: [CommonModule, PuiDialog],
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
  styleUrl: './dialog-container.css'
})
export class PuiDialogContainer {
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
