# Release Process

This document describes how to release new versions of PerfectUI packages.

## Version Strategy

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.0.0 → 2.0.0): Breaking changes
- **MINOR** (1.0.0 → 1.1.0): New features, backwards compatible
- **PATCH** (1.0.0 → 1.0.1): Bug fixes, backwards compatible

## Release Checklist

### Before Release

- [ ] All tests pass
- [ ] Build succeeds locally
- [ ] CHANGELOG.md is updated
- [ ] Version number is bumped in package.json
- [ ] Documentation is updated
- [ ] Breaking changes are documented (if any)

### Release Steps

#### 1. Update Version

Update the version in the package's `package.json`:

```bash
# For toastr
# Edit projects/toastr/package.json

# For dialog
# Edit projects/dialog/package.json

# For core
# Edit projects/core/package.json
```

#### 2. Update Changelog

Add release notes to `CHANGELOG.md`:

```markdown
## [1.2.0] - 2025-12-25

### Added
- New feature X

### Changed
- Updated behavior of Y

### Fixed
- Bug fix for Z
```

#### 3. Commit Changes

```bash
git add .
git commit -m "chore: release @perfectui/package-name v1.2.0"
git push origin main
```

#### 4. Create GitHub Release

**Option A: Via GitHub UI**
1. Go to Releases → Create new release
2. Tag: `toastr-v1.2.0` or `dialog-v1.2.0` or `core-v1.2.0`
3. Title: `@perfectui/package-name v1.2.0`
4. Description: Copy from CHANGELOG
5. Publish → Workflow auto-publishes to npm

**Option B: Via GitHub Actions (Manual)**
1. Go to Actions → "Publish to NPM"
2. Click "Run workflow"
3. Select package to publish
4. Run

#### 5. Verify Release

- [ ] Check npm: https://www.npmjs.com/package/@perfectui/package-name
- [ ] Check GitHub release page
- [ ] Test installation in a new project

---

## Releasing Multiple Packages

When releasing breaking changes that affect multiple packages:

1. Release individual packages first (toastr, dialog)
2. Update @perfectui/core peerDependencies
3. Release @perfectui/core last

### Order of Release

```
1. @perfectui/toastr
2. @perfectui/dialog
3. @perfectui/core (depends on above)
```

---

## Hotfix Release

For urgent bug fixes:

1. Create hotfix branch: `git checkout -b hotfix/issue-123`
2. Fix the bug
3. Bump patch version (1.0.0 → 1.0.1)
4. Update CHANGELOG
5. Create PR → Merge → Release

---

## Breaking Changes

When making breaking changes:

1. **Document clearly** in CHANGELOG
2. **Provide migration guide** in README or docs
3. **Deprecate first** if possible (warn for 1-2 versions)
4. **Major version bump** required

Example deprecation:

```typescript
/**
 * @deprecated Use `newMethod()` instead. Will be removed in v2.0.0
 */
oldMethod() {
  console.warn('oldMethod is deprecated, use newMethod instead');
  return this.newMethod();
}
```

---

## Release Tags Convention

| Package | Tag Format | Example |
|---------|------------|---------|
| @perfectui/toastr | `toastr-vX.X.X` | `toastr-v1.2.0` |
| @perfectui/dialog | `dialog-vX.X.X` | `dialog-v1.0.0` |
| @perfectui/core | `core-vX.X.X` | `core-v1.0.0` |

---

## Troubleshooting

### npm publish fails

```bash
# Check if logged in
npm whoami

# Login if needed
npm login

# Check token
echo $NPM_TOKEN
```

### Version already exists

```
npm ERR! 403 You cannot publish over the previously published versions
```

Bump the version number and try again.

### GitHub Action fails

Check the Actions tab for error logs. Common issues:
- Missing `NPM_TOKEN` secret
- Build errors
- Version already published

