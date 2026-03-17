import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  server: {
    host: true,
    port: 5173,
    proxy: {
      "/api": {
        target: "http://cosplanner.backend:8000",
        changeOrigin: true
      }
    },
  },
  plugins: [
    vue(),
    vueDevTools(),
  ],
  preview: {
    port: 4173,
    host: true,
    allowedHosts: ['cosplanner-front.onrender.com', 'localhost'],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
