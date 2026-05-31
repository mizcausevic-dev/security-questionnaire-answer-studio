$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$screenshots = Join-Path $root "screenshots"
New-Item -ItemType Directory -Force -Path $screenshots | Out-Null
Get-ChildItem -Path $screenshots -File -ErrorAction SilentlyContinue | Remove-Item -Force

Add-Type -AssemblyName System.Drawing

function New-ProofImage {
  param(
    [string]$Title,
    [string]$Subtitle,
    [string[]]$Bullets,
    [string]$OutputPath
  )

  $width = 1600
  $height = 900
  $bmp = New-Object System.Drawing.Bitmap($width, $height)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = "AntiAlias"
  $bg = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(7, 10, 15))
  $panelPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(60, 120, 255, 170), 2)
  $textBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(233, 243, 255))
  $mutedBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(186, 200, 218))
  $accentBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(55, 255, 139))
  $dotBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(25, 199, 255))
  $fontTitle = New-Object System.Drawing.Font("Georgia", 30, [System.Drawing.FontStyle]::Bold)
  $fontSub = New-Object System.Drawing.Font("Segoe UI", 16)
  $fontBody = New-Object System.Drawing.Font("Segoe UI", 14)

  $g.FillRectangle($bg, 0, 0, $width, $height)
  $rect = New-Object System.Drawing.Rectangle(40, 40, 1520, 820)
  $g.DrawRectangle($panelPen, $rect)
  $g.DrawString("Security Questionnaire Answer Studio", $fontSub, $accentBrush, 70, 85)
  $g.DrawString($Title, $fontTitle, $textBrush, 70, 135)
  $subtitleRect = New-Object System.Drawing.RectangleF(70, 220, 1400, 80)
  $g.DrawString($Subtitle, $fontSub, $mutedBrush, $subtitleRect)

  $y = 320
  foreach ($bullet in $Bullets) {
    $g.FillEllipse($dotBrush, 85, $y + 8, 10, 10)
    $bulletRect = New-Object System.Drawing.RectangleF(110, $y, 1320, 48)
    $g.DrawString($bullet, $fontBody, $textBrush, $bulletRect)
    $y += 72
  }

  $g.DrawString("Synthetic proof render for README packaging.", $fontSub, $mutedBrush, 70, 800)
  $bmp.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose()
  $bmp.Dispose()
}

New-ProofImage -Title "Answer-studio overview for the next security review" -Subtitle "One executive surface for answer coverage, trust evidence, response maturity, and cycle-time drag." -Bullets @(
  "The overview keeps reusable packs, weak evidence links, and questionnaire-cycle pressure in one board-readable view.",
  "Leadership can see which answer families are ready to reuse and which still require manual rewrites.",
  "This layer turns questionnaire handling into reusable operating leverage instead of ad hoc diligence labor."
) -OutputPath (Join-Path $screenshots "01-overview-proof.png")

New-ProofImage -Title "Questionnaire queue keeps owners, blockers, and next moves connected" -Subtitle "Every route retains the owner, buyer, headline gap, and the next move." -Bullets @(
  "The queue makes it obvious which answer packs are reusable now and which are still slowed by missing ownership.",
  "Blockers stay tied to the actual questionnaire family instead of drifting into generic trust language.",
  "Leadership can tighten the answer queue before the next security or legal review starts."
) -OutputPath (Join-Path $screenshots "02-questionnaire-queue-proof.png")

New-ProofImage -Title "Answer packs show where coverage and maturity still break" -Subtitle "Coverage, response maturity, and company-tag traces stay visible in one reusable answer inventory." -Bullets @(
  "This view keeps IBM, Azure, CyberArk, FinTech, public-sector, and healthcare traces tied to actual live surfaces.",
  "Answer gaps stay visible before a team promises more than the evidence can support.",
  "Leadership can see where the next standard response pack will save the most time."
) -OutputPath (Join-Path $screenshots "03-answer-packs-proof.png")

New-ProofImage -Title "Cycle time keeps questionnaire drag tied to answer quality" -Subtitle "Turnaround pressure remains grounded in response quality, trust evidence, and reuse potential." -Bullets @(
  "The executive story stays tied to actual answer ownership and proof linkage rather than abstract trust messaging.",
  "Slow review paths remain visible before they turn into procurement bottlenecks.",
  "This creates a repeatable cadence for reusable answer packs and faster diligence cycles."
) -OutputPath (Join-Path $screenshots "04-cycle-time-proof.png")
