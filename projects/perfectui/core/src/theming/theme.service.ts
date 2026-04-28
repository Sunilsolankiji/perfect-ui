import { Injectable, inject, signal, effect, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PERFECTUI_CONFIG, DEFAULT_PERFECTUI_CONFIG, CSS_VAR_PREFIX, DENSITY_SCALE } from './theme.config';
import { PREBUILT_THEMES } from './prebuilt-themes';
import type {
  PerfectUITheme,
  PerfectUIDarkMode,
  PerfectUIColorShades,
  PerfectUIDensity,
} from './theme.models';

const STORAGE_KEY = 'pui-theme-preferences';

interface ThemePreferences {
  themeName: string;
  darkMode: 'light' | 'dark' | 'auto';
  density: PerfectUIDensity;
}

@Injectable()
export class PuiThemeService {
  private config = inject(PERFECTUI_CONFIG, { optional: true }) ?? DEFAULT_PERFECTUI_CONFIG;
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  /** Current theme */
  readonly currentTheme = signal<PerfectUITheme | null>(null);

  /** Current dark mode state */
  readonly isDarkMode = signal<boolean>(false);

  /** Current density */
  readonly density = signal<PerfectUIDensity>('default');

  /** Current dark mode setting (for persistence) */
  private darkModeSetting: 'light' | 'dark' | 'auto' = 'auto';

  private mediaQuery: MediaQueryList | null = null;

  constructor() {
    this.initialize();

    // React to dark mode changes
    effect(() => {
      if (this.isBrowser) {
        this.applyDarkMode(this.isDarkMode());
        this.savePreferences();
      }
    });

    // React to theme changes
    effect(() => {
      const theme = this.currentTheme();
      if (theme && this.isBrowser) {
        this.applyTheme(theme);
        this.savePreferences();
      }
    });

    // React to density changes
    effect(() => {
      if (this.isBrowser) {
        this.applyDensity(this.density());
        this.savePreferences();
      }
    });
  }

  private initialize(): void {
    // Try to load saved preferences first
    const saved = this.loadPreferences();

    if (saved) {
      // Restore saved theme
      const theme = PREBUILT_THEMES[saved.themeName] ?? PREBUILT_THEMES['indigo-pink'];
      this.currentTheme.set(theme);

      // Restore saved density
      this.density.set(saved.density);

      // Restore saved dark mode
      this.darkModeSetting = saved.darkMode;
      if (this.isBrowser) {
        this.initializeDarkMode(saved.darkMode);
      }
    } else {
      // Use config defaults
      const themeConfig = this.config.theme ?? 'indigo-pink';
      const theme = typeof themeConfig === 'string'
        ? PREBUILT_THEMES[themeConfig] ?? PREBUILT_THEMES['indigo-pink']
        : themeConfig;
      this.currentTheme.set(theme);

      // Set initial density
      this.density.set(this.config.density ?? 'default');

      // Set initial dark mode
      this.darkModeSetting = this.config.darkMode ?? 'auto';
      if (this.isBrowser) {
        this.initializeDarkMode(this.config.darkMode ?? 'auto');
      }
    }
  }

  private loadPreferences(): ThemePreferences | null {
    if (!this.isBrowser) return null;

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load theme preferences', e);
    }
    return null;
  }

  private savePreferences(): void {
    if (!this.isBrowser) return;

    const theme = this.currentTheme();
    if (!theme) return;

    try {
      const prefs: ThemePreferences = {
        themeName: theme.name,
        darkMode: this.darkModeSetting,
        density: this.density()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch (e) {
      console.warn('Failed to save theme preferences', e);
    }
  }

  private initializeDarkMode(mode: PerfectUIDarkMode): void {
    if (mode === 'auto') {
      this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      this.isDarkMode.set(this.mediaQuery.matches);

      // Listen for system preference changes
      this.mediaQuery.addEventListener('change', (e) => {
        if (this.darkModeSetting === 'auto') {
          this.isDarkMode.set(e.matches);
        }
      });
    } else {
      this.isDarkMode.set(mode === 'dark');
    }
  }

  /**
   * Set the current theme
   */
  setTheme(theme: string | PerfectUITheme): void {
    const resolvedTheme = typeof theme === 'string'
      ? PREBUILT_THEMES[theme]
      : theme;

    if (resolvedTheme) {
      this.currentTheme.set(resolvedTheme);
    }
  }

  /**
   * Get available theme names
   */
  getAvailableThemes(): string[] {
    return Object.keys(PREBUILT_THEMES);
  }

  /**
   * Set dark mode
   */
  setDarkMode(mode: PerfectUIDarkMode): void {
    this.darkModeSetting = mode;
    if (mode === 'auto' && this.isBrowser) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.isDarkMode.set(prefersDark);
    } else {
      this.isDarkMode.set(mode === 'dark');
    }
  }

  /**
   * Toggle dark mode
   */
  toggleDarkMode(): void {
    const newDark = !this.isDarkMode();
    this.darkModeSetting = newDark ? 'dark' : 'light';
    this.isDarkMode.set(newDark);
  }

  /**
   * Set density
   */
  setDensity(density: PerfectUIDensity): void {
    this.density.set(density);
  }

  private applyTheme(theme: PerfectUITheme): void {
    const root = document.documentElement;

    // Apply palette colors
    this.applyPalette(root, 'primary', theme.palette.primary);
    this.applyPalette(root, 'accent', theme.palette.accent);
    this.applyPalette(root, 'warn', theme.palette.warn);
    this.applyPalette(root, 'success', theme.palette.success);
    this.applyPalette(root, 'info', theme.palette.info);

    // Apply typography
    if (theme.typography || this.config.typography) {
      const typography = { ...DEFAULT_PERFECTUI_CONFIG.typography, ...theme.typography, ...this.config.typography };
      root.style.setProperty(`${CSS_VAR_PREFIX}-font-family`, typography.fontFamily!);
      root.style.setProperty(`${CSS_VAR_PREFIX}-font-size`, typography.fontSize!);
      root.style.setProperty(`${CSS_VAR_PREFIX}-font-weight-light`, String(typography.fontWeightLight));
      root.style.setProperty(`${CSS_VAR_PREFIX}-font-weight-regular`, String(typography.fontWeightRegular));
      root.style.setProperty(`${CSS_VAR_PREFIX}-font-weight-medium`, String(typography.fontWeightMedium));
      root.style.setProperty(`${CSS_VAR_PREFIX}-font-weight-bold`, String(typography.fontWeightBold));
    }

    // Apply border radius
    const borderRadius = theme.borderRadius ?? this.config.borderRadius ?? '8px';
    root.style.setProperty(`${CSS_VAR_PREFIX}-border-radius`, borderRadius);
  }

  private applyPalette(root: HTMLElement, name: string, shades: PerfectUIColorShades): void {
    const shadeKeys = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] as const;

    for (const shade of shadeKeys) {
      root.style.setProperty(`${CSS_VAR_PREFIX}-${name}-${shade}`, shades[shade]);
      root.style.setProperty(`${CSS_VAR_PREFIX}-${name}-contrast-${shade}`, shades.contrast[shade]);
    }

    // Set default (500) as the main color
    root.style.setProperty(`${CSS_VAR_PREFIX}-${name}`, shades[500]);
    root.style.setProperty(`${CSS_VAR_PREFIX}-${name}-contrast`, shades.contrast[500]);
  }

  private applyDarkMode(isDark: boolean): void {
    const root = document.documentElement;

    if (isDark) {
      root.classList.add('pui-dark');
      root.style.setProperty(`${CSS_VAR_PREFIX}-is-dark`, '1');
    } else {
      root.classList.remove('pui-dark');
      root.style.setProperty(`${CSS_VAR_PREFIX}-is-dark`, '0');
    }
  }

  private applyDensity(density: PerfectUIDensity): void {
    const root = document.documentElement;
    const scale = DENSITY_SCALE[density];

    root.style.setProperty(`${CSS_VAR_PREFIX}-density-scale`, String(scale));
    root.setAttribute('data-pui-density', density);
  }
}
