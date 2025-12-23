# @perfectui/toastr

A modern, customizable toast notification library for Angular 19+.

[![npm version](https://img.shields.io/npm/v/@perfectui/toastr.svg)](https://www.npmjs.com/package/@perfectui/toastr)
[![license](https://img.shields.io/npm/l/@perfectui/toastr.svg)](https://github.com/nicoss01/toastr/blob/main/LICENSE)

## Features

- ✨ Modern, beautiful design with multiple themes
- 🎨 6 built-in themes (default, dark, light, minimal, outline, gradient)
- 📍 6 position options (top-right, top-left, top-center, bottom-right, bottom-left, bottom-center)
- ⏱️ Configurable duration and auto-dismiss
- 📊 Progress bar with pause on hover
- 🎯 Custom theme support with full color control
- ♿ Accessible (ARIA support)
- 📱 Responsive design
- 🚫 Duplicate prevention
- 🔔 Event subscriptions (click, close, timeout)

## Installation

```bash
npm install @perfectui/toastr
```

## Quick Start

### 1. Provide the toastr service

In your `app.config.ts`:

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideToastr } from '@perfectui/toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideToastr({
      position: 'top-right',
      duration: 5000,
      maxToasts: 5,
      showProgressBar: true,
      showCloseButton: true,
      theme: 'default',
    }),
  ],
};
```

### 2. Inject and use the service

```typescript
import { Component, inject } from '@angular/core';
import { ToastrService } from '@perfectui/toastr';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="showSuccess()">Success</button>
    <button (click)="showError()">Error</button>
    <button (click)="showWarning()">Warning</button>
    <button (click)="showInfo()">Info</button>
  `,
})
export class AppComponent {
  private toastr = inject(ToastrService);

  showSuccess() {
    this.toastr.success('Operation completed successfully!', 'Success');
  }

  showError() {
    this.toastr.error('Something went wrong!', 'Error');
  }

  showWarning() {
    this.toastr.warning('Please review your input.', 'Warning');
  }

  showInfo() {
    this.toastr.info('New updates available.', 'Info');
  }
}
```

## API Reference

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

### Observables

| Observable | Description |
|------------|-------------|
| `toasts$` | Stream of current toast array |
| `events$` | Stream of toast events (click, close, timeout) |

## Configuration

### Global Configuration Options

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
| `theme` | `ToastTheme` | `'default'` | Global theme for all toasts |
| `customClass` | `string` | `''` | Custom CSS class |
| `customThemeColors` | `ToastThemeColors` | `undefined` | Custom colors (when theme is 'custom') |

### Toast Positions

```typescript
type ToastPosition = 
  | 'top-right' 
  | 'top-left' 
  | 'top-center' 
  | 'bottom-right' 
  | 'bottom-left' 
  | 'bottom-center';
```

## Theming

### Built-in Themes

| Theme | Description |
|-------|-------------|
| `default` | Gradient backgrounds with white text |
| `gradient` | Same as default, vibrant gradient colors |
| `dark` | Dark background with colored text and icons |
| `light` | Light pastel backgrounds with dark text |
| `minimal` | Clean, subtle design |
| `outline` | Outlined style with transparent background |

```typescript
provideToastr({
  theme: 'dark', // Use built-in dark theme
});
```

### Custom Theme

Create your own theme with full color control:

```typescript
provideToastr({
  theme: 'custom',
  customThemeColors: {
    success: {
      background: '#your-color',
      textColor: '#your-color',
      iconColor: '#your-color',
      progressBackground: 'rgba(0, 0, 0, 0.1)',
      progressColor: '#your-color',
      borderColor: '#your-color',
    },
    error: {
      background: '#your-color',
      textColor: '#your-color',
      iconColor: '#your-color',
      progressBackground: 'rgba(0, 0, 0, 0.1)',
      progressColor: '#your-color',
    },
    warning: {
      // ... same structure
    },
    info: {
      // ... same structure
    },
  },
});
```

### Per-Toast Theme Override

Override the theme for individual toasts:

```typescript
this.toastr.success('Message', 'Title', { theme: 'dark' });
```

## Events

Subscribe to toast events for custom handling:

```typescript
import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from '@perfectui/toastr';

@Component({ ... })
export class AppComponent implements OnInit {
  private toastr = inject(ToastrService);

  ngOnInit() {
    // Subscribe to all toast events
    this.toastr.events$.subscribe(event => {
      switch (event.type) {
        case 'click':
          console.log('Toast clicked:', event.toast);
          break;
        case 'close':
          console.log('Toast closed:', event.toast);
          break;
        case 'timeout':
          console.log('Toast timed out:', event.toast);
          break;
      }
    });

    // Subscribe to toast list changes
    this.toastr.toasts$.subscribe(toasts => {
      console.log('Active toasts:', toasts.length);
    });
  }
}
```

## Advanced Usage

### Persistent Toast

Create a toast that doesn't auto-dismiss:

```typescript
this.toastr.info('This will stay until closed', 'Persistent', {
  duration: 0,
  showCloseButton: true,
});
```

### Custom Position Per Toast

```typescript
this.toastr.success('Bottom notification', 'Success', {
  position: 'bottom-center',
});
```

### Prevent Duplicates

```typescript
provideToastr({
  preventDuplicates: true,
});
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for a detailed list of changes.

## License

MIT © [perfectUI](https://github.com/perfectui)
