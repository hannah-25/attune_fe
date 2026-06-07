import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/',
  server: {
    port: 3000,
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      registerType: 'autoUpdate',
      manifestFilename: 'manifest-v2.webmanifest',
      includeAssets: ['pwa-v2-192x192.png', 'pwa-v2-512x512.png', 'pwa-v2-maskable-512x512.png'],
      manifest: {
        name: 'a.tune',
        short_name: 'a.tune',
        description: 'ADHD 약물 복용 추적 및 일지 앱',
        theme_color: '#1f1b2e',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/home',
        icons: [
          {
            src: 'pwa-v2-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'pwa-v2-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'pwa-v2-maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      injectManifest: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/app'),
      '@src': path.resolve(__dirname, './src'),
    },
  },
})
