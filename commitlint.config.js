module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature
        'fix',      // Bug fix
        'docs',     // Documentation changes
        'style',    // Code style changes (formatting, etc.)
        'refactor', // Code refactoring
        'perf',     // Performance improvements
        'test',     // Adding or updating tests
        'build',    // Build system changes
        'ci',       // CI/CD changes
        'chore',    // Other changes
        'revert'    // Revert commits
      ]
    ],
    'scope-enum': [
      2,
      'always',
      [
        'dialog',   // Dialog component
        'toastr',   // Toastr component
        'otp',      // OTP component
        'core',     // Core functionality
        'demo',     // Demo app
        'deps',     // Dependencies
        'release',  // Release related
        ''          // Allow empty scope
      ]
    ],
    'scope-empty': [0],
    'subject-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100]
  }
};
