import { InjectionToken } from '@angular/core';
import type { PerfectUIConfig, PerfectUIDarkMode, PerfectUIDensity } from './theme.models';

/**
 * Injection token for PerfectUI configuration
 */
export const PERFECTUI_CONFIG = new InjectionToken<PerfectUIConfig>('PERFECTUI_CONFIG');

/**
 * Default configuration
 */
export const DEFAULT_PERFECTUI_CONFIG: PerfectUIConfig = {
  theme: 'indigo-pink',
  darkMode: 'auto',
  density: 'default',
  borderRadius: '8px',
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: '14px',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
};

/**
 * CSS variable prefix
 */
export const CSS_VAR_PREFIX = '--pui';

/**
 * Density scale factors
 */
export const DENSITY_SCALE: Record<PerfectUIDensity, number> = {
  compact: 0.875,
  default: 1,
  comfortable: 1.125,
};
