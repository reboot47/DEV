import { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { theme } from '@/styles/theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline';

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "as"> {
  variant?: ButtonVariant;
  as?: 'button' | 'a';
  href?: string;
  isLoading?: boolean;
  children?: React.ReactNode;
}

const variants = {
  primary: 'bg-gradient-to-r from-[var(--color-navy-dark)] to-[var(--color-navy-light)] text-white hover:opacity-90',
  secondary: 'bg-white text-[var(--color-navy-dark)] border-2 border-[var(--color-navy-dark)] hover:bg-gray-50',
  outline: 'bg-transparent text-[var(--color-navy-dark)] border-2 border-[var(--color-navy-dark)] hover:bg-gray-50',
};

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ children, variant = 'primary', className = '', as: Component = 'button', isLoading, href, ...props }, ref) => {
    const baseClassName = 'inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

    const MotionComponent = motion[Component as 'button' | 'a'];

    return (
      <MotionComponent
        ref={ref}
        className={`${variants[variant]} ${baseClassName} ${className}`}
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
      </MotionComponent>
    );
  }
);

Button.displayName = 'Button';
