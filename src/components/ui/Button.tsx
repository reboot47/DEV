import { forwardRef, ElementType } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { theme } from '@/styles/theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline';

type MotionButtonProps = HTMLMotionProps<"button">;
type MotionAnchorProps = HTMLMotionProps<"a">;

type ButtonBaseProps = {
  variant?: ButtonVariant;
  as?: 'button' | 'a';
  isLoading?: boolean;
  children?: React.ReactNode;
};

type ButtonAsButton = ButtonBaseProps & Omit<MotionButtonProps, keyof ButtonBaseProps> & {
  as?: 'button';
  href?: never;
};

type ButtonAsAnchor = ButtonBaseProps & Omit<MotionAnchorProps, keyof ButtonBaseProps> & {
  as: 'a';
  href: string;
};

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const variants = {
  primary: 'bg-gradient-to-r from-[var(--color-navy-dark)] to-[var(--color-navy-light)] text-white hover:opacity-90',
  secondary: 'bg-white text-[var(--color-navy-dark)] border-2 border-[var(--color-navy-dark)] hover:bg-gray-50',
  outline: 'bg-transparent text-[var(--color-navy-dark)] border-2 border-[var(--color-navy-dark)] hover:bg-gray-50',
};

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = 'primary', className = '', as = 'button', isLoading, children, ...props }, ref) => {
    const baseClassName = 'inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

    const Component = motion[as];

    return (
      <Component
        ref={ref}
        className={`${variants[variant]} ${baseClassName} ${className}`}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading...
          </div>
        ) : (
          children
        )}
      </Component>
    );
  }
);

Button.displayName = 'Button';
