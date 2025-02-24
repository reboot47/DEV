export const theme = {
  colors: {
    navy: {
      dark: '#1B1464',
      light: '#4834d4',
    },
    gray: {
      light: '#f5f6fa',
      medium: '#718093',
      dark: '#2f3640',
    },
    pink: {
      light: '#FDA7DF',
    },
    error: '#ff4757',
    success: '#2ed573',
  },
  animation: {
    transition: {
      default: 'all 0.3s ease',
      slow: 'all 0.6s ease',
    },
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
} as const;
