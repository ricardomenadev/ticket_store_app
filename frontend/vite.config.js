import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Esta es la línea importante que necesitamos agregar
  resolve: {
    extensions: ['.js', '.jsx']
  }
})