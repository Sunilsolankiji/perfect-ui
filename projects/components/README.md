# PerfectUI

A modern, tree-shakable UI component library for Angular 19+.

## Features

- 🌳 **Tree-shakable** - Only include what you use with secondary entry points
- 🎨 **Themeable** - CSS custom properties for easy customization
- ♿ **Accessible** - WCAG compliant with full ARIA support
- 📱 **Responsive** - Works great on all screen sizes
- 🚀 **Standalone** - Works with Angular's standalone components
- 💪 **TypeScript** - Full type safety and IntelliSense support

## Installation

```bash
npm install perfectui
```

## Usage

### Import from secondary entry points (recommended for tree-shaking)

```typescript
// Dialog
import { provideDialog, DialogService } from 'perfectui/dialog';

// Toastr
import { provideToastr, ToastrService } from 'perfectui/toastr';

// OTP
import { provideOtp, OtpComponent } from 'perfectui/otp';
```

### Configure in app.config.ts

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideDialog } from 'perfectui/dialog';
import { provideToastr } from 'perfectui/toastr';
import { provideOtp } from 'perfectui/otp';

export const appConfig: ApplicationConfig = {
  providers: [
    provideDialog({
      size: 'md',
      theme: 'default',
    }),
    provideToastr({
      position: 'top-right',
      duration: 5000,
    }),
    provideOtp({
      length: 6,
      inputType: 'numeric',
    }),
  ],
};
```

## Components

### Dialog

A flexible dialog/modal system with built-in alert, confirm, and prompt dialogs.

```typescript
import { DialogService } from 'perfectui/dialog';

@Component({...})
export class MyComponent {
  private dialog = inject(DialogService);

  async showAlert() {
    await this.dialog.alert('Hello World!', 'Title');
  }

  async showConfirm() {
    const result = await this.dialog.confirm('Are you sure?', 'Confirm');
    if (result.confirmed) {
      // User confirmed
    }
  }

  async showPrompt() {
    const result = await this.dialog.prompt('Enter your name:', 'Name');
    if (result.confirmed) {
      console.log('Name:', result.value);
    }
  }

  openCustomDialog() {
    const ref = this.dialog.open(MyDialogComponent, {
      data: { userId: 123 },
      size: 'lg',
    });
    ref.afterClosed().then(result => console.log(result));
  }
}
```

### Toastr

Toast notification system with multiple themes and positions.

```typescript
import { ToastrService } from 'perfectui/toastr';

@Component({...})
export class MyComponent {
  private toastr = inject(ToastrService);

  showSuccess() {
    this.toastr.success('Operation completed!', 'Success');
  }

  showError() {
    this.toastr.error('Something went wrong', 'Error');
  }

  showWarning() {
    this.toastr.warning('Please be careful', 'Warning');
  }

  showInfo() {
    this.toastr.info('Here is some information', 'Info');
  }
}
```

### OTP

A customizable OTP (One-Time Password) input component.

```typescript
import { OtpComponent } from 'perfectui/otp';

@Component({
  imports: [OtpComponent],
  template: `
    <pui-otp
      [(ngModel)]="otpValue"
      [length]="6"
      [inputType]="'numeric'"
      [theme]="'outline'"
      (completed)="onOtpComplete($event)"
    />
  `
})
export class MyComponent {
  otpValue = '';

  onOtpComplete(event: OtpCompleteEvent) {
    console.log('OTP completed:', event.value);
  }
}
```

## Theming

PerfectUI uses CSS custom properties for theming. Override them in your global styles:

```css
:root {
  /* Primary colors */
  --pui-primary-500: #3b82f6;
  --pui-primary-600: #2563eb;
  
  /* Success colors */
  --pui-success-500: #22c55e;
  --pui-success-600: #16a34a;
  
  /* Error colors */
  --pui-error-500: #ef4444;
  --pui-error-600: #dc2626;
  
  /* Warning colors */
  --pui-warning-500: #f59e0b;
  --pui-warning-600: #d97706;
  
  /* Info colors */
  --pui-info-500: #3b82f6;
  --pui-info-600: #2563eb;
}
```

## License

MIT
