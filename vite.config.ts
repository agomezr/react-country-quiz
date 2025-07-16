import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/react-country-quiz/', // for gh-pages
  build: {
    outDir: 'dist', // Vite's default, but good to be explicit
  },
  plugins: [
    react(),
    tailwindcss()
  ],
})
