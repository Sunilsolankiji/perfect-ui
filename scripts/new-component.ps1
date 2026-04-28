# New Component Generator Script
# Usage:
#   .\scripts\new-component.ps1 -Name "button"
#   .\scripts\new-component.ps1 -Name "tooltip" -Config -Provider
#   .\scripts\new-component.ps1 -Name "dialog"  -Config -Provider -Service
#
# Defaults to a *minimal*, template-driven component:
#   <name>.ts, <name>.css, <name>.models.ts, public-api.ts, ng-package.json
#
# Add -Config / -Provider / -Service only when the component truly needs them:
#   -Config    : app-wide defaults exposed via an InjectionToken
#   -Provider  : provideX() that merges defaults (requires -Config)
#   -Service   : imperative API; the service is registered by provideX(),
#                NOT in 'root' -- consumers must call provideX() in app.config.ts.

param(
    [Parameter(Mandatory=$true)]
    [string]$Name,
    [switch]$Config,
    [switch]$Provider,
    [switch]$Service
)

if ($Provider -and -not $Config) {
    Write-Host "Note: -Provider implies -Config. Enabling -Config." -ForegroundColor Yellow
    $Config = $true
}
if ($Service -and -not $Config) {
    Write-Host "Note: -Service implies -Config + -Provider. Enabling them." -ForegroundColor Yellow
    $Config = $true
    $Provider = $true
}

$ComponentName       = $Name.ToLower()
$ComponentNamePascal = (Get-Culture).TextInfo.ToTitleCase($ComponentName)
$ComponentPath       = "projects/perfectui/$ComponentName"
$Upper               = $ComponentName.ToUpper()

Write-Host "Creating new component: perfectui/$ComponentName" -ForegroundColor Green

Write-Host "Creating directory structure..." -ForegroundColor Yellow
New-Item -ItemType Directory -Path "$ComponentPath/src" -Force | Out-Null

# --- ng-package.json ---
$ngPackage = @"
{
  "`$schema": "../../../../node_modules/ng-packagr/ng-package.schema.json",
  "lib": {
    "entryFile": "src/public-api.ts"
  }
}
"@
$ngPackage | Out-File -FilePath "$ComponentPath/ng-package.json" -Encoding UTF8
Write-Host "Created ng-package.json" -ForegroundColor Cyan

# --- public-api.ts (built dynamically) ---
$publicApiLines = @(
    "/**",
    " * @sunilsolankiji/perfectui/$ComponentName",
    " */",
    "",
    "// Models / types",
    "export type { ${ComponentNamePascal}Size } from './$ComponentName.models';",
    ""
)
if ($Config) {
    $publicApiLines += @(
        "// Configuration",
        "export type { ${ComponentNamePascal}Config } from './$ComponentName.config';",
        "export { DEFAULT_${Upper}_CONFIG, ${Upper}_CONFIG } from './$ComponentName.config';",
        ""
    )
}
if ($Provider) {
    $publicApiLines += @(
        "// Provider",
        "export { provide${ComponentNamePascal} } from './$ComponentName.provider';",
        ""
    )
}
if ($Service) {
    $publicApiLines += @(
        "// Service",
        "export { Pui${ComponentNamePascal}Service } from './$ComponentName.service';",
        ""
    )
}
$publicApiLines += @(
    "// Component",
    "export { Pui${ComponentNamePascal} } from './$ComponentName';",
    ""
)
$publicApiLines -join "`n" | Out-File -FilePath "$ComponentPath/src/public-api.ts" -Encoding UTF8
Write-Host "Created public-api.ts" -ForegroundColor Cyan

# --- models (always) ---
$modelsTs = @"
// Public types for perfectui/$ComponentName.
// Use 'export type' so consumers tree-shake correctly.

export type ${ComponentNamePascal}Size = 'sm' | 'md' | 'lg';
"@
$modelsTs | Out-File -FilePath "$ComponentPath/src/$ComponentName.models.ts" -Encoding UTF8
Write-Host "Created $ComponentName.models.ts" -ForegroundColor Cyan

# --- component (always; no .component suffix) ---
$componentTs = @"
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { ${ComponentNamePascal}Size } from './$ComponentName.models';

@Component({
  selector: 'pui-$ComponentName',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ``,
  styleUrl: './$ComponentName.css'
})
export class Pui${ComponentNamePascal} {
  readonly size = input<${ComponentNamePascal}Size>('md');
}
"@
$componentTs | Out-File -FilePath "$ComponentPath/src/$ComponentName.ts" -Encoding UTF8
Write-Host "Created $ComponentName.ts" -ForegroundColor Cyan

"" | Out-File -FilePath "$ComponentPath/src/$ComponentName.css" -Encoding UTF8
Write-Host "Created $ComponentName.css" -ForegroundColor Cyan

# --- config (optional) ---
if ($Config) {
    $configTs = @"
import { InjectionToken } from '@angular/core';
import type { ${ComponentNamePascal}Size } from './$ComponentName.models';

export interface ${ComponentNamePascal}Config {
  size?: ${ComponentNamePascal}Size;
}

export const DEFAULT_${Upper}_CONFIG: Required<${ComponentNamePascal}Config> = {
  size: 'md',
};

export const ${Upper}_CONFIG = new InjectionToken<${ComponentNamePascal}Config>('${Upper}_CONFIG');
"@
    $configTs | Out-File -FilePath "$ComponentPath/src/$ComponentName.config.ts" -Encoding UTF8
    Write-Host "Created $ComponentName.config.ts" -ForegroundColor Cyan
}

# --- provider (optional) -- registers the service when -Service is used ---
if ($Provider) {
    if ($Service) {
        $providerImports = @"
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { ${Upper}_CONFIG, DEFAULT_${Upper}_CONFIG, ${ComponentNamePascal}Config } from './$ComponentName.config';
import { Pui${ComponentNamePascal}Service } from './$ComponentName.service';
"@
        $providerEntries = @"
    Pui${ComponentNamePascal}Service,
    {
      provide: ${Upper}_CONFIG,
      useValue: { ...DEFAULT_${Upper}_CONFIG, ...config },
    },
"@
        $providerSummary = "configuration and registers Pui${ComponentNamePascal}Service"
    } else {
        $providerImports = @"
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { ${Upper}_CONFIG, DEFAULT_${Upper}_CONFIG, ${ComponentNamePascal}Config } from './$ComponentName.config';
"@
        $providerEntries = @"
    {
      provide: ${Upper}_CONFIG,
      useValue: { ...DEFAULT_${Upper}_CONFIG, ...config },
    },
"@
        $providerSummary = "configuration"
    }

    $providerTs = @"
$providerImports

/**
 * Provides ${ComponentNamePascal} $providerSummary.
 *
 * Call this in app.config.ts (or a lazy route's providers).
 */
export function provide${ComponentNamePascal}(config: Partial<${ComponentNamePascal}Config> = {}): EnvironmentProviders {
  return makeEnvironmentProviders([
$providerEntries
  ]);
}
"@
    $providerTs | Out-File -FilePath "$ComponentPath/src/$ComponentName.provider.ts" -Encoding UTF8
    Write-Host "Created $ComponentName.provider.ts" -ForegroundColor Cyan
}

# --- service (optional) ---
if ($Service) {
    $serviceTs = @"
import { Injectable, inject } from '@angular/core';
import { ${Upper}_CONFIG, DEFAULT_${Upper}_CONFIG, ${ComponentNamePascal}Config } from './$ComponentName.config';

/**
 * Not provided in 'root' -- registered by provide${ComponentNamePascal}().
 * Consumers must call that in app.config.ts before injecting.
 */
@Injectable()
export class Pui${ComponentNamePascal}Service {
  private readonly userConfig = inject(${Upper}_CONFIG, { optional: true });
  private readonly config: Required<${ComponentNamePascal}Config> = { ...DEFAULT_${Upper}_CONFIG, ...this.userConfig };
}
"@
    $serviceTs | Out-File -FilePath "$ComponentPath/src/$ComponentName.service.ts" -Encoding UTF8
    Write-Host "Created $ComponentName.service.ts" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "Component perfectui/$ComponentName created!" -ForegroundColor Green
Write-Host ""
Write-Host "Generated files:" -ForegroundColor Yellow
Write-Host "  - $ComponentName.ts, $ComponentName.css, $ComponentName.models.ts, public-api.ts, ng-package.json"
if ($Config)   { Write-Host "  - $ComponentName.config.ts" }
if ($Provider) { Write-Host "  - $ComponentName.provider.ts" }
if ($Service)  { Write-Host "  - $ComponentName.service.ts" }
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Implement component logic in $ComponentPath/src/"
Write-Host "2. Build the library: npm run build:perfectui   (or: npm run watch)"
Write-Host "3. Create demo page in projects/demo/src/app/pages/$ComponentName-demo/"
Write-Host ""
Write-Host "Import in your app:" -ForegroundColor Cyan
Write-Host "  import { Pui${ComponentNamePascal} } from '@sunilsolankiji/perfectui/$ComponentName';"
if ($Provider) { Write-Host "  import { provide${ComponentNamePascal} } from '@sunilsolankiji/perfectui/$ComponentName';" }
if ($Service)  { Write-Host "  import { Pui${ComponentNamePascal}Service } from '@sunilsolankiji/perfectui/$ComponentName';" }
Write-Host ""
Write-Host "Naming convention:" -ForegroundColor Yellow
Write-Host "  - Component: Pui${ComponentNamePascal} (in $ComponentName.ts -- no .component suffix)"
if ($Service)  { Write-Host "  - Service:   Pui${ComponentNamePascal}Service (in $ComponentName.service.ts)" }
Write-Host ""

