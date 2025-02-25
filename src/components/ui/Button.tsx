import { motion } from 'framer-motion';
import { theme } from '@/styles/theme';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center rounded font-medium transition-all";
  
  const variants = {
    primary: `bg-navy-dark text-white hover:bg-navy-light disabled:bg-gray-200`,
    secondary: `bg-white text-navy-dark border-2 border-navy-dark hover:bg-gray-100 disabled:border-gray-200 disabled:text-gray-400`,
    text: `text-navy-dark hover:text-navy-light disabled:text-gray-400`,
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const buttonAnimation = {
    tap: { scale: 0.98 },
    hover: { 
      y: -2,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.button
      whileTap="tap"
      whileHover="hover"
      variants={buttonAnimation}
      className={twMerge(
        baseStyles,
        variants[variant],
        sizes[size],
        isLoading && "cursor-wait opacity-70",
        disabled && "cursor-not-allowed",
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          処理中...
        </>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </>
      )}
    </motion.button>
  );
};
