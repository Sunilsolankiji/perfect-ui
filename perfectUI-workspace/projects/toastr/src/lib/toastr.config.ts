import { InjectionToken } from '@angular/core';
import { ToastOptions, ToastPosition } from './toastr.models';

/**
 * Global configuration for the toastr service
 */
export interface ToastrConfig extends ToastOptions {
  /** Maximum number of toasts to display at once */
  maxToasts?: number;
  /** Whether to stack new toasts on top or bottom */
  newestOnTop?: boolean;
  /** Global position for all toasts */
  position?: ToastPosition;
  /** Prevent duplicate toasts with same message */
  preventDuplicates?: boolean;
}

/**
 * Default configuration values
 */
export const DEFAULT_TOASTR_CONFIG: Required<ToastrConfig> = {
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
};

/**
 * Injection token for toastr configuration
 */
export const TOASTR_CONFIG = new InjectionToken<ToastrConfig>('TOASTR_CONFIG');

