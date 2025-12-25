# @perfectui/dialog

A modern, customizable dialog/modal library for Angular 19+.

[![npm version](https://img.shields.io/npm/v/@perfectui/dialog.svg)](https://www.npmjs.com/package/@perfectui/dialog)
[![license](https://img.shields.io/npm/l/@perfectui/dialog.svg)](https://github.com/nicoss01/dialog/blob/main/LICENSE)

## Features

- ✨ Modern, beautiful design with multiple themes
- 🎨 3 built-in themes (default, dark, minimal)
- 📍 3 position options (center, top, bottom)
- 📐 5 size options (sm, md, lg, xl, fullscreen)
- 🔔 Built-in alert, confirm, prompt, and danger dialogs
- 📄 Template support - pass Angular templates to dialogs
- 🧩 Custom component dialogs with data injection
- ⌨️ Keyboard support (ESC to close)
- 🖱️ Backdrop click to close
- 📚 Stacking dialogs support
- ♿ Accessible (ARIA support)
- 🎭 Smooth animations

## Installation

```bash
npm install @perfectui/dialog
```

## Quick Start

### 1. Provide the dialog service

In your `app.config.ts`:

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideDialog } from '@perfectui/dialog';

export const appConfig: ApplicationConfig = {
  providers: [
    provideDialog({
      size: 'md',
      theme: 'default',
      closeOnBackdropClick: true,
      closeOnEscape: true,
    }),
  ],
};
```

### 2. Use built-in dialogs

```typescript
import { Component, inject } from '@angular/core';
import { DialogService } from '@perfectui/dialog';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="showAlert()">Alert</button>
    <button (click)="showConfirm()">Confirm</button>
    <button (click)="showPrompt()">Prompt</button>
    <button (click)="showDanger()">Delete</button>
  `,
})
export class AppComponent {
  private dialog = inject(DialogService);

  async showAlert() {
    await this.dialog.alert('This is an alert message!', 'Alert');
    console.log('Alert closed');
  }

  async showConfirm() {
    const result = await this.dialog.confirm(
      'Are you sure you want to proceed?',
      'Confirmation'
    );
    if (result.confirmed) {
      console.log('User confirmed');
    }
  }

  async showPrompt() {
    const result = await this.dialog.prompt(
      'Please enter your name:',
      'Input Required',
      { inputPlaceholder: 'Your name...' }
    );
    if (result.confirmed) {
      console.log('User entered:', result.value);
    }
  }

  async showDanger() {
    const result = await this.dialog.danger(
      'This action cannot be undone. Are you sure?',
      'Delete Item'
    );
    if (result.confirmed) {
      console.log('Item deleted');
    }
  }
}
```

### 3. Open dialogs with Angular templates

```typescript
import { Component, inject, TemplateRef, viewChild } from '@angular/core';
import { DialogService } from '@perfectui/dialog';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="openTemplate()">Open Template Dialog</button>
    
    <ng-template #myTemplate>
      <div class="my-content">
        <h3>Custom Template Content</h3>
        <p>This is rendered from an Angular template!</p>
        <ul>
          <li>Full Angular template syntax</li>
          <li>Data binding support</li>
          <li>Event handling</li>
        </ul>
      </div>
    </ng-template>
  `,
})
export class AppComponent {
  private dialog = inject(DialogService);
  
  myTemplate = viewChild<TemplateRef<any>>('myTemplate');

  async openTemplate() {
    const template = this.myTemplate();
    if (template) {
      const result = await this.dialog.openTemplate(template, {
        title: 'Template Dialog',
        size: 'md',
        buttons: [
          { text: 'Cancel', variant: 'secondary' },
          { text: 'OK', variant: 'primary' }
        ]
      });
      console.log('Template dialog result:', result);
    }
  }
}
```

### 4. Open custom component dialogs

```typescript
import { Component, inject } from '@angular/core';
import { DialogService, DIALOG_DATA, DIALOG_REF, DialogRef } from '@perfectui/dialog';

// Custom dialog component
@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="user-form">
      <div class="header">
        <h3>Edit User</h3>
        <button (click)="cancel()">✕</button>
      </div>
      <div class="body">
        <input [(ngModel)]="user.name" placeholder="Name" />
        <input [(ngModel)]="user.email" placeholder="Email" />
      </div>
      <div class="footer">
        <button (click)="cancel()">Cancel</button>
        <button (click)="save()">Save</button>
      </div>
    </div>
  `,
})
export class UserDialogComponent {
  private dialogRef = inject<DialogRef<User, User>>(DIALOG_REF);
  private data = inject<User>(DIALOG_DATA);
  
  user: User = { ...this.data };

  cancel() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.user);
  }
}

// Parent component
@Component({...})
export class AppComponent {
  private dialog = inject(DialogService);

  async editUser(user: User) {
    const dialogRef = this.dialog.open<User, User>(UserDialogComponent, {
      size: 'md',
      data: { ...user },
    });

    const result = await dialogRef.afterClosed();
    if (result.confirmed && result.value) {
      console.log('Updated user:', result.value);
    }
  }
}
```

## API Reference

### DialogService Methods

| Method | Description |
|--------|-------------|
| `alert(message, title?, options?)` | Show an alert dialog |
| `confirm(message, title?, options?)` | Show a confirmation dialog |
| `prompt(message, title?, options?)` | Show a prompt dialog with input |
| `danger(message, title?, options?)` | Show a danger/delete confirmation |
| `openTemplate(template, options?)` | Open a dialog with an Angular template |
| `open(component, options?)` | Open a custom component dialog |
| `closeDialog(id, result?)` | Close a specific dialog |
| `closeAll()` | Close all open dialogs |
| `hasOpenDialogs()` | Check if any dialogs are open |

### DialogOptions

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | `string` | `''` | Dialog title |
| `message` | `string` | `''` | Dialog message (built-in dialogs) |
| `template` | `TemplateRef<any>` | `undefined` | Angular template to render |
| `templateContext` | `any` | `{}` | Context data for template |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'fullscreen'` | `'md'` | Dialog size |
| `position` | `'center' \| 'top' \| 'bottom'` | `'center'` | Dialog position |
| `theme` | `'default' \| 'dark' \| 'minimal'` | `'default'` | Visual theme |
| `closeOnBackdropClick` | `boolean` | `true` | Close on backdrop click |
| `closeOnEscape` | `boolean` | `true` | Close on ESC key |
| `showCloseButton` | `boolean` | `true` | Show close button |
| `animationDuration` | `number` | `200` | Animation duration in ms |
| `data` | `T` | `undefined` | Data to pass to custom component |
| `buttons` | `DialogButton[]` | `[]` | Custom buttons configuration |
| `inputType` | `'text' \| 'password' \| 'email' \| 'number' \| 'textarea'` | `'text'` | Input type for prompt |
| `inputPlaceholder` | `string` | `''` | Input placeholder for prompt |
| `inputValue` | `string` | `''` | Initial input value for prompt |
| `customClass` | `string` | `''` | Custom CSS class for panel |
| `backdropClass` | `string` | `''` | Custom CSS class for backdrop |
| `minWidth` | `string` | `undefined` | Minimum width of dialog |
| `maxWidth` | `string` | `undefined` | Maximum width of dialog |

### DialogButton

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `text` | `string` | required | Button text |
| `variant` | `'primary' \| 'secondary' \| 'danger' \| 'success' \| 'warning'` | `'secondary'` | Button style |
| `closeDialog` | `boolean` | `true` | Close dialog when clicked |
| `returnValue` | `any` | `undefined` | Value returned when clicked |
| `customClass` | `string` | `''` | Custom CSS class |

### DialogRef

| Property/Method | Type | Description |
|-----------------|------|-------------|
| `id` | `number` | Unique dialog ID |
| `data` | `T` | Data passed to the dialog |
| `close(result?)` | `(result?: R) => void` | Close the dialog |
| `afterClosed()` | `() => Promise<DialogResult<R>>` | Promise that resolves when closed |

### DialogResult

| Property | Type | Description |
|----------|------|-------------|
| `confirmed` | `boolean` | Whether dialog was confirmed |
| `value` | `T` | Return value from dialog |

### Injection Tokens

| Token | Description |
|-------|-------------|
| `DIALOG_DATA` | Inject to access data passed to custom dialog |
| `DIALOG_REF` | Inject to access DialogRef in custom dialog |

## Themes

### Default Theme
Clean, light theme with subtle shadows.

### Dark Theme
```typescript
this.dialog.confirm('Message', 'Title', { theme: 'dark' });
```

### Minimal Theme
```typescript
this.dialog.confirm('Message', 'Title', { theme: 'minimal' });
```

## Sizes

| Size | Width |
|------|-------|
| `sm` | 360px |
| `md` | 480px |
| `lg` | 640px |
| `xl` | 900px |
| `fullscreen` | 100vw |

## Customization

### CSS Variables

```css
:root {
  /* Background & Colors */
  --pui-dialog-bg: #ffffff;
  --pui-dialog-border: #e5e7eb;
  --pui-dialog-title-color: #111827;
  --pui-dialog-text-color: #374151;
  --pui-dialog-backdrop-bg: rgba(0, 0, 0, 0.5);
  
  /* Layout */
  --pui-dialog-radius: 12px;
  --pui-dialog-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  --pui-dialog-z-index: 9999;
  --pui-dialog-animation-duration: 200ms;
  
  /* Close Button */
  --pui-dialog-close-color: #6b7280;
  --pui-dialog-close-hover-bg: #f3f4f6;
  --pui-dialog-close-hover-color: #111827;
  
  /* Input */
  --pui-dialog-input-bg: #ffffff;
  --pui-dialog-input-border: #d1d5db;
  --pui-dialog-input-color: #111827;
  --pui-dialog-input-focus-border: #3b82f6;
  --pui-dialog-input-focus-ring: rgba(59, 130, 246, 0.15);
  
  /* Buttons */
  --pui-dialog-btn-primary-bg: #3b82f6;
  --pui-dialog-btn-primary-color: #ffffff;
  --pui-dialog-btn-primary-hover-bg: #2563eb;
  
  --pui-dialog-btn-secondary-bg: #f3f4f6;
  --pui-dialog-btn-secondary-color: #374151;
  --pui-dialog-btn-secondary-hover-bg: #e5e7eb;
  
  --pui-dialog-btn-danger-bg: #ef4444;
  --pui-dialog-btn-danger-color: #ffffff;
  --pui-dialog-btn-danger-hover-bg: #dc2626;
  
  --pui-dialog-btn-success-bg: #22c55e;
  --pui-dialog-btn-success-color: #ffffff;
  --pui-dialog-btn-success-hover-bg: #16a34a;
  
  --pui-dialog-btn-warning-bg: #f59e0b;
  --pui-dialog-btn-warning-color: #ffffff;
  --pui-dialog-btn-warning-hover-bg: #d97706;
}
```

## Examples

### Custom Buttons

```typescript
const result = await this.dialog.confirm('Choose an option:', 'Options', {
  buttons: [
    { text: 'Option A', variant: 'secondary', returnValue: 'A' },
    { text: 'Option B', variant: 'warning', returnValue: 'B' },
    { text: 'Option C', variant: 'primary', returnValue: 'C' },
  ]
});
console.log('Selected:', result.value); // 'A', 'B', or 'C'
```

### Password Prompt

```typescript
const result = await this.dialog.prompt('Enter password:', 'Authentication', {
  inputType: 'password',
  inputPlaceholder: '••••••••'
});
```

### Textarea Prompt

```typescript
const result = await this.dialog.prompt('Enter feedback:', 'Feedback', {
  inputType: 'textarea',
  size: 'lg'
});
```

### Stacked Dialogs

```typescript
const result1 = await this.dialog.confirm('First dialog', 'Step 1');
if (result1.confirmed) {
  const result2 = await this.dialog.confirm('Second dialog', 'Step 2');
}
```

## License

MIT
