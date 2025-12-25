import { InjectionToken } from '@angular/core';
import { DialogPosition, DialogSize, DialogTheme } from './dialog.models';

/**
 * Default dialog configuration
 */
export interface DialogConfig {
  /** Default dialog size */
  size?: DialogSize;
  /** Default dialog position */
  position?: DialogPosition;
  /** Default theme */
  theme?: DialogTheme;
  /** Whether clicking backdrop closes dialog */
  closeOnBackdropClick?: boolean;
  /** Whether ESC closes dialog */
  closeOnEscape?: boolean;
  /** Whether to show close button by default */
  showCloseButton?: boolean;
  /** Animation duration in ms */
  animationDuration?: number;
  /** Default minimum width */
  minWidth?: string;
  /** Default maximum width */
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

/**
 * Injection token for dialog configuration
 */
export const DIALOG_CONFIG = new InjectionToken<DialogConfig>('DIALOG_CONFIG');

/**
 * Injection token for dialog data
 */
export const DIALOG_DATA = new InjectionToken<any>('DIALOG_DATA');

/**
 * Injection token for dialog ref in custom components
 */
export const DIALOG_REF = new InjectionToken<any>('DIALOG_REF');

