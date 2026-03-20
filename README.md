# PerfectUI

[![CI](https://github.com/sunilsolankiji/perfect-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/sunilsolankiji/perfect-ui/actions/workflows/ci.yml)
[![npm perfectui](https://img.shields.io/npm/v/perfectui?label=perfectui)](https://www.npmjs.com/package/perfectui)
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
| Dialog | `perfectui/dialog` | Dialogs, modals, alerts, confirms, prompts |
| Toastr | `perfectui/toastr` | Toast notifications |
| OTP | `perfectui/otp` | One-time password input |

## Installation

```bash
npm install perfectui
```

## Quick Start

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

### Use in components

```typescript
import { Component, inject } from '@angular/core';
import { DialogService } from 'perfectui/dialog';
import { ToastrService } from 'perfectui/toastr';

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
│   ├── components/          # perfectui library
│   │   ├── src/             # Main entry point
│   │   ├── dialog/          # perfectui/dialog
│   │   ├── toastr/          # perfectui/toastr
│   │   └── otp/             # perfectui/otp
│   └── demo/                # Demo application
├── dist/                    # Built packages
└── shared/
    └── perfectui-theme.css  # CSS variables reference
```

## Theme Colors

All components use **CSS custom properties** (CSS variables) for theming.

### Customizing Colors

Add to your `styles.css`:

```css
:root {
  /* Override default colors */
  --pui-success-500: #22c55e;
  --pui-error-500: #f43f5e;
  --pui-warning-500: #eab308;
  --pui-info-500: #0ea5e9;
  
  /* Customize toast appearance */
  --pui-toast-radius: 12px;
  --pui-toast-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}
```

### Dark Mode

```css
@media (prefers-color-scheme: dark) {
  :root {
    --pui-neutral-50: #111827;
    --pui-neutral-900: #f9fafb;
    --pui-white: #1f2937;
    --pui-slate-800: #0f172a;
  }
}
```

### Available CSS Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `--pui-success-500` | `#10b981` | Success color |
| `--pui-error-500` | `#ef4444` | Error color |
| `--pui-warning-500` | `#f59e0b` | Warning color |
| `--pui-info-500` | `#3b82f6` | Info color |
| `--pui-neutral-*` | - | Neutral shades (50-900) |
| `--pui-white` | `#ffffff` | White |
| `--pui-black` | `#000000` | Black |

See `shared/perfectui-theme.css` for all available variables.

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
