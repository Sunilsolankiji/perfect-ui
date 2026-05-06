import { Component, inject, OnInit, effect, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { VERSION } from '@sunilsolankiji/perfectui';
import { PuiThemeService } from '@sunilsolankiji/perfectui/core';

interface NavItem {
  path: string;
  label: string;
}

interface ExternalLink {
  url: string;
  label: string;
  icon: 'github' | 'npm';
}

interface ThemeOption {
  id: string;
  name: string;
  primaryColor: string;
  accentColor: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private themeService = inject(PuiThemeService);

  coreVersion = VERSION;
  coreNpmUrl = 'https://www.npmjs.com/package/@sunilsolankiji/perfectui';

  // Mobile sidebar drawer state
  sidebarOpen = signal(false);

  // Theme state - synced with ThemeService
  currentThemeId = 'deep-purple-amber';
  isDarkMode = this.themeService.isDarkMode;

  // Available themes
  themes: ThemeOption[] = [
    { id: 'indigo-pink', name: 'Indigo & Pink', primaryColor: '#3f51b5', accentColor: '#e91e63' },
    { id: 'deep-purple-amber', name: 'Deep Purple & Amber', primaryColor: '#673ab7', accentColor: '#ffc107' },
    { id: 'pink-blue-grey', name: 'Pink & Blue Grey', primaryColor: '#e91e63', accentColor: '#607d8b' },
    { id: 'purple-green', name: 'Purple & Green', primaryColor: '#9c27b0', accentColor: '#4caf50' },
    { id: 'cyan-orange', name: 'Cyan & Orange', primaryColor: '#00bcd4', accentColor: '#ff9800' },
  ];

  navItems: NavItem[] = [
    { path: '/toastr', label: 'Toastr' },
    { path: '/dialog', label: 'Dialog' },
    { path: '/otp', label: 'OTP' },
    { path: '/select', label: 'Select' },
    { path: '/tabs', label: 'Tabs' },
    { path: '/theme', label: 'Theme' },
  ];

  externalLinks: ExternalLink[] = [
    { url: 'https://github.com/sunilsolankiji/perfect-ui', label: 'GitHub', icon: 'github' },
  ];

  constructor() {
    // Sync dropdown with ThemeService's current theme
    effect(() => {
      const theme = this.themeService.currentTheme();
      if (theme) {
        this.currentThemeId = theme.name;
      }
    });
  }

  ngOnInit(): void {
    // Initialize dropdown state from ThemeService
    const currentTheme = this.themeService.currentTheme();
    if (currentTheme) {
      this.currentThemeId = currentTheme.name;
    }
  }

  onThemeChange(themeId: string): void {
    this.currentThemeId = themeId;
    this.themeService.setTheme(themeId);
  }

  toggleDarkMode(): void {
    this.themeService.toggleDarkMode();
  }

  toggleSidebar(): void {
    this.sidebarOpen.update(v => !v);
  }

  closeSidebar(): void {
    if (this.sidebarOpen()) {
      this.sidebarOpen.set(false);
    }
  }

  getCurrentTheme(): ThemeOption {
    return this.themes.find(t => t.id === this.currentThemeId) || this.themes[0];
  }
}
