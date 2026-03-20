import { InjectionToken } from '@angular/core';
import { OtpInputType, OtpTheme, OtpSize, OtpStatus, OtpInputStyle } from './otp.models';

/**
 * Global configuration for the OTP component
 */
export interface OtpConfig {
  /** Number of OTP input fields (default: 6) */
  length?: number;
  /** Type of input allowed (default: 'numeric') */
  inputType?: OtpInputType;
  /** Visual theme (default: 'default') */
  theme?: OtpTheme;
  /** Size variant (default: 'medium') */
  size?: OtpSize;
  /** Whether to mask input characters (default: false) */
  masked?: boolean;
  /** Mask character to display when masked is true (default: '•') */
  maskChar?: string;
  /** Whether to auto-focus the first input on init (default: true) */
  autoFocus?: boolean;
  /** Whether to auto-submit when all inputs are filled (default: false) */
  autoSubmit?: boolean;
  /** Placeholder character for empty inputs (default: '') */
  placeholder?: string;
  /** Whether inputs are disabled (default: false) */
  disabled?: boolean;
  /** Whether inputs are readonly (default: false) */
  readonly?: boolean;
  /** Status for styling (default: 'default') */
  status?: OtpStatus;
  /** Whether to allow paste (default: true) */
  allowPaste?: boolean;
  /** ARIA label for accessibility */
  ariaLabel?: string;
  /** Custom styles for inputs */
  inputStyle?: OtpInputStyle;
  /** Separator to show between groups of inputs (e.g., after every 3 digits) */
  separatorAfter?: number;
  /** Separator character (default: '-') */
  separatorChar?: string;
}

/**
 * Default configuration values
 */
export const DEFAULT_OTP_CONFIG: Required<Omit<OtpConfig, 'inputStyle'>> & Pick<OtpConfig, 'inputStyle'> = {
  length: 6,
  inputType: 'numeric',
  theme: 'default',
  size: 'medium',
  masked: false,
  maskChar: '•',
  autoFocus: true,
  autoSubmit: false,
  placeholder: '',
  disabled: false,
  readonly: false,
  status: 'default',
  allowPaste: true,
  ariaLabel: 'One-time password input',
  inputStyle: undefined,
  separatorAfter: 0,
  separatorChar: '-',
};

/**
 * Injection token for OTP configuration
 */
export const OTP_CONFIG = new InjectionToken<OtpConfig>('OTP_CONFIG');
