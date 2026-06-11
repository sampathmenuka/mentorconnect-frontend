import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import Spinner from './Spinner';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = '',
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      disabled,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center font-bold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#f4f6f3] disabled:opacity-55 disabled:pointer-events-none active:scale-[0.98] cursor-pointer tracking-wide';
    
    const variants = {
      primary: 'bg-primary hover:bg-primary-hover text-white focus:ring-primary',
      secondary: 'bg-secondary hover:bg-secondary-hover text-primary focus:ring-secondary',
      outline: 'border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 focus:ring-slate-500',
      ghost: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60 focus:ring-slate-500',
      danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    };

    const sizes = {
      sm: 'px-4 py-1.5 text-xs',
      md: 'px-5 py-2.5 text-sm',
      lg: 'px-7 py-3 text-base',
    };

    const widthStyle = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
        {...props}
      >
        {isLoading ? (
          <>
            <Spinner className="mr-2" size="sm" />
            <span>Loading...</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
