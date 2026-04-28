# Changelog

All notable changes to this project will be documented in this file.

### [2.0.1](https://github.com/sunilsolankiji/perfect-ui/compare/v3.0.0...v2.0.1) (2026-04-28)

## [3.0.0](https://github.com/sunilsolankiji/perfect-ui/compare/v1.2.0...v3.0.0) (2026-04-28)


### ⚠ BREAKING CHANGES

* **release:** Component services (PuiDialogService, PuiToastrService, PuiOtpService, PuiThemeService) are no longer registered with providedIn: 'root'. Consumers must call the matching provideX() function (provideDialog, provideToastr, provideOtp, providePerfectUI) in app.config.ts -- or in a route's providers -- before injecting the service. This matches Angular's recommended library DI pattern, keeps services lazy and tree-shakable, and makes accidental usage fail loudly at injection time instead of silently leaking the service into the root injector.

Migration: add the relevant provideX() calls to app.config.ts. See projects/demo/src/app/app.config.ts for a working example.
* use providePerfectUI() from core for theming

* feat: update changelog and readme for new theming system and package structure
feat: enhance OTP demo with theme and size selection, and improve UI
feat: add toastr demo with theming support and updated package badge

* fix: remove package-lock from .gitignore
* use providePerfectUI() from core for theming

* feat: update changelog and readme for new theming system and package structure
feat: enhance OTP demo with theme and size selection, and improve UI
feat: add toastr demo with theming support and updated package badge

### Features

* add select component ([3297e36](https://github.com/sunilsolankiji/perfect-ui/commit/3297e36beaf625e6b73b26b09212d8d6ee222223))


* Combine libs (#32) ([53ccb11](https://github.com/sunilsolankiji/perfect-ui/commit/53ccb11987092e7087940f2c15e520db545e0374)), closes [#32](https://github.com/sunilsolankiji/perfect-ui/issues/32)
* Combine libs (#31) ([017f555](https://github.com/sunilsolankiji/perfect-ui/commit/017f555e4c220c99f9435092cade564649a8c2cb)), closes [#31](https://github.com/sunilsolankiji/perfect-ui/issues/31)


### Documentation

* add `AGENTS.md` and update `CONTRIBUTING.md` and `DEVELOPMENT.md` for component guidelines ([9f75e5d](https://github.com/sunilsolankiji/perfect-ui/commit/9f75e5d6b91e5422f3d0d068a2dc08f2daab4924))


### Code Refactoring

* rename services and components to use 'Pui' prefix for consistency ([c4b5bcd](https://github.com/sunilsolankiji/perfect-ui/commit/c4b5bcdc40cfb57b7e63296845d8c69b81bb315e))
* update dialog and `OTP` providers to register services and improve documentation ([aa9887f](https://github.com/sunilsolankiji/perfect-ui/commit/aa9887fc472dd026b406122f2debefcae71f5614))


### Build System

* **release:** fix standard-version paths and document new di model ([270647d](https://github.com/sunilsolankiji/perfect-ui/commit/270647dab4a2358f37b4e81121a34aca55e1aa91))

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
