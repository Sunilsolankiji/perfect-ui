# PerfectUI

[![CI](https://github.com/sunilsolankiji/perfect-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/sunilsolankiji/perfect-ui/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/@sunilsolankiji/perfectui?label=@sunilsolankiji/perfectui)](https://www.npmjs.com/package/@sunilsolankiji/perfectui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, tree-shakable UI component library for Angular 19+.

🔗 **[Live Demo](https://sunilsolankiji.github.io/perfect-ui/)**

## Features

- 🌳 **Tree-shakable** - Import only what you use with secondary entry points
- 🎨 **Themeable** - CSS custom properties for easy customization
- ♿ **Accessible** - WCAG compliant with full ARIA support
- 📱 **Responsive** - Works great on all screen sizes
- 🚀 **Standalone** - Works with Angular's standalone components
- 💪 **TypeScript** - Full type safety and IntelliSense support

## Components

| Component | Import Path | Description |
|-----------|-------------|-------------|
| Dialog | `@sunilsolankiji/perfectui/dialog` | Dialogs, modals, alerts, confirms, prompts |
| Toastr | `@sunilsolankiji/perfectui/toastr` | Toast notifications |
| OTP | `@sunilsolankiji/perfectui/otp` | One-time password input |

## Installation

```bash
npm install @sunilsolankiji/perfectui
```

## Quick Start

### Import from secondary entry points (recommended for tree-shaking)

```typescript
// Dialog
import { provideDialog, DialogService } from '@sunilsolankiji/perfectui/dialog';

// Toastr
import { provideToastr, ToastrService } from '@sunilsolankiji/perfectui/toastr';

// OTP
import { provideOtp, OtpComponent } from '@sunilsolankiji/perfectui/otp';
```

### Configure in app.config.ts

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideDialog } from '@sunilsolankiji/perfectui/dialog';
import { provideToastr } from '@sunilsolankiji/perfectui/toastr';
import { provideOtp } from '@sunilsolankiji/perfectui/otp';

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

### Use in components

```typescript
import { Component, inject } from '@angular/core';
import { DialogService } from '@sunilsolankiji/perfectui/dialog';
import { ToastrService } from '@sunilsolankiji/perfectui/toastr';

@Component({...})
export class MyComponent {
  private dialog = inject(DialogService);
  private toastr = inject(ToastrService);

  showSuccess() {
    this.toastr.success('Hello World!', 'Success');
  }

  async showConfirm() {
    const result = await this.dialog.confirm('Are you sure?', 'Confirm');
    if (result.confirmed) {
      // User confirmed
    }
  }
}
```

## Development

### Prerequisites

- Node.js 20+
- npm 10+

### Setup

```bash
git clone https://github.com/sunilsolankiji/perfect-ui.git
cd perfect-ui
npm install
```

### Scripts

```bash
# Start demo app
npm start

# Build the library
npm run build:perfectui

# Build demo
npm run build:demo

# Publish to npm
npm run publish:perfectui
```

## Workspace Structure

```
perfect-ui/
├── projects/
│   ├── components/          # @sunilsolankiji/perfectui library
│   │   ├── src/             # Main entry point
│   │   ├── core/            # @sunilsolankiji/perfectui/core (theming)
│   │   ├── dialog/          # @sunilsolankiji/perfectui/dialog
│   │   ├── toastr/          # @sunilsolankiji/perfectui/toastr
│   │   ├── otp/             # @sunilsolankiji/perfectui/otp
│   │   ├── themes/          # Prebuilt CSS themes
│   │   └── _index.scss      # SCSS theming API
│   └── demo/                # Demo application
└── dist/                    # Built packages
```

## Theming

PerfectUI provides an Angular Material-inspired theming system with prebuilt themes and full customization support.

### Quick Start - Prebuilt Themes

Import a prebuilt theme CSS in your `styles.css`:

```css
@import '@sunilsolankiji/perfectui/themes/indigo-pink.css';
```

Available prebuilt themes:
- `indigo-pink.css` (default)
- `deep-purple-amber.css`

### Programmatic Theming

Use the `providePerfectUI` function for dynamic theming:

```typescript
import { providePerfectUI } from '@sunilsolankiji/perfectui/core';

export const appConfig: ApplicationConfig = {
  providers: [
    providePerfectUI({
      theme: 'indigo-pink',
      darkMode: 'auto',     // 'light' | 'dark' | 'auto'
      density: 'default',   // 'compact' | 'default' | 'comfortable'
    }),
  ],
};
```

### Using ThemeService

```typescript
import { ThemeService } from '@sunilsolankiji/perfectui/core';

@Component({...})
export class MyComponent {
  private theme = inject(ThemeService);

  toggleDarkMode() {
    this.theme.toggleDarkMode();
  }

  setTheme() {
    this.theme.setTheme('deep-purple-amber');
  }
}
```

### SCSS Theming (Advanced)

For full control, use the SCSS API:

```scss
@use '@sunilsolankiji/perfectui' as pui;

// Include core styles
@include pui.core();

// Define your theme
$my-theme: pui.define-light-theme(
  pui.define-palette(pui.$indigo),
  pui.define-palette(pui.$pink)
);

// Apply theme
@include pui.theme($my-theme);
```

### CSS Variables Reference

| Variable | Description |
|----------|-------------|
| `--pui-primary` | Primary color (500 shade) |
| `--pui-primary-{50-900}` | Primary color shades |
| `--pui-accent` | Accent color |
| `--pui-warn` | Warning/error color |
| `--pui-success` | Success color |
| `--pui-info` | Info color |
| `--pui-foreground-text` | Text color |
| `--pui-background` | Background color |
| `--pui-background-card` | Card background |
| `--pui-border-radius` | Global border radius |
| `--pui-shadow-{1-5}` | Shadow elevation levels |


## Versioning

This project uses [Semantic Versioning](https://semver.org/) with automated changelog generation based on [Conventional Commits](https://www.conventionalcommits.org/).

- **Patch** (1.0.x) - Bug fixes, performance improvements
- **Minor** (1.x.0) - New features (backward compatible)
- **Major** (x.0.0) - Breaking changes

## Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) for details on:

- Development setup
- Commit message conventions
- Pull request process
- Release process

## Documentation

- [Contributing Guide](./CONTRIBUTING.md) - How to contribute
- [Changelog](./projects/components/CHANGELOG.md) - Version history

## License

MIT © [PerfectUI](https://github.com/sunilsolankiji)
