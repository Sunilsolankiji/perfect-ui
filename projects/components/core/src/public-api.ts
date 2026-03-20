/**
 * @sunilsolankiji/perfectui/core
 *
 * Core theming utilities and providers for PerfectUI
 *
 * @example
 * ```typescript
 * import { providePerfectUI } from '@sunilsolankiji/perfectui/core';
 *
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     providePerfectUI({
 *       theme: 'indigo-pink',
 *       darkMode: 'auto'
 *     })
 *   ]
 * };
 * ```
 */

// Theme types
export type {
  PerfectUITheme,
  PerfectUIConfig,
  PerfectUIPalette,
  PerfectUIColorShades,
  PerfectUIDarkMode,
  PerfectUIDensity,
} from './theming/theme.models';

// Configuration
export { PERFECTUI_CONFIG, DEFAULT_PERFECTUI_CONFIG } from './theming/theme.config';

// Provider
export { providePerfectUI } from './theming/theme.provider';

// Service
export { ThemeService } from './theming/theme.service';

// Prebuilt themes
export {
  INDIGO_PINK_THEME,
  DEEP_PURPLE_AMBER_THEME,
  PINK_BLUE_GREY_THEME,
  PURPLE_GREEN_THEME,
  CYAN_ORANGE_THEME,
} from './theming/prebuilt-themes';
