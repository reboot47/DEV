export const theme = {
  colors: {
    navy: {
      dark: '#1a237e',    // メインカラー
      light: '#3949ab',   // アクセント
    },
    pink: {
      light: '#f8bbd0',   // 補助色
    },
    gray: {
      100: '#f5f5f5',     // 背景
      200: '#eeeeee',     // 区切り
      700: '#616161',     // テキスト
    },
    error: '#ef5350',     // エラー
    success: '#66bb6a',   // 成功
  },
  
  typography: {
    fontFamily: {
      jpMain: "'Noto Sans JP', sans-serif",
      jpAccent: "'M PLUS Rounded 1c', sans-serif",
      enMain: "'Inter', sans-serif",
      enAccent: "'Roboto', sans-serif",
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
    },
  },

  spacing: {
    xs: '0.25rem',     // 4px
    sm: '0.5rem',      // 8px
    md: '1rem',        // 16px
    lg: '1.5rem',      // 24px
    xl: '2rem',        // 32px
  },

  breakpoints: {
    mobile: '640px',
    tablet: '768px',
    laptop: '1024px',
    desktop: '1280px',
  },

  animation: {
    transition: {
      fast: '100ms',
      base: '200ms',
      slow: '300ms',
    },
  },
} as const;
