import { Component, inject } from '@angular/core';
import { ToastrService, ToastTheme } from '@perfectui/toastr';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private toastr = inject(ToastrService);
  selectedTheme: ToastTheme = 'default';

  showSuccess() {
    this.toastr.success('This is a success message!', 'Success', { theme: this.selectedTheme });
  }

  showError() {
    this.toastr.error('Something went wrong!', 'Error', { theme: this.selectedTheme });
  }

  showWarning() {
    this.toastr.warning('This is a warning message!', 'Warning', { theme: this.selectedTheme });
  }

  showInfo() {
    this.toastr.info('Here is some information for you.', 'Info', { theme: this.selectedTheme });
  }

  showCustom() {
    this.toastr.success('This toast lasts 10 seconds!', 'Custom Duration', {
      duration: 10000,
      showProgressBar: true,
      theme: this.selectedTheme,
    });
  }

  setTheme(theme: ToastTheme) {
    this.selectedTheme = theme;
  }

  showAllThemes() {
    const themes: ToastTheme[] = ['default', 'dark', 'light', 'minimal', 'outline', 'gradient'];
    themes.forEach((theme, index) => {
      setTimeout(() => {
        this.toastr.success(`This is ${theme} theme`, `${theme.charAt(0).toUpperCase() + theme.slice(1)} Theme`, {
          theme,
          duration: 5000,
        });
      }, index * 300);
    });
  }

  clearAll() {
    this.toastr.clear();
  }
}
