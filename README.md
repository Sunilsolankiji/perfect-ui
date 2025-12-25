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
# Start demo app (builds libraries first)
npm start

# Build all libraries
npm run build:libs

# Build individual library
npm run build:toastr
npm run build:dialog
npm run build:core

# Build demo
npm run build:demo

# Build everything
npm run build:all

# Publish all packages
npm run publish:all
```

## Workspace Structure

```
perfect-ui/
├── projects/
│   ├── core/          # @perfectui/core (all-in-one)
│   ├── toastr/        # @perfectui/toastr library
│   ├── dialog/        # @perfectui/dialog library
│   └── demo/          # Demo application
├── dist/              # Built packages
└── .github/           # CI/CD workflows
```

## Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) for details.

## License

MIT © [PerfectUI](https://github.com/sunilsolankiji)
