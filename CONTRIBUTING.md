# Contributing to PerfectUI

Thank you for your interest in contributing to PerfectUI! 🎉

## Development Setup

### Prerequisites
- Node.js 20 or higher
- npm 10 or higher

### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/sunilsolankiji/perfect-ui.git
   cd perfect-ui
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the library**
   ```bash
   npm run build:perfectui
   ```

4. **Start the demo app**
   ```bash
   npm start
   ```

## Project Structure

```
perfect-ui/
├── projects/
│   ├── components/          # perfectui library
│   │   ├── src/             # Main entry point (re-exports all)
│   │   ├── dialog/          # perfectui/dialog (secondary entry point)
│   │   │   ├── ng-package.json
│   │   │   └── src/
│   │   ├── toastr/          # perfectui/toastr (secondary entry point)
│   │   │   ├── ng-package.json
│   │   │   └── src/
│   │   └── otp/             # perfectui/otp (secondary entry point)
│   │       ├── ng-package.json
│   │       └── src/
│   └── demo/                # Demo application
├── dist/                    # Built packages
└── .github/workflows/       # CI/CD workflows
```

## Development Workflow

### Building the Library

```bash
# Build the library (includes all secondary entry points)
npm run build:perfectui

# Build demo
npm run build:demo

# Build everything
npm run build:all
```

### Running the Demo

```bash
npm start
```

The demo will be available at `http://localhost:4200`

### Testing Changes

1. Make changes to a component in `projects/components/dialog/`, `projects/components/toastr/`, or `projects/components/otp/`
2. Rebuild the library: `npm run build:perfectui`
3. The demo app will use the updated library from `dist/`

## Adding a New Component

### 1. Create Secondary Entry Point

Create a new folder in `projects/components/`:

```
projects/components/new-component/
├── ng-package.json
└── src/
    ├── index.ts
    ├── new-component.models.ts
    ├── new-component.config.ts
    ├── new-component.provider.ts
    ├── new-component.service.ts
    └── new-component.component.ts
```

### 2. Create ng-package.json

```json
{
  "$schema": "../../../../node_modules/ng-packagr/ng-package.schema.json",
  "lib": {
    "entryFile": "src/index.ts"
  }
}
```

### 3. Export from Main Entry Point

Update `projects/components/src/public-api.ts`:

```typescript
export * from 'perfectui/new-component';
```

### 4. Build and Test

```bash
npm run build:perfectui
npm start
```

## Submitting Changes

### Pull Request Process

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes
4. Ensure builds pass: `npm run build:perfectui`
5. Commit your changes: `git commit -m "feat: add new feature"`
6. Push to your fork: `git push origin feature/my-feature`
7. Open a Pull Request

### Commit Message Convention

We use [Conventional Commits](https://www.conventionalcommits.org/) for automatic versioning and changelog generation.

#### Commit Message Format

```
<type>(<scope>): <subject>

[optional body]

[optional footer(s)]
```

#### Types

| Type | Description | Version Bump |
|------|-------------|--------------|
| `feat` | New feature | Minor |
| `fix` | Bug fix | Patch |
| `docs` | Documentation changes | None |
| `style` | Code style changes | None |
| `refactor` | Code refactoring | None |
| `perf` | Performance improvements | Patch |
| `test` | Adding or updating tests | None |
| `build` | Build system changes | None |
| `ci` | CI/CD changes | None |
| `chore` | Maintenance tasks | None |
| `revert` | Revert commits | Patch |

#### Scopes

- `dialog` - Dialog component
- `toastr` - Toastr component
- `otp` - OTP component
- `core` - Core functionality
- `demo` - Demo application
- `deps` - Dependencies

#### Examples

```bash
# Feature (bumps minor version)
git commit -m "feat(dialog): add animation options"

# Bug fix (bumps patch version)
git commit -m "fix(toastr): prevent duplicate notifications"

# Breaking change (bumps major version)
git commit -m "feat(dialog)!: change API for dialog configuration

BREAKING CHANGE: DialogConfig interface has been renamed to DialogOptions"
```

## Release Process

Releases are automated using semantic versioning based on commit messages:

| Commit Type | Version Bump |
|-------------|--------------|
| `fix`, `perf` | Patch (1.0.x) |
| `feat` | Minor (1.x.0) |
| `feat!`, `BREAKING CHANGE` | Major (x.0.0) |

### Release Commands (Maintainers)

```bash
npm run release:dry    # Preview changes
npm run release:patch  # Release patch
npm run release:minor  # Release minor
npm run release:major  # Release major
npm run release        # Auto-detect from commits
```

## Code Style

- Use TypeScript strict mode
- Follow Angular style guide
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Keep components small and focused

## Reporting Issues

When reporting issues, please include:

1. **Description** - Clear description of the issue
2. **Steps to reproduce** - How to reproduce the issue
3. **Expected behavior** - What you expected to happen
4. **Actual behavior** - What actually happened
5. **Environment** - Angular version, browser, OS

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

