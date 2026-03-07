#!/bin/bash
# Script para comprimir video-boda.mp4 (requiere ffmpeg)
# Ejecutar: ./scripts/optimize-video.sh
# Reduce el video a ~1MB manteniendo calidad aceptable para web

INPUT="src/assets/images/banner-home/video-boda.mp4"
OUTPUT="src/assets/images/banner-home/video-boda-optimized.mp4"
BACKUP="src/assets/images/banner-home/video-boda-backup.mp4"

if ! command -v ffmpeg &> /dev/null; then
  echo "ffmpeg no encontrado. Instala con: brew install ffmpeg"
  exit 1
fi

if [ ! -f "$INPUT" ]; then
  echo "No se encontró $INPUT"
  exit 1
fi

echo "Comprimiendo video..."
ffmpeg -i "$INPUT" -c:v libx264 -crf 28 -preset slow -movflags +faststart -an -y "$OUTPUT" 2>/dev/null

if [ -f "$OUTPUT" ]; then
  ORIGINAL=$(wc -c < "$INPUT")
  NUEVO=$(wc -c < "$OUTPUT")
  echo "Original: $((ORIGINAL/1024)) KB"
  echo "Optimizado: $((NUEVO/1024)) KB"
  echo "Ahorro: $(((ORIGINAL-NUEVO)/1024)) KB"
  echo ""
  echo "Para aplicar: mv $INPUT $BACKUP && mv $OUTPUT $INPUT"
  echo "Actualiza wedding-info.ts si usas un nombre diferente."
fi
