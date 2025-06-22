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
          'start': '#8B5CF6', // Púrpura vibrante
          'end': '#3B82F6',   // Azul vibrante
        },
        'dark': {
          '900': '#111827', // Fondo principal (casi negro)
          '800': '#1F2937', // Fondo de tarjetas
          '700': '#374151', // Bordes y elementos sutiles
        },
        'light': {
          '100': '#F9FAFB', // Texto principal (blanco roto)
          '200': '#E5E7EB', // Texto secundario
          '300': '#9CA3AF', // Texto terciario (más gris)
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