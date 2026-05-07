import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule, NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Dialog, DialogResult } from './dialog.models';

@Component({
  selector: 'pui-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, NgComponentOutlet, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="pui-dialog-panel"
      [class]="panelClasses"
      [style.min-width]="dialog.options.minWidth"
      [style.max-width]="dialog.options.maxWidth"
      [style.animation-duration.ms]="dialog.options.animationDuration"
      role="dialog"
      aria-modal="true"
      [attr.aria-labelledby]="'dialog-title-' + dialog.id"
      [attr.aria-describedby]="'dialog-content-' + dialog.id"
      (click)="$event.stopPropagation()">

      @if (dialog.type !== 'custom' && (dialog.options.title || dialog.options.showCloseButton)) {
        <div class="pui-dialog-header">
          @if (dialog.options.title) {
            <h2 [id]="'dialog-title-' + dialog.id" class="pui-dialog-title">
              {{ dialog.options.title }}
            </h2>
          }
          @if (dialog.options.showCloseButton) {
            <button
              type="button"
              class="pui-dialog-close"
              (click)="onClose()"
              aria-label="Close dialog">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          }
        </div>
      }

      <div [id]="'dialog-content-' + dialog.id" class="pui-dialog-content" [class.pui-dialog-content--custom]="dialog.type === 'custom' || dialog.options.template">
        @if (dialog.type === 'custom' && dialog.componentType) {
          <ng-container *ngComponentOutlet="dialog.componentType; injector: dialog.componentInjector"></ng-container>
        } @else if (dialog.options.template) {
          <ng-container *ngTemplateOutlet="dialog.options.template; context: dialog.options.templateContext"></ng-container>
        } @else if (dialog.type === 'alert' || dialog.type === 'confirm') {
          <p class="pui-dialog-message">{{ dialog.options.message }}</p>
        } @else if (dialog.type === 'prompt') {
          <p class="pui-dialog-message">{{ dialog.options.message }}</p>
          @if (dialog.options.inputType === 'textarea') {
            <textarea
              class="pui-dialog-input"
              [(ngModel)]="inputValue"
              [placeholder]="dialog.options.inputPlaceholder"
              rows="4">
            </textarea>
          } @else {
            <input
              class="pui-dialog-input"
              [type]="dialog.options.inputType"
              [(ngModel)]="inputValue"
              [placeholder]="dialog.options.inputPlaceholder"
              (keydown.enter)="onConfirm()"/>
          }
        }
      </div>

      @if (dialog.type !== 'custom' && dialog.options.buttons && dialog.options.buttons.length > 0) {
        <div class="pui-dialog-footer">
          @for (button of dialog.options.buttons; track button.text) {
            <button
              type="button"
              class="pui-dialog-btn"
              [class]="'pui-dialog-btn--' + (button.variant || 'secondary')"
              [ngClass]="button.customClass"
              (click)="onButtonClick(button)">
              {{ button.text }}
            </button>
          }
        </div>
      }
    </div>
  `,
  styleUrl: './dialog.css'
})
export class PuiDialog implements OnInit {
  @Input() dialog!: Dialog;
  @Output() closeDialog = new EventEmitter<DialogResult>();

  inputValue = '';

  ngOnInit() {
    if (this.dialog.type === 'prompt' && this.dialog.options.inputValue) {
      this.inputValue = this.dialog.options.inputValue;
    }
  }

  get panelClasses(): string {
    const classes = [
      `pui-dialog-panel--${this.dialog.options.size}`,
      `pui-dialog-panel--${this.dialog.state}`,
    ];

    if (this.dialog.options.customClass) {
      classes.push(this.dialog.options.customClass);
    }

    const panelClass = this.dialog.options.panelClass;
    if (panelClass) {
      if (Array.isArray(panelClass)) {
        classes.push(...panelClass);
      } else {
        classes.push(panelClass);
      }
    }

    return classes.join(' ');
  }

  onClose(): void {
    this.closeDialog.emit({ confirmed: false });
  }

  onConfirm(): void {
    if (this.dialog.type === 'prompt') {
      this.closeDialog.emit({ confirmed: true, value: this.inputValue });
    } else {
      this.closeDialog.emit({ confirmed: true });
    }
  }

  onButtonClick(button: any): void {
    if (button.closeDialog !== false) {
      const result: DialogResult = {
        confirmed: button.variant === 'primary' || button.variant === 'success' || button.variant === 'danger',
        value: button.returnValue ?? (this.dialog.type === 'prompt' ? this.inputValue : undefined),
      };
      this.closeDialog.emit(result);
    }
  }
}
