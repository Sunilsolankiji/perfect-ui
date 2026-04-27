/**
 * OTP input types
 */
export type OtpInputType = 'numeric' | 'alphanumeric' | 'alphabetic' | 'any';

/**
 * OTP component themes
 */
export type OtpTheme = 'default' | 'outline' | 'underline' | 'filled';

/**
 * OTP component sizes
 */
export type OtpSize = 'small' | 'medium' | 'large';

/**
 * OTP input status for styling
 */
export type OtpStatus = 'default' | 'success' | 'error';

/**
 * Event emitted when OTP is completed
 */
export interface OtpCompleteEvent {
  /** The complete OTP value */
  value: string;
  /** Whether the OTP is valid (meets length requirement) */
  isValid: boolean;
}

/**
 * Event emitted when OTP value changes
 */
export interface OtpChangeEvent {
  /** The current OTP value (may be partial) */
  value: string;
  /** Whether the OTP is complete */
  isComplete: boolean;
  /** The index of the input that changed */
  inputIndex: number;
}

/**
 * Configuration for individual OTP input styling
 */
export interface OtpInputStyle {
  /** Width of each input */
  width?: string;
  /** Height of each input */
  height?: string;
  /** Font size */
  fontSize?: string;
  /** Border radius */
  borderRadius?: string;
  /** Border color */
  borderColor?: string;
  /** Background color */
  backgroundColor?: string;
  /** Text color */
  textColor?: string;
  /** Focus border color */
  focusBorderColor?: string;
  /** Gap between inputs */
  gap?: string;
}
