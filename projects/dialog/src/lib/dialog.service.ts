import { Injectable, inject, ApplicationRef, createComponent, EnvironmentInjector, ComponentRef, Type, Injector, TemplateRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Dialog, DialogType, DialogOptions, DialogResult, DialogRef, DialogButton } from './dialog.models';
import { DialogConfig, DEFAULT_DIALOG_CONFIG, DIALOG_CONFIG, DIALOG_DATA, DIALOG_REF } from './dialog.config';
import { DialogContainerComponent } from './dialog-container.component';

/**
 * Service for displaying dialogs and modals
 */
@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private readonly document = inject(DOCUMENT);
  private readonly appRef = inject(ApplicationRef);
  private readonly injector = inject(EnvironmentInjector);
  private readonly userConfig = inject(DIALOG_CONFIG, { optional: true });

  private config: Required<DialogConfig>;
  private dialogId = 0;
  private containerRef: ComponentRef<DialogContainerComponent> | null = null;

  constructor() {
    this.config = { ...DEFAULT_DIALOG_CONFIG, ...this.userConfig };
  }

  /**
   * Show an alert dialog
   */
  alert(message: string, title?: string, options?: DialogOptions): Promise<DialogResult> {
    const buttons: DialogButton[] = [
      { text: 'OK', variant: 'primary', closeDialog: true }
    ];

    return this.showBuiltIn('alert', message, title, { ...options, buttons });
  }

  /**
   * Show a confirmation dialog
   */
  confirm(message: string, title?: string, options?: DialogOptions): Promise<DialogResult<boolean>> {
    const buttons: DialogButton[] = options?.buttons ?? [
      { text: 'Cancel', variant: 'secondary', closeDialog: true, returnValue: false },
      { text: 'Confirm', variant: 'primary', closeDialog: true, returnValue: true }
    ];

    return this.showBuiltIn('confirm', message, title, { ...options, buttons });
  }

  /**
   * Show a prompt dialog
   */
  prompt(message: string, title?: string, options?: DialogOptions): Promise<DialogResult<string>> {
    const buttons: DialogButton[] = options?.buttons ?? [
      { text: 'Cancel', variant: 'secondary', closeDialog: true },
      { text: 'Submit', variant: 'primary', closeDialog: true }
    ];

    return this.showBuiltIn('prompt', message, title, {
      ...options,
      buttons,
      inputType: options?.inputType ?? 'text',
      inputPlaceholder: options?.inputPlaceholder ?? '',
      inputValue: options?.inputValue ?? '',
    });
  }

  /**
   * Show a danger/destructive confirmation dialog
   */
  danger(message: string, title?: string, options?: DialogOptions): Promise<DialogResult<boolean>> {
    const buttons: DialogButton[] = options?.buttons ?? [
      { text: 'Cancel', variant: 'secondary', closeDialog: true, returnValue: false },
      { text: 'Delete', variant: 'danger', closeDialog: true, returnValue: true }
    ];

    return this.showBuiltIn('confirm', message, title, { ...options, buttons });
  }

  /**
   * Open a dialog with a template
   */
  openTemplate<R = any>(template: TemplateRef<any>, options?: DialogOptions): Promise<DialogResult<R>> {
    this.ensureContainer();

    const dialogOptions = this.buildOptions({ ...options, template });

    return new Promise<DialogResult<R>>((resolve) => {
      const dialog: Dialog = {
        id: ++this.dialogId,
        type: 'template',
        options: dialogOptions,
        state: 'entering',
        resolve,
      };

      this.containerRef!.instance.addDialog(dialog, resolve);
    });
  }

  /**
   * Open a custom component as a dialog
   */
  open<T = any, R = any>(component: Type<any>, options?: DialogOptions<T>): DialogRef<T, R> {
    this.ensureContainer();

    const dialogOptions = this.buildOptions(options);
    const id = ++this.dialogId;

    let resolvePromise: (result: DialogResult<R>) => void;
    const afterClosedPromise = new Promise<DialogResult<R>>((resolve) => {
      resolvePromise = resolve;
    });

    const dialogRef: DialogRef<T, R> = {
      id,
      data: options?.data,
      close: (result?: R) => {
        this.closeDialog(id, { confirmed: true, value: result });
      },
      afterClosed: () => afterClosedPromise,
    };

    // Create custom injector for the component
    const customInjector = Injector.create({
      providers: [
        { provide: DIALOG_DATA, useValue: options?.data },
        { provide: DIALOG_REF, useValue: dialogRef },
      ],
      parent: this.injector,
    });

    const dialog: Dialog<T> = {
      id,
      type: 'custom',
      options: dialogOptions,
      componentType: component,
      componentInjector: customInjector,
      state: 'entering',
      resolve: resolvePromise!,
    };

    this.containerRef!.instance.addDialog(dialog, (result) => {
      resolvePromise(result);
    });

    return dialogRef;
  }

  /**
   * Close a specific dialog by ID
   */
  closeDialog(id: number, result: DialogResult = { confirmed: false }): void {
    if (this.containerRef) {
      const dialog = this.containerRef.instance.dialogs.find(d => d.id === id);
      if (dialog) {
        this.containerRef.instance.onDialogClose(dialog, result);
      }
    }
  }

  /**
   * Close all open dialogs
   */
  closeAll(): void {
    if (this.containerRef) {
      const dialogs = [...this.containerRef.instance.dialogs];
      dialogs.forEach(dialog => {
        this.containerRef!.instance.onDialogClose(dialog, { confirmed: false });
      });
    }
  }

  /**
   * Check if there are any open dialogs
   */
  hasOpenDialogs(): boolean {
    return this.containerRef?.instance.hasDialogs() ?? false;
  }

  private showBuiltIn(type: DialogType, message: string, title?: string, options?: DialogOptions): Promise<DialogResult> {
    this.ensureContainer();

    const dialogOptions = this.buildOptions({ ...options, message, title });

    return new Promise<DialogResult>((resolve) => {
      const dialog: Dialog = {
        id: ++this.dialogId,
        type,
        options: dialogOptions,
        state: 'entering',
        resolve,
      };

      this.containerRef!.instance.addDialog(dialog, resolve);
    });
  }

  private buildOptions(options?: DialogOptions): Dialog['options'] {
    return {
      title: options?.title ?? '',
      message: options?.message ?? '',
      template: options?.template,
      templateContext: options?.templateContext ?? {},
      size: options?.size ?? this.config.size,
      position: options?.position ?? this.config.position,
      theme: options?.theme ?? this.config.theme,
      closeOnBackdropClick: options?.closeOnBackdropClick ?? this.config.closeOnBackdropClick,
      closeOnEscape: options?.closeOnEscape ?? this.config.closeOnEscape,
      showCloseButton: options?.showCloseButton ?? this.config.showCloseButton,
      animationDuration: options?.animationDuration ?? this.config.animationDuration,
      minWidth: options?.minWidth ?? this.config.minWidth,
      maxWidth: options?.maxWidth ?? this.config.maxWidth,
      customClass: options?.customClass ?? '',
      backdropClass: options?.backdropClass ?? '',
      draggable: options?.draggable ?? false,
      inputPlaceholder: options?.inputPlaceholder ?? '',
      inputValue: options?.inputValue ?? '',
      inputType: options?.inputType ?? 'text',
      buttons: options?.buttons ?? [],
      data: options?.data,
      panelClass: options?.panelClass,
    };
  }

  private ensureContainer(): void {
    if (this.containerRef) {
      return;
    }

    const containerElement = this.document.createElement('div');
    containerElement.id = 'pui-dialog-container';
    this.document.body.appendChild(containerElement);

    this.containerRef = createComponent(DialogContainerComponent, {
      environmentInjector: this.injector,
      hostElement: containerElement,
    });

    this.appRef.attachView(this.containerRef.hostView);
  }
}

