Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$source = [System.Drawing.Bitmap]::FromFile((Join-Path $root 'assets/grade.png'))
$destination = Join-Path $root 'assets/selecionaveis'
New-Item -ItemType Directory -Force $destination | Out-Null

$positions = @(
  @(173,303), @(354,303), @(535,303), @(715,303), @(897,303),
  @(173,520), @(354,520), @(535,520), @(715,520), @(897,520),
  @(173,736), @(354,736), @(535,736), @(715,736), @(897,736)
)
for ($index = 0; $index -lt $positions.Count; $index++) {
  $crop = [System.Drawing.Bitmap]::new(164, 204, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $graphics = [System.Drawing.Graphics]::FromImage($crop)
  $graphics.DrawImage($source, [System.Drawing.Rectangle]::new(0,0,164,204), [System.Drawing.Rectangle]::new($positions[$index][0],$positions[$index][1],164,204), [System.Drawing.GraphicsUnit]::Pixel)
  $crop.Save((Join-Path $destination ("{0}.png" -f ($index + 1))), [System.Drawing.Imaging.ImageFormat]::Png)
  $graphics.Dispose(); $crop.Dispose()
}
$source.Dispose()
