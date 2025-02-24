import { motion } from 'framer-motion';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { theme } from '@/styles/theme';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  isLoading?: boolean;
  as?: 'button' | 'a';
  href?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', isLoading, className = '', as = 'button', href, ...props }, ref) => {
    const baseStyle = 'px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants = {
      primary: `bg-gradient-to-r from-navy-dark to-navy-light text-white ${baseStyle}`,
      secondary: `bg-pink-light text-navy-dark ${baseStyle}`,
      outline: `border-2 border-navy-dark text-navy-dark hover:bg-navy-dark hover:text-white ${baseStyle}`,
    };

    const Component = as === 'a' ? motion.a : motion.button;

    return (
      <Component
        ref={ref as any}
        className={`${variants[variant]} ${className}`}
        whileTap={{ scale: 0.98 }}
        href={href}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          children
        )}
      </Component>
    );
  }
);

Button.displayName = 'Button';

export { Button };
