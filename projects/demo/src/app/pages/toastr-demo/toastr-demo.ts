import { Component, inject } from '@angular/core';
import { PuiToastrService } from '@sunilsolankiji/perfectui/toastr';

@Component({
  selector: 'app-toastr-demo',
  standalone: true,
  imports: [],
  templateUrl: './toastr-demo.html',
  styleUrl: './toastr-demo.css'
})
export class ToastrDemo {
  private toastr = inject(PuiToastrService);

  // Package info
  packageName = '@sunilsolankiji/perfectui/toastr';
  version = '2.0.0';

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

  showMultiple() {
    this.toastr.success('First notification', 'Success');
    setTimeout(() => this.toastr.info('Second notification', 'Info'), 300);
    setTimeout(() => this.toastr.warning('Third notification', 'Warning'), 600);
    setTimeout(() => this.toastr.error('Fourth notification', 'Error'), 900);
  }

  clearAll() {
    this.toastr.clear();
  }
}
