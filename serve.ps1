param(
  [int]$Port = 5500
)

$root = (Get-Location).Path
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")

$mimeTypes = @{
  ".css" = "text/css"
  ".html" = "text/html"
  ".js" = "application/javascript"
  ".jpg" = "image/jpeg"
  ".jpeg" = "image/jpeg"
  ".png" = "image/png"
  ".pdf" = "application/pdf"
  ".svg" = "image/svg+xml"
  ".webp" = "image/webp"
}

try {
  $listener.Start()
  Write-Host "Portfolio running at http://localhost:$Port"
  Write-Host "Press Ctrl+C to stop."

  while ($listener.IsListening) {
    $context = $listener.GetContext()
    $relativePath = [System.Net.WebUtility]::UrlDecode($context.Request.Url.AbsolutePath.TrimStart('/')).Replace('/', '\')

    if ([string]::IsNullOrWhiteSpace($relativePath)) {
      $relativePath = "index.html"
    }

    $filePath = Join-Path $root $relativePath

    if (Test-Path -LiteralPath $filePath -PathType Leaf) {
      $bytes = [System.IO.File]::ReadAllBytes($filePath)
      $extension = [System.IO.Path]::GetExtension($filePath).ToLowerInvariant()
      if ($mimeTypes.ContainsKey($extension)) {
        $context.Response.ContentType = $mimeTypes[$extension]
      }
      $context.Response.StatusCode = 200
    } else {
      $bytes = [System.Text.Encoding]::UTF8.GetBytes("404 - File not found")
      $context.Response.StatusCode = 404
      $context.Response.ContentType = "text/plain"
    }

    $context.Response.ContentLength64 = $bytes.Length
    $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    $context.Response.Close()
  }
} catch [System.Net.HttpListenerException] {
  if ($_.Exception.Message -like "*conflicts with an existing registration*" -or $_.Exception.ErrorCode -eq 183) {
    Write-Error "Port $Port is already in use. Stop the other server or run this script with another port, for example: .\serve.ps1 -Port 5501"
    exit 1
  }

  throw
} finally {
  if ($listener.IsListening) {
    $listener.Stop()
  }
  $listener.Close()
}
