import { Injectable, inject } from '@angular/core';
import { OtpConfig, OTP_CONFIG, DEFAULT_OTP_CONFIG } from './otp.config';

/**
 * Service for programmatic OTP operations and configuration.
 *
 * Not provided in `root` — register it via `provideOtp()` in your
 * `app.config.ts` (or the providers of a lazy route) before injecting.
 */
@Injectable()
export class PuiOtpService {
  private readonly userConfig = inject(OTP_CONFIG, { optional: true });
  private config: Required<Omit<OtpConfig, 'inputStyle'>> & Pick<OtpConfig, 'inputStyle'>;

  constructor() {
    this.config = { ...DEFAULT_OTP_CONFIG, ...this.userConfig };
  }

  /**
   * Get the current global configuration
   */
  getConfig(): OtpConfig {
    return { ...this.config };
  }

  /**
   * Update global configuration at runtime
   */
  updateConfig(config: Partial<OtpConfig>): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * Generate a random OTP of specified length and type
   * Useful for testing or generating server-side OTPs
   */
  generateOtp(length?: number, type: 'numeric' | 'alphanumeric' | 'alphabetic' = 'numeric'): string {
    const len = length ?? this.config.length;
    let chars: string;

    switch (type) {
      case 'numeric':
        chars = '0123456789';
        break;
      case 'alphabetic':
        chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        break;
      case 'alphanumeric':
        chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        break;
      default:
        chars = '0123456789';
    }

    let result = '';
    for (let i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Validate an OTP string against the configured type and length
   */
  validateOtp(otp: string, length?: number, type?: 'numeric' | 'alphanumeric' | 'alphabetic'): boolean {
    const expectedLength = length ?? this.config.length;
    const inputType = type ?? this.config.inputType;

    if (otp.length !== expectedLength) {
      return false;
    }

    let pattern: RegExp;
    switch (inputType) {
      case 'numeric':
        pattern = /^[0-9]+$/;
        break;
      case 'alphabetic':
        pattern = /^[a-zA-Z]+$/;
        break;
      case 'alphanumeric':
        pattern = /^[a-zA-Z0-9]+$/;
        break;
      default:
        return true;
    }

    return pattern.test(otp);
  }

  /**
   * Format an OTP string with separators
   * Useful for display purposes
   */
  formatOtp(otp: string, separatorAfter: number = 3, separator: string = '-'): string {
    if (separatorAfter <= 0) return otp;

    const parts: string[] = [];
    for (let i = 0; i < otp.length; i += separatorAfter) {
      parts.push(otp.slice(i, i + separatorAfter));
    }
    return parts.join(separator);
  }

  /**
   * Parse a formatted OTP string to get the raw value
   */
  parseOtp(formattedOtp: string): string {
    return formattedOtp.replace(/[^a-zA-Z0-9]/g, '');
  }
}
