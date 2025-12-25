# @perfectui/core

The complete PerfectUI component library for Angular 19+.

[![npm version](https://img.shields.io/npm/v/@perfectui/core.svg)](https://www.npmjs.com/package/@perfectui/core)
[![license](https://img.shields.io/npm/l/@perfectui/core.svg)](https://github.com/sunilsolankiji/perfect-ui/blob/main/LICENSE)

## Why @perfectui/core?

Instead of installing each package separately, you can install `@perfectui/core` to get **all PerfectUI components** in one package.

## Installation

```bash
npm install @perfectui/core
```

This single package includes:
- 🔔 **@perfectui/toastr** - Toast notifications
- 💬 **@perfectui/dialog** - Dialogs & modals
- 🚀 *More components coming soon...*

## Usage

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideToastr, provideDialog } from '@perfectui/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideToastr({
      position: 'top-right',
      duration: 5000,
    }),
    provideDialog({
      size: 'md',
      theme: 'default',
    }),
  ],
};
```

```typescript
import { Component, inject } from '@angular/core';
import { ToastrService, DialogService } from '@perfectui/core';

@Component({...})
export class AppComponent {
  private toastr = inject(ToastrService);
  private dialog = inject(DialogService);

  showToast() {
    this.toastr.success('Hello World!', 'Success');
  }

  async showDialog() {
    const result = await this.dialog.confirm('Are you sure?', 'Confirm');
    if (result.confirmed) {
      console.log('Confirmed!');
    }
  }
}
```

## Included Packages

| Package | Description |
|---------|-------------|
| [@perfectui/toastr](https://www.npmjs.com/package/@perfectui/toastr) | Modern toast notification library |
| [@perfectui/dialog](https://www.npmjs.com/package/@perfectui/dialog) | Modern dialog/modal library |

## Individual Installation

If you only need specific components, you can install them individually:

```bash
# Toast notifications only
npm install @perfectui/toastr

# Dialogs only
npm install @perfectui/dialog
```

## Documentation

- [Toastr Documentation](https://github.com/sunilsolankiji/perfect-ui/tree/main/projects/toastr#readme)
- [Dialog Documentation](https://github.com/sunilsolankiji/perfect-ui/tree/main/projects/dialog#readme)

## License

MIT
