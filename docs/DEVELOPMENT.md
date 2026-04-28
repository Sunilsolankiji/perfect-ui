# Development Guide

This guide covers best practices for developing PerfectUI components.

## Library Architecture

PerfectUI uses **secondary entry points** (like Angular Material) for tree-shaking optimization:

```
perfectui/
├── perfectui              # Main entry (re-exports all)
├── perfectui/dialog       # Secondary entry point
├── perfectui/toastr       # Secondary entry point
└── perfectui/otp          # Secondary entry point
```

## Creating a New Component

> **Only generate the files a component actually needs.** Don't add `*.config.ts`, `*.provider.ts`, or `*.service.ts` "just in case" — they ship dead code in consumer bundles. The scaffolding script (`scripts/new-component.ps1`) emits the full set; delete what you don't need before committing.

### Decide the shape first

| Component shape | Files to create |
|---|---|
| Pure template-driven (configured via `input()`/`model()` only, e.g. `select`) | `<name>.ts`, `<name>.css` (and/or `<name>.html`), `<name>.models.ts`, `public-api.ts` |
| Has app-wide defaults but no imperative API (e.g. an `otp`-style input) | Above **+** `<name>.config.ts`, `<name>.provider.ts` |
| Imperative overlay/notification API (e.g. `dialog`, `toastr`) | Above **+** `<name>.service.ts` (and usually `<name>-container.ts` for the host) |

### 1. Create the Secondary Entry Point Structure

```bash
mkdir -p projects/perfectui/component-name/src
```

Minimal folder structure (template-driven component):

```
projects/perfectui/component-name/
├── ng-package.json
└── src/
    ├── public-api.ts              # Public API exports
    ├── component-name.models.ts   # Public types only (export type)
    ├── component-name.css         # Styles (separate file)
    └── component-name.ts          # Component class (no .component suffix)
```

Add `component-name.config.ts` + `component-name.provider.ts` only if the component needs a `provideX()` for global defaults; add `component-name.service.ts` only if it exposes an imperative API.

### 2. Create ng-package.json

```json
{
  "$schema": "../../../../node_modules/ng-packagr/ng-package.schema.json",
  "lib": {
    "entryFile": "src/public-api.ts"
  }
}
```

### 3. Create the Public API (public-api.ts)

Only re-export what exists. Template-driven minimum:

```typescript
/**
 * @sunilsolankiji/perfectui/component-name
 */

// Models and types (use export type for types)
export type {
  ComponentVariant,
  ComponentSize,
} from './component-name.models';

// Component
export { PuiComponentName } from './component-name';
```

If config/provider/service exist, add them too:

```typescript
export type { ComponentConfig } from './component-name.config';
export { DEFAULT_COMPONENT_CONFIG, COMPONENT_CONFIG } from './component-name.config';
export { provideComponent } from './component-name.provider';
export { PuiComponentNameService } from './component-name.service';
```

### 4. (Optional) Re-export from the root entry point

`projects/perfectui/src/public-api.ts` currently only ships `VERSION` — consumers import from subpaths. Add a re-export there only if you specifically want the symbol available from the root package.

---

## Component Architecture

### Models Pattern

```typescript
// component-name.models.ts

export type ComponentVariant = 'default' | 'primary' | 'secondary';
export type ComponentSize = 'sm' | 'md' | 'lg';

export interface ComponentOptions {
  variant?: ComponentVariant;
  size?: ComponentSize;
  disabled?: boolean;
}
```

### Config Pattern

> **Skip this file** when the component is fully configurable via `input()` / `model()` and does not expose a `provideX()` API. See `projects/perfectui/select/` for a component with no config.

```typescript
// component-name.config.ts
import { InjectionToken } from '@angular/core';

export interface ComponentConfig {
  variant?: ComponentVariant;
  size?: ComponentSize;
}

export const DEFAULT_COMPONENT_CONFIG: Required<ComponentConfig> = {
  variant: 'default',
  size: 'md',
};

export const COMPONENT_CONFIG = new InjectionToken<ComponentConfig>('COMPONENT_CONFIG');
```

### Provider Pattern

> Add only when a `*.config.ts` exists. The provider's only job is to merge user config over `DEFAULT_X_CONFIG` and bind it to the `X_CONFIG` token.

```typescript
// component-name.provider.ts
import { Provider } from '@angular/core';
import { ComponentConfig, COMPONENT_CONFIG, DEFAULT_COMPONENT_CONFIG } from './component-name.config';

export function provideComponent(config?: Partial<ComponentConfig>): Provider[] {
  return [
    {
      provide: COMPONENT_CONFIG,
      useValue: { ...DEFAULT_COMPONENT_CONFIG, ...config },
    },
  ];
}
```

### Service Pattern

> Add only when the component has an **imperative API** (e.g. `dialog.open()`, `toastr.success()`) or shared state across instances. A purely declarative `<pui-x>` component does **not** need a service.

```typescript
// component-name.service.ts
import { Injectable, inject } from '@angular/core';
import { COMPONENT_CONFIG, DEFAULT_COMPONENT_CONFIG } from './component-name.config';

@Injectable({ providedIn: 'root' })
export class PuiComponentNameService {
  private readonly userConfig = inject(COMPONENT_CONFIG, { optional: true });
  private config = { ...DEFAULT_COMPONENT_CONFIG, ...this.userConfig };

  // Service methods
}
```

### Component Pattern

```typescript
// component-name.ts (no .component suffix)
import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pui-component-name',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `...`,
  styleUrl: './component-name.css'
})
export class PuiComponentName {
  // Use signal-based inputs (Angular 19+)
  readonly variant = input<ComponentVariant>('default');
  readonly size = input<ComponentSize>('md');

  // Use signal-based outputs
  readonly clicked = output<void>();
}
```

### Naming Convention

- **File names:** `component-name.ts`, `component-name.service.ts`, `component-name.css` (no `.component` suffix)
- **Component class:** `PuiComponentName` (Pui prefix, no `Component` suffix)
- **Service class:** `PuiComponentNameService` (Pui prefix, keep `Service` suffix)

---

## Styling Guidelines

### CSS Variables

Use CSS variables for theming:

```css
:host {
  display: block;
}

.pui-component {
  background: var(--pui-component-bg, #ffffff);
  color: var(--pui-component-color, #111827);
  border: 1px solid var(--pui-component-border, #e5e7eb);
  border-radius: var(--pui-component-radius, 8px);
}
```

### Theme Support

Support multiple themes:

```css
/* Default theme */
.pui-component--default { ... }

/* Dark theme */
.pui-component--dark {
  --pui-component-bg: #1f2937;
  --pui-component-color: #f9fafb;
}
```

### Responsive Design

```css
@media (max-width: 640px) { /* Mobile */ }
@media (max-width: 768px) { /* Tablet */ }
```

---

## Accessibility

### ARIA Attributes

```html
<div 
  role="dialog"
  aria-modal="true"
  aria-labelledby="title-id"
  aria-describedby="content-id">
```

### Keyboard Navigation

```typescript
@HostListener('keydown', ['$event'])
onKeyDown(event: KeyboardEvent) {
  switch (event.key) {
    case 'Escape':
      this.close();
      break;
  }
}
```

---

## Testing

### Unit Test Example

```typescript
describe('PuiComponentName', () => {
  let component: PuiComponentName;
  let fixture: ComponentFixture<PuiComponentName>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuiComponentName]
    }).compileComponents();

    fixture = TestBed.createComponent(PuiComponentName);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

---

## Build & Verify

```bash
# Build the library
npm run build:perfectui

# Start demo to test
npm start
```

Check the build output in `dist/components/` to verify secondary entry points are generated correctly.
