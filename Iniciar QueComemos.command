#!/bin/bash
cd "$(dirname "$0")"

if ! command -v node >/dev/null 2>&1; then
  echo ""
  echo "  Falta instalar Node.js en esta computadora."
  echo "  Descargalo gratis desde: https://nodejs.org (botón verde, versión LTS)"
  echo "  Después de instalarlo, volvé a hacer doble click en este archivo."
  echo ""
  read -p "Presioná Enter para cerrar..."
  exit 1
fi

if ! command -v pnpm >/dev/null 2>&1; then
  echo "Preparando el instalador (solo la primera vez)..."
  corepack enable 2>/dev/null || sudo corepack enable
fi

if [ ! -d node_modules ] || [ ! -d dist ]; then
  echo "Instalando Qué Comemos (solo la primera vez, puede tardar unos minutos)..."
  pnpm install
fi

echo "Iniciando Qué Comemos..."
pnpm start
