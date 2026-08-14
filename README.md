# Kenpo IKKA Assistant

Aplicación web estática de entrenamiento de Kenpo Karate: currículum por cinturón, biblioteca de técnicas y modo práctica interactivo con temporizador secuencial y aleatorio.

Sin backend ni dependencias externas: todo el estado se guarda en `localStorage` del navegador.

## Desarrollo local

**Requisitos:** Node.js

1. Instalar dependencias:
   `npm install`
2. Levantar el servidor de desarrollo:
   `npm run dev`

## Build de producción

`npm run build` genera una carpeta `dist/` con archivos estáticos listos para desplegar en cualquier hosting (Vercel, Netlify, GitHub Pages, etc.).
