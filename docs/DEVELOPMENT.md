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

### 1. Create the Secondary Entry Point Structure

```bash
mkdir -p projects/components/component-name/src
```

Create the folder structure:

```
projects/components/component-name/
├── ng-package.json
└── src/
    ├── public-api.ts              # Public API exports
    ├── component-name.models.ts
    ├── component-name.config.ts
    ├── component-name.provider.ts
    ├── component-name.service.ts
    └── component-name.component.ts
```

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

```typescript
/**
 * perfectui/component-name
 *
 * Description of the component
 */

// Models and types (use export type for types)
export type {
  ComponentType,
  ComponentOptions,
} from './component-name.models';

// Configuration
export type { ComponentConfig } from './component-name.config';
export { DEFAULT_COMPONENT_CONFIG, COMPONENT_CONFIG } from './component-name.config';

// Provider
export { provideComponent } from './component-name.provider';

// Service
export { ComponentService } from './component-name.service';

// Component
export { ComponentNameComponent } from './component-name.component';
```

### 4. Update Main Entry Point

Add to `projects/components/src/public-api.ts`:

```typescript
export * from 'perfectui/component-name';
```

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

```typescript
// component-name.service.ts
import { Injectable, inject } from '@angular/core';
import { COMPONENT_CONFIG, DEFAULT_COMPONENT_CONFIG } from './component-name.config';

@Injectable({ providedIn: 'root' })
export class ComponentService {
  private readonly userConfig = inject(COMPONENT_CONFIG, { optional: true });
  private config = { ...DEFAULT_COMPONENT_CONFIG, ...this.userConfig };

  // Service methods
}
```

### Component Pattern

```typescript
// component-name.component.ts
import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pui-component-name',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `...`,
  styles: [`...`]
})
export class ComponentNameComponent {
  // Use signal-based inputs (Angular 19+)
  readonly variant = input<ComponentVariant>('default');
  readonly size = input<ComponentSize>('md');
  
  // Use signal-based outputs
  readonly clicked = output<void>();
}
```

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
describe('ComponentNameComponent', () => {
  let component: ComponentNameComponent;
  let fixture: ComponentFixture<ComponentNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentNameComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentNameComponent);
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

