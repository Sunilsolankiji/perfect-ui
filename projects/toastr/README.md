# @perfectUI/toastr

A modern, customizable toast notification library for Angular 19+.

## Features

- ✨ Modern, beautiful design with gradients
- 📍 Multiple position options (top-right, top-left, top-center, bottom-right, bottom-left, bottom-center)
- ⏱️ Configurable duration and auto-dismiss
- 📊 Progress bar with pause on hover
- 🎨 Customizable styles
- ♿ Accessible (ARIA support)
- 📱 Responsive design
- 🚫 Duplicate prevention
- 🔔 Event subscriptions

## Installation

```bash
npm install @perfectUI/toastr
```

## Usage

### 1. Provide the toastr service

In your `app.config.ts`:

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideToastr } from '@perfectUI/toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideToastr({
      position: 'top-right',
      duration: 5000,
      maxToasts: 5,
      showProgressBar: true,
      showCloseButton: true,
    }),
  ],
};
```

### 2. Inject and use the service

```typescript
import { Component, inject } from '@angular/core';
import { ToastrService } from '@perfectUI/toastr';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="showSuccess()">Success</button>
    <button (click)="showError()">Error</button>
  `,
})
export class AppComponent {
  private toastr = inject(ToastrService);

  showSuccess() {
    this.toastr.success('Operation completed!', 'Success');
  }

  showError() {
    this.toastr.error('Something went wrong!', 'Error');
  }
}
```

## API

### ToastrService Methods

| Method | Description |
|--------|-------------|
| `success(message, title?, options?)` | Show a success toast |
| `error(message, title?, options?)` | Show an error toast |
| `warning(message, title?, options?)` | Show a warning toast |
| `info(message, title?, options?)` | Show an info toast |
| `show(type, message, title?, options?)` | Show a toast with custom type |
| `remove(toastId)` | Remove a specific toast |
| `clear()` | Remove all toasts |

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `duration` | `number` | `5000` | Duration in ms before auto-dismiss (0 for persistent) |
| `showCloseButton` | `boolean` | `true` | Show close button |
| `showProgressBar` | `boolean` | `true` | Show progress bar |
| `closeOnClick` | `boolean` | `true` | Close toast on click |
| `pauseOnHover` | `boolean` | `true` | Pause timer on hover |
| `position` | `ToastPosition` | `'top-right'` | Toast container position |
| `maxToasts` | `number` | `5` | Maximum toasts displayed |
| `newestOnTop` | `boolean` | `true` | Stack new toasts on top |
| `preventDuplicates` | `boolean` | `false` | Prevent duplicate messages |
| `customClass` | `string` | `''` | Custom CSS class |

### Toast Positions

- `'top-right'`
- `'top-left'`
- `'top-center'`
- `'bottom-right'`
- `'bottom-left'`
- `'bottom-center'`

## Events

Subscribe to toast events:

```typescript
import { ToastrService } from '@perfectui/toastr';

constructor() {
  const toastr = inject(ToastrService);
  
  toastr.events$.subscribe(event => {
    console.log('Toast event:', event.type, event.toast);
  });
}
```

Event types: `'click'`, `'close'`, `'timeout'`

## License

MIT
