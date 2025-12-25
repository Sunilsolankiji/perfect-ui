# Development Guide

This guide covers best practices for developing PerfectUI components.

## Creating a New Component

### 1. Generate the Library

```bash
ng generate library component-name --prefix=pui
```

### 2. Update Package.json

```json
{
  "name": "@perfectui/component-name",
  "version": "1.0.0",
  "description": "Description of your component",
  "author": "PerfectUI",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/sunilsolankiji/perfect-ui.git",
    "directory": "projects/component-name"
  },
  "peerDependencies": {
    "@angular/common": "^19.0.0 || ^20.0.0 || ^21.0.0",
    "@angular/core": "^19.0.0 || ^20.0.0 || ^21.0.0"
  },
  "sideEffects": false
}
```

### 3. Create Required Files

- `README.md` - Documentation
- `CHANGELOG.md` - Version history
- `LICENSE` - MIT license
- `ng-package.json` - Include assets

### 4. Update Core Package

Add the new package to `projects/core/src/public-api.ts`:

```typescript
export * from '@perfectui/component-name';
```

Update `projects/core/package.json` peerDependencies:

```json
"peerDependencies": {
  "@perfectui/component-name": "^1.0.0"
}
```

### 5. Update Workflows

Add the new package to:
- `.github/workflows/ci.yml`
- `.github/workflows/publish.yml`
- `.github/workflows/deploy-demo.yml`

### 6. Update Root Files

- `tsconfig.json` - Add path mapping
- `package.json` - Add build/publish scripts
- `README.md` - Add to packages table

---

## Component Architecture

### File Structure

```
projects/component-name/
├── src/
│   ├── lib/
│   │   ├── component-name.component.ts
│   │   ├── component-name.service.ts
│   │   ├── component-name.config.ts
│   │   ├── component-name.models.ts
│   │   └── component-name.provider.ts
│   └── public-api.ts
├── package.json
├── ng-package.json
├── README.md
├── CHANGELOG.md
└── LICENSE
```

### Component Pattern

```typescript
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'pui-component-name',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `...`,
  styles: [`...`]
})
export class ComponentNameComponent {
  @Input() variant: 'default' | 'primary' | 'secondary' = 'default';
  @Output() action = new EventEmitter<void>();
}
```

### Service Pattern

```typescript
import { Injectable, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ComponentNameService {
  private readonly config = inject(COMPONENT_CONFIG, { optional: true });
  
  // Service methods
}
```

### Provider Pattern

```typescript
import { Provider, makeEnvironmentProviders } from '@angular/core';

export function provideComponentName(config?: ComponentConfig) {
  return makeEnvironmentProviders([
    { provide: COMPONENT_CONFIG, useValue: { ...DEFAULT_CONFIG, ...config } }
  ]);
}
```

---

## Styling Guidelines

### CSS Variables

Use CSS variables for theming:

```css
:host {
  --pui-component-bg: #ffffff;
  --pui-component-color: #111827;
  --pui-component-border: #e5e7eb;
  --pui-component-radius: 8px;
}

.pui-component {
  background: var(--pui-component-bg);
  color: var(--pui-component-color);
  border: 1px solid var(--pui-component-border);
  border-radius: var(--pui-component-radius);
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

/* Minimal theme */
.pui-component--minimal { ... }
```

### Responsive Design

Use responsive breakpoints:

```css
@media (max-width: 640px) { /* sm */ }
@media (max-width: 768px) { /* md */ }
@media (max-width: 1024px) { /* lg */ }
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
    case 'Enter':
      this.confirm();
      break;
  }
}
```

### Focus Management

```typescript
ngAfterViewInit() {
  this.elementRef.nativeElement.focus();
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

  it('should emit action on click', () => {
    const spy = jest.spyOn(component.action, 'emit');
    component.onClick();
    expect(spy).toHaveBeenCalled();
  });
});
```

---

## Documentation

Each component should have:

1. **README.md** with:
   - Installation instructions
   - Quick start example
   - API reference (inputs, outputs, methods)
   - Configuration options
   - Theming/customization
   - Examples

2. **CHANGELOG.md** with:
   - Version history
   - Breaking changes
   - New features
   - Bug fixes

3. **Demo page** in the demo app

