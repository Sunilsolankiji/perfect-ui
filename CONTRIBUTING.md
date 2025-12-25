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

3. **Build the libraries**
   ```bash
   npm run build:libs
   ```

4. **Start the demo app**
   ```bash
   npm start
   ```

## Project Structure

```
perfect-ui/
├── projects/
│   ├── core/            # @perfectui/core library (all-in-one)
│   ├── toastr/          # @perfectui/toastr library
│   ├── dialog/          # @perfectui/dialog library
│   └── demo/            # Demo application
├── dist/                # Built packages
└── .github/workflows/   # CI/CD workflows
```

## Development Workflow

### Building Libraries

```bash
# Build all libraries
npm run build:libs

# Build individual library
npm run build:toastr
npm run build:dialog
npm run build:core

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

1. Make changes to a library in `projects/core/`, `projects/toastr/`, or `projects/dialog/`
2. Rebuild the library: `npm run build:toastr`, `npm run build:dialog`, or `npm run build:core`
3. The demo app will use the updated library from `dist/`

## Submitting Changes

### Pull Request Process

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes
4. Ensure builds pass: `npm run build:libs`
5. Commit your changes: `git commit -m "feat: add new feature"`
6. Push to your fork: `git push origin feature/my-feature`
7. Open a Pull Request

### Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```
feat(dialog): add template support
fix(toastr): fix progress bar animation
docs: update README with new examples
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

