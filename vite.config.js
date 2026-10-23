import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' — чтобы сборка работала и на GitHub Pages из подпапки
export default defineConfig({
  base: './',
  plugins: [react()],
  server: { host: true, port: 5180 },
})
