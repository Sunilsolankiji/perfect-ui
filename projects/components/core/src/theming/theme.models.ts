/**
 * PerfectUI Theme Models
 *
 * Types and interfaces for the theming system
 */

/**
 * Available prebuilt themes
 */
export type PerfectUIPrebuiltTheme =
  | 'indigo-pink'
  | 'deep-purple-amber'
  | 'pink-blue-grey'
  | 'purple-green'
  | 'cyan-orange';

/**
 * Dark mode configuration
 */
export type PerfectUIDarkMode = 'light' | 'dark' | 'auto';

/**
 * Color shades for a palette color
 */
export interface PerfectUIColorShades {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  contrast: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
}

/**
 * A complete color palette
 */
export interface PerfectUIPalette {
  primary: PerfectUIColorShades;
  accent: PerfectUIColorShades;
  warn: PerfectUIColorShades;
  success: PerfectUIColorShades;
  info: PerfectUIColorShades;
}

/**
 * Typography configuration
 */
export interface PerfectUITypography {
  fontFamily: string;
  fontSize: string;
  fontWeightLight: number;
  fontWeightRegular: number;
  fontWeightMedium: number;
  fontWeightBold: number;
}

/**
 * Theme density (compact, default, comfortable)
 */
export type PerfectUIDensity = 'compact' | 'default' | 'comfortable';

/**
 * Complete theme configuration
 */
export interface PerfectUITheme {
  name: string;
  palette: PerfectUIPalette;
  typography?: Partial<PerfectUITypography>;
  density?: PerfectUIDensity;
  borderRadius?: string;
}

/**
 * Configuration options for providePerfectUI
 */
export interface PerfectUIConfig {
  /**
   * Prebuilt theme name or custom theme object
   */
  theme?: PerfectUIPrebuiltTheme | PerfectUITheme;

  /**
   * Dark mode setting
   * - 'light': Always use light mode
   * - 'dark': Always use dark mode
   * - 'auto': Follow system preference (default)
   */
  darkMode?: PerfectUIDarkMode;

  /**
   * Typography configuration
   */
  typography?: Partial<PerfectUITypography>;

  /**
   * Component density
   */
  density?: PerfectUIDensity;

  /**
   * Global border radius
   */
  borderRadius?: string;
}
