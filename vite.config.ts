import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import {VitePWA} from 'vite-plugin-pwa';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon-16x16.png', 'favicon-32x32.png', 'apple-touch-icon.png'],
        manifest: {
          name: 'Kenpo IKKA Assistant',
          short_name: 'Kenpo IKKA',
          description:
            'Entrenamiento de Kenpo Karate: currículum por cinturón, biblioteca de técnicas y modo práctica con temporizador.',
          lang: 'es',
          start_url: '/',
          display: 'standalone',
          orientation: 'portrait',
          background_color: '#121417',
          theme_color: '#121417',
          icons: [
            {src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png'},
            {src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png'},
            {
              src: 'pwa-maskable-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
        workbox: {
          // Audio isn't precached on install (404 files would bloat the initial
          // download); instead it's cached on first play via runtimeCaching below.
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
          runtimeCaching: [
            {
              urlPattern: /\/audio\/.*\.mp3$/,
              handler: 'CacheFirst',
              options: {
                cacheName: 'technique-audio',
                expiration: {
                  maxEntries: 450,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
