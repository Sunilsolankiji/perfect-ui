import { InjectionToken } from '@angular/core';
import { ToastOptions, ToastPosition, ToastTheme, ToastThemeColors } from './toastr.models';

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
  /** Global theme for all toasts */
  theme?: ToastTheme;
  /** Custom theme colors (used when theme is 'custom') */
  customThemeColors?: ToastThemeColors;
}

/**
 * Default theme color configurations
 */
export const TOAST_THEME_COLORS: Record<Exclude<ToastTheme, 'custom'>, ToastThemeColors> = {
  default: {
    success: {
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      textColor: '#ffffff',
      iconColor: '#ffffff',
      progressBackground: 'rgba(255, 255, 255, 0.2)',
      progressColor: 'rgba(255, 255, 255, 0.7)',
    },
    error: {
      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      textColor: '#ffffff',
      iconColor: '#ffffff',
      progressBackground: 'rgba(255, 255, 255, 0.2)',
      progressColor: 'rgba(255, 255, 255, 0.7)',
    },
    warning: {
      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      textColor: '#ffffff',
      iconColor: '#ffffff',
      progressBackground: 'rgba(255, 255, 255, 0.2)',
      progressColor: 'rgba(255, 255, 255, 0.7)',
    },
    info: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      textColor: '#ffffff',
      iconColor: '#ffffff',
      progressBackground: 'rgba(255, 255, 255, 0.2)',
      progressColor: 'rgba(255, 255, 255, 0.7)',
    },
  },
  gradient: {
    success: {
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      textColor: '#ffffff',
      iconColor: '#ffffff',
      progressBackground: 'rgba(255, 255, 255, 0.2)',
      progressColor: 'rgba(255, 255, 255, 0.7)',
    },
    error: {
      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      textColor: '#ffffff',
      iconColor: '#ffffff',
      progressBackground: 'rgba(255, 255, 255, 0.2)',
      progressColor: 'rgba(255, 255, 255, 0.7)',
    },
    warning: {
      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      textColor: '#ffffff',
      iconColor: '#ffffff',
      progressBackground: 'rgba(255, 255, 255, 0.2)',
      progressColor: 'rgba(255, 255, 255, 0.7)',
    },
    info: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      textColor: '#ffffff',
      iconColor: '#ffffff',
      progressBackground: 'rgba(255, 255, 255, 0.2)',
      progressColor: 'rgba(255, 255, 255, 0.7)',
    },
  },
  dark: {
    success: {
      background: '#1e293b',
      textColor: '#10b981',
      iconColor: '#10b981',
      progressBackground: 'rgba(16, 185, 129, 0.2)',
      progressColor: '#10b981',
      borderColor: '#10b981',
    },
    error: {
      background: '#1e293b',
      textColor: '#ef4444',
      iconColor: '#ef4444',
      progressBackground: 'rgba(239, 68, 68, 0.2)',
      progressColor: '#ef4444',
      borderColor: '#ef4444',
    },
    warning: {
      background: '#1e293b',
      textColor: '#f59e0b',
      iconColor: '#f59e0b',
      progressBackground: 'rgba(245, 158, 11, 0.2)',
      progressColor: '#f59e0b',
      borderColor: '#f59e0b',
    },
    info: {
      background: '#1e293b',
      textColor: '#3b82f6',
      iconColor: '#3b82f6',
      progressBackground: 'rgba(59, 130, 246, 0.2)',
      progressColor: '#3b82f6',
      borderColor: '#3b82f6',
    },
  },
  light: {
    success: {
      background: '#ecfdf5',
      textColor: '#065f46',
      iconColor: '#10b981',
      progressBackground: 'rgba(16, 185, 129, 0.2)',
      progressColor: '#10b981',
      borderColor: '#a7f3d0',
    },
    error: {
      background: '#fef2f2',
      textColor: '#991b1b',
      iconColor: '#ef4444',
      progressBackground: 'rgba(239, 68, 68, 0.2)',
      progressColor: '#ef4444',
      borderColor: '#fecaca',
    },
    warning: {
      background: '#fffbeb',
      textColor: '#92400e',
      iconColor: '#f59e0b',
      progressBackground: 'rgba(245, 158, 11, 0.2)',
      progressColor: '#f59e0b',
      borderColor: '#fde68a',
    },
    info: {
      background: '#eff6ff',
      textColor: '#1e40af',
      iconColor: '#3b82f6',
      progressBackground: 'rgba(59, 130, 246, 0.2)',
      progressColor: '#3b82f6',
      borderColor: '#bfdbfe',
    },
  },
  minimal: {
    success: {
      background: '#ffffff',
      textColor: '#374151',
      iconColor: '#10b981',
      progressBackground: 'rgba(16, 185, 129, 0.1)',
      progressColor: '#10b981',
      borderColor: '#e5e7eb',
    },
    error: {
      background: '#ffffff',
      textColor: '#374151',
      iconColor: '#ef4444',
      progressBackground: 'rgba(239, 68, 68, 0.1)',
      progressColor: '#ef4444',
      borderColor: '#e5e7eb',
    },
    warning: {
      background: '#ffffff',
      textColor: '#374151',
      iconColor: '#f59e0b',
      progressBackground: 'rgba(245, 158, 11, 0.1)',
      progressColor: '#f59e0b',
      borderColor: '#e5e7eb',
    },
    info: {
      background: '#ffffff',
      textColor: '#374151',
      iconColor: '#3b82f6',
      progressBackground: 'rgba(59, 130, 246, 0.1)',
      progressColor: '#3b82f6',
      borderColor: '#e5e7eb',
    },
  },
  outline: {
    success: {
      background: 'transparent',
      textColor: '#10b981',
      iconColor: '#10b981',
      progressBackground: 'rgba(16, 185, 129, 0.1)',
      progressColor: '#10b981',
      borderColor: '#10b981',
    },
    error: {
      background: 'transparent',
      textColor: '#ef4444',
      iconColor: '#ef4444',
      progressBackground: 'rgba(239, 68, 68, 0.1)',
      progressColor: '#ef4444',
      borderColor: '#ef4444',
    },
    warning: {
      background: 'transparent',
      textColor: '#f59e0b',
      iconColor: '#f59e0b',
      progressBackground: 'rgba(245, 158, 11, 0.1)',
      progressColor: '#f59e0b',
      borderColor: '#f59e0b',
    },
    info: {
      background: 'transparent',
      textColor: '#3b82f6',
      iconColor: '#3b82f6',
      progressBackground: 'rgba(59, 130, 246, 0.1)',
      progressColor: '#3b82f6',
      borderColor: '#3b82f6',
    },
  },
};

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

