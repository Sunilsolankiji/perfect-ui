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

