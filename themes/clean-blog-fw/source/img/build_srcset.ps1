$images = dir *.jpg | sort -Descending length | select -Skip 1  | sort length

$guetzli = dir  "$env:HOMEPATH\downloads\*guetzli*.exe" | sort -Descending LastWriteTime | select -First 1

if($guetzli -eq $null){
    Write-Host -ForegroundColor Red "could not find guetzli in $env:HOMEPATH\downloads\"
    exit
}

$guetzli = $guetzli.FullName

$images | foreach {
    write-host "generating optimized image for $_"
    &$guetzli --quality 85 "$_" "$_.optimized.jpg"

    if($LASTEXITCODE -ne 0){
        write-host "error when calling guetzli, exiting!" -ForegroundColor Red
        exit
    }
}

$images | remove-item

add-type -AssemblyName System.Drawing

$images = dir *.jpg.optimized.jpg | sort length

$p1 = Split-Path (Split-Path $images[0] -Parent) -Leaf


Write-Host -ForegroundColor Green "coversrcset: "
$images | Rename-Item -NewName {
    $img = New-Object System.Drawing.Bitmap $_.FullName
    $width = $img.Width
    $img.Dispose();

    Write-Host -ForegroundColor Green " - /img/$p1/$width.jpg ${width}w"

    return "$width.jpg"

}
