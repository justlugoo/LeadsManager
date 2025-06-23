// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: '/src/components',
      pages: '/src/pages',
      hooks: '/src/hooks',
      context: '/src/context',
      services: '/src/services',
      types: '/src/types',
      utils: '/src/utils',
      config: '/src/config',
      routes: '/src/routes',
    },
  },
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