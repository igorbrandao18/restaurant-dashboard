export const theme = {
  colors: {
    primary: '#4F46E5', // indigo-600
    primaryHover: '#4338CA', // indigo-700
    secondary: '#6B7280', // gray-500
    success: '#059669', // green-600
    danger: '#DC2626', // red-600
    warning: '#D97706', // yellow-600
    info: '#2563EB', // blue-600
    background: '#F9FAFB', // gray-50
    white: '#FFFFFF',
    text: {
      primary: '#111827', // gray-900
      secondary: '#4B5563', // gray-600
      light: '#9CA3AF', // gray-400
    },
    border: {
      light: '#E5E7EB', // gray-200
      default: '#D1D5DB', // gray-300
    }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
  },
  borderRadius: {
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '1rem',
    '2xl': '1.5rem',
    full: '9999px',
  },
  typography: {
    fontFamily: {
      sans: 'Inter, system-ui, -apple-system, sans-serif',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    }
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  transitions: {
    default: '0.2s ease-in-out',
    fast: '0.1s ease-in-out',
    slow: '0.3s ease-in-out',
  }
} as const;

export type Theme = typeof theme;