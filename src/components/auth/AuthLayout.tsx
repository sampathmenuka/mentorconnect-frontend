import React, { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-[85vh] w-full grid md:grid-cols-12 bg-grid-pattern relative overflow-hidden md:rounded-3xl md:border md:border-slate-200/80 my-0 md:my-6 max-w-6xl mx-auto md:shadow-xl bg-white">
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] rounded-full bg-secondary/15 blur-[120px] pointer-events-none" />

      {/* Form Column (Left side on desktop, full screen on mobile) */}
      <div className="col-span-12 md:col-span-6 flex flex-col justify-center px-6 py-12 sm:px-16 md:px-12 xl:px-16 z-10 bg-white">
        <div className="mx-auto w-full max-w-sm">
          {children}
        </div>
      </div>

      {/* Illustration Column (Right side, only visible on desktop) */}
      <div className="hidden md:col-span-6 md:flex flex-col justify-center items-center bg-[#f4f6f3]/65 p-12 border-l border-slate-200/80 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5 pointer-events-none" />
        
        <div className="z-10 flex flex-col items-center gap-4 max-w-sm text-center">
          <img 
            src="/login-illustration.png" 
            alt="Mentorship illustration" 
            className="w-80 h-80 object-contain mx-auto"
          />
          <h2 className="text-3xl font-black text-primary tracking-tight mt-4">
            MentorConnect
          </h2>
          <p className="text-sm text-slate-500 font-semibold leading-relaxed">
            Connect with industry experts, track your goals, and accelerate your software engineering career.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
