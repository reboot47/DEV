import { motion, HTMLMotionProps } from 'framer-motion';
import { forwardRef } from 'react';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'outline';

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: ButtonVariant;
  href?: string;
}

const variants = {
  primary: 'px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200',
  secondary: 'px-4 py-2 rounded-lg bg-secondary text-primary hover:bg-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200',
  outline: 'px-4 py-2 rounded-lg border-2 border-primary text-primary hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', href, children, ...props }, ref) => {
    const buttonContent = (
      <motion.button
        ref={ref}
        className={`${variants[variant]} ${className}`}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {children}
      </motion.button>
    );

    if (href) {
      return <Link href={href}>{buttonContent}</Link>;
    }

    return buttonContent;
  }
);

Button.displayName = 'Button';
