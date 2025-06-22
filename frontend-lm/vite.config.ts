// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
        // No necesitamos reescribir la ruta, ya que el backend espera el prefijo /api.
        // Al eliminar la siguiente línea, la petición a /api/users/
        // se reenviará correctamente a http://127.0.0.1:8000/api/users/
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})