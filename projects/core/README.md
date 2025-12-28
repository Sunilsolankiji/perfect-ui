# @perfectui/core

Complete PerfectUI component library for Angular 19+.

[![npm version](https://img.shields.io/npm/v/@perfectui/core.svg)](https://www.npmjs.com/package/@perfectui/core)
[![license](https://img.shields.io/npm/l/@perfectui/core.svg)](https://github.com/sunilsolankiji/perfect-ui/blob/main/LICENSE)

## Why @perfectui/core?

Install `@perfectui/core` to get **all PerfectUI components** in one import.

## Installation

```bash
npm install @perfectui/core @perfectui/toastr @perfectui/dialog
```

## Usage

```typescript
import { provideToastr, provideDialog } from '@perfectui/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideToastr(),
    provideDialog(),
  ],
};
```

```typescript
import { ToastrService, DialogService } from '@perfectui/core';

export class AppComponent {
  private toastr = inject(ToastrService);
  private dialog = inject(DialogService);

  showToast() {
    this.toastr.success('Hello World!', 'Success');
  }

  async showDialog() {
    const result = await this.dialog.confirm('Are you sure?', 'Confirm');
  }
}
```

## Included Packages

| Package | Description |
|---------|-------------|
| [@perfectui/toastr](https://www.npmjs.com/package/@perfectui/toastr) | Toast notifications |
| [@perfectui/dialog](https://www.npmjs.com/package/@perfectui/dialog) | Dialogs & modals |

## Theming

Customize colors using CSS custom properties in your `styles.css`:

```css
:root {
  /* Colors */
  --pui-success-500: #22c55e;
  --pui-error-500: #f43f5e;
  --pui-warning-500: #eab308;
  --pui-info-500: #0ea5e9;

  /* Toast customization */
  --pui-toast-radius: 12px;

  /* Dialog customization */
  --pui-dialog-radius: 16px;
}
```

See the individual package docs for all available CSS variables.

## License

MIT
