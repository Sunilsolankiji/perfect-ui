---
name: New Component Request
about: Suggest a new component for PerfectUI
title: '[COMPONENT] '
labels: enhancement, component
assignees: ''
---

## Component Name
What should this component be called?

## Description
A clear description of what this component does.

## Use Cases
- Use case 1
- Use case 2
- Use case 3

## Proposed API

### Inputs
```typescript
@Input() variant: 'default' | 'primary' | 'secondary';
@Input() size: 'sm' | 'md' | 'lg';
// Add more inputs
```

### Outputs
```typescript
@Output() action = new EventEmitter<void>();
// Add more outputs
```

### Example Usage
```html
<pui-component-name
  variant="primary"
  size="md"
  (action)="onAction()">
  Content here
</pui-component-name>
```

## Similar Components
Links to similar components in other libraries for reference:
- [ ] Angular Material: 
- [ ] PrimeNG: 
- [ ] Other: 

## Design/Mockups
If you have any design mockups or screenshots, attach them here.

## Additional Context
Any other information about the component request.

## Checklist
- [ ] I have searched for existing component requests
- [ ] This component would benefit many users
- [ ] I am willing to help implement this component

