/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Asignamos 'Inter' como la fuente sans-serif por defecto.
        'sans': ['Inter', ...defaultTheme.fontFamily.sans],
        // Asignamos 'Fira Code' como la fuente monoespaciada.
        'mono': ['Fira Code', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        // Nueva paleta de colores elegante y moderna
        'primary': {
          'start': '#FF6B35', // Naranja/coral (acento principal)
          'end': '#3B82F6',   // Azul suave (acento secundario)
        },
        'dark': {
          '900': '#FFFFFF',   // Fondo principal (blanco puro)
          '800': '#F8F9FA',   // Fondo de tarjetas (gris muy claro)
          '700': '#E0DED9',   // Bordes y elementos sutiles (gris claro)
        },
        'light': {
          '100': '#1F2937',   // Texto principal (gris oscuro)
          '200': '#6B7280',   // Texto secundario (gris medio)
          '300': '#9CA3AF',   // Texto terciario (más gris)
        }
      },
      backgroundImage: {
        // Utilidad de gradiente reutilizable
        'gradient-primary': 'linear-gradient(to right, theme(colors.primary.start), theme(colors.primary.end))',
      }
    },
  },
  plugins: [],
} 