# The following lines ensure that the script stops as soon 
# as it encounters the first error while executing it.
Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
$PSDefaultParameterValues['*:ErrorAction'] = 'Stop'

function ThrowOnNativeFailure {
    [CmdletBinding()]
    param (
        [Parameter(Mandatory = $false)]
        [string]$Message = "Native Failure"
    )

    if (-not $?) {
        throw $Message
    }
}

$BuildDir = './build'

if (Test-Path -Path $BuildDir) {
    Remove-Item -Path $BuildDir -Recurse -Force
}
else {
    Write-Host "[Generate All]: ${BuildDir} Not Found"
}

npm run openapi:mint
ThrowOnNativeFailure -Message "OpenAPI Mint Failed"

npm run openapi:generate-client
ThrowOnNativeFailure -Message "OpenAPI Client Generation Failed"

npm run openapi:generate-server
ThrowOnNativeFailure -Message "OpenAPI Server Generation Failed"

npm run openapi:generate-swagger
ThrowOnNativeFailure -Message "OpenAPI Swagger JSON Generation Failed"

npm run openapi:client-docs
ThrowOnNativeFailure -Message "OpenAPI Client Docs Generation Failed"
