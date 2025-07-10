import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    quasar({
      sassVariables: 'src/quasar-variables.sass'
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },

  // Tambahan konfigurasi Vitest:
  test: {
    globals: true,            // agar bisa pakai expect, describe tanpa import (optional)
    environment: 'jsdom',     // environment yang mendukung DOM (untuk testing vue)
    include: ['src/tests/**/*.test.js', 'src/tests/**/*.spec.js'],  // folder dan pola file test
  }
})
