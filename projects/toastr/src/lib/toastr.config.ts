import { InjectionToken } from '@angular/core';
import { ToastOptions, ToastPosition, ToastTheme, ToastThemeColors } from './toastr.models';

/**
 * Global configuration for the toastr service
 */
export interface ToastrConfig extends ToastOptions {
  maxToasts?: number;
  newestOnTop?: boolean;
  position?: ToastPosition;
  preventDuplicates?: boolean;
  theme?: ToastTheme;
  customThemeColors?: ToastThemeColors;
}

/**
 * Default configuration values
 */
export const DEFAULT_TOASTR_CONFIG: Required<Omit<ToastrConfig, 'customThemeColors'>> & Pick<ToastrConfig, 'customThemeColors'> = {
  duration: 5000,
  showCloseButton: true,
  showProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  customClass: '',
  maxToasts: 5,
  newestOnTop: true,
  position: 'top-right',
  preventDuplicates: false,
  theme: 'default',
  customThemeColors: undefined,
};

/**
 * Injection token for toastr configuration
 */
export const TOASTR_CONFIG = new InjectionToken<ToastrConfig>('TOASTR_CONFIG');

