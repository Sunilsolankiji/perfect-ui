# @perfectui/otp

A modern, customizable OTP (One-Time Password) input component for Angular 19+. Built with accessibility, flexibility, and developer experience in mind.

[![npm version](https://img.shields.io/npm/v/@perfectui/otp.svg)](https://www.npmjs.com/package/@perfectui/otp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🎯 **Easy to Use** - Simple API with sensible defaults
- 🎨 **Multiple Themes** - Default, Outline, Underline, and Filled themes
- 📏 **Size Variants** - Small, Medium, and Large sizes
- 🔢 **Input Types** - Numeric, Alphanumeric, Alphabetic, or Any
- 🔒 **Masked Input** - Hide characters for security-sensitive inputs
- 📋 **Paste Support** - Full paste support for quick input
- ⌨️ **Keyboard Navigation** - Arrow keys, Home, End, Backspace support
- ♿ **Accessible** - ARIA labels and keyboard navigation
- 🎭 **Reactive Forms** - Full ControlValueAccessor support
- 🎪 **Animations** - Smooth transitions and feedback
- 🎛️ **Highly Configurable** - CSS variables for full customization
- 📱 **Mobile Friendly** - Optimized keyboard types

## Installation

```bash
npm install @perfectui/otp
```

## Quick Start

### 1. Provide the OTP configuration (optional)

```typescript
// app.config.ts
import { provideOtp } from '@perfectui/otp';

export const appConfig = {
  providers: [
    provideOtp({
      length: 6,
      inputType: 'numeric',
      theme: 'default',
      size: 'medium',
      autoFocus: true,
    }),
  ],
};
```

### 2. Use the component

```typescript
// my-component.ts
import { Component } from '@angular/core';
import { OtpComponent } from '@perfectui/otp';

@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [OtpComponent],
  template: `
    <pui-otp
      [(value)]="otpValue"
      (completed)="onOtpComplete($event)"
    />
  `,
})
export class VerificationComponent {
  otpValue = '';

  onOtpComplete(event: OtpCompleteEvent) {
    console.log('OTP completed:', event.value);
    // Submit to server for verification
  }
}
```

## Usage Examples

### Basic Usage

```html
<pui-otp [(value)]="otp" (completed)="verify($event)" />
```

### With Reactive Forms

```typescript
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { OtpComponent } from '@perfectui/otp';

@Component({
  imports: [OtpComponent, ReactiveFormsModule],
  template: `
    <pui-otp [formControl]="otpControl" />
  `,
})
export class MyComponent {
  otpControl = new FormControl('');
}
```

### 4-Digit PIN

```html
<pui-otp
  [length]="4"
  [masked]="true"
  theme="filled"
  size="large"
  [(value)]="pin"
/>
```

### Alphanumeric Code

```html
<pui-otp
  [length]="8"
  inputType="alphanumeric"
  theme="outline"
  [(value)]="code"
/>
```

### With Separators (Credit Card Style)

```html
<pui-otp
  [length]="16"
  [separatorAfter]="4"
  separatorChar="-"
  [(value)]="cardNumber"
/>
```

### Error State

```html
<pui-otp
  [(value)]="otp"
  status="error"
  (completed)="verify($event)"
/>

<p *ngIf="hasError" class="error-message">Invalid OTP. Please try again.</p>
```

### Disabled State

```html
<pui-otp [disabled]="true" [value]="'123456'" />
```

## API Reference

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `length` | `number` | `6` | Number of OTP input fields |
| `inputType` | `'numeric' \| 'alphanumeric' \| 'alphabetic' \| 'any'` | `'numeric'` | Type of characters allowed |
| `theme` | `'default' \| 'outline' \| 'underline' \| 'filled'` | `'default'` | Visual theme |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Size variant |
| `masked` | `boolean` | `false` | Whether to mask input characters |
| `maskChar` | `string` | `'•'` | Character to display when masked |
| `autoFocus` | `boolean` | `true` | Auto-focus first input on init |
| `autoSubmit` | `boolean` | `false` | Auto-blur on complete (for form submit) |
| `placeholder` | `string` | `''` | Placeholder for empty inputs |
| `disabled` | `boolean` | `false` | Disable all inputs |
| `readonly` | `boolean` | `false` | Make inputs readonly |
| `status` | `'default' \| 'success' \| 'error'` | `'default'` | Visual status for validation |
| `allowPaste` | `boolean` | `true` | Allow paste functionality |
| `ariaLabel` | `string` | `'One-time password input'` | ARIA label for accessibility |
| `ariaDescribedBy` | `string` | `undefined` | ARIA described-by reference |
| `inputStyle` | `OtpInputStyle` | `undefined` | Custom inline styles |
| `separatorAfter` | `number` | `0` | Show separator after every N inputs |
| `separatorChar` | `string` | `'-'` | Separator character |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `completed` | `OtpCompleteEvent` | Emitted when all inputs are filled |
| `changed` | `OtpChangeEvent` | Emitted on each input change |
| `valueChange` | `string` | Two-way binding for value |

### Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `focus(index?)` | `index?: number` | `void` | Focus input at index (default: 0) |
| `clear()` | - | `void` | Clear all inputs |
| `setValue(value)` | `value: string` | `void` | Set value programmatically |
| `getValue()` | - | `string` | Get current OTP value |
| `isComplete()` | - | `boolean` | Check if OTP is complete |

## OtpService

A service for programmatic OTP operations.

```typescript
import { OtpService } from '@perfectui/otp';

@Component({ ... })
export class MyComponent {
  private otpService = inject(OtpService);

  generateTestOtp() {
    // Generate a random 6-digit OTP
    const otp = this.otpService.generateOtp(6, 'numeric');
    console.log(otp); // e.g., "847291"
  }

  validateOtp(otp: string) {
    // Validate OTP format
    const isValid = this.otpService.validateOtp(otp, 6, 'numeric');
    console.log(isValid); // true or false
  }

  formatForDisplay(otp: string) {
    // Format OTP with separators
    const formatted = this.otpService.formatOtp('123456', 3, '-');
    console.log(formatted); // "123-456"
  }
}
```

## Styling with CSS Variables

Customize the appearance using CSS custom properties:

```css
:root {
  /* Colors */
  --pui-otp-primary: #3b82f6;
  --pui-otp-error: #ef4444;
  --pui-otp-success: #22c55e;

  /* Input Styling */
  --pui-otp-border-color: #e5e7eb;
  --pui-otp-border-radius: 8px;
  --pui-otp-bg: #ffffff;
  --pui-otp-text-color: #111827;
  --pui-otp-placeholder-color: #d1d5db;

  /* Focus State */
  --pui-otp-focus-border-color: var(--pui-otp-primary);
  --pui-otp-focus-ring-color: rgba(59, 130, 246, 0.15);

  /* Filled State */
  --pui-otp-filled-border-color: var(--pui-otp-primary);
  --pui-otp-filled-bg: rgba(59, 130, 246, 0.05);

  /* Size: Small */
  --pui-otp-small-width: 36px;
  --pui-otp-small-height: 40px;
  --pui-otp-small-font-size: 1rem;

  /* Size: Medium */
  --pui-otp-medium-width: 44px;
  --pui-otp-medium-height: 52px;
  --pui-otp-medium-font-size: 1.25rem;

  /* Size: Large */
  --pui-otp-large-width: 56px;
  --pui-otp-large-height: 64px;
  --pui-otp-large-font-size: 1.5rem;

  /* Gap between inputs */
  --pui-otp-gap: 8px;

  /* Font */
  --pui-otp-font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  --pui-otp-font-weight: 600;
}
```

## Dark Mode Support

```css
@media (prefers-color-scheme: dark) {
  :root {
    --pui-otp-bg: #1f2937;
    --pui-otp-text-color: #f9fafb;
    --pui-otp-border-color: #374151;
    --pui-otp-placeholder-color: #6b7280;
  }
}
```

## Accessibility

The OTP component follows WAI-ARIA guidelines:

- Each input has proper `aria-label` with position information
- Group container has `role="group"` with descriptive label
- Supports `aria-describedby` for error messages
- Full keyboard navigation support
- Works with screen readers

```html
<pui-otp
  ariaLabel="Enter verification code"
  [ariaDescribedBy]="'otp-error'"
/>
<p id="otp-error" *ngIf="hasError">Invalid code. Please try again.</p>
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT © [PerfectUI](https://github.com/sunilsolankiji/perfect-ui)
