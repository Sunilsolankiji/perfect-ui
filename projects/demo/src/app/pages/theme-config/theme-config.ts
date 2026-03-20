import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ThemeService,
  INDIGO_PINK_THEME,
  DEEP_PURPLE_AMBER_THEME,
  PINK_BLUE_GREY_THEME,
  PURPLE_GREEN_THEME,
  CYAN_ORANGE_THEME,
} from '@sunilsolankiji/perfectui/core';
import type { PerfectUITheme, PerfectUIDensity } from '@sunilsolankiji/perfectui/core';
import { ToastrService } from '@sunilsolankiji/perfectui/toastr';
import { DialogService } from '@sunilsolankiji/perfectui/dialog';

interface ThemeOption {
  id: string;
  name: string;
  theme: PerfectUITheme;
  primaryColor: string;
  accentColor: string;
}

interface DensityOption {
  id: PerfectUIDensity;
  name: string;
  description: string;
}

@Component({
  selector: 'app-theme-config',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './theme-config.html',
  styleUrl: './theme-config.css'
})
export class ThemeConfigComponent {
  private themeService = inject(ThemeService);
  private toastr = inject(ToastrService);
  private dialog = inject(DialogService);

  /** Available prebuilt themes */
  readonly themes: ThemeOption[] = [
    {
      id: 'indigo-pink',
      name: 'Indigo & Pink',
      theme: INDIGO_PINK_THEME,
      primaryColor: '#3f51b5',
      accentColor: '#e91e63',
    },
    {
      id: 'deep-purple-amber',
      name: 'Deep Purple & Amber',
      theme: DEEP_PURPLE_AMBER_THEME,
      primaryColor: '#673ab7',
      accentColor: '#ffc107',
    },
    {
      id: 'pink-blue-grey',
      name: 'Pink & Blue Grey',
      theme: PINK_BLUE_GREY_THEME,
      primaryColor: '#e91e63',
      accentColor: '#607d8b',
    },
    {
      id: 'purple-green',
      name: 'Purple & Green',
      theme: PURPLE_GREEN_THEME,
      primaryColor: '#9c27b0',
      accentColor: '#4caf50',
    },
    {
      id: 'cyan-orange',
      name: 'Cyan & Orange',
      theme: CYAN_ORANGE_THEME,
      primaryColor: '#00bcd4',
      accentColor: '#ff9800',
    },
  ];

  /** Available density options */
  readonly densities: DensityOption[] = [
    { id: 'default', name: 'Default', description: 'Standard spacing and sizing' },
    { id: 'comfortable', name: 'Comfortable', description: 'More spacious layout' },
    { id: 'compact', name: 'Compact', description: 'Reduced spacing for dense UIs' },
  ];

  /** Current theme from service */
  readonly currentTheme = this.themeService.currentTheme;

  /** Current dark mode state */
  readonly isDarkMode = this.themeService.isDarkMode;

  /** Current density */
  readonly currentDensity = this.themeService.density;

  /** Find the current theme ID */
  readonly currentThemeId = computed(() => {
    const theme = this.currentTheme();
    if (!theme) return 'indigo-pink';
    const found = this.themes.find(t => t.theme.name === theme.name);
    return found?.id ?? 'indigo-pink';
  });

  /**
   * Change the active theme
   */
  setTheme(themeId: string): void {
    const option = this.themes.find(t => t.id === themeId);
    if (option) {
      this.themeService.setTheme(option.theme);
      this.toastr.success(`Theme changed to ${option.name}`, 'Theme Updated');
    }
  }

  /**
   * Toggle dark mode
   */
  toggleDarkMode(): void {
    this.themeService.toggleDarkMode();
    const mode = this.isDarkMode() ? 'Dark' : 'Light';
    this.toastr.info(`Switched to ${mode} mode`, 'Mode Changed');
  }

  /**
   * Set the dark mode explicitly
   */
  setDarkMode(enabled: boolean): void {
    this.themeService.setDarkMode(enabled ? 'dark' : 'light');
  }

  /**
   * Change density
   */
  setDensity(density: PerfectUIDensity): void {
    this.themeService.setDensity(density);
    const option = this.densities.find(d => d.id === density);
    this.toastr.info(`Density set to ${option?.name}`, 'Density Changed');
  }

  // Preview methods
  previewSuccess(): void {
    this.toastr.success('Theme applied successfully!', 'Success');
  }

  previewError(): void {
    this.toastr.error('This is an error message', 'Error');
  }

  previewWarning(): void {
    this.toastr.warning('This is a warning message', 'Warning');
  }

  previewInfo(): void {
    this.toastr.info('This is an info message', 'Info');
  }

  async previewDialog(): Promise<void> {
    await this.dialog.confirm(
      'This dialog uses your custom theme colors!',
      'Theme Preview'
    );
  }

  async previewAlert(): Promise<void> {
    await this.dialog.alert(
      'Your theme changes are applied in real-time.',
      'Theme Applied'
    );
  }
}

