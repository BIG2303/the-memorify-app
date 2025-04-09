import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 📍 Указываем корень и выходную директорию
export default defineConfig({
  root: './webapp',        // указываем корень проекта
  build: {
    outDir: '../dist',     // куда собирать проект
    emptyOutDir: true,
  },
  plugins: [react()],
})
