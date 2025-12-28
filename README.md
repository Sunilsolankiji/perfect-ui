# PerfectUI

[![CI](https://github.com/sunilsolankiji/perfect-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/sunilsolankiji/perfect-ui/actions/workflows/ci.yml)
[![npm @perfectui/core](https://img.shields.io/npm/v/@perfectui/core?label=@perfectui/core)](https://www.npmjs.com/package/@perfectui/core)
[![npm @perfectui/toastr](https://img.shields.io/npm/v/@perfectui/toastr?label=@perfectui/toastr)](https://www.npmjs.com/package/@perfectui/toastr)
[![npm @perfectui/dialog](https://img.shields.io/npm/v/@perfectui/dialog?label=@perfectui/dialog)](https://www.npmjs.com/package/@perfectui/dialog)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A collection of modern, customizable UI components for Angular 19+.

🔗 **[Live Demo](https://sunilsolankiji.github.io/perfect-ui/)**

## Packages

| Package | Description | Version |
|---------|-------------|---------|
| [@perfectui/core](./projects/core) | **All-in-one** - includes all packages | [![npm](https://img.shields.io/npm/v/@perfectui/core)](https://www.npmjs.com/package/@perfectui/core) |
| [@perfectui/toastr](./projects/toastr) | Toast notification library | [![npm](https://img.shields.io/npm/v/@perfectui/toastr)](https://www.npmjs.com/package/@perfectui/toastr) |
| [@perfectui/dialog](./projects/dialog) | Dialog/modal library | [![npm](https://img.shields.io/npm/v/@perfectui/dialog)](https://www.npmjs.com/package/@perfectui/dialog) |

## Installation

```bash
# Install everything (recommended)
npm install @perfectui/core

# Or install individual packages
npm install @perfectui/toastr
npm install @perfectui/dialog
```

## Quick Start

### Using @perfectui/core (All-in-One)

```typescript
import { provideToastr, provideDialog, ToastrService, DialogService } from '@perfectui/core';

// In app.config.ts
providers: [
  provideToastr(),
  provideDialog()
]

// In component
toastr = inject(ToastrService);
dialog = inject(DialogService);

this.toastr.success('Hello World!', 'Success');
const result = await this.dialog.confirm('Are you sure?', 'Confirm');
```

### Using Individual Packages

```typescript
// Toastr only
import { provideToastr, ToastrService } from '@perfectui/toastr';

// Dialog only
import { provideDialog, DialogService } from '@perfectui/dialog';
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

# Build all libraries
npm run build:libs

# Build demo
npm run build:demo

# Publish all packages
npm run publish:all
```

## Workspace Structure

```
perfect-ui/
├── shared/
│   └── perfectui-theme.css  # CSS variables reference
├── projects/
│   ├── core/                # @perfectui/core (re-exports all)
│   ├── toastr/              # @perfectui/toastr
│   ├── dialog/              # @perfectui/dialog
│   └── demo/                # Demo application
└── dist/                    # Built packages
```

## Theme Colors

All components use **CSS custom properties** (CSS variables) for theming.
This makes it easy to customize colors in your global styles, similar to Angular Material.

### Customizing Colors

Add to your `styles.css` or `styles.scss`:

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

## Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) for details.

## Documentation

- [Development Guide](./docs/DEVELOPMENT.md) - How to create new components
- [Release Process](./docs/RELEASE.md) - How to release new versions
- [Roadmap](./ROADMAP.md) - Planned features and components

## License

MIT © [PerfectUI](https://github.com/sunilsolankiji)
