# Changelog

All notable changes to this project will be documented in this file.

### [3.1.1](https://github.com/sunilsolankiji/perfect-ui/compare/v1.2.0...v3.1.1) (2026-05-07)


### ⚠ BREAKING CHANGES

* Component services (PuiDialogService, PuiToastrService, PuiOtpService, PuiThemeService) are no longer registered with providedIn: 'root'. Consumers must call the matching provideX() function (provideDialog, provideToastr, provideOtp, providePerfectUI) in app.config.ts -- or in a route's providers -- before injecting the service. This matches Angular's recommended library DI pattern, keeps services lazy and tree-shakable, and makes accidental usage fail loudly at injection time instead of silently leaking the service into the root injector.

Migration: add the relevant provideX() calls to app.config.ts. See projects/demo/src/app/app.config.ts for a working example.

* chore(release): 3.0.0

* chore(release): 2.0.1

* chore(release): 3.0.0

* chore: update version to 3.0.0 and include additional package.json in versioning

* chore: update version to 3.0.0 and include additional package.json in versioning

* feat: add tabs component with demo and styling

* chore(release): allow tabs and select scopes in commitlint

* docs(tabs): document tabs component in library readme

* chore(release): 3.1.0

* style: update sidebar and theme selector styles for improved layout and responsiveness
* Component services (PuiDialogService, PuiToastrService, PuiOtpService, PuiThemeService) are no longer registered with providedIn: 'root'. Consumers must call the matching provideX() function (provideDialog, provideToastr, provideOtp, providePerfectUI) in app.config.ts -- or in a route's providers -- before injecting the service. This matches Angular's recommended library DI pattern, keeps services lazy and tree-shakable, and makes accidental usage fail loudly at injection time instead of silently leaking the service into the root injector.

Migration: add the relevant provideX() calls to app.config.ts. See projects/demo/src/app/app.config.ts for a working example.

* chore(release): 3.0.0

* chore(release): 2.0.1

* chore(release): 3.0.0

* chore: update version to 3.0.0 and include additional package.json in versioning

* chore: update version to 3.0.0 and include additional package.json in versioning

* feat: add tabs component with demo and styling

* chore(release): allow tabs and select scopes in commitlint

* docs(tabs): document tabs component in library readme

* chore(release): 3.1.0
* Component services (PuiDialogService, PuiToastrService, PuiOtpService, PuiThemeService) are no longer registered with providedIn: 'root'. Consumers must call the matching provideX() function (provideDialog, provideToastr, provideOtp, providePerfectUI) in app.config.ts -- or in a route's providers -- before injecting the service. This matches Angular's recommended library DI pattern, keeps services lazy and tree-shakable, and makes accidental usage fail loudly at injection time instead of silently leaking the service into the root injector.

Migration: add the relevant provideX() calls to app.config.ts. See projects/demo/src/app/app.config.ts for a working example.

* chore(release): 3.0.0

* chore(release): 2.0.1

* chore(release): 3.0.0

* chore: update version to 3.0.0 and include additional package.json in versioning

* chore: update version to 3.0.0 and include additional package.json in versioning
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

* **demo:** create home component with hero section and features overview ([1707f5e](https://github.com/sunilsolankiji/perfect-ui/commit/1707f5e7325e6322033662adf239741be5d2369f))
* implement mobile top bar and sidebar drawer for improved navigation ([92a4783](https://github.com/sunilsolankiji/perfect-ui/commit/92a478354730259fc1eb776ed073640750f60187))


### Bug Fixes

* increase max-width for mobile theme dropdown in app.css ([b4cf9bd](https://github.com/sunilsolankiji/perfect-ui/commit/b4cf9bd9702675eddccc6927a8b3f7e75be3946e))
* increase maximum size limits for component styles in angular.json ([34cd149](https://github.com/sunilsolankiji/perfect-ui/commit/34cd149617c0f6f71225a818d3c83be85fab1e90))
* **otp:** `OTP` input handling for multi-character pastes and validation ([b40cb59](https://github.com/sunilsolankiji/perfect-ui/commit/b40cb5982a054bdc062167d3ae39919e24baa2f1))
* **otp:** enhance input handling for multi-character pastes and autofill ([875dae4](https://github.com/sunilsolankiji/perfect-ui/commit/875dae43b97c5a0b59ae24d3092c464cac1cea8a))
* update variable declarations and improve linting configuration ([417a098](https://github.com/sunilsolankiji/perfect-ui/commit/417a098f72a774fa3c32a6921a6694d875fc78c0))


* Development (#46) ([9c339cf](https://github.com/sunilsolankiji/perfect-ui/commit/9c339cfddb97315aa25be025087c3e92ee1d6990)), closes [#46](https://github.com/sunilsolankiji/perfect-ui/issues/46)
* Development (#45) ([30b21fc](https://github.com/sunilsolankiji/perfect-ui/commit/30b21fc014774f6767d79ac93173c346091c2490)), closes [#45](https://github.com/sunilsolankiji/perfect-ui/issues/45)
* Release v3.0.0 ([8a12e6c](https://github.com/sunilsolankiji/perfect-ui/commit/8a12e6ce80480361f838e7084cc42f47873d0098))
* Combine libs (#32) ([53ccb11](https://github.com/sunilsolankiji/perfect-ui/commit/53ccb11987092e7087940f2c15e520db545e0374)), closes [#32](https://github.com/sunilsolankiji/perfect-ui/issues/32)
* Combine libs (#31) ([017f555](https://github.com/sunilsolankiji/perfect-ui/commit/017f555e4c220c99f9435092cade564649a8c2cb)), closes [#31](https://github.com/sunilsolankiji/perfect-ui/issues/31)

## [3.1.0](https://github.com/sunilsolankiji/perfect-ui/compare/v2.0.1...v3.1.0) (2026-05-02)


### Features

* add tabs component with demo and styling ([f6dda55](https://github.com/sunilsolankiji/perfect-ui/commit/f6dda55a6cf03c32575151896d41dcd681b45c52))


### Documentation

* **tabs:** document tabs component in library readme ([af8fb63](https://github.com/sunilsolankiji/perfect-ui/commit/af8fb630cb99b87b49791955ce834e643d526c55))

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
