import { Component, inject } from '@angular/core';
import { ToastrService } from '@perfectUI/toastr';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private toastr = inject(ToastrService);

  showSuccess() {
    this.toastr.success('This is a success message!', 'Success');
  }

  showError() {
    this.toastr.error('Something went wrong!', 'Error');
  }

  showWarning() {
    this.toastr.warning('This is a warning message!', 'Warning');
  }

  showInfo() {
    this.toastr.info('Here is some information for you.', 'Info');
  }

  showCustom() {
    this.toastr.success('This toast lasts 10 seconds!', 'Custom Duration', {
      duration: 10000,
      showProgressBar: true,
    });
  }

  clearAll() {
    this.toastr.clear();
  }
}
