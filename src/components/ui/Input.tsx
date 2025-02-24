import { forwardRef, InputHTMLAttributes } from 'react';
import { motion } from 'framer-motion';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-dark mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          <motion.input
            ref={ref}
            className={`
              w-full px-4 py-3 rounded-lg border-2 
              focus:outline-none focus:ring-2 focus:ring-navy-light/20 
              transition-all duration-300
              ${error ? 'border-error' : 'border-gray-medium/30'}
              ${icon ? 'pl-12' : ''}
              ${className}
            `}
            {...props}
          />
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-medium">
              {icon}
            </div>
          )}
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-error mt-1"
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);
