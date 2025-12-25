# New Component Generator Script
# Usage: .\scripts\new-component.ps1 -Name "button"

param(
    [Parameter(Mandatory=$true)]
    [string]$Name
)

$ComponentName = $Name.ToLower()
$ComponentNamePascal = (Get-Culture).TextInfo.ToTitleCase($ComponentName)

Write-Host "Creating new component: @perfectui/$ComponentName" -ForegroundColor Green

# 1. Generate Angular library
Write-Host "Generating Angular library..." -ForegroundColor Yellow
ng generate library $ComponentName --prefix=pui

# 2. Create package.json
$packageJson = @"
{
  "name": "@perfectui/$ComponentName",
  "version": "1.0.0",
  "description": "$ComponentNamePascal component for Angular 19+",
  "author": "PerfectUI",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/sunilsolankiji/perfect-ui.git",
    "directory": "projects/$ComponentName"
  },
  "bugs": {
    "url": "https://github.com/sunilsolankiji/perfect-ui/issues"
  },
  "homepage": "https://github.com/sunilsolankiji/perfect-ui/tree/main/projects/$ComponentName#readme",
  "keywords": [
    "angular",
    "$ComponentName",
    "ui",
    "component",
    "angular19",
    "standalone",
    "perfectui"
  ],
  "peerDependencies": {
    "@angular/common": "^19.0.0 || ^20.0.0 || ^21.0.0",
    "@angular/core": "^19.0.0 || ^20.0.0 || ^21.0.0"
  },
  "sideEffects": false
}
"@
$packageJson | Out-File -FilePath "projects/$ComponentName/package.json" -Encoding UTF8
Write-Host "Created package.json" -ForegroundColor Cyan

# 3. Create LICENSE
$license = Get-Content -Path "projects/toastr/LICENSE" -Raw
$license | Out-File -FilePath "projects/$ComponentName/LICENSE" -Encoding UTF8
Write-Host "Created LICENSE" -ForegroundColor Cyan

# 4. Create CHANGELOG.md
$changelog = @"
# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - $(Get-Date -Format "yyyy-MM-dd")

### Added
- Initial release
"@
$changelog | Out-File -FilePath "projects/$ComponentName/CHANGELOG.md" -Encoding UTF8
Write-Host "Created CHANGELOG.md" -ForegroundColor Cyan

# 5. Update ng-package.json
$ngPackage = @"
{
  "`$schema": "../../node_modules/ng-packagr/ng-package.schema.json",
  "dest": "../../dist/$ComponentName",
  "lib": {
    "entryFile": "src/public-api.ts"
  },
  "assets": [
    "CHANGELOG.md",
    "LICENSE"
  ]
}
"@
$ngPackage | Out-File -FilePath "projects/$ComponentName/ng-package.json" -Encoding UTF8
Write-Host "Updated ng-package.json" -ForegroundColor Cyan

Write-Host ""
Write-Host "Component @perfectui/$ComponentName created!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Update projects/$ComponentName/README.md"
Write-Host "2. Add component code in projects/$ComponentName/src/lib/"
Write-Host "3. Export from projects/$ComponentName/src/public-api.ts"
Write-Host "4. Add to projects/core/src/public-api.ts"
Write-Host "5. Update projects/core/package.json peerDependencies"
Write-Host "6. Add path to tsconfig.json"
Write-Host "7. Add npm scripts to package.json"
Write-Host "8. Update workflows (ci.yml, publish.yml, deploy-demo.yml)"
Write-Host "9. Create demo page in projects/demo/src/app/pages/"

