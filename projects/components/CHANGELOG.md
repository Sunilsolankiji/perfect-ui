# Changelog

All notable changes to this project will be documented in this file.

## [2.0.0] - 2026-03-20

### Added
- New unified package structure with secondary entry points for tree-shaking
- Import directly from `perfectui/dialog`, `perfectui/toastr`, `perfectui/otp`
- Full Angular 21 support

### Changed
- Restructured library to follow Angular Material patterns
- Improved tree-shaking with secondary entry points
- Better bundle optimization

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

## [1.x.x] - Previous versions

See individual package changelogs for previous versions.
