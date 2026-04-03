import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],

  server: {
    proxy: {
      // Same-origin /api in dev → Django (see frontend/.env.example). Avoids CORS during local work.
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
  },

  resolve: {
      alias: {
        // Створюємо аліас для зручного доступу до стилів
        '@styles': path.resolve(__dirname, './src/styles'),
      },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Додаємо шляхи, де Sass має шукати файли
        includePaths: ['src/styles'],
        // Або для новіших версій:
        loadPaths: ['src/styles'],
      },
    },
  },
})
