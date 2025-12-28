import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from '@perfectui/toastr';
import { DialogService } from '@perfectui/dialog';

interface ColorConfig {
  name: string;
  label: string;
  value: string;
  default: string;
}

interface ThemeSection {
  title: string;
  colors: ColorConfig[];
}

@Component({
  selector: 'app-theme-config',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './theme-config.html',
  styleUrl: './theme-config.css'
})
export class ThemeConfigComponent implements OnInit {
  private toastr = inject(ToastrService);
  private dialog = inject(DialogService);

  sections = signal<ThemeSection[]>([
    {
      title: 'Success Colors',
      colors: [
        { name: '--pui-success-50', label: 'Light', value: '#ecfdf5', default: '#ecfdf5' },
        { name: '--pui-success-500', label: 'Main', value: '#10b981', default: '#10b981' },
        { name: '--pui-success-600', label: 'Dark', value: '#059669', default: '#059669' },
        { name: '--pui-success-800', label: 'Darker', value: '#065f46', default: '#065f46' },
      ]
    },
    {
      title: 'Error Colors',
      colors: [
        { name: '--pui-error-50', label: 'Light', value: '#fef2f2', default: '#fef2f2' },
        { name: '--pui-error-500', label: 'Main', value: '#ef4444', default: '#ef4444' },
        { name: '--pui-error-600', label: 'Dark', value: '#dc2626', default: '#dc2626' },
        { name: '--pui-error-800', label: 'Darker', value: '#991b1b', default: '#991b1b' },
      ]
    },
    {
      title: 'Warning Colors',
      colors: [
        { name: '--pui-warning-50', label: 'Light', value: '#fffbeb', default: '#fffbeb' },
        { name: '--pui-warning-500', label: 'Main', value: '#f59e0b', default: '#f59e0b' },
        { name: '--pui-warning-600', label: 'Dark', value: '#d97706', default: '#d97706' },
        { name: '--pui-warning-800', label: 'Darker', value: '#92400e', default: '#92400e' },
      ]
    },
    {
      title: 'Info Colors',
      colors: [
        { name: '--pui-info-50', label: 'Light', value: '#eff6ff', default: '#eff6ff' },
        { name: '--pui-info-500', label: 'Main', value: '#3b82f6', default: '#3b82f6' },
        { name: '--pui-info-600', label: 'Dark', value: '#2563eb', default: '#2563eb' },
        { name: '--pui-info-800', label: 'Darker', value: '#1e40af', default: '#1e40af' },
      ]
    },
    {
      title: 'Neutral Colors',
      colors: [
        { name: '--pui-neutral-50', label: '50', value: '#f9fafb', default: '#f9fafb' },
        { name: '--pui-neutral-100', label: '100', value: '#f3f4f6', default: '#f3f4f6' },
        { name: '--pui-neutral-200', label: '200', value: '#e5e7eb', default: '#e5e7eb' },
        { name: '--pui-neutral-700', label: '700', value: '#374151', default: '#374151' },
        { name: '--pui-neutral-800', label: '800', value: '#1f2937', default: '#1f2937' },
        { name: '--pui-neutral-900', label: '900', value: '#111827', default: '#111827' },
      ]
    },
    {
      title: 'Common Colors',
      colors: [
        { name: '--pui-white', label: 'White', value: '#ffffff', default: '#ffffff' },
        { name: '--pui-black', label: 'Black', value: '#000000', default: '#000000' },
        { name: '--pui-slate-800', label: 'Slate 800', value: '#1e293b', default: '#1e293b' },
      ]
    },
    {
      title: 'Toast - Layout',
      colors: [
        { name: '--pui-toast-radius', label: 'Border Radius', value: '8px', default: '8px' },
        { name: '--pui-toast-padding', label: 'Padding', value: '14px 16px', default: '14px 16px' },
        { name: '--pui-toast-gap', label: 'Icon Gap', value: '12px', default: '12px' },
        { name: '--pui-toast-min-width', label: 'Min Width', value: '300px', default: '300px' },
        { name: '--pui-toast-max-width', label: 'Max Width', value: '400px', default: '400px' },
      ]
    },
    {
      title: 'Toast - Effects',
      colors: [
        { name: '--pui-toast-shadow', label: 'Shadow', value: '0 4px 12px rgba(0,0,0,0.15)', default: '0 4px 12px rgba(0,0,0,0.15)' },
        { name: '--pui-toast-shadow-hover', label: 'Hover Shadow', value: '0 6px 16px rgba(0,0,0,0.2)', default: '0 6px 16px rgba(0,0,0,0.2)' },
        { name: '--pui-toast-animation-duration', label: 'Animation', value: '0.3s', default: '0.3s' },
      ]
    },
    {
      title: 'Dialog - Layout',
      colors: [
        { name: '--pui-dialog-radius', label: 'Border Radius', value: '12px', default: '12px' },
        { name: '--pui-dialog-bg', label: 'Background', value: '#ffffff', default: '#ffffff' },
        { name: '--pui-dialog-border', label: 'Border', value: '#e5e7eb', default: '#e5e7eb' },
        { name: '--pui-dialog-shadow', label: 'Shadow', value: '0 25px 50px -12px rgba(0,0,0,0.25)', default: '0 25px 50px -12px rgba(0,0,0,0.25)' },
      ]
    },
    {
      title: 'Dialog - Text',
      colors: [
        { name: '--pui-dialog-title-color', label: 'Title', value: '#111827', default: '#111827' },
        { name: '--pui-dialog-text-color', label: 'Text', value: '#374151', default: '#374151' },
        { name: '--pui-dialog-close-color', label: 'Close Icon', value: '#6b7280', default: '#6b7280' },
      ]
    },
    {
      title: 'Dialog - Input',
      colors: [
        { name: '--pui-dialog-input-bg', label: 'Background', value: '#ffffff', default: '#ffffff' },
        { name: '--pui-dialog-input-border', label: 'Border', value: '#d1d5db', default: '#d1d5db' },
        { name: '--pui-dialog-input-color', label: 'Text', value: '#111827', default: '#111827' },
        { name: '--pui-dialog-input-focus-border', label: 'Focus Border', value: '#3b82f6', default: '#3b82f6' },
      ]
    },
    {
      title: 'Dialog - Buttons',
      colors: [
        { name: '--pui-dialog-btn-primary-bg', label: 'Primary BG', value: '#3b82f6', default: '#3b82f6' },
        { name: '--pui-dialog-btn-primary-hover-bg', label: 'Primary Hover', value: '#2563eb', default: '#2563eb' },
        { name: '--pui-dialog-btn-secondary-bg', label: 'Secondary BG', value: '#f3f4f6', default: '#f3f4f6' },
        { name: '--pui-dialog-btn-secondary-color', label: 'Secondary Text', value: '#374151', default: '#374151' },
        { name: '--pui-dialog-btn-danger-bg', label: 'Danger BG', value: '#ef4444', default: '#ef4444' },
        { name: '--pui-dialog-btn-success-bg', label: 'Success BG', value: '#22c55e', default: '#22c55e' },
      ]
    },
  ]);

  copied = signal(false);

  ngOnInit() {
    // Apply current values on load
    this.applyPreview();
  }

  generatedCSS = computed(() => {
    const allSections = this.sections();
    const changedVars: string[] = [];

    for (const section of allSections) {
      for (const color of section.colors) {
        if (color.value !== color.default) {
          changedVars.push(`  ${color.name}: ${color.value};`);
        }
      }
    }

    if (changedVars.length === 0) {
      return `/* No changes from default theme */
:root {
  /* Add your customizations here */
}`;
    }

    return `:root {
${changedVars.join('\n')}
}`;
  });

  fullCSS = computed(() => {
    const allSections = this.sections();
    const allVars: string[] = [];

    for (const section of allSections) {
      allVars.push(`  /* ${section.title} */`);
      for (const color of section.colors) {
        allVars.push(`  ${color.name}: ${color.value};`);
      }
      allVars.push('');
    }

    return `:root {
${allVars.join('\n')}}`;
  });

  updateColor(sectionIndex: number, colorIndex: number, value: string) {
    const current = this.sections();
    current[sectionIndex].colors[colorIndex].value = value;
    this.sections.set([...current]);
    this.applyPreview();
  }

  resetAll() {
    const current = this.sections();
    for (const section of current) {
      for (const color of section.colors) {
        color.value = color.default;
      }
    }
    this.sections.set([...current]);
    this.applyPreview();
  }

  resetSection(sectionIndex: number) {
    const current = this.sections();
    for (const color of current[sectionIndex].colors) {
      color.value = color.default;
    }
    this.sections.set([...current]);
    this.applyPreview();
  }

  applyPreview() {
    const allSections = this.sections();
    for (const section of allSections) {
      for (const color of section.colors) {
        document.documentElement.style.setProperty(color.name, color.value);
      }
    }
  }

  async copyCSS(full: boolean = false) {
    const css = full ? this.fullCSS() : this.generatedCSS();
    await navigator.clipboard.writeText(css);
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }

  isColor(value: string): boolean {
    return value.startsWith('#') || value.startsWith('rgb');
  }

  // Preview methods
  previewSuccess() {
    this.toastr.success('Theme applied successfully!', 'Success');
  }

  previewError() {
    this.toastr.error('This is an error message', 'Error');
  }

  previewWarning() {
    this.toastr.warning('This is a warning message', 'Warning');
  }

  previewInfo() {
    this.toastr.info('This is an info message', 'Info');
  }

  async previewDialog() {
    await this.dialog.confirm(
      'This dialog uses your custom theme colors!',
      'Theme Preview'
    );
  }

  async previewAlert() {
    await this.dialog.alert(
      'Your theme changes are applied in real-time.',
      'Theme Applied'
    );
  }
}

