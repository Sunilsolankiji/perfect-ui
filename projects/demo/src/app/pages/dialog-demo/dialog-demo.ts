import { Component, inject, TemplateRef, viewChild } from '@angular/core';
import { DialogService, DialogTheme, DialogSize } from '@perfectui/dialog';
import { UserFormDialogComponent, UserFormData } from './user-form-dialog.component';

@Component({
  selector: 'app-dialog-demo',
  standalone: true,
  imports: [],
  templateUrl: './dialog-demo.html',
  styleUrl: './dialog-demo.css'
})
export class DialogDemo {
  private dialog = inject(DialogService);

  // Template references
  customTemplate = viewChild<TemplateRef<any>>('customTemplate');

  selectedTheme: DialogTheme = 'default';
  selectedSize: DialogSize = 'md';
  lastResult: string = '';

  async showAlert() {
    await this.dialog.alert(
      'This is an alert message. Click OK to dismiss.',
      'Alert',
      { theme: this.selectedTheme, size: this.selectedSize }
    );
    this.lastResult = 'Alert closed';
  }

  async showConfirm() {
    const result = await this.dialog.confirm(
      'Are you sure you want to proceed with this action?',
      'Confirmation Required',
      { theme: this.selectedTheme, size: this.selectedSize }
    );
    this.lastResult = result.confirmed ? 'Confirmed ✅' : 'Cancelled ❌';
  }

  async showPrompt() {
    const result = await this.dialog.prompt(
      'Please enter your name:',
      'Input Required',
      {
        theme: this.selectedTheme,
        size: this.selectedSize,
        inputPlaceholder: 'Your name...',
        inputValue: ''
      }
    );
    if (result.confirmed && result.value) {
      this.lastResult = `Hello, ${result.value}! 👋`;
    } else {
      this.lastResult = 'Prompt cancelled';
    }
  }

  async showDanger() {
    const result = await this.dialog.danger(
      'This action cannot be undone. Are you absolutely sure you want to delete this item?',
      'Delete Item',
      { theme: this.selectedTheme, size: this.selectedSize }
    );
    this.lastResult = result.confirmed ? 'Item deleted 🗑️' : 'Deletion cancelled';
  }

  async showCustomButtons() {
    const result = await this.dialog.confirm(
      'Choose your preferred option:',
      'Custom Buttons',
      {
        theme: this.selectedTheme,
        size: this.selectedSize,
        buttons: [
          { text: 'Option A', variant: 'secondary', returnValue: 'A' },
          { text: 'Option B', variant: 'warning', returnValue: 'B' },
          { text: 'Option C', variant: 'primary', returnValue: 'C' },
        ]
      }
    );
    this.lastResult = `Selected: Option ${result.value || 'None'}`;
  }

  async showLongContent() {
    await this.dialog.alert(
      `This is a dialog with a longer message to demonstrate how the dialog handles overflow content.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.

The dialog will automatically scroll if the content exceeds the available height.`,
      'Long Content',
      { theme: this.selectedTheme, size: this.selectedSize }
    );
    this.lastResult = 'Long content dialog closed';
  }

  async showTextareaPrompt() {
    const result = await this.dialog.prompt(
      'Please provide your feedback:',
      'Feedback Form',
      {
        theme: this.selectedTheme,
        size: 'lg',
        inputType: 'textarea',
        inputPlaceholder: 'Write your feedback here...'
      }
    );
    if (result.confirmed && result.value) {
      this.lastResult = `Feedback received (${result.value.length} chars)`;
    } else {
      this.lastResult = 'Feedback cancelled';
    }
  }

  async showPasswordPrompt() {
    const result = await this.dialog.prompt(
      'Enter your password to continue:',
      'Authentication',
      {
        theme: this.selectedTheme,
        size: this.selectedSize,
        inputType: 'password',
        inputPlaceholder: '••••••••'
      }
    );
    if (result.confirmed && result.value) {
      this.lastResult = `Password entered (${result.value.length} characters)`;
    } else {
      this.lastResult = 'Authentication cancelled';
    }
  }

  async showStackedDialogs() {
    const result1 = await this.dialog.confirm(
      'This is the first dialog. Click Confirm to open another dialog on top.',
      'Dialog 1',
      { theme: this.selectedTheme, size: 'sm' }
    );

    if (result1.confirmed) {
      const result2 = await this.dialog.confirm(
        'This is the second dialog stacked on top!',
        'Dialog 2',
        { theme: this.selectedTheme, size: 'sm' }
      );
      this.lastResult = result2.confirmed ? 'Both dialogs confirmed' : 'Second dialog cancelled';
    } else {
      this.lastResult = 'First dialog cancelled';
    }
  }

  async showTemplate() {
    const template = this.customTemplate();
    if (template) {
      const result = await this.dialog.openTemplate(template, {
        title: 'Custom Template Dialog',
        theme: this.selectedTheme,
        size: this.selectedSize,
        buttons: [
          { text: 'Cancel', variant: 'secondary', returnValue: false },
          { text: 'Got it!', variant: 'primary', returnValue: true }
        ]
      });
      this.lastResult = result.confirmed ? 'Template dialog confirmed' : 'Template dialog cancelled';
    }
  }

  async showCustomComponent() {
    const dialogRef = this.dialog.open<UserFormData, UserFormData>(
      UserFormDialogComponent,
      {
        size: 'md',
        data: {
          name: 'John Doe',
          email: 'john@example.com',
          role: 'editor'
        }
      }
    );

    const result = await dialogRef.afterClosed();
    if (result.confirmed && result.value) {
      this.lastResult = `Saved: ${result.value.name} (${result.value.email}) - ${result.value.role}`;
    } else {
      this.lastResult = 'Custom dialog cancelled';
    }
  }

  setTheme(theme: DialogTheme) {
    this.selectedTheme = theme;
  }

  setSize(size: DialogSize) {
    this.selectedSize = size;
  }
}
