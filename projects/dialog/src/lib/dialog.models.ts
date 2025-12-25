import { TemplateRef } from '@angular/core';

/**
 * Dialog position configuration
 */
export type DialogPosition = 'center' | 'top' | 'bottom';

/**
 * Dialog size configuration
 */
export type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen';

/**
 * Dialog theme
 */
export type DialogTheme = 'default' | 'dark' | 'minimal';

/**
 * Dialog type for built-in dialogs
 */
export type DialogType = 'alert' | 'confirm' | 'prompt' | 'custom' | 'template';

/**
 * Button configuration for dialogs
 */
export interface DialogButton {
  text: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  closeDialog?: boolean;
  returnValue?: any;
  customClass?: string;
}

/**
 * Dialog configuration options
 */
export interface DialogOptions<T = any> {
  title?: string;
  message?: string;
  /** Angular TemplateRef to render in the dialog body */
  template?: TemplateRef<any>;
  /** Context data to pass to the template */
  templateContext?: any;
  size?: DialogSize;
  position?: DialogPosition;
  theme?: DialogTheme;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  customClass?: string;
  backdropClass?: string;
  data?: T;
  buttons?: DialogButton[];
  animationDuration?: number;
  draggable?: boolean;
  inputPlaceholder?: string;
  inputValue?: string;
  inputType?: 'text' | 'password' | 'email' | 'number' | 'textarea';
  minWidth?: string;
  maxWidth?: string;
  panelClass?: string | string[];
}

/**
 * Result from a dialog
 */
export interface DialogResult<T = any> {
  confirmed: boolean;
  value?: T;
}

/**
 * Reference to an open dialog
 */
export interface DialogRef<T = any, R = any> {
  id: number;
  close: (result?: R) => void;
  afterClosed: () => Promise<DialogResult<R>>;
  data?: T;
}

/**
 * Internal dialog state
 */
export interface Dialog<T = any> {
  id: number;
  type: DialogType;
  options: Required<Omit<DialogOptions<T>, 'data' | 'panelClass' | 'template' | 'templateContext'>> & Pick<DialogOptions<T>, 'data' | 'panelClass' | 'template' | 'templateContext'>;
  componentType?: any;
  componentInjector?: any;
  state: 'entering' | 'visible' | 'leaving';
  resolve: (result: DialogResult) => void;
}
