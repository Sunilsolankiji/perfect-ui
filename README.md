# Perfect UI

A collection of modern, customizable UI components for Angular 19+.

## Packages

| Package | Description | Version |
|---------|-------------|---------|
| [@perfectui/toastr](./projects/toastr) | Modern toast notification library | 1.1.0 |
| [@perfectui/dialog](./projects/dialog) | Modern dialog/modal library | 1.0.0 |

## Workspace Structure

```
perfect-ui/
├── projects/
│   ├── demo/          # Demo application
│   ├── toastr/        # Toast notification library
│   └── dialog/        # Dialog/modal library
└── ...
```

## Getting Started

### Prerequisites

- Node.js 18+
- Angular CLI 19+

### Installation

```bash
npm install
```

### Development

Start the demo application:

```bash
ng serve demo
```

Open your browser and navigate to `http://localhost:4200/`.

### Building Libraries

Build the toastr library:

```bash
ng build @perfectui/toastr
```

Build the dialog library:

```bash
ng build @perfectui/dialog
```

Build for production:

```bash
ng build @perfectui/toastr --configuration production
```

The build artifacts will be stored in the `dist/` directory.

## Running Tests

```bash
ng test
```

## Publishing

The project uses GitHub Actions for automated publishing to npm.

### Automatic Publishing

Publishing is triggered automatically when a new GitHub release is created.

### Manual Publishing

You can also trigger the publish workflow manually from the GitHub Actions tab.

### Setup

To enable publishing, add the `NPM_TOKEN` secret to your GitHub repository:

1. Generate an npm access token at [npmjs.com](https://www.npmjs.com/settings/~/tokens)
2. Go to your repository **Settings** → **Secrets and variables** → **Actions**
3. Add a new secret named `NPM_TOKEN` with your npm token

## Packages Documentation

- **[@perfectui/toastr](./projects/toastr/README.md)** - A modern, customizable toast notification library featuring:
  - ✨ Beautiful design with gradients and themes
  - 📍 Multiple position options
  - ⏱️ Configurable duration and auto-dismiss
  - 📊 Progress bar with pause on hover
  - ♿ Accessible (ARIA support)
  - 🚫 Duplicate prevention

- **[@perfectui/dialog](./projects/dialog/README.md)** - A modern, customizable dialog/modal library featuring:
  - ✨ Beautiful design with multiple themes
  - 📐 5 size options (sm, md, lg, xl, fullscreen)
  - 📍 3 position options (center, top, bottom)
  - 🔔 Built-in alert, confirm, and prompt dialogs
  - 🧩 Custom component dialogs with data injection
  - ⌨️ Keyboard support (ESC to close)
  - ♿ Accessible (ARIA support)

## License

MIT
