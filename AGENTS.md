# AGENTS.md — PerfectUI

Angular 21+ component library (`@sunilsolankiji/perfectui`) published as a single npm package with **secondary entry points** (Angular Material style) for tree-shaking. An Angular CLI workspace contains the library and a demo app.

## Architecture

- **Workspace layout** (`angular.json` defines two projects):
  - `projects/perfectui/` — library, prefix `pui`, built with `ng-packagr` to `dist/perfectui/`.
  - `projects/demo/` — demo app, prefix `app`, served via `ng serve demo`.
- **Secondary entry points**: each component lives in its own folder with its own `ng-package.json` and `src/public-api.ts`. Current entries: `core/` (theming), `dialog/`, `toastr/`, `otp/`. The main `projects/perfectui/src/public-api.ts` only exports a `VERSION` constant — consumers always import from subpaths like `@sunilsolankiji/perfectui/dialog`.
- **TS path alias** (`tsconfig.json`): the demo imports `@sunilsolankiji/perfectui/*` which is mapped to `dist/perfectui/*`. This means **the demo will not see library changes until you rebuild** (`npm run build:perfectui` or `npm run watch`).
- **Theming** (`projects/perfectui/core/`): CSS custom properties (`--pui-primary`, `--pui-background`, etc.) driven by `PuiThemeService` + `providePerfectUI({ theme, darkMode, density })`. Prebuilt CSS themes live in `projects/perfectui/themes/` and are shipped as assets (see `ng-package.json` `assets`). An SCSS API is exposed via `projects/perfectui/_index.scss`.
- **Overlay pattern** (see `toastr.service.ts`, `dialog.service.ts`): services lazily create a single container component using `createComponent()` + `appRef.attachView()`, append it to `document.body`, and push state via `containerRef.setInput(...)`. Reuse this pattern for any new overlay-style component instead of inventing a new mounting strategy.

## Per-component file convention

Inside each entry-point folder (`projects/perfectui/<name>/src/`). **Only generate the files a component actually needs** — don't add config/provider/service boilerplate "just in case".

Always present:

| File | Purpose |
|---|---|
| `<name>.ts` | Standalone component `PuiX` (selector `pui-x`), **no `.component` suffix on file or class** |
| `<name>.css` (and optional `<name>.html`) | Styles / template referenced via `styleUrl` / `templateUrl` |
| `<name>.models.ts` | Public types (`export type` only) |
| `public-api.ts` | Re-exports; types via `export type {...}` |

Add only when the component has the corresponding need:

| File | Add when… |
|---|---|
| `<name>.config.ts` | The component has app-wide defaults configurable from `app.config.ts` (defines `XConfig`, `DEFAULT_X_CONFIG`, `X_CONFIG` `InjectionToken`) |
| `<name>.provider.ts` | A config exists — exports `provideX(config?)` returning `Provider[]` / `EnvironmentProviders` merging defaults |
| `<name>.service.ts` | The component has an **imperative API** (e.g. overlays opened from code: `dialog`, `toastr`) or shared state. `@Injectable({ providedIn: 'root' })`, reads config via `inject(X_CONFIG, { optional: true })` |

Decision guide:
- Pure **template-driven** component configured via `input()`/`model()` and consumed with `<pui-x>` → component + models only. See `projects/perfectui/select/` (no config, provider, or service — its `public-api.ts` documents this explicitly).
- Component with global defaults but no imperative API → component + config + provider (no service).
- Imperative overlay/notification API → full set (component + container + config + provider + service). See `dialog/`, `toastr/`.

Naming is enforced: file `dialog.ts` → class `PuiDialog`; file `dialog.service.ts` → class `PuiDialogService`. Use `scripts/new-component.ps1 -Name "<name>"` for a minimal component, and add `-Config -Provider` (and `-Service` for overlays) only when needed. Then add the entry to `projects/perfectui/src/public-api.ts` only if you want it re-exported from the root.

## Component conventions

- **Standalone components only**, `ChangeDetectionStrategy.OnPush`.
- **Signal-based APIs**: use `input()`, `output()`, `model()`, `signal()`, `computed()`, `effect()` (see `otp/src/otp.ts` for a full example with `ControlValueAccessor`).
- Strict mode is on (`strictTemplates`, `noPropertyAccessFromIndexSignature`, etc. — see `tsconfig.json`).
- Theming hooks: style with CSS variables defaulted inline, e.g. `background: var(--pui-component-bg, #fff);`.
- Accessibility is non-negotiable: ARIA roles, `aria-*` attributes, keyboard handling — see `otp.ts` and `dialog-container.ts`.

## Workflows

```bash
npm install
npm run build:perfectui      # ng-packagr → dist/perfectui
npm run watch                # rebuild library on change (pair with npm start)
npm start                    # ng serve demo (http://localhost:4200) — consumes dist/perfectui
npm run build:demo           # builds library first, then demo with --base-href /perfect-ui/
npm test                     # Vitest via @angular/build:unit-test (jsdom)
```

**Gotcha**: `npm run publish:perfectui` does `cd dist/components && npm publish`, but the library actually builds to `dist/perfectui` (see `projects/perfectui/ng-package.json` `dest`). Verify the path before publishing.

## Commits & releases

- **Conventional Commits enforced** by `commitlint` + Husky (`commitlint.config.js`). Allowed scopes: `dialog`, `toastr`, `otp`, `core`, `demo`, `deps`, `release`. Subject must be lower-case, no trailing period, ≤100 chars.
- Example: `feat(toastr): add stacking animation` / `fix(dialog): focus trap on open` / `feat(otp)!: rename OtpEvent` for breaking.
- Releases use `standard-version` (`npm run release:patch|minor|major|dry`).

## Key reference files

- Architecture & patterns: `docs/DEVELOPMENT.md`
- Working overlay service example: `projects/perfectui/toastr/src/toastr.service.ts`
- Working ControlValueAccessor + signals example: `projects/perfectui/otp/src/otp.ts`
- Theming: `projects/perfectui/core/src/theming/theme.service.ts`, `_index.scss`
- Demo wiring: `projects/demo/src/app/app.config.ts`


