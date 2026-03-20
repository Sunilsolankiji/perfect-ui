# Changelog

All notable changes to this project will be documented in this file.

## [2.0.0](https://github.com/sunilsolankiji/perfect-ui/compare/v1.0.0...v2.0.0) (2026-03-20)

### ⚠ BREAKING CHANGES

* package renamed from `@perfectui/*` to `@sunilsolankiji/perfectui` with secondary entry points
* import paths changed: `@perfectui/dialog` → `@sunilsolankiji/perfectui/dialog`
* theme configuration now uses `providePerfectUI()` from core entry point

### Features

* new unified package structure with secondary entry points for tree-shaking
* import directly from `@sunilsolankiji/perfectui/dialog`, `@sunilsolankiji/perfectui/toastr`, `@sunilsolankiji/perfectui/otp`
* full Angular 21 support
* **core:** add angular material-style theming system
* add core entry point with ThemeService and providePerfectUI()
* implement 5 prebuilt themes (indigo-pink, deep-purple-amber, pink-blue-grey, purple-green, cyan-orange)
* add dark mode support with system preference detection (light/dark/auto)
* add density options (compact/default/comfortable)
* add prebuilt CSS theme files for static imports
* add SCSS theming API with mixins and functions

### Demo

* update demo with theme switcher UI

### Code Refactoring

* restructured library to follow Angular Material patterns
* improved tree-shaking with secondary entry points
* better bundle optimization
* remove deprecated shared/perfectui-theme.css

### Migration from @perfectui/* packages

If you were using the old separate packages, update your imports:

```typescript
// Before
import { provideDialog } from '@perfectui/dialog';
import { provideToastr } from '@perfectui/toastr';
import { provideOtp } from '@perfectui/otp';

// After
import { provideDialog } from '@sunilsolankiji/perfectui/dialog';
import { provideToastr } from '@sunilsolankiji/perfectui/toastr';
import { provideOtp } from '@sunilsolankiji/perfectui/otp';
```

### Theming Usage

```typescript
// Programmatic theming
import { providePerfectUI, ThemeService } from '@sunilsolankiji/perfectui/core';

export const appConfig: ApplicationConfig = {
  providers: [
    providePerfectUI({
      theme: 'indigo-pink',
      darkMode: 'auto',
      density: 'default'
    })
  ]
};

// Or import prebuilt CSS theme
@import '@sunilsolankiji/perfectui/themes/indigo-pink.css';
```

## [1.0.0] - Previous versions

See individual package changelogs for previous versions.
