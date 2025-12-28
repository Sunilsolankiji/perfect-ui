import { InjectionToken } from '@angular/core';
import { DialogPosition, DialogSize, DialogTheme } from './dialog.models';

/**
 * Default dialog configuration
 */
export interface DialogConfig {
  size?: DialogSize;
  position?: DialogPosition;
  theme?: DialogTheme;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  animationDuration?: number;
  minWidth?: string;
  maxWidth?: string;
}

/**
 * Default configuration values
 */
export const DEFAULT_DIALOG_CONFIG: Required<DialogConfig> = {
  size: 'md',
  position: 'center',
  theme: 'default',
  closeOnBackdropClick: true,
  closeOnEscape: true,
  showCloseButton: true,
  animationDuration: 200,
  minWidth: '300px',
  maxWidth: '90vw',
};

export const DIALOG_CONFIG = new InjectionToken<DialogConfig>('DIALOG_CONFIG');
export const DIALOG_DATA = new InjectionToken<any>('DIALOG_DATA');
export const DIALOG_REF = new InjectionToken<any>('DIALOG_REF');

