# Release Process

This document describes how to release new versions of PerfectUI.

## Version Strategy

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.0.0 → 2.0.0): Breaking changes
- **MINOR** (1.0.0 → 1.1.0): New features, backwards compatible
- **PATCH** (1.0.0 → 1.0.1): Bug fixes, backwards compatible

## Release Checklist

### Before Release

- [ ] All tests pass
- [ ] Build succeeds locally: `npm run build:perfectui`
- [ ] CHANGELOG.md is updated
- [ ] Version number is bumped in `projects/components/package.json`
- [ ] Documentation is updated
- [ ] Breaking changes are documented (if any)

### Release Steps

#### 1. Update Version

Update the version in `projects/components/package.json`:

```json
{
  "name": "perfectui",
  "version": "2.1.0"
}
```

#### 2. Update Changelog

Add release notes to `projects/components/CHANGELOG.md`:

```markdown
## [2.1.0] - 2026-03-25

### Added
- New feature X

### Changed
- Updated behavior of Y

### Fixed
- Bug fix for Z
```

#### 3. Build and Test

```bash
npm run build:perfectui
npm start
# Test the changes in the demo app
```

#### 4. Commit Changes

```bash
git add .
git commit -m "chore: release perfectui v2.1.0"
git push origin main
```

#### 5. Create GitHub Release

**Option A: Via GitHub UI**
1. Go to Releases → Create new release
2. Tag: `v2.1.0`
3. Title: `perfectui v2.1.0`
4. Description: Copy from CHANGELOG
5. Publish → Workflow auto-publishes to npm

**Option B: Via GitHub Actions (Manual)**
1. Go to Actions → "Publish to NPM"
2. Click "Run workflow"
3. Run

#### 6. Publish to npm (Manual)

```bash
npm run publish:perfectui
```

Or manually:

```bash
cd dist/components
npm publish --access public
```

#### 7. Verify Release

- [ ] Check npm: https://www.npmjs.com/package/perfectui
- [ ] Check GitHub release page
- [ ] Test installation in a new project:
  ```bash
  npm install perfectui@latest
  ```

---

## Hotfix Release

For urgent bug fixes:

1. Create hotfix branch: `git checkout -b hotfix/issue-123`
2. Fix the bug
3. Bump patch version (2.0.0 → 2.0.1)
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
 * @deprecated Use `newMethod()` instead. Will be removed in v3.0.0
 */
oldMethod() {
  console.warn('oldMethod is deprecated, use newMethod instead');
  return this.newMethod();
}
```

---

## Release Tags Convention

| Release Type | Tag Format | Example |
|--------------|------------|---------|
| Stable | `vX.X.X` | `v2.1.0` |
| Pre-release | `vX.X.X-beta.X` | `v2.1.0-beta.1` |
| RC | `vX.X.X-rc.X` | `v2.1.0-rc.1` |

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

