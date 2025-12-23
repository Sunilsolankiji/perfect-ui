import {
  Component,
  input,
  output,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  signal,
  computed,
  inject,
  DestroyRef,
} from '@angular/core';
import { Toast, ToastTheme, ToastColorConfig } from './toastr.models';
import { TOASTR_CONFIG, ToastrConfig, TOAST_THEME_COLORS } from './toastr.config';

@Component({
  selector: 'pui-toast',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="pui-toast"
      [class]="toastClasses()"
      [class.pui-toast-paused]="isPaused()"
      [style]="toastStyles()"
      (click)="onClick()"
      (mouseenter)="onMouseEnter()"
      (mouseleave)="onMouseLeave()"
      role="alert"
      aria-live="polite"
    >
      <div class="pui-toast-icon">
        @switch (toast().type) {
          @case ('success') {
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          }
          @case ('error') {
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          }
          @case ('warning') {
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
            </svg>
          }
          @case ('info') {
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
          }
        }
      </div>

      <div class="pui-toast-content">
        @if (toast().title) {
          <div class="pui-toast-title">{{ toast().title }}</div>
        }
        <div class="pui-toast-message">{{ toast().message }}</div>
      </div>

      @if (toast().options.showCloseButton) {
        <button
          class="pui-toast-close"
          (click)="onClose($event)"
          aria-label="Close notification"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      }

      @if (toast().options.showProgressBar && toast().options.duration > 0) {
        <div class="pui-toast-progress">
          <div
            class="pui-toast-progress-bar"
            [style.width.%]="progress()"
          ></div>
        </div>
      }
    </div>
  `,
  styles: [`
    .pui-toast {
      display: flex;
      align-items: flex-start;
      padding: 14px 16px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      position: relative;
      overflow: hidden;
      cursor: pointer;
      transition: transform 0.2s ease, opacity 0.2s ease, box-shadow 0.2s ease;
      animation: pui-toast-slide-in 0.3s ease forwards;
      min-width: 300px;
      max-width: 400px;
      backdrop-filter: blur(8px);

      /* CSS Custom Properties for theming */
      background: var(--pui-toast-bg);
      color: var(--pui-toast-text);
      border: 2px solid var(--pui-toast-border, transparent);
    }

    .pui-toast:hover {
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
      transform: translateY(-2px);
    }

    @keyframes pui-toast-slide-in {
      from {
        opacity: 0;
        transform: translateX(100%);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    /* Default theme styles (fallback) */
    .pui-toast-success {
      --pui-toast-bg: linear-gradient(135deg, #10b981 0%, #059669 100%);
      --pui-toast-text: white;
      --pui-toast-icon: white;
      --pui-toast-progress-bg: rgba(255, 255, 255, 0.2);
      --pui-toast-progress: rgba(255, 255, 255, 0.7);
    }

    .pui-toast-error {
      --pui-toast-bg: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
      --pui-toast-text: white;
      --pui-toast-icon: white;
      --pui-toast-progress-bg: rgba(255, 255, 255, 0.2);
      --pui-toast-progress: rgba(255, 255, 255, 0.7);
    }

    .pui-toast-warning {
      --pui-toast-bg: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      --pui-toast-text: white;
      --pui-toast-icon: white;
      --pui-toast-progress-bg: rgba(255, 255, 255, 0.2);
      --pui-toast-progress: rgba(255, 255, 255, 0.7);
    }

    .pui-toast-info {
      --pui-toast-bg: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
      --pui-toast-text: white;
      --pui-toast-icon: white;
      --pui-toast-progress-bg: rgba(255, 255, 255, 0.2);
      --pui-toast-progress: rgba(255, 255, 255, 0.7);
    }

    /* Dark theme */
    .pui-toast-theme-dark.pui-toast-success {
      --pui-toast-bg: #1e293b;
      --pui-toast-text: #10b981;
      --pui-toast-icon: #10b981;
      --pui-toast-border: #10b981;
      --pui-toast-progress-bg: rgba(16, 185, 129, 0.2);
      --pui-toast-progress: #10b981;
    }

    .pui-toast-theme-dark.pui-toast-error {
      --pui-toast-bg: #1e293b;
      --pui-toast-text: #ef4444;
      --pui-toast-icon: #ef4444;
      --pui-toast-border: #ef4444;
      --pui-toast-progress-bg: rgba(239, 68, 68, 0.2);
      --pui-toast-progress: #ef4444;
    }

    .pui-toast-theme-dark.pui-toast-warning {
      --pui-toast-bg: #1e293b;
      --pui-toast-text: #f59e0b;
      --pui-toast-icon: #f59e0b;
      --pui-toast-border: #f59e0b;
      --pui-toast-progress-bg: rgba(245, 158, 11, 0.2);
      --pui-toast-progress: #f59e0b;
    }

    .pui-toast-theme-dark.pui-toast-info {
      --pui-toast-bg: #1e293b;
      --pui-toast-text: #3b82f6;
      --pui-toast-icon: #3b82f6;
      --pui-toast-border: #3b82f6;
      --pui-toast-progress-bg: rgba(59, 130, 246, 0.2);
      --pui-toast-progress: #3b82f6;
    }

    /* Light theme */
    .pui-toast-theme-light.pui-toast-success {
      --pui-toast-bg: #ecfdf5;
      --pui-toast-text: #065f46;
      --pui-toast-icon: #10b981;
      --pui-toast-border: #a7f3d0;
      --pui-toast-progress-bg: rgba(16, 185, 129, 0.2);
      --pui-toast-progress: #10b981;
    }

    .pui-toast-theme-light.pui-toast-error {
      --pui-toast-bg: #fef2f2;
      --pui-toast-text: #991b1b;
      --pui-toast-icon: #ef4444;
      --pui-toast-border: #fecaca;
      --pui-toast-progress-bg: rgba(239, 68, 68, 0.2);
      --pui-toast-progress: #ef4444;
    }

    .pui-toast-theme-light.pui-toast-warning {
      --pui-toast-bg: #fffbeb;
      --pui-toast-text: #92400e;
      --pui-toast-icon: #f59e0b;
      --pui-toast-border: #fde68a;
      --pui-toast-progress-bg: rgba(245, 158, 11, 0.2);
      --pui-toast-progress: #f59e0b;
    }

    .pui-toast-theme-light.pui-toast-info {
      --pui-toast-bg: #eff6ff;
      --pui-toast-text: #1e40af;
      --pui-toast-icon: #3b82f6;
      --pui-toast-border: #bfdbfe;
      --pui-toast-progress-bg: rgba(59, 130, 246, 0.2);
      --pui-toast-progress: #3b82f6;
    }

    /* Minimal theme */
    .pui-toast-theme-minimal.pui-toast-success,
    .pui-toast-theme-minimal.pui-toast-error,
    .pui-toast-theme-minimal.pui-toast-warning,
    .pui-toast-theme-minimal.pui-toast-info {
      --pui-toast-bg: #ffffff;
      --pui-toast-text: #374151;
      --pui-toast-border: #e5e7eb;
    }

    .pui-toast-theme-minimal.pui-toast-success {
      --pui-toast-icon: #10b981;
      --pui-toast-progress-bg: rgba(16, 185, 129, 0.1);
      --pui-toast-progress: #10b981;
    }

    .pui-toast-theme-minimal.pui-toast-error {
      --pui-toast-icon: #ef4444;
      --pui-toast-progress-bg: rgba(239, 68, 68, 0.1);
      --pui-toast-progress: #ef4444;
    }

    .pui-toast-theme-minimal.pui-toast-warning {
      --pui-toast-icon: #f59e0b;
      --pui-toast-progress-bg: rgba(245, 158, 11, 0.1);
      --pui-toast-progress: #f59e0b;
    }

    .pui-toast-theme-minimal.pui-toast-info {
      --pui-toast-icon: #3b82f6;
      --pui-toast-progress-bg: rgba(59, 130, 246, 0.1);
      --pui-toast-progress: #3b82f6;
    }

    /* Outline theme */
    .pui-toast-theme-outline.pui-toast-success,
    .pui-toast-theme-outline.pui-toast-error,
    .pui-toast-theme-outline.pui-toast-warning,
    .pui-toast-theme-outline.pui-toast-info {
      --pui-toast-bg: transparent;
      backdrop-filter: blur(12px);
      background: rgba(255, 255, 255, 0.05);
    }

    .pui-toast-theme-outline.pui-toast-success {
      --pui-toast-text: #10b981;
      --pui-toast-icon: #10b981;
      --pui-toast-border: #10b981;
      --pui-toast-progress-bg: rgba(16, 185, 129, 0.1);
      --pui-toast-progress: #10b981;
    }

    .pui-toast-theme-outline.pui-toast-error {
      --pui-toast-text: #ef4444;
      --pui-toast-icon: #ef4444;
      --pui-toast-border: #ef4444;
      --pui-toast-progress-bg: rgba(239, 68, 68, 0.1);
      --pui-toast-progress: #ef4444;
    }

    .pui-toast-theme-outline.pui-toast-warning {
      --pui-toast-text: #f59e0b;
      --pui-toast-icon: #f59e0b;
      --pui-toast-border: #f59e0b;
      --pui-toast-progress-bg: rgba(245, 158, 11, 0.1);
      --pui-toast-progress: #f59e0b;
    }

    .pui-toast-theme-outline.pui-toast-info {
      --pui-toast-text: #3b82f6;
      --pui-toast-icon: #3b82f6;
      --pui-toast-border: #3b82f6;
      --pui-toast-progress-bg: rgba(59, 130, 246, 0.1);
      --pui-toast-progress: #3b82f6;
    }

    .pui-toast-icon {
      flex-shrink: 0;
      width: 24px;
      height: 24px;
      margin-right: 12px;
      opacity: 0.9;
      color: var(--pui-toast-icon, currentColor);
    }

    .pui-toast-icon svg {
      width: 100%;
      height: 100%;
    }

    .pui-toast-content {
      flex: 1;
      min-width: 0;
    }

    .pui-toast-title {
      font-weight: 600;
      font-size: 14px;
      margin-bottom: 4px;
      line-height: 1.4;
    }

    .pui-toast-message {
      font-size: 13px;
      line-height: 1.5;
      opacity: 0.95;
      word-wrap: break-word;
    }

    .pui-toast-close {
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      padding: 0;
      margin-left: 12px;
      border: none;
      background: transparent;
      color: inherit;
      cursor: pointer;
      opacity: 0.7;
      transition: opacity 0.2s ease, transform 0.2s ease;
      border-radius: 4px;
    }

    .pui-toast-close:hover {
      opacity: 1;
      transform: scale(1.1);
    }

    .pui-toast-close svg {
      width: 100%;
      height: 100%;
    }

    .pui-toast-progress {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: var(--pui-toast-progress-bg, rgba(255, 255, 255, 0.2));
    }

    .pui-toast-progress-bar {
      height: 100%;
      background: var(--pui-toast-progress, rgba(255, 255, 255, 0.7));
      transition: width 0.1s linear;
    }

    .pui-toast-paused .pui-toast-progress-bar {
      animation-play-state: paused;
    }
  `]
})
export class ToastrComponent implements OnInit, OnDestroy {
  private destroyRef = inject(DestroyRef);
  private config = inject(TOASTR_CONFIG, { optional: true }) as ToastrConfig | null;
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private startTime = 0;
  private remainingTime = 0;

  // Signal-based input (Angular 19+)
  readonly toast = input.required<Toast>();

  // Signal-based outputs (Angular 19+)
  readonly toastClick = output<Toast>();
  readonly toastClose = output<Toast>();
  readonly toastTimeout = output<Toast>();

  readonly progress = signal(100);
  readonly isPaused = signal(false);

  readonly toastClasses = computed(() => {
    const t = this.toast();
    const theme = t.options.theme || this.config?.theme || 'default';
    const classes = [`pui-toast-${t.type}`, `pui-toast-theme-${theme}`];
    if (t.options.customClass) {
      classes.push(t.options.customClass);
    }
    return classes.join(' ');
  });

  readonly toastStyles = computed(() => {
    const t = this.toast();
    const theme = t.options.theme || this.config?.theme || 'default';
    const colors = this.getThemeColors(theme, t.type);

    const styles: Record<string, string> = {};

    if (colors.background) {
      styles['--pui-toast-bg'] = colors.background;
    }
    if (colors.textColor) {
      styles['--pui-toast-text'] = colors.textColor;
    }
    if (colors.iconColor) {
      styles['--pui-toast-icon'] = colors.iconColor;
    }
    if (colors.progressBackground) {
      styles['--pui-toast-progress-bg'] = colors.progressBackground;
    }
    if (colors.progressColor) {
      styles['--pui-toast-progress'] = colors.progressColor;
    }
    if (colors.borderColor) {
      styles['--pui-toast-border'] = colors.borderColor;
    }

    return styles;
  });

  private getThemeColors(theme: ToastTheme, type: string): ToastColorConfig {
    if (theme === 'custom' && this.config?.customThemeColors) {
      return (this.config.customThemeColors as Record<string, ToastColorConfig>)[type] || {};
    }
    const themeColors = TOAST_THEME_COLORS[theme as Exclude<ToastTheme, 'custom'>];
    return (themeColors as Record<string, ToastColorConfig>)?.[type] || {};
  }

  ngOnInit(): void {
    const t = this.toast();
    if (t.options.duration > 0) {
      this.startTimer();
    }

    this.destroyRef.onDestroy(() => {
      this.clearTimer();
    });
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  onClick(): void {
    this.toastClick.emit(this.toast());
  }

  onClose(event: Event): void {
    event.stopPropagation();
    this.toastClose.emit(this.toast());
  }

  onMouseEnter(): void {
    const t = this.toast();
    if (t.options.pauseOnHover && t.options.duration > 0) {
      this.pauseTimer();
    }
  }

  onMouseLeave(): void {
    const t = this.toast();
    if (t.options.pauseOnHover && t.options.duration > 0) {
      this.resumeTimer();
    }
  }

  private startTimer(): void {
    this.startTime = Date.now();
    this.remainingTime = this.toast().options.duration;
    this.runTimer();
  }

  private runTimer(): void {
    this.clearTimer();

    const updateInterval = 50; // Update every 50ms for smooth progress

    this.intervalId = setInterval(() => {
      if (this.isPaused()) {
        return;
      }

      const elapsed = Date.now() - this.startTime;
      const remaining = this.remainingTime - elapsed;

      if (remaining <= 0) {
        this.progress.set(0);
        this.clearTimer();
        this.toastTimeout.emit(this.toast());
      } else {
        const progressPercent = (remaining / this.toast().options.duration) * 100;
        this.progress.set(progressPercent);
      }
    }, updateInterval);
  }

  private pauseTimer(): void {
    this.isPaused.set(true);
    this.remainingTime -= Date.now() - this.startTime;
  }

  private resumeTimer(): void {
    this.isPaused.set(false);
    this.startTime = Date.now();
  }

  private clearTimer(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

