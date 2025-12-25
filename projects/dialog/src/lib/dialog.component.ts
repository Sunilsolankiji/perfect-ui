import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
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
  styles: [`
    :host {
      display: contents;
    }

    .pui-dialog-panel {
      background: var(--pui-dialog-bg, #ffffff);
      border-radius: var(--pui-dialog-radius, 12px);
      box-shadow: var(--pui-dialog-shadow, 0 25px 50px -12px rgba(0, 0, 0, 0.25));
      display: flex;
      flex-direction: column;
      max-height: 90vh;
      overflow: hidden;
      position: relative;
    }

    .pui-dialog-panel--sm { width: 360px; }
    .pui-dialog-panel--md { width: 480px; }
    .pui-dialog-panel--lg { width: 640px; }
    .pui-dialog-panel--xl { width: 900px; }
    .pui-dialog-panel--fullscreen {
      width: 100vw;
      height: 100vh;
      max-height: 100vh;
      border-radius: 0;
    }

    .pui-dialog-panel--entering {
      animation: dialogEnter var(--pui-dialog-animation-duration, 200ms) ease-out forwards;
    }

    .pui-dialog-panel--leaving {
      animation: dialogLeave var(--pui-dialog-animation-duration, 200ms) ease-in forwards;
    }

    @keyframes dialogEnter {
      from { opacity: 0; transform: scale(0.95) translateY(-10px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }

    @keyframes dialogLeave {
      from { opacity: 1; transform: scale(1) translateY(0); }
      to { opacity: 0; transform: scale(0.95) translateY(-10px); }
    }

    .pui-dialog-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      border-bottom: 1px solid var(--pui-dialog-border, #e5e7eb);
    }

    .pui-dialog-title {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: var(--pui-dialog-title-color, #111827);
    }

    .pui-dialog-close {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border: none;
      background: transparent;
      color: var(--pui-dialog-close-color, #6b7280);
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .pui-dialog-close:hover {
      background: var(--pui-dialog-close-hover-bg, #f3f4f6);
      color: var(--pui-dialog-close-hover-color, #111827);
    }

    .pui-dialog-content {
      padding: 20px;
      overflow-y: auto;
      flex: 1;
    }

    .pui-dialog-content--custom {
      padding: 0;
    }

    .pui-dialog-message {
      margin: 0 0 16px 0;
      font-size: 15px;
      line-height: 1.6;
      color: var(--pui-dialog-text-color, #374151);
    }

    .pui-dialog-message:last-child { margin-bottom: 0; }


    .pui-dialog-input {
      width: 100%;
      padding: 10px 14px;
      font-size: 15px;
      border: 1px solid var(--pui-dialog-input-border, #d1d5db);
      border-radius: 8px;
      background: var(--pui-dialog-input-bg, #ffffff);
      color: var(--pui-dialog-input-color, #111827);
      transition: all 0.15s ease;
      box-sizing: border-box;
    }

    .pui-dialog-input:focus {
      outline: none;
      border-color: var(--pui-dialog-input-focus-border, #3b82f6);
      box-shadow: 0 0 0 3px var(--pui-dialog-input-focus-ring, rgba(59, 130, 246, 0.15));
    }

    textarea.pui-dialog-input {
      resize: vertical;
      min-height: 80px;
    }

    .pui-dialog-footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 10px;
      padding: 16px 20px;
      border-top: 1px solid var(--pui-dialog-border, #e5e7eb);
    }

    .pui-dialog-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 10px 18px;
      font-size: 14px;
      font-weight: 500;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .pui-dialog-btn--primary {
      background: var(--pui-dialog-btn-primary-bg, #3b82f6);
      color: var(--pui-dialog-btn-primary-color, #ffffff);
    }
    .pui-dialog-btn--primary:hover {
      background: var(--pui-dialog-btn-primary-hover-bg, #2563eb);
    }

    .pui-dialog-btn--secondary {
      background: var(--pui-dialog-btn-secondary-bg, #f3f4f6);
      color: var(--pui-dialog-btn-secondary-color, #374151);
    }
    .pui-dialog-btn--secondary:hover {
      background: var(--pui-dialog-btn-secondary-hover-bg, #e5e7eb);
    }

    .pui-dialog-btn--danger {
      background: var(--pui-dialog-btn-danger-bg, #ef4444);
      color: var(--pui-dialog-btn-danger-color, #ffffff);
    }
    .pui-dialog-btn--danger:hover {
      background: var(--pui-dialog-btn-danger-hover-bg, #dc2626);
    }

    .pui-dialog-btn--success {
      background: var(--pui-dialog-btn-success-bg, #22c55e);
      color: var(--pui-dialog-btn-success-color, #ffffff);
    }
    .pui-dialog-btn--success:hover {
      background: var(--pui-dialog-btn-success-hover-bg, #16a34a);
    }

    .pui-dialog-btn--warning {
      background: var(--pui-dialog-btn-warning-bg, #f59e0b);
      color: var(--pui-dialog-btn-warning-color, #ffffff);
    }
    .pui-dialog-btn--warning:hover {
      background: var(--pui-dialog-btn-warning-hover-bg, #d97706);
    }

    :host-context(.pui-dialog-theme--dark) .pui-dialog-panel {
      --pui-dialog-bg: #1f2937;
      --pui-dialog-border: #374151;
      --pui-dialog-title-color: #f9fafb;
      --pui-dialog-text-color: #d1d5db;
      --pui-dialog-close-color: #9ca3af;
      --pui-dialog-close-hover-bg: #374151;
      --pui-dialog-close-hover-color: #f9fafb;
      --pui-dialog-input-bg: #111827;
      --pui-dialog-input-border: #4b5563;
      --pui-dialog-input-color: #f9fafb;
      --pui-dialog-btn-secondary-bg: #374151;
      --pui-dialog-btn-secondary-color: #f9fafb;
      --pui-dialog-btn-secondary-hover-bg: #4b5563;
    }

    :host-context(.pui-dialog-theme--minimal) .pui-dialog-panel {
      border-radius: 4px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    }
    :host-context(.pui-dialog-theme--minimal) .pui-dialog-header {
      border-bottom: none;
      padding-bottom: 8px;
    }
    :host-context(.pui-dialog-theme--minimal) .pui-dialog-footer {
      border-top: none;
      padding-top: 8px;
    }
    :host-context(.pui-dialog-theme--minimal) .pui-dialog-btn {
      border-radius: 4px;
    }
  `]
})
export class DialogComponent {
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
