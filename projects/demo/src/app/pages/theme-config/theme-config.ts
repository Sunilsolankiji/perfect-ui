import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PuiThemeService } from '@sunilsolankiji/perfectui/core';
import type { PerfectUIDensity } from '@sunilsolankiji/perfectui/core';
import { PuiToastrService } from '@sunilsolankiji/perfectui/toastr';
import { PuiDialogService } from '@sunilsolankiji/perfectui/dialog';

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
  private themeService = inject(PuiThemeService);
  private toastr = inject(PuiToastrService);
  private dialog = inject(PuiDialogService);

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

