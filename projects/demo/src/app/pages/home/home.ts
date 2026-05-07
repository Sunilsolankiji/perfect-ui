import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { VERSION } from '@sunilsolankiji/perfectui';
import { PuiThemeService } from '@sunilsolankiji/perfectui/core';

interface FeatureCard {
  icon: string;
  title: string;
  description: string;
}

interface ComponentCard {
  path: string;
  name: string;
  description: string;
  emoji: string;
  status: 'stable' | 'new';
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {
  private readonly themeService = inject(PuiThemeService);

  readonly version = VERSION;
  readonly npmUrl = 'https://www.npmjs.com/package/@sunilsolankiji/perfectui';
  readonly githubUrl = 'https://github.com/sunilsolankiji/perfect-ui';
  readonly isDarkMode = this.themeService.isDarkMode;

  readonly installSnippet = 'npm install @sunilsolankiji/perfectui';
  readonly importSnippet = `import { provideToastr } from '@sunilsolankiji/perfectui/toastr';
import { providePerfectUI } from '@sunilsolankiji/perfectui/core';

export const appConfig: ApplicationConfig = {
  providers: [
    providePerfectUI({ theme: 'deep-purple-amber', darkMode: 'auto' }),
    provideToastr(),
  ],
};`;

  readonly features: FeatureCard[] = [
    {
      icon: '⚡',
      title: 'Standalone & Signal-based',
      description:
        'Built for Angular 21+ with standalone components, OnPush, and modern signal APIs (input/model/output).',
    },
    {
      icon: '🌳',
      title: 'Tree-shakable',
      description:
        'Each component ships as its own secondary entry point — import only what you use, pay only for what you ship.',
    },
    {
      icon: '🎨',
      title: 'Themeable by design',
      description:
        'CSS custom properties + prebuilt themes, dark mode, and density tokens via providePerfectUI().',
    },
    {
      icon: '♿',
      title: 'Accessible',
      description:
        'ARIA roles, keyboard navigation, and focus management baked into every component.',
    },
    {
      icon: '🧩',
      title: 'Imperative & declarative',
      description:
        'Open dialogs and toasts from code with services, or drop components straight into templates.',
    },
    {
      icon: '🛠️',
      title: 'Strict & typed',
      description:
        'Full strict-mode TypeScript with strictTemplates — types and signals all the way down.',
    },
  ];

  readonly components: ComponentCard[] = [
    { path: '/toastr', name: 'Toastr', description: 'Stackable toast notifications with imperative API.', emoji: '🔔', status: 'stable' },
    { path: '/dialog', name: 'Dialog', description: 'Accessible modal dialogs with focus trap.', emoji: '🪟', status: 'stable' },
    { path: '/otp', name: 'OTP Input', description: 'One-time-code input with paste & autofill support.', emoji: '🔐', status: 'stable' },
    { path: '/select', name: 'Select', description: 'Customizable dropdown with keyboard navigation.', emoji: '🎯', status: 'stable' },
    { path: '/tabs', name: 'Tabs', description: 'Animated, accessible tab panels.', emoji: '📑', status: 'new' },
    { path: '/theme', name: 'Theming', description: 'Live theme & dark-mode configuration playground.', emoji: '🎨', status: 'stable' },
  ];

  copyInstall(): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(this.installSnippet).catch(() => {});
    }
  }
}

