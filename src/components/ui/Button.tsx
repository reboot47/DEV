import { forwardRef } from 'react';
import { motion } from 'framer-motion';

type ButtonVariant = 'primary' | 'secondary' | 'outline';

const variants = {
  primary: 'bg-gradient-to-r from-[var(--color-navy-dark)] to-[var(--color-navy-light)] text-white hover:opacity-90',
  secondary: 'bg-white text-[var(--color-navy-dark)] border-2 border-[var(--color-navy-dark)] hover:bg-gray-50',
  outline: 'bg-transparent text-[var(--color-navy-dark)] border-2 border-[var(--color-navy-dark)] hover:bg-gray-50',
};

const baseClassName = 'inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

const LoadingSpinner = () => (
  <div className="flex items-center">
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    Loading...
  </div>
);

// Button component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
}

const ButtonBase = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', className = '', isLoading, children, ...props }, ref) => {
    const MotionButton = motion.button;

    return (
      <MotionButton
        ref={ref}
        className={`${variants[variant]} ${baseClassName} ${className}`}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {isLoading ? <LoadingSpinner /> : children}
      </MotionButton>
    );
  }
);

// Link component
interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
}

const LinkBase = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ variant = 'primary', className = '', isLoading, children, ...props }, ref) => {
    const MotionLink = motion.a;

    return (
      <MotionLink
        ref={ref}
        className={`${variants[variant]} ${baseClassName} ${className}`}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {isLoading ? <LoadingSpinner /> : children}
      </MotionLink>
    );
  }
);

// Export unified Button component
export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps | LinkProps>(
  (props, ref) => {
    if ('href' in props) {
      return <LinkBase ref={ref as React.Ref<HTMLAnchorElement>} {...(props as LinkProps)} />;
    }
    return <ButtonBase ref={ref as React.Ref<HTMLButtonElement>} {...(props as ButtonProps)} />;
  }
);

Button.displayName = 'Button';
