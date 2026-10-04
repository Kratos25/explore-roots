/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,mdx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2rem' },
      screens: { '2xl': '1280px' },
    },
    extend: {
      colors: {
        canvas: '#F3F1F9',
        surface: '#FFFFFF',
        ink: {
          DEFAULT: '#1A1A1F',
          soft: '#4B4B57',
          muted: '#7A7A88',
        },
        navy: '#1F2A5B',
        sun: {
          DEFAULT: '#FFC72C',
          deep: '#F0AE00',
          soft: '#FFE6A1',
        },
        gold: '#A98D6B',
        charcoal: '#262626',
        whatsapp: {
          DEFAULT: '#0E7A3C',
          hover: '#0A6231',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '14px',
        pill: '999px',
      },
      boxShadow: {
        card: '0 10px 30px -18px rgba(31, 42, 91, 0.35)',
        cardHover: '0 18px 40px -20px rgba(31, 42, 91, 0.45)',
        bar: '0 8px 24px -18px rgba(31, 42, 91, 0.4)',
        cta: '0 8px 18px -10px rgba(240, 174, 0, 0.9)',
      },
      maxWidth: {
        prose: '66ch',
      },
    },
  },
  plugins: [],
};
