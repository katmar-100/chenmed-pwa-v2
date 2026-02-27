/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        navy: { DEFAULT: '#2D2B55', light: '#3D3B65' },
        teal: { DEFAULT: '#0D7C7C', light: '#1A9E8F', pale: '#E8F5F3' },
        purple: { DEFAULT: '#9B4DCA', soft: '#C77DBA', pale: '#F3EBF8' },
        surface: { DEFAULT: '#F8F6FA', card: '#FFFFFF', muted: '#EDEAF2' },
        text: { DEFAULT: '#4A4458', muted: '#8E849B' },
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
