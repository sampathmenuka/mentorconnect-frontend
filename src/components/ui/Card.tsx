import React, { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hoverEffect?: boolean;
}

export const Card = ({ children, hoverEffect = false, className = '', ...props }: CardProps) => {
  return (
    <div
      className={`glass-effect-card rounded-2xl p-6 transition-all duration-300 ${
        hoverEffect ? 'hover:-translate-y-1 hover:shadow-[0_12px_40px_0_rgba(139,92,246,0.15)] hover:border-slate-600/50' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  return <div className={`mb-4 flex flex-col gap-1 ${className}`}>{children}</div>;
};

export const CardTitle = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  return <h3 className={`text-xl font-bold text-white tracking-tight ${className}`}>{children}</h3>;
};

export const CardDescription = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  return <p className={`text-sm text-slate-400 ${className}`}>{children}</p>;
};

export const CardContent = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  return <div className={`text-slate-300 ${className}`}>{children}</div>;
};

export const CardFooter = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  return <div className={`mt-6 flex items-center justify-end gap-3 border-t border-slate-800/40 pt-4 ${className}`}>{children}</div>;
};

export default Card;
