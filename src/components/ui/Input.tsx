import React, { InputHTMLAttributes, forwardRef, ReactNode } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: ReactNode;
  rightElement?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', type = 'text', id, icon, rightElement, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1">
        {label && (
          <label htmlFor={id} className="text-xs font-bold text-slate-550 pl-3 tracking-wide">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-4 text-slate-450 pointer-events-none flex items-center justify-center">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            type={type}
            id={id}
            className={`px-5 py-2.5 rounded-full text-sm transition-all duration-200 glass-effect-input text-slate-900 bg-white placeholder-slate-400 w-full disabled:opacity-50 disabled:cursor-not-allowed ${
              icon ? 'pl-11' : ''
            } ${rightElement ? 'pr-11' : ''} ${
              error ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/10' : ''
            } ${className}`}
            {...props}
          />
          {rightElement && (
            <div className="absolute right-4 flex items-center justify-center cursor-pointer">
              {rightElement}
            </div>
          )}
        </div>
        {error ? (
          <p className="text-[11px] text-red-500 font-bold pl-3 mt-0.5">{error}</p>
        ) : helperText ? (
          <p className="text-[11px] text-slate-500 pl-3 mt-0.5">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
