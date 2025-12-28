/**
 * Toast types for different notification styles
 */
export type ToastType = 'success' | 'error' | 'warning' | 'info';

/**
 * Position options for the toast container
 */
export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'top-center'
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center';

/**
 * Predefined theme options
 */
export type ToastTheme = 'default' | 'dark' | 'light' | 'minimal' | 'outline' | 'gradient' | 'custom';

/**
 * Color configuration for a toast type
 */
export interface ToastColorConfig {
  /** Background color or gradient */
  background?: string;
  /** Text color */
  textColor?: string;
  /** Icon color */
  iconColor?: string;
  /** Progress bar background color */
  progressBackground?: string;
  /** Progress bar fill color */
  progressColor?: string;
  /** Border color (for outline theme) */
  borderColor?: string;
}

/**
 * Custom theme colors for each toast type
 */
export interface ToastThemeColors {
  /** Success toast colors */
  success?: ToastColorConfig;
  /** Error toast colors */
  error?: ToastColorConfig;
  /** Warning toast colors */
  warning?: ToastColorConfig;
  /** Info toast colors */
  info?: ToastColorConfig;
}

/**
 * Configuration options for individual toast notifications
 */
export interface ToastOptions {
  /** Duration in milliseconds before auto-dismiss. Set to 0 for persistent toasts */
  duration?: number;
  /** Whether to show a close button */
  showCloseButton?: boolean;
  /** Whether to show a progress bar */
  showProgressBar?: boolean;
  /** Whether clicking the toast closes it */
  closeOnClick?: boolean;
  /** Whether to pause the timer on hover */
  pauseOnHover?: boolean;
  /** Custom CSS class to add to the toast */
  customClass?: string;
  /** Toast position override */
  position?: ToastPosition;
  /** Theme for the toast */
  theme?: ToastTheme;
}

/**
 * Internal toast data structure
 */
export interface Toast {
  id: number;
  type: ToastType;
  title?: string;
  message: string;
  options: Required<ToastOptions>;
  createdAt: number;
  paused: boolean;
  progress: number;
}

/**
 * Toast event types
 */
export interface ToastEvent {
  type: 'click' | 'close' | 'timeout';
  toast: Toast;
}
