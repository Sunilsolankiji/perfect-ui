# Changelog

All notable changes to this project will be documented in this file.

## [2.0.0](https://github.com/sunilsolankiji/perfect-ui/compare/v1.0.0...v2.0.0) (2026-03-20)

### ⚠ BREAKING CHANGES

* Package renamed from `@perfectui/*` to `perfectui` with secondary entry points
* Import paths changed: `@perfectui/dialog` → `perfectui/dialog`

### Features

* new unified package structure with secondary entry points for tree-shaking ([#100](https://github.com/sunilsolankiji/perfect-ui/issues/100))
* import directly from `perfectui/dialog`, `perfectui/toastr`, `perfectui/otp`
* full Angular 21 support

### Code Refactoring

* restructured library to follow Angular Material patterns
* improved tree-shaking with secondary entry points
* better bundle optimization

### Migration from @perfectui/* packages

If you were using the old separate packages, update your imports:

```typescript
// Before
import { provideDialog } from '@perfectui/dialog';
import { provideToastr } from '@perfectui/toastr';
import { provideOtp } from '@perfectui/otp';

// After
import { provideDialog } from 'perfectui/dialog';
import { provideToastr } from 'perfectui/toastr';
import { provideOtp } from 'perfectui/otp';
```

## [1.0.0] - Previous versions

See individual package changelogs for previous versions.
