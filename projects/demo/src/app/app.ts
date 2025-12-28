import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  path: string;
  label: string;
  icon: string;
  version: string;
  npmUrl: string;
}

interface ExternalLink {
  url: string;
  label: string;
  icon: 'github' | 'npm';
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  coreVersion = '1.1.0';
  coreNpmUrl = 'https://www.npmjs.com/package/@perfectui/core';

  navItems: NavItem[] = [
    { path: '/toastr', label: 'Toastr', icon: '🔔', version: '1.3.0', npmUrl: 'https://www.npmjs.com/package/@perfectui/toastr' },
    { path: '/dialog', label: 'Dialog', icon: '💬', version: '1.1.0', npmUrl: 'https://www.npmjs.com/package/@perfectui/dialog' },
    { path: '/theme', label: 'Theme', icon: '🎨', version: '', npmUrl: '' },
  ];

  externalLinks: ExternalLink[] = [
    { url: 'https://github.com/sunilsolankiji/perfect-ui', label: 'GitHub', icon: 'github' },
  ];
}
