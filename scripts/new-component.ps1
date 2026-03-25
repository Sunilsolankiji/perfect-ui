# New Component Generator Script
# Usage: .\scripts\new-component.ps1 -Name "button"
# Creates a new secondary entry point in the perfectui library

param(
    [Parameter(Mandatory=$true)]
    [string]$Name
)

$ComponentName = $Name.ToLower()
$ComponentNamePascal = (Get-Culture).TextInfo.ToTitleCase($ComponentName)
$ComponentPath = "projects/components/$ComponentName"

Write-Host "Creating new component: perfectui/$ComponentName" -ForegroundColor Green

# 1. Create component directory structure
Write-Host "Creating directory structure..." -ForegroundColor Yellow
New-Item -ItemType Directory -Path "$ComponentPath/src/lib" -Force | Out-Null

# 2. Create ng-package.json for secondary entry point
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

# 3. Create public-api.ts (public API)
$indexTs = @"
// Public API for perfectui/$ComponentName

// export type { ${ComponentNamePascal}Config } from './lib/$ComponentName.config';
// export { provide${ComponentNamePascal} } from './lib/$ComponentName.provider';
// export { ${ComponentNamePascal}Service } from './lib/$ComponentName.service';
// export { ${ComponentNamePascal}Component } from './lib/$ComponentName.component';
"@
$indexTs | Out-File -FilePath "$ComponentPath/src/public-api.ts" -Encoding UTF8
Write-Host "Created public-api.ts" -ForegroundColor Cyan

# 4. Create basic component file
$componentTs = @"
import { Component } from '@angular/core';

@Component({
  selector: 'pui-$ComponentName',
  standalone: true,
  template: ``
})
export class ${ComponentNamePascal}Component {
}
"@
$componentTs | Out-File -FilePath "$ComponentPath/src/lib/$ComponentName.component.ts" -Encoding UTF8
Write-Host "Created $ComponentName.component.ts" -ForegroundColor Cyan

# 5. Create config file
$configTs = @"
import { InjectionToken } from '@angular/core';

export interface ${ComponentNamePascal}Config {
  // Add configuration options here
}

export const ${ComponentName.ToUpper()}_CONFIG = new InjectionToken<${ComponentNamePascal}Config>('${ComponentName.ToUpper()}_CONFIG');

export const default${ComponentNamePascal}Config: ${ComponentNamePascal}Config = {
  // Default values
};
"@
$configTs | Out-File -FilePath "$ComponentPath/src/lib/$ComponentName.config.ts" -Encoding UTF8
Write-Host "Created $ComponentName.config.ts" -ForegroundColor Cyan

# 6. Create provider file
$providerTs = @"
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { ${ComponentName.ToUpper()}_CONFIG, ${ComponentNamePascal}Config, default${ComponentNamePascal}Config } from './$ComponentName.config';

export function provide${ComponentNamePascal}(config: Partial<${ComponentNamePascal}Config> = {}): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: ${ComponentName.ToUpper()}_CONFIG,
      useValue: { ...default${ComponentNamePascal}Config, ...config }
    }
  ]);
}
"@
$providerTs | Out-File -FilePath "$ComponentPath/src/lib/$ComponentName.provider.ts" -Encoding UTF8
Write-Host "Created $ComponentName.provider.ts" -ForegroundColor Cyan

# 7. Create service file
$serviceTs = @"
import { Injectable, inject } from '@angular/core';
import { ${ComponentName.ToUpper()}_CONFIG, ${ComponentNamePascal}Config, default${ComponentNamePascal}Config } from './$ComponentName.config';

@Injectable({ providedIn: 'root' })
export class ${ComponentNamePascal}Service {
  private config: ${ComponentNamePascal}Config = inject(${ComponentName.ToUpper()}_CONFIG, { optional: true }) ?? default${ComponentNamePascal}Config;
}
"@
$serviceTs | Out-File -FilePath "$ComponentPath/src/lib/$ComponentName.service.ts" -Encoding UTF8
Write-Host "Created $ComponentName.service.ts" -ForegroundColor Cyan

Write-Host ""
Write-Host "Component perfectui/$ComponentName created!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Implement component logic in $ComponentPath/src/lib/"
Write-Host "2. Update exports in $ComponentPath/src/public-api.ts"
Write-Host "3. Build library: npm run build:perfectui"
Write-Host "4. Create demo page in projects/demo/src/app/pages/$ComponentName-demo/"
Write-Host ""
Write-Host "Import in your app:" -ForegroundColor Cyan
Write-Host "  import { provide${ComponentNamePascal} } from 'perfectui/$ComponentName';"
Write-Host "8. Update workflows (ci.yml, publish.yml, deploy-demo.yml)"
Write-Host "9. Create demo page in projects/demo/src/app/pages/"

