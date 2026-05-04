/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#FAF9F5',
        bgsoft: '#F2EEE5',
        paper: '#FFFFFF',
        ink: '#1F1E1B',
        inksoft: '#5C5A52',
        inkmuted: '#8A877E',
        line: '#E6E1D6',
        linestrong: '#D4CDBE',
        accent: '#C2410C',
        accentsoft: '#FBEADD',
        teal: { DEFAULT: '#0F766E', soft: '#E6F2F0' },
        warn: { DEFAULT: '#B45309', soft: '#FDF3D8' },
        codebg: '#1B1B19',
        codeink: '#F2EFE6'
      },
      fontFamily: {
        sans: ['Pretendard', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'Menlo', 'Consolas', 'monospace']
      },
      boxShadow: {
        sm2: '0 1px 2px rgba(31,30,27,.05)',
        md2: '0 8px 24px -12px rgba(31,30,27,.18)',
        lg2: '0 24px 48px -20px rgba(31,30,27,.25)'
      },
      borderRadius: { r1: '8px', r2: '12px', r3: '18px' },
      keyframes: {
        fade: { '0%': { opacity: 0, transform: 'translateY(4px)' }, '100%': { opacity: 1, transform: 'none' } },
        slide: { '0%': { opacity: 0, transform: 'translateY(-8px)' }, '100%': { opacity: 1, transform: 'none' } }
      },
      animation: { fade: 'fade .25s ease', slide: 'slide .2s ease' }
    }
  },
  plugins: []
}
