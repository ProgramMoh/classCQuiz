#!/bin/bash
set -e

mkdir -p /Users/mohgamal/Desktop/DadLicense/images/signs
cd /Users/mohgamal/Desktop/DadLicense/images/signs

echo "Downloading official MUTCD road sign images..."

download_wikimedia() {
    local filename=$1
    local outname=$2
    echo "Fetching $outname..."
    curl -L -s -o "${outname}.png" "https://commons.wikimedia.org/wiki/Special:FilePath/${filename}?width=400"
}

# Standard Signs
download_wikimedia "MUTCD_R1-1.svg" "stop"
download_wikimedia "MUTCD_R1-2.svg" "yield"
download_wikimedia "MUTCD_R5-1.svg" "doNotEnter"
download_wikimedia "MUTCD_R5-1a.svg" "wrongWay"
download_wikimedia "MUTCD_R2-1.svg" "speedLimit"
download_wikimedia "MUTCD_S1-1.svg" "schoolZone"
download_wikimedia "MUTCD_R3-4.svg" "noUTurn"
download_wikimedia "MUTCD_R3-2.svg" "noLeftTurn"
download_wikimedia "MUTCD_W10-1.svg" "railroad"
download_wikimedia "MUTCD_W11-2.svg" "pedestrian"
download_wikimedia "MUTCD_W4-1_-_Right.svg" "merge"
download_wikimedia "MUTCD_W4-2.svg" "laneEnds"
download_wikimedia "MUTCD_W1-2.svg" "curve"
download_wikimedia "MUTCD_W20-1.svg" "construction"
download_wikimedia "MUTCD_W3-1.svg" "stopAhead"
download_wikimedia "MUTCD_D9-6.svg" "handicapped"
download_wikimedia "MUTCD_R3-14.svg" "carpool"

# Traffic Lights
download_wikimedia "Red_Light_Icon.svg" "flashingRed"
download_wikimedia "Yellow_Light_Icon.svg" "flashingYellow"
download_wikimedia "Green_Left_Arrow_Icon.svg" "greenArrow"
download_wikimedia "School_bus_icon.svg" "schoolBus"

echo "Download complete!"
ls -la
