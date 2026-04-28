import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { PuiOtp, OtpCompleteEvent, OtpChangeEvent, PuiOtpService, OtpTheme, OtpSize, OtpInputType } from '@sunilsolankiji/perfectui/otp';

type OtpGenerateType = 'numeric' | 'alphanumeric' | 'alphabetic';

@Component({
  selector: 'app-otp-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PuiOtp],
  templateUrl: './otp-demo.html',
  styleUrl: './otp-demo.css',
})
export class OtpDemoComponent {
  readonly packageName = '@sunilsolankiji/perfectui/otp';

  // Theme and size selection
  selectedTheme: OtpTheme = 'default';
  selectedSize: OtpSize = 'medium';
  selectedInputType: OtpInputType = 'numeric';

  // Demo values
  demoOtp = '';
  demoCompleted = signal(false);
  lastResult = '';

  // Reactive forms
  otpControl = new FormControl('', [Validators.required, Validators.minLength(6)]);

  // Service example
  generatedOtp = signal('');

  constructor(private otpService: PuiOtpService) {}

  setTheme(theme: OtpTheme) {
    this.selectedTheme = theme;
  }

  setSize(size: OtpSize) {
    this.selectedSize = size;
  }

  setInputType(type: OtpInputType) {
    this.selectedInputType = type;
    this.demoOtp = '';
  }

  onComplete(event: OtpCompleteEvent) {
    this.demoCompleted.set(true);
    this.lastResult = `OTP Completed: ${event.value}`;
    setTimeout(() => this.demoCompleted.set(false), 2000);
  }

  onChange(event: OtpChangeEvent) {
    console.log('OTP Changed:', event);
  }

  generateOtp() {
    const type = this.selectedInputType === 'any' ? 'alphanumeric' : this.selectedInputType as OtpGenerateType;
    this.generatedOtp.set(this.otpService.generateOtp(6, type));
    this.lastResult = `Generated OTP: ${this.generatedOtp()}`;
  }

  validateOtp() {
    const type = this.selectedInputType === 'any' ? 'alphanumeric' : this.selectedInputType as OtpGenerateType;
    const isValid = this.otpService.validateOtp(this.otpControl.value || '', 6, type);
    this.lastResult = isValid ? '✅ OTP is valid!' : '❌ OTP is invalid!';
  }

  clearOtp() {
    this.demoOtp = '';
    this.otpControl.reset();
    this.generatedOtp.set('');
    this.lastResult = '';
  }
}
