@echo off
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo   Falta instalar Node.js en esta computadora.
  echo   Descargalo gratis desde: https://nodejs.org  ^(boton verde, version LTS^)
  echo   Despues de instalarlo, volve a hacer doble click en este archivo.
  echo.
  pause
  exit /b 1
)

where pnpm >nul 2>nul
if errorlevel 1 (
  echo Preparando el instalador ^(solo la primera vez^)...
  call corepack enable
)

if not exist node_modules (
  echo Instalando Que Comemos ^(solo la primera vez, puede tardar unos minutos^)...
  call pnpm install
) else if not exist dist (
  echo Instalando Que Comemos ^(solo la primera vez, puede tardar unos minutos^)...
  call pnpm install
)

echo Iniciando Que Comemos...
call pnpm start
