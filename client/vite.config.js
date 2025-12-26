import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server:[{
    '/api':'freddy-ten.vercel.app'
  }],
  'dark-mode':'class',
  plugins: [
    react(),
    tailwindcss(),
  ],
})