import { Injectable, inject, ApplicationRef, createComponent, EnvironmentInjector, ComponentRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subject, Observable } from 'rxjs';
import { Toast, ToastType, ToastOptions, ToastEvent } from './toastr.models';
import { ToastrConfig, DEFAULT_TOASTR_CONFIG, TOASTR_CONFIG } from './toastr.config';
import { ToastrContainerComponent } from './toastr-container.component';

/**
 * Service for displaying toast notifications
 */
@Injectable({
  providedIn: 'root'
})
export class ToastrService {
  private readonly document = inject(DOCUMENT);
  private readonly appRef = inject(ApplicationRef);
  private readonly injector = inject(EnvironmentInjector);
  private readonly userConfig = inject(TOASTR_CONFIG, { optional: true });

  private config: Required<Omit<ToastrConfig, 'customThemeColors'>> & Pick<ToastrConfig, 'customThemeColors'>;
  private toasts: Toast[] = [];
  private toastId = 0;
  private containerRef: ComponentRef<ToastrContainerComponent> | null = null;

  private readonly toastsSubject = new Subject<Toast[]>();
  private readonly eventsSubject = new Subject<ToastEvent>();

  /** Observable of current toasts */
  readonly toasts$ = this.toastsSubject.asObservable();

  /** Observable of toast events */
  readonly events$: Observable<ToastEvent> = this.eventsSubject.asObservable();

  constructor() {
    this.config = { ...DEFAULT_TOASTR_CONFIG, ...this.userConfig };
  }

  /**
   * Show a success toast
   */
  success(message: string, title?: string, options?: ToastOptions): Toast {
    return this.show('success', message, title, options);
  }

  /**
   * Show an error toast
   */
  error(message: string, title?: string, options?: ToastOptions): Toast {
    return this.show('error', message, title, options);
  }

  /**
   * Show a warning toast
   */
  warning(message: string, title?: string, options?: ToastOptions): Toast {
    return this.show('warning', message, title, options);
  }

  /**
   * Show an info toast
   */
  info(message: string, title?: string, options?: ToastOptions): Toast {
    return this.show('info', message, title, options);
  }

  /**
   * Show a toast with custom type
   */
  show(type: ToastType, message: string, title?: string, options?: ToastOptions): Toast {
    this.ensureContainer();

    const toastOptions: Required<ToastOptions> = {
      duration: options?.duration ?? this.config.duration,
      showCloseButton: options?.showCloseButton ?? this.config.showCloseButton,
      showProgressBar: options?.showProgressBar ?? this.config.showProgressBar,
      closeOnClick: options?.closeOnClick ?? this.config.closeOnClick,
      pauseOnHover: options?.pauseOnHover ?? this.config.pauseOnHover,
      customClass: options?.customClass ?? this.config.customClass,
      position: options?.position ?? this.config.position,
      theme: options?.theme ?? this.config.theme ?? 'default',
    };

    // Check for duplicates
    if (this.config.preventDuplicates) {
      const duplicate = this.toasts.find(t => t.message === message && t.type === type);
      if (duplicate) {
        return duplicate;
      }
    }

    const toast: Toast = {
      id: ++this.toastId,
      type,
      title,
      message,
      options: toastOptions,
      createdAt: Date.now(),
      paused: false,
      progress: 100,
    };

    // Add toast respecting maxToasts limit
    if (this.config.newestOnTop) {
      this.toasts.unshift(toast);
    } else {
      this.toasts.push(toast);
    }

    // Remove excess toasts
    while (this.toasts.length > this.config.maxToasts) {
      if (this.config.newestOnTop) {
        this.toasts.pop();
      } else {
        this.toasts.shift();
      }
    }

    this.emitToasts();
    return toast;
  }

  /**
   * Remove a specific toast
   */
  remove(toastId: number): void {
    const index = this.toasts.findIndex(t => t.id === toastId);
    if (index !== -1) {
      const toast = this.toasts[index];
      this.toasts.splice(index, 1);
      this.eventsSubject.next({ type: 'close', toast });
      this.emitToasts();
    }
  }

  /**
   * Clear all toasts
   */
  clear(): void {
    this.toasts = [];
    this.emitToasts();
  }

  /**
   * Get current toasts
   */
  getToasts(): Toast[] {
    return [...this.toasts];
  }

  /**
   * Update toast progress
   */
  updateProgress(toastId: number, progress: number): void {
    const toast = this.toasts.find(t => t.id === toastId);
    if (toast) {
      toast.progress = progress;
      this.emitToasts();
    }
  }

  /**
   * Pause a toast timer
   */
  pause(toastId: number): void {
    const toast = this.toasts.find(t => t.id === toastId);
    if (toast) {
      toast.paused = true;
      this.emitToasts();
    }
  }

  /**
   * Resume a toast timer
   */
  resume(toastId: number): void {
    const toast = this.toasts.find(t => t.id === toastId);
    if (toast) {
      toast.paused = false;
      this.emitToasts();
    }
  }

  /**
   * Handle toast click event
   */
  handleClick(toast: Toast): void {
    this.eventsSubject.next({ type: 'click', toast });
    if (toast.options.closeOnClick) {
      this.remove(toast.id);
    }
  }

  /**
   * Handle toast timeout
   */
  handleTimeout(toast: Toast): void {
    this.eventsSubject.next({ type: 'timeout', toast });
    this.remove(toast.id);
  }

  private ensureContainer(): void {
    if (this.containerRef) {
      return;
    }

    // Create container element
    const containerElement = this.document.createElement('div');
    containerElement.id = 'pui-toastr-container';
    this.document.body.appendChild(containerElement);

    // Create component
    this.containerRef = createComponent(ToastrContainerComponent, {
      environmentInjector: this.injector,
      hostElement: containerElement,
    });

    this.appRef.attachView(this.containerRef.hostView);
  }

  private emitToasts(): void {
    this.toastsSubject.next([...this.toasts]);
    if (this.containerRef) {
      this.containerRef.setInput('toasts', [...this.toasts]);
      this.containerRef.setInput('position', this.config.position);
    }
  }
}

