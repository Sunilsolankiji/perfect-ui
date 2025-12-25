# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.2.0] - 2025-12-25

### Changed

- 📦 Version bump and maintenance updates

## [1.1.0] - 2025-12-23

### Added

- 🎨 6 built-in themes: `default`, `dark`, `light`, `minimal`, `outline`, `gradient`
- 🎯 Custom theme support with full color control via `customThemeColors`

## [1.0.0] - 2025-12-23

### Added

- 🎉 Initial release of `@perfectui/toastr`
- ✨ 4 toast types: `success`, `error`, `warning`, `info`
- 📍 6 position options: `top-right`, `top-left`, `top-center`, `bottom-right`, `bottom-left`, `bottom-center`
- ⏱️ Configurable duration with auto-dismiss (set to 0 for persistent toasts)
- 📊 Progress bar with pause on hover functionality
- 🔘 Close button support
- ♿ ARIA accessibility support for screen readers
- 🚫 Duplicate prevention option via `preventDuplicates`
- 🔔 Event subscriptions via `events$` observable (click, close, timeout)
- 📋 Toast list observable via `toasts$`
- 🔢 Maximum toasts limit via `maxToasts` option
- 📚 Stack order control via `newestOnTop` option
- 🎨 Custom CSS class support via `customClass`
- 📱 Responsive design for all screen sizes

### API

- `ToastrService` with methods: `success()`, `error()`, `warning()`, `info()`, `show()`, `remove()`, `clear()`
- `provideToastr()` function for Angular standalone configuration
- `TOASTR_CONFIG` injection token for advanced configuration

[Unreleased]: https://github.com/perfectui/toastr/compare/v1.2.0...HEAD
[1.2.0]: https://github.com/perfectui/toastr/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/perfectui/toastr/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/perfectui/toastr/releases/tag/v1.0.0

