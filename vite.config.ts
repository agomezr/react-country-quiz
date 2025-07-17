import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/react-country-quiz/', // for ghpages
  build: {
    outDir: 'docs',  // for ghpages
  },
  plugins: [
    react(),
    tailwindcss()
  ],
})
