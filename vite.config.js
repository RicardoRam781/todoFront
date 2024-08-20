import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'TodoList PWA',
        short_name: 'todoPWA',
        description: 'Progressive Web App',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        icons: [
          {
            src: "pwa-64x64.png",
            type: "image/png",
            sizes: "64x64",
            purpose: "maskable"
          },
          {
            src: "pwa-192x192.png",
            type: "image/png",
            sizes: "192x192",
            purpose: "any"
          },
          {
            src: "pwa-512x512.png",
            type: "image/png",
            sizes: "512x512",
            purpose: "maskable"
          }
           
        ],
        start_url: '/',
        display: 'standalone'
      },
      workbox: {
        // Workbox options (if needed)
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.example\.com\/.*$/,
            handler: 'NetworkFirst'
          }
        ]
      }
    })
  ]
});