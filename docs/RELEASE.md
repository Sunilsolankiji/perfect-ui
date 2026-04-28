# Release Process

This document describes how to release new versions of PerfectUI.

## Version Strategy

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.0.0 → 2.0.0): Breaking changes
- **MINOR** (1.0.0 → 1.1.0): New features, backwards compatible
- **PATCH** (1.0.0 → 1.0.1): Bug fixes, backwards compatible

Versions and the changelog are driven by [Conventional Commits](https://www.conventionalcommits.org/) via `standard-version` (config: `.versionrc.json`).

## Release Checklist

### Before Release

- [ ] Working tree is clean (`git status`) on the release branch
- [ ] All tests pass: `npm test`
- [ ] Library builds locally: `npm run build:perfectui`
- [ ] Demo builds: `npm run build:demo`
- [ ] Breaking changes are documented in commit footers (`BREAKING CHANGE:`) or a `feat!:` / `fix!:` commit
- [ ] Documentation is updated

### Release Steps

#### 1. Dry-run the release

```bash
npm run release:dry
```

This previews the next version, the generated changelog entry, and the file mutations without writing anything. Verify:
- The bumped version matches your intent (patch / minor / major)
- The changelog entry includes all relevant commits
- `projects/perfectui/package.json` and `projects/perfectui/src/public-api.ts` are listed in the bump files

#### 2. Cut the release

Pick the appropriate command:

```bash
npm run release         # auto-detect from commits
npm run release:patch   # force patch bump
npm run release:minor   # force minor bump
npm run release:major   # force major bump (use for breaking changes)
```

`standard-version` will:
1. Bump the version in `projects/perfectui/package.json`
2. Update `VERSION` in `projects/perfectui/src/public-api.ts` (via `scripts/version-updater.js`)
3. Regenerate `projects/perfectui/CHANGELOG.md`
4. Create a `chore(release): vX.Y.Z` commit and a `vX.Y.Z` git tag

#### 3. Build and verify

```bash
npm run build:perfectui
npm start
# Smoke-test the demo against the freshly built library at dist/perfectui/
```

#### 4. Push the release

```bash
git push --follow-tags origin <branch>
```

The `--follow-tags` flag pushes the new annotated `vX.Y.Z` tag together with the release commit.

#### 5. Publish to npm

```bash
npm run publish:perfectui
```

This rebuilds the library and runs `npm publish --access public` from `dist/perfectui/`.

> **Note**: `dist/perfectui/` is the actual ng-packagr output directory (configured in `projects/perfectui/ng-package.json`). If publishing fails with `ENOENT`, confirm the `dest` in `ng-package.json` still points there.

#### 6. Create a GitHub Release

1. Releases → Draft a new release
2. Select the tag (`vX.Y.Z`) you just pushed
3. Title: `vX.Y.Z`
4. Description: copy the relevant section from `projects/perfectui/CHANGELOG.md`
5. Publish

#### 7. Verify

- [ ] https://www.npmjs.com/package/@sunilsolankiji/perfectui shows the new version
- [ ] GitHub release page is correct
- [ ] Smoke test in a fresh project:
  ```bash
  npm install @sunilsolankiji/perfectui@latest
  ```

---

## Hotfix Release

For urgent bug fixes against the latest published version:

1. `git checkout -b hotfix/<short-name> v<latest>` (branch from the release tag)
2. Commit fixes using `fix:` / `fix(scope):` conventional commits
3. `npm run release:patch`
4. `git push --follow-tags origin hotfix/<short-name>`
5. `npm run publish:perfectui`
6. Open a PR to merge the hotfix back into `main`/`development`

---

## Breaking Changes

When making breaking changes:

1. Use a `feat!:` / `fix!:` commit OR add a `BREAKING CHANGE:` footer so `standard-version` triggers a major bump.
2. Document the migration in the commit body and in `projects/perfectui/CHANGELOG.md`.
3. Major version bump (`npm run release:major` if conventional commits don't already imply it).

Example commit:

```
feat(toastr)!: services are no longer providedIn: 'root'

BREAKING CHANGE: PuiToastrService, PuiDialogService, PuiOtpService and
PuiThemeService must now be registered explicitly. Call the matching
provideX() function from app.config.ts before injecting the service.
```

---

## Release Tags Convention

| Release Type | Tag Format       | Example         |
|--------------|------------------|-----------------|
| Stable       | `vX.Y.Z`         | `v3.0.0`        |
| Pre-release  | `vX.Y.Z-beta.N`  | `v3.0.0-beta.1` |
| RC           | `vX.Y.Z-rc.N`    | `v3.0.0-rc.1`   |

---

## Troubleshooting

### `npm publish` fails

```bash
npm whoami         # verify you're logged in
npm login          # log in if needed
```

### Version already exists

```
npm ERR! 403 You cannot publish over the previously published versions
```

The git tag exists but npm rejected the publish. Bump the version (`npm run release:patch`) and republish.

### `publish:perfectui` says `ENOENT`

The script does `cd dist/perfectui && npm publish`. Confirm:
- `npm run build:perfectui` succeeded
- `projects/perfectui/ng-package.json` still has `"dest": "../../dist/perfectui"`

### `standard-version` skipped the bump

Without `feat:` / `fix:` / `perf:` / breaking commits since the last tag, the auto-detect bump is empty. Force one with `npm run release:patch|minor|major`.

