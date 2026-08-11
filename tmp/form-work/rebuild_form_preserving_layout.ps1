$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression.FileSystem

$root = 'C:\Users\唐乐\Desktop\个人网站'
$source = Join-Path $root '01 应聘人员信息登记表.xlsx'
$output = Join-Path $root '01 应聘人员信息登记表-已填写.xlsx'
$photo = Join-Path $root 'tmp\form-work\resume-photo.jpg'
$work = 'C:\Users\唐乐\AppData\Local\Temp\codex-form-rebuild'

if (Test-Path $work) { Remove-Item -LiteralPath $work -Recurse -Force }
New-Item -ItemType Directory -Path $work | Out-Null
[IO.Compression.ZipFile]::ExtractToDirectory($source, $work)

$sheetPath = Join-Path $work 'xl\worksheets\sheet1.xml'
$sheet = New-Object Xml.XmlDocument
$sheet.PreserveWhitespace = $true
$sheet.Load($sheetPath)
$sheetNs = 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'
$relNs = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
$ns = New-Object Xml.XmlNamespaceManager($sheet.NameTable)
$ns.AddNamespace('x', $sheetNs)
$ns.AddNamespace('r', $relNs)

function Decode-Text([string]$value) {
  return [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($value))
}

function Get-Cell([string]$reference) {
  $cell = $sheet.SelectSingleNode("//x:c[@r='$reference']", $ns)
  if ($null -eq $cell) { throw "Template cell $reference was not found." }
  return $cell
}

function Set-CellText([string]$reference, [string]$value) {
  $cell = Get-Cell $reference
  $cell.SetAttribute('t', 'inlineStr')
  while ($cell.HasChildNodes) { [void]$cell.RemoveChild($cell.FirstChild) }
  $inline = $sheet.CreateElement('is', $sheetNs)
  $text = $sheet.CreateElement('t', $sheetNs)
  $space = $sheet.CreateAttribute('xml', 'space', 'http://www.w3.org/XML/1998/namespace')
  $space.Value = 'preserve'
  [void]$text.Attributes.Append($space)
  $text.InnerText = $value
  [void]$inline.AppendChild($text)
  [void]$cell.AppendChild($inline)
}

function Clear-Cell([string]$reference) {
  $cell = Get-Cell $reference
  [void]$cell.Attributes.RemoveNamedItem('t')
  while ($cell.HasChildNodes) { [void]$cell.RemoveChild($cell.FirstChild) }
}

$values = [ordered]@{
  B5 = '5ZSQ5LmQ'; E5 = '55S3'; G5 = 'MjAwNS0wNC0yNA=='; M5 = '5rGJ'
  B6 = '5YWx6Z2S5Zui5ZGY'; E6 = '5pyq5ama'; G6 = '5YGl5bq3'; M6 = 'MTcz'
  B7 = '4piR5Lit5Zu9ICDilqHlpJbnsY0='; E7 = '5LqR5Y2X5piG5piO'; G7 = 'MTgwNjQ4NzEyNjg='; M7 = 'MjA2MTc5MDg3NUBxcS5jb20='
  B8 = '5LiK5rW35biC'; E8 = '5LiK5rW35biC5b6Q5rGH5Yy65ryV5a6d6LevMTIx5Y+3'
  B9 = '4pah572R56uZICAgICAg4pah5oub6IGY5LyaICAgICAg4pah54yO5aS0ICAgICAg4piR5YaF6YOo5o6o6I2Q77yI5o6o6I2Q5Lq677ya56Wd5Zu95YW077yJICAgICAg4pah5aSW6YOo5o6o6I2Q77yI5o6o6I2Q5Lq677yaICAgICAgICAgICAgICAgIO+8iQ=='
  B10 = '4piR5pegICAgICAgICAgICDilqHmnInvvIjor7TmmI7vvInvvJo='; G10 = '4piR5pegICAgICAgICAgICDilqHmnInvvIjor7TmmI7vvInvvJo='
  B12 = '54i25Lqy'; C12 = '5ZSQ5L+K5Y2X'; D12 = '5Lit5Zu9'; E12 = 'NTM='; F12 = '5piG5piO6ZOB6Lev5bGA5L6b55S15q61ICDmmIbmmI7luILnm5jpvpnljLrpvpnms4not6/kuIrmnpflrr3looM='; N12 = 'MTgwODczNDkxMjY='
  B13 = '5q+N5Lqy'; C13 = '5LmQ5Li96JCN'; D13 = '5Lit5Zu9'; E13 = 'NDk='; F13 = '5piG5piO6YeN5bel5Lit5a2mICDmmIbmmI7luILnm5jpvpnljLrpvpnms4not6/kuIrmnpflrr3looM='; N13 = 'MTgwODczNDkxMzY='
  D20 = '6IO95ZCm5o+Q5L6b6ZO26KGM5rWB5rC0L+ekvuS/neivgeaYjg=='; F20 = '4piR5pivICAgICDilqHlkKY='; M20 = 'MjAyNi0wOC0wMQ=='
  B22 = 'MjAyMy0xMCDoh7Pku4o='; D22 = '5LiK5rW35bqU55So5oqA5pyv5aSn5a2m'; I22 = '6L2v5Lu25bel56iL'; M22 = '5pys56eR'; O22 = 'Q0VULTbvvJvmma7pgJror53kuoznuqfkuZnnrYkK5a2X6IqC6Lez5YqoIFRSQUUgQUkg5aSn6LWb77ya5YWo5Zu95YmNMzUw5ZCN44CB5aSN6LWb'
  B25 = 'MjAyNi0wNA=='; D25 = '5qCh5YWa5qCh56ysIDUxIOacn+WFpeWFmuenr+aegeWIhuWtkOWfueiureePrQ=='; I25 = '5YWl5YWa56ev5p6B5YiG5a2Q'; O25 = '6ICD6K+V5ZCI5qC877yM57uT5Lia'
  B27 = '6Iux6K+tIENFVC02'; E27 = '54af57uD5L2/55SoIFB5dGhvbuOAgUphdmHjgIHliY3nq6/lj4rlvq7kv6HlsI/nqIvluo/lvIDlj5E='; I27 = '4piR5Liq5Lq65Y+R5bGVICAg4piR6KGM5Lia5ZC45byV5YqbICAg4piR6Jaq6YWsCuKYkee7hOe7h+awlOawmyAgIOKYkeWFrOWPuOWTgeeJjCAgICAg4pah5YW25LuW'
  B28 = '5o6M5o+hIFB5dGhvbuOAgUphdmHjgIFDL0MrK+OAgUhUTUwvQ1NTL0pT77yb54af5oKJIEZsYXNr44CBUmVhY3TjgIFUeXBlU2NyaXB044CBVml0ZeOAgUV4cHJlc3PjgIFQcmlzbWHjgIFTUUxpdGUvTXlTUUwg5Y+K5b6u5L+h5Y6f55Sf5bCP56iL5bqP44CB5LqR5byA5Y+R44CCQUkgQWdlbnQg5bqU55So5byA5Y+R57uP6aqM77yM5Y+v54us56uL5a6M5oiQ5YmN5ZCO56uv5byA5Y+R44CB5o6l5Y+j6K6+6K6h44CB5pWw5o2u5oyB5LmF5YyW44CB6LCD6K+V5rWL6K+V5LiO6aG555uu5Lqk5LuY44CC'
  B32 = '5ZSQ5LmQ'; G32 = 'MjAyNi0wNy0zMQ=='
}

foreach ($entry in $values.GetEnumerator()) { Set-CellText $entry.Key (Decode-Text $entry.Value) }
Clear-Cell 'M8'

$settings = New-Object Xml.XmlWriterSettings
$settings.Encoding = New-Object Text.UTF8Encoding($false)
$settings.Indent = $false
$writer = [Xml.XmlWriter]::Create($sheetPath, $settings)
$sheet.Save($writer)
$writer.Dispose()

# Add the resume photo as a foreground drawing without removing the template background relationship.
$drawingDir = Join-Path $work 'xl\drawings'
New-Item -ItemType Directory -Path (Join-Path $drawingDir '_rels') -Force | Out-Null
Copy-Item -LiteralPath $photo -Destination (Join-Path $work 'xl\media\resume-photo.jpg') -Force
$drawingXml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><xdr:wsDr xmlns:xdr="http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><xdr:oneCellAnchor><xdr:from><xdr:col>14</xdr:col><xdr:colOff>0</xdr:colOff><xdr:row>4</xdr:row><xdr:rowOff>0</xdr:rowOff></xdr:from><xdr:ext cx="1175000" cy="1480000"/><xdr:pic><xdr:nvPicPr><xdr:cNvPr id="1" name="Resume photo"/><xdr:cNvPicPr><a:picLocks noChangeAspect="1"/></xdr:cNvPicPr></xdr:nvPicPr><xdr:blipFill><a:blip r:embed="rId1"/><a:stretch><a:fillRect/></a:stretch></xdr:blipFill><xdr:spPr><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></xdr:spPr></xdr:pic><xdr:clientData/></xdr:oneCellAnchor></xdr:wsDr>'
[IO.File]::WriteAllText((Join-Path $drawingDir 'drawing1.xml'), $drawingXml, (New-Object Text.UTF8Encoding($false)))
$drawingRel = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/resume-photo.jpg"/></Relationships>'
[IO.File]::WriteAllText((Join-Path $drawingDir '_rels\drawing1.xml.rels'), $drawingRel, (New-Object Text.UTF8Encoding($false)))

$relsPath = Join-Path $work 'xl\worksheets\_rels\sheet1.xml.rels'
$rels = New-Object Xml.XmlDocument
$rels.Load($relsPath)
$packageRelNs = 'http://schemas.openxmlformats.org/package/2006/relationships'
$relsNs = New-Object Xml.XmlNamespaceManager($rels.NameTable)
$relsNs.AddNamespace('p', $packageRelNs)
$existing = $rels.SelectSingleNode("/p:Relationships/p:Relationship[@Id='rId2']", $relsNs)
if ($null -eq $existing) {
  $drawingRelNode = $rels.CreateElement('Relationship', $packageRelNs)
  $drawingRelNode.SetAttribute('Id', 'rId2')
  $drawingRelNode.SetAttribute('Type', 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing')
  $drawingRelNode.SetAttribute('Target', '../drawings/drawing1.xml')
  [void]$rels.DocumentElement.AppendChild($drawingRelNode)
}
$writer = [Xml.XmlWriter]::Create($relsPath, $settings)
$rels.Save($writer)
$writer.Dispose()

$sheet = New-Object Xml.XmlDocument
$sheet.PreserveWhitespace = $true
$sheet.Load($sheetPath)
$ns = New-Object Xml.XmlNamespaceManager($sheet.NameTable)
$ns.AddNamespace('x', $sheetNs)
$sheetDrawing = $sheet.SelectSingleNode('/x:worksheet/x:drawing', $ns)
if ($null -eq $sheetDrawing) {
  $sheetDrawing = $sheet.CreateElement('drawing', $sheetNs)
  $drawingId = $sheet.CreateAttribute('r', 'id', $relNs)
  $drawingId.Value = 'rId2'
  [void]$sheetDrawing.Attributes.Append($drawingId)
  $picture = $sheet.SelectSingleNode('/x:worksheet/x:picture', $ns)
  [void]$sheet.DocumentElement.InsertBefore($sheetDrawing, $picture)
}
$writer = [Xml.XmlWriter]::Create($sheetPath, $settings)
$sheet.Save($writer)
$writer.Dispose()

$typesPath = Join-Path $work '[Content_Types].xml'
$types = New-Object Xml.XmlDocument
$types.Load($typesPath)
$typeNs = 'http://schemas.openxmlformats.org/package/2006/content-types'
$typesNs = New-Object Xml.XmlNamespaceManager($types.NameTable)
$typesNs.AddNamespace('ct', $typeNs)
if ($null -eq $types.SelectSingleNode("/ct:Types/ct:Default[@Extension='jpg']", $typesNs)) {
  $default = $types.CreateElement('Default', $typeNs)
  $default.SetAttribute('Extension', 'jpg')
  $default.SetAttribute('ContentType', 'image/jpeg')
  [void]$types.DocumentElement.AppendChild($default)
}
if ($null -eq $types.SelectSingleNode("/ct:Types/ct:Override[@PartName='/xl/drawings/drawing1.xml']", $typesNs)) {
  $override = $types.CreateElement('Override', $typeNs)
  $override.SetAttribute('PartName', '/xl/drawings/drawing1.xml')
  $override.SetAttribute('ContentType', 'application/vnd.openxmlformats-officedocument.drawing+xml')
  [void]$types.DocumentElement.AppendChild($override)
}
$writer = [Xml.XmlWriter]::Create($typesPath, $settings)
$types.Save($writer)
$writer.Dispose()

$staged = 'C:\Users\唐乐\AppData\Local\Temp\01 应聘人员信息登记表-已填写-修复版.xlsx'
if (Test-Path $staged) { Remove-Item -LiteralPath $staged -Force }
[IO.Compression.ZipFile]::CreateFromDirectory($work, $staged, [IO.Compression.CompressionLevel]::Optimal, $false)
Copy-Item -LiteralPath $staged -Destination $output -Force
Write-Output "Rebuilt form saved: $output"
