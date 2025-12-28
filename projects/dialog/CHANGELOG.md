# Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] - 2025-12-28

### Changed
- 🎨 **CSS Custom Properties Theming** - All colors now use CSS variables with fallbacks
- Users can override colors in their `styles.css` using `:root { --pui-dialog-bg: #color; }`
- Improved theming compatibility with global styles

### Added
- Comprehensive CSS variables for dialog layout, text, input, and buttons
- `--pui-dialog-radius`, `--pui-dialog-bg`, `--pui-dialog-border`, `--pui-dialog-shadow`
- `--pui-dialog-title-color`, `--pui-dialog-text-color`, `--pui-dialog-close-color`
- `--pui-dialog-input-*` variables for input customization
- `--pui-dialog-btn-*` variables for button customization

## [1.0.0] - 2025-12-25

### Added
- Initial release
- DialogService for programmatic dialog creation
- Built-in alert, confirm, prompt, and danger dialogs
- Custom component dialogs with `DIALOG_DATA` and `DIALOG_REF` injection
- Angular template support with `openTemplate()` method
- Multiple size options (sm, md, lg, xl, fullscreen)
- 3 position options (center, top, bottom)
- 3 built-in themes (default, dark, minimal)
- Custom buttons configuration
- Backdrop click to close
- ESC key to close
- Smooth enter/leave animations
- Stacking dialogs support
- Full ARIA accessibility support
- CSS variables for theming customization
- `closeAll()` and `hasOpenDialogs()` utility methods

