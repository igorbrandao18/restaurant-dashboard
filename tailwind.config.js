/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  important: true,
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3f51b5',
          light: '#757de8',
          dark: '#002984',
          hover: '#303f9f',
        },
        secondary: {
          DEFAULT: '#f50057',
          light: '#ff4081',
          dark: '#c51162',
        },
        background: {
          DEFAULT: '#f5f5f5',
          dark: '#e0e0e0',
          paper: '#ffffff',
        },
        success: {
          DEFAULT: '#4caf50',
          light: '#81c784',
          dark: '#388e3c',
        },
        warning: {
          DEFAULT: '#ff9800',
          light: '#ffb74d',
          dark: '#f57c00',
        },
        error: {
          DEFAULT: '#f44336',
          light: '#e57373',
          dark: '#d32f2f',
        },
        info: {
          DEFAULT: '#2196f3',
          light: '#64b5f6',
          dark: '#1976d2',
        },
        nav: {
          DEFAULT: '#4f372f',
          text: '#ffffff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        DEFAULT: '0.5rem',
      },
    },
  },
  plugins: [],
}; 