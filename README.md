# PerfectUI

[![CI](https://github.com/sunilsolankiji/perfect-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/sunilsolankiji/perfect-ui/actions/workflows/ci.yml)
[![npm @perfectui/toastr](https://img.shields.io/npm/v/@perfectui/toastr?label=@perfectui/toastr)](https://www.npmjs.com/package/@perfectui/toastr)
[![npm @perfectui/dialog](https://img.shields.io/npm/v/@perfectui/dialog?label=@perfectui/dialog)](https://www.npmjs.com/package/@perfectui/dialog)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A collection of modern, customizable UI components for Angular 19+.

🔗 **[Live Demo](https://sunilsolankiji.github.io/perfect-ui/)**

## Packages

| Package | Description | Version |
|---------|-------------|---------|
| [@perfectui/toastr](./projects/toastr) | Modern toast notification library | [![npm](https://img.shields.io/npm/v/@perfectui/toastr)](https://www.npmjs.com/package/@perfectui/toastr) |
| [@perfectui/dialog](./projects/dialog) | Modern dialog/modal library | [![npm](https://img.shields.io/npm/v/@perfectui/dialog)](https://www.npmjs.com/package/@perfectui/dialog) |

## Installation

```bash
# Toast notifications
npm install @perfectui/toastr

# Dialog/Modal
npm install @perfectui/dialog
```

## Quick Start

### Toastr

```typescript
import { provideToastr, ToastrService } from '@perfectui/toastr';

// In app.config.ts
providers: [provideToastr()]

// In component
toastr = inject(ToastrService);
this.toastr.success('Hello World!', 'Success');
```

### Dialog

```typescript
import { provideDialog, DialogService } from '@perfectui/dialog';

// In app.config.ts
providers: [provideDialog()]

// In component
dialog = inject(DialogService);
const result = await this.dialog.confirm('Are you sure?', 'Confirm');
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

# Build demo
npm run build:demo

# Build everything
npm run build:all
```

## Workspace Structure

```
perfect-ui/
├── projects/
│   ├── demo/          # Demo application
│   ├── toastr/        # @perfectui/toastr library
│   └── dialog/        # @perfectui/dialog library
├── dist/              # Built packages
└── .github/           # CI/CD workflows
```

## Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) for details.

## License

MIT © [PerfectUI](https://github.com/sunilsolankiji)
