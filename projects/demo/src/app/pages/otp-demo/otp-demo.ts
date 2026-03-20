import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { OtpComponent, OtpCompleteEvent, OtpChangeEvent, OtpService } from '@perfectui/otp';

@Component({
  selector: 'app-otp-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, OtpComponent],
  templateUrl: './otp-demo.html',
  styleUrls: ['./otp-demo.css'],
})
export class OtpDemoComponent {
  // Basic usage
  basicOtp = '';
  basicCompleted = signal(false);

  // Theme examples
  defaultThemeOtp = '';
  outlineThemeOtp = '';
  underlineThemeOtp = '';
  filledThemeOtp = '';

  // Size examples
  smallOtp = '';
  mediumOtp = '';
  largeOtp = '';

  // Input types
  numericOtp = '';
  alphanumericOtp = '';

  // Special features
  maskedOtp = '';
  separatorOtp = '';
  fourDigitPin = '';

  // Status examples
  errorOtp = '';
  successOtp = '123456';
  showError = signal(false);

  // Reactive forms
  otpControl = new FormControl('', [Validators.required, Validators.minLength(6)]);

  // Service example
  generatedOtp = signal('');

  constructor(private otpService: OtpService) {}

  onBasicComplete(event: OtpCompleteEvent) {
    console.log('OTP Completed:', event);
    this.basicCompleted.set(true);
    // Simulate verification
    setTimeout(() => {
      this.basicCompleted.set(false);
    }, 2000);
  }

  onOtpChange(event: OtpChangeEvent) {
    console.log('OTP Changed:', event);
  }

  simulateError() {
    this.showError.set(true);
    setTimeout(() => {
      this.showError.set(false);
      this.errorOtp = '';
    }, 2000);
  }

  generateOtp() {
    this.generatedOtp.set(this.otpService.generateOtp(6, 'numeric'));
  }

  validateOtp() {
    const isValid = this.otpService.validateOtp(this.otpControl.value || '', 6, 'numeric');
    console.log('OTP Valid:', isValid);
    alert(isValid ? 'OTP is valid!' : 'OTP is invalid!');
  }
}
