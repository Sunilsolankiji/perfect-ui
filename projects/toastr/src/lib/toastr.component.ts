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
import { Toast } from './toastr.models';
import { TOASTR_CONFIG, ToastrConfig } from './toastr.config';

@Component({
  selector: 'pui-toast',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="pui-toast"
      [class]="toastClasses()"
      [class.pui-toast-paused]="isPaused()"
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
    /*
     * PerfectUI Toast - CSS Custom Properties Theme
     *
     * Override these in your global styles.css:
     *
     * :root {
     *   --pui-success-500: #22c55e;
     *   --pui-error-500: #f43f5e;
     * }
     */

    :host {
      display: contents;
    }

    .pui-toast {
      display: flex;
      align-items: flex-start;
      padding: var(--pui-toast-padding, 14px 16px);
      border-radius: var(--pui-toast-radius, 8px);
      box-shadow: var(--pui-toast-shadow, 0 4px 12px rgba(0, 0, 0, 0.15));
      position: relative;
      overflow: hidden;
      cursor: pointer;
      transition: transform 0.2s ease, opacity 0.2s ease, box-shadow 0.2s ease;
      animation: pui-toast-slide-in var(--pui-toast-animation-duration, 0.3s) ease forwards;
      min-width: var(--pui-toast-min-width, 300px);
      max-width: var(--pui-toast-max-width, 400px);
      backdrop-filter: blur(8px);
      border: 2px solid transparent;
    }

    .pui-toast:hover {
      box-shadow: var(--pui-toast-shadow-hover, 0 6px 16px rgba(0, 0, 0, 0.2));
      transform: translateY(-2px);
    }

    @keyframes pui-toast-slide-in {
      from { opacity: 0; transform: translateX(100%); }
      to { opacity: 1; transform: translateX(0); }
    }

    /* ========== DEFAULT THEME (Gradient) ========== */
    .pui-toast-success {
      background: linear-gradient(135deg, var(--pui-success-500, #10b981) 0%, var(--pui-success-600, #059669) 100%);
      color: var(--pui-white, #ffffff);
    }
    .pui-toast-success .pui-toast-icon { color: var(--pui-white, #ffffff); }
    .pui-toast-success .pui-toast-progress { background: rgba(255,255,255,0.2); }
    .pui-toast-success .pui-toast-progress-bar { background: rgba(255,255,255,0.7); }

    .pui-toast-error {
      background: linear-gradient(135deg, var(--pui-error-500, #ef4444) 0%, var(--pui-error-600, #dc2626) 100%);
      color: var(--pui-white, #ffffff);
    }
    .pui-toast-error .pui-toast-icon { color: var(--pui-white, #ffffff); }
    .pui-toast-error .pui-toast-progress { background: rgba(255,255,255,0.2); }
    .pui-toast-error .pui-toast-progress-bar { background: rgba(255,255,255,0.7); }

    .pui-toast-warning {
      background: linear-gradient(135deg, var(--pui-warning-500, #f59e0b) 0%, var(--pui-warning-600, #d97706) 100%);
      color: var(--pui-white, #ffffff);
    }
    .pui-toast-warning .pui-toast-icon { color: var(--pui-white, #ffffff); }
    .pui-toast-warning .pui-toast-progress { background: rgba(255,255,255,0.2); }
    .pui-toast-warning .pui-toast-progress-bar { background: rgba(255,255,255,0.7); }

    .pui-toast-info {
      background: linear-gradient(135deg, var(--pui-info-500, #3b82f6) 0%, var(--pui-info-600, #2563eb) 100%);
      color: var(--pui-white, #ffffff);
    }
    .pui-toast-info .pui-toast-icon { color: var(--pui-white, #ffffff); }
    .pui-toast-info .pui-toast-progress { background: rgba(255,255,255,0.2); }
    .pui-toast-info .pui-toast-progress-bar { background: rgba(255,255,255,0.7); }

    /* ========== DARK THEME ========== */
    .pui-toast-theme-dark {
      background: var(--pui-slate-800, #1e293b) !important;
      border-color: currentColor;
    }
    .pui-toast-theme-dark.pui-toast-success { color: var(--pui-success-500, #10b981); }
    .pui-toast-theme-dark.pui-toast-error { color: var(--pui-error-500, #ef4444); }
    .pui-toast-theme-dark.pui-toast-warning { color: var(--pui-warning-500, #f59e0b); }
    .pui-toast-theme-dark.pui-toast-info { color: var(--pui-info-500, #3b82f6); }

    .pui-toast-theme-dark .pui-toast-progress { background: rgba(255,255,255,0.1); }
    .pui-toast-theme-dark .pui-toast-progress-bar { background: currentColor; }

    /* ========== LIGHT THEME ========== */
    .pui-toast-theme-light.pui-toast-success {
      background: var(--pui-success-50, #ecfdf5) !important;
      color: var(--pui-success-800, #065f46);
      border-color: var(--pui-success-500, #10b981);
    }
    .pui-toast-theme-light.pui-toast-success .pui-toast-icon { color: var(--pui-success-500, #10b981); }
    .pui-toast-theme-light.pui-toast-success .pui-toast-progress-bar { background: var(--pui-success-500, #10b981); }

    .pui-toast-theme-light.pui-toast-error {
      background: var(--pui-error-50, #fef2f2) !important;
      color: var(--pui-error-800, #991b1b);
      border-color: var(--pui-error-500, #ef4444);
    }
    .pui-toast-theme-light.pui-toast-error .pui-toast-icon { color: var(--pui-error-500, #ef4444); }
    .pui-toast-theme-light.pui-toast-error .pui-toast-progress-bar { background: var(--pui-error-500, #ef4444); }

    .pui-toast-theme-light.pui-toast-warning {
      background: var(--pui-warning-50, #fffbeb) !important;
      color: var(--pui-warning-800, #92400e);
      border-color: var(--pui-warning-500, #f59e0b);
    }
    .pui-toast-theme-light.pui-toast-warning .pui-toast-icon { color: var(--pui-warning-500, #f59e0b); }
    .pui-toast-theme-light.pui-toast-warning .pui-toast-progress-bar { background: var(--pui-warning-500, #f59e0b); }

    .pui-toast-theme-light.pui-toast-info {
      background: var(--pui-info-50, #eff6ff) !important;
      color: var(--pui-info-800, #1e40af);
      border-color: var(--pui-info-500, #3b82f6);
    }
    .pui-toast-theme-light.pui-toast-info .pui-toast-icon { color: var(--pui-info-500, #3b82f6); }
    .pui-toast-theme-light.pui-toast-info .pui-toast-progress-bar { background: var(--pui-info-500, #3b82f6); }

    .pui-toast-theme-light .pui-toast-progress { background: rgba(0,0,0,0.1); }

    /* ========== MINIMAL THEME ========== */
    .pui-toast-theme-minimal {
      background: var(--pui-white, #ffffff) !important;
      color: var(--pui-neutral-700, #374151);
      border-color: var(--pui-neutral-200, #e5e7eb);
    }
    .pui-toast-theme-minimal.pui-toast-success .pui-toast-icon { color: var(--pui-success-500, #10b981); }
    .pui-toast-theme-minimal.pui-toast-success .pui-toast-progress-bar { background: var(--pui-success-500, #10b981); }
    .pui-toast-theme-minimal.pui-toast-error .pui-toast-icon { color: var(--pui-error-500, #ef4444); }
    .pui-toast-theme-minimal.pui-toast-error .pui-toast-progress-bar { background: var(--pui-error-500, #ef4444); }
    .pui-toast-theme-minimal.pui-toast-warning .pui-toast-icon { color: var(--pui-warning-500, #f59e0b); }
    .pui-toast-theme-minimal.pui-toast-warning .pui-toast-progress-bar { background: var(--pui-warning-500, #f59e0b); }
    .pui-toast-theme-minimal.pui-toast-info .pui-toast-icon { color: var(--pui-info-500, #3b82f6); }
    .pui-toast-theme-minimal.pui-toast-info .pui-toast-progress-bar { background: var(--pui-info-500, #3b82f6); }
    .pui-toast-theme-minimal .pui-toast-progress { background: rgba(0,0,0,0.05); }

    /* ========== OUTLINE THEME ========== */
    .pui-toast-theme-outline {
      background: transparent !important;
      backdrop-filter: blur(12px);
    }
    .pui-toast-theme-outline.pui-toast-success {
      color: var(--pui-success-500, #10b981);
      border-color: var(--pui-success-500, #10b981);
    }
    .pui-toast-theme-outline.pui-toast-error {
      color: var(--pui-error-500, #ef4444);
      border-color: var(--pui-error-500, #ef4444);
    }
    .pui-toast-theme-outline.pui-toast-warning {
      color: var(--pui-warning-500, #f59e0b);
      border-color: var(--pui-warning-500, #f59e0b);
    }
    .pui-toast-theme-outline.pui-toast-info {
      color: var(--pui-info-500, #3b82f6);
      border-color: var(--pui-info-500, #3b82f6);
    }
    .pui-toast-theme-outline .pui-toast-progress { background: rgba(0,0,0,0.1); }
    .pui-toast-theme-outline .pui-toast-progress-bar { background: currentColor; }

    /* ========== COMMON ELEMENTS ========== */
    .pui-toast-icon {
      flex-shrink: 0;
      width: 24px;
      height: 24px;
      margin-right: var(--pui-toast-gap, 12px);
      opacity: 0.9;
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
      margin-left: var(--pui-toast-gap, 12px);
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
      background: rgba(255, 255, 255, 0.2);
    }

    .pui-toast-progress-bar {
      height: 100%;
      background: rgba(255, 255, 255, 0.7);
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
    const classes = [`pui-toast-${t.type}`];

    // Only add theme class if not default (default uses base type styles)
    if (theme !== 'default' && theme !== 'gradient') {
      classes.push(`pui-toast-theme-${theme}`);
    }

    if (t.options.customClass) {
      classes.push(t.options.customClass);
    }
    return classes.join(' ');
  });

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
    const updateInterval = 50;

    this.intervalId = setInterval(() => {
      if (this.isPaused()) return;

      const elapsed = Date.now() - this.startTime;
      const remaining = this.remainingTime - elapsed;

      if (remaining <= 0) {
        this.progress.set(0);
        this.clearTimer();
        this.toastTimeout.emit(this.toast());
      } else {
        this.progress.set((remaining / this.toast().options.duration) * 100);
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
