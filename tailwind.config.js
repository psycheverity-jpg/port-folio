/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        kexBg: '#0a0a0a',
        kexCard: '#121212',
        kexBorder: '#27272a',
        kexMuted: '#a1a1aa',
        kexDim: '#52525b'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Space Mono', 'monospace']
      }
    },
  },
  plugins: [],
};
