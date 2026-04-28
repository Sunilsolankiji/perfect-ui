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
  styleUrl: './toastr.css'
})
export class PuiToastr implements OnInit, OnDestroy {
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
