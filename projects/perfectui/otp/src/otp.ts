import {
  Component,
  input,
  output,
  model,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ChangeDetectionStrategy,
  signal,
  computed,
  inject,
  forwardRef,
  ElementRef,
  ViewChildren,
  QueryList,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormsModule,
} from '@angular/forms';
import { OtpInputType, OtpTheme, OtpSize, OtpStatus, OtpCompleteEvent, OtpChangeEvent, OtpInputStyle } from './otp.models';
import { OTP_CONFIG, DEFAULT_OTP_CONFIG } from './otp.config';

@Component({
  selector: 'pui-otp',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PuiOtp),
      multi: true,
    },
  ],
  template: `
    <div
      class="pui-otp"
      [class]="containerClasses()"
      [attr.aria-label]="ariaLabel()"
      role="group"
    >
      @for (_ of inputsArray(); track $index) {
        @if (shouldShowSeparator($index)) {
          <span class="pui-otp-separator">{{ separatorChar() }}</span>
        }
        <input
          #otpInput
          type="text"
          [attr.inputmode]="inputMode()"
          [attr.pattern]="inputPattern()"
          [attr.maxlength]="1"
          [attr.aria-label]="'Digit ' + ($index + 1) + ' of ' + length()"
          [attr.aria-describedby]="ariaDescribedBy()"
          [attr.autocomplete]="$index === 0 ? 'one-time-code' : 'off'"
          [disabled]="isDisabled()"
          [readonly]="readonly()"
          [placeholder]="placeholder()"
          [class]="inputClasses()"
          [class.pui-otp-input-filled]="values()[$index]"
          [class.pui-otp-input-focused]="focusedIndex() === $index"
          [value]="getDisplayValue($index)"
          [style]="getInputStyle()"
          (input)="onInput($event, $index)"
          (keydown)="onKeyDown($event, $index)"
          (focus)="onFocus($index)"
          (blur)="onBlur($index)"
          (paste)="onPaste($event, $index)"
        />
      }
    </div>
  `,
  styleUrl: './otp.css',
})
export class PuiOtp implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('otpInput') private inputElements!: QueryList<ElementRef<HTMLInputElement>>;

  // Configuration inputs
  readonly length = input<number>(DEFAULT_OTP_CONFIG.length);
  readonly inputType = input<OtpInputType>(DEFAULT_OTP_CONFIG.inputType);
  readonly theme = input<OtpTheme>(DEFAULT_OTP_CONFIG.theme);
  readonly size = input<OtpSize>(DEFAULT_OTP_CONFIG.size);
  readonly masked = input<boolean>(DEFAULT_OTP_CONFIG.masked);
  readonly maskChar = input<string>(DEFAULT_OTP_CONFIG.maskChar);
  readonly autoFocus = input<boolean>(DEFAULT_OTP_CONFIG.autoFocus);
  readonly autoSubmit = input<boolean>(DEFAULT_OTP_CONFIG.autoSubmit);
  readonly placeholder = input<string>(DEFAULT_OTP_CONFIG.placeholder);
  readonly disabled = input<boolean>(DEFAULT_OTP_CONFIG.disabled);
  readonly readonly = input<boolean>(DEFAULT_OTP_CONFIG.readonly);
  readonly status = input<OtpStatus>(DEFAULT_OTP_CONFIG.status);
  readonly allowPaste = input<boolean>(DEFAULT_OTP_CONFIG.allowPaste);
  readonly ariaLabel = input<string>(DEFAULT_OTP_CONFIG.ariaLabel);
  readonly ariaDescribedBy = input<string | undefined>(undefined);
  readonly inputStyle = input<OtpInputStyle | undefined>(undefined);
  readonly separatorAfter = input<number>(DEFAULT_OTP_CONFIG.separatorAfter);
  readonly separatorChar = input<string>(DEFAULT_OTP_CONFIG.separatorChar);

  // Two-way binding for value
  readonly value = model<string>('');

  // Output events
  readonly completed = output<OtpCompleteEvent>();
  readonly changed = output<OtpChangeEvent>();

  // Internal state
  readonly values = signal<string[]>([]);
  readonly focusedIndex = signal<number>(-1);
  private isInternalChange = false;

  // Injected config
  private readonly globalConfig = inject(OTP_CONFIG, { optional: true });

  // Computed values
  readonly inputsArray = computed(() => Array(this.length()).fill(0));

  readonly isDisabled = computed(() => {
    return this.disabled() || this._disabled;
  });

  readonly containerClasses = computed(() => {
    const classes = [
      `pui-otp-theme-${this.theme()}`,
      `pui-otp-${this.size()}`,
    ];

    if (this.status() !== 'default') {
      classes.push(`pui-otp-status-${this.status()}`);
    }

    if (this.isDisabled()) {
      classes.push('pui-otp-disabled');
    }

    return classes.join(' ');
  });

  readonly inputClasses = computed(() => {
    return 'pui-otp-input';
  });

  readonly inputMode = computed(() => {
    switch (this.inputType()) {
      case 'numeric':
        return 'numeric';
      case 'alphabetic':
      case 'alphanumeric':
        return 'text';
      default:
        return 'text';
    }
  });

  readonly inputPattern = computed(() => {
    switch (this.inputType()) {
      case 'numeric':
        return '[0-9]';
      case 'alphabetic':
        return '[a-zA-Z]';
      case 'alphanumeric':
        return '[a-zA-Z0-9]';
      default:
        return undefined;
    }
  });

  // ControlValueAccessor
  private _disabled = false;
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    // Apply global config if provided
    if (this.globalConfig) {
      // Config is applied through default values
    }

    // Sync internal values with model
    effect(() => {
      const val = this.value();
      if (!this.isInternalChange) {
        this.setValuesFromString(val);
      }
    });
  }

  ngOnInit(): void {
    this.initializeValues();
  }

  ngAfterViewInit(): void {
    if (this.autoFocus() && !this.isDisabled()) {
      setTimeout(() => this.focusInput(0), 0);
    }
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this.setValuesFromString(value || '');
    this.value.set(value || '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
  }

  // Public methods
  /**
   * Focus the OTP input at the specified index
   */
  focus(index = 0): void {
    this.focusInput(index);
  }

  /**
   * Clear all OTP values
   */
  clear(): void {
    this.values.set(Array(this.length()).fill(''));
    this.updateValue();
    this.focusInput(0);
  }

  /**
   * Set the OTP value programmatically
   */
  setValue(value: string): void {
    this.setValuesFromString(value);
    this.updateValue();
  }

  /**
   * Get the current complete OTP value
   */
  getValue(): string {
    return this.values().join('');
  }

  /**
   * Check if the OTP is complete
   */
  isComplete(): boolean {
    return this.values().every((v: string) => v !== '') && this.values().length === this.length();
  }

  // Internal methods
  private initializeValues(): void {
    const initialValue = this.value();
    if (initialValue) {
      this.setValuesFromString(initialValue);
    } else {
      this.values.set(Array(this.length()).fill(''));
    }
  }

  private setValuesFromString(value: string): void {
    const chars = value.split('').slice(0, this.length());
    const newValues = Array(this.length()).fill('');
    chars.forEach((char, i) => {
      if (this.isValidChar(char)) {
        newValues[i] = char;
      }
    });
    this.values.set(newValues);
  }

  private isValidChar(char: string): boolean {
    switch (this.inputType()) {
      case 'numeric':
        return /^[0-9]$/.test(char);
      case 'alphabetic':
        return /^[a-zA-Z]$/.test(char);
      case 'alphanumeric':
        return /^[a-zA-Z0-9]$/.test(char);
      default:
        return char.length === 1;
    }
  }

  private updateValue(): void {
    const value = this.values().join('');
    this.isInternalChange = true;
    this.value.set(value);
    this.onChange(value);
    this.isInternalChange = false;
  }

  private focusInput(index: number): void {
    if (index >= 0 && index < this.length()) {
      const inputs = this.inputElements?.toArray();
      if (inputs && inputs[index]) {
        inputs[index].nativeElement.focus();
        inputs[index].nativeElement.select();
      }
    }
  }

  /**
   * Get the index of the first empty input
   */
  private getFirstEmptyIndex(): number {
    const values = this.values();
    for (let i = 0; i < values.length; i++) {
      if (!values[i]) {
        return i;
      }
    }
    return -1; // All filled
  }

  /**
   * Get the last allowed index (last filled + 1, or last index if all filled)
   */
  private getLastAllowedIndex(): number {
    const firstEmpty = this.getFirstEmptyIndex();
    if (firstEmpty === -1) {
      return this.length() - 1; // All filled, can go to last
    }
    return firstEmpty;
  }

  getDisplayValue(index: number): string {
    const val = this.values()[index] || '';
    if (val && this.masked()) {
      return this.maskChar();
    }
    return val;
  }

  shouldShowSeparator(index: number): boolean {
    const sep = this.separatorAfter();
    return sep > 0 && index > 0 && index % sep === 0;
  }

  getInputStyle(): Record<string, string> | null {
    const style = this.inputStyle();
    if (!style) return null;

    const result: Record<string, string> = {};
    if (style.width) result['width'] = style.width;
    if (style.height) result['height'] = style.height;
    if (style.fontSize) result['font-size'] = style.fontSize;
    if (style.borderRadius) result['border-radius'] = style.borderRadius;
    if (style.borderColor) result['border-color'] = style.borderColor;
    if (style.backgroundColor) result['background-color'] = style.backgroundColor;
    if (style.textColor) result['color'] = style.textColor;
    return Object.keys(result).length > 0 ? result : null;
  }

  // Event handlers
  onInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const rawValue = input.value ?? '';

    // Handle multi-character input (mobile clipboard paste, SMS autofill via
    // `one-time-code`, IME composition, etc.). Native `paste` events are
    // unreliable on mobile, so any time we receive more than one character we
    // treat it as a paste-style fill starting from the current index.
    if (rawValue.length > 1) {
      if (!this.allowPaste()) {
        // Restore previous value
        input.value = this.values()[index] || '';
        return;
      }

      const validChars = rawValue.split('').filter(char => this.isValidChar(char));

      // Restore the input's visible value to the single slot's current value;
      // we'll repopulate from the values signal below.
      input.value = '';

      if (validChars.length === 0) {
        // Reset slot if nothing usable was entered
        const reset = [...this.values()];
        reset[index] = '';
        this.values.set(reset);
        this.updateValue();
        return;
      }

      const newValues = [...this.values()];
      let currentIndex = index;
      for (const char of validChars) {
        if (currentIndex >= this.length()) break;
        newValues[currentIndex] = char;
        currentIndex++;
      }
      this.values.set(newValues);
      this.updateValue();

      this.changed.emit({
        value: this.getValue(),
        isComplete: this.isComplete(),
        inputIndex: Math.min(currentIndex, this.length() - 1),
      });

      const focusIndex = Math.min(currentIndex, this.length() - 1);
      this.focusInput(focusIndex);

      if (this.isComplete()) {
        this.completed.emit({
          value: this.getValue(),
          isValid: true,
        });

        if (this.autoSubmit()) {
          this.inputElements?.last?.nativeElement?.blur();
        }
      }
      return;
    }

    const char = rawValue.slice(-1); // Get last character

    // Validate character
    if (char && !this.isValidChar(char)) {
      input.value = this.values()[index] || '';
      return;
    }

    // Update values
    const newValues = [...this.values()];
    newValues[index] = char;
    this.values.set(newValues);
    this.updateValue();

    // Emit change event
    this.changed.emit({
      value: this.getValue(),
      isComplete: this.isComplete(),
      inputIndex: index,
    });

    // Move to next input if character was entered
    if (char && index < this.length() - 1) {
      this.focusInput(index + 1);
    }

    // Check if complete
    if (this.isComplete()) {
      this.completed.emit({
        value: this.getValue(),
        isValid: true,
      });

      if (this.autoSubmit()) {
        // Blur to trigger form submit if needed
        this.inputElements?.last?.nativeElement?.blur();
      }
    }
  }

  onKeyDown(event: KeyboardEvent, index: number): void {
    const key = event.key;

    switch (key) {
      case 'Backspace':
        event.preventDefault();
        const currentValue = this.values()[index];
        if (currentValue) {
          // Clear current input
          const newValues = [...this.values()];
          newValues[index] = '';
          this.values.set(newValues);
          this.updateValue();
        } else if (index > 0) {
          // Move to previous input and clear it
          const newValues = [...this.values()];
          newValues[index - 1] = '';
          this.values.set(newValues);
          this.updateValue();
          this.focusInput(index - 1);
        }
        break;

      case 'Delete':
        event.preventDefault();
        const vals = [...this.values()];
        vals[index] = '';
        this.values.set(vals);
        this.updateValue();
        break;

      case 'ArrowLeft':
        event.preventDefault();
        if (index > 0) {
          this.focusInput(index - 1);
        }
        break;

      case 'ArrowRight':
        event.preventDefault();
        // Only allow moving forward if current input has a value
        if (index < this.length() - 1 && this.values()[index]) {
          this.focusInput(index + 1);
        }
        break;

      case 'Home':
        event.preventDefault();
        this.focusInput(0);
        break;

      case 'End':
        event.preventDefault();
        // Only allow jumping to last filled input or first empty
        this.focusInput(this.getLastAllowedIndex());
        break;

      case 'Tab':
        // Prevent tab from moving forward if current input is empty
        if (!event.shiftKey && !this.values()[index] && index < this.length() - 1) {
          event.preventDefault();
        }
        break;

      default:
        // For single character input, let onInput handle it
        if (key.length === 1 && !event.ctrlKey && !event.metaKey) {
          // Prevent default to avoid double input
          if (this.values()[index]) {
            event.preventDefault();
            if (this.isValidChar(key)) {
              const newValues = [...this.values()];
              newValues[index] = key;
              this.values.set(newValues);
              this.updateValue();
              if (index < this.length() - 1) {
                this.focusInput(index + 1);
              }
            }
          }
        }
        break;
    }
  }

  onFocus(index: number): void {
    // Redirect to first empty input if trying to focus on a later input
    const firstEmptyIndex = this.getFirstEmptyIndex();
    if (firstEmptyIndex !== -1 && index > firstEmptyIndex) {
      // Defer focus to avoid issues with current focus event
      setTimeout(() => this.focusInput(firstEmptyIndex), 0);
      return;
    }

    this.focusedIndex.set(index);
    const inputs = this.inputElements?.toArray();
    if (inputs && inputs[index]) {
      inputs[index].nativeElement.select();
    }
  }

  onBlur(_: number): void {
    this.focusedIndex.set(-1);
    this.onTouched();
  }

  onPaste(event: ClipboardEvent, index: number): void {
    if (!this.allowPaste()) {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    const pastedText = event.clipboardData?.getData('text') || '';

    // Filter valid characters
    const validChars = pastedText.split('').filter(char => this.isValidChar(char));

    if (validChars.length === 0) return;

    // Fill values starting from current index
    const newValues = [...this.values()];
    let currentIndex = index;

    for (const char of validChars) {
      if (currentIndex >= this.length()) break;
      newValues[currentIndex] = char;
      currentIndex++;
    }

    this.values.set(newValues);
    this.updateValue();

    // Focus appropriate input
    const focusIndex = Math.min(currentIndex, this.length() - 1);
    this.focusInput(focusIndex);

    // Check if complete
    if (this.isComplete()) {
      this.completed.emit({
        value: this.getValue(),
        isValid: true,
      });
    }
  }
}


