import React, { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-[85vh] grid lg:grid-cols-12 bg-grid-pattern relative overflow-hidden rounded-3xl border border-slate-200 my-6 max-w-6xl mx-auto shadow-xl bg-white">
      <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] rounded-full bg-secondary/15 blur-[120px] pointer-events-none" />

      {/* Active Form Card (Left Column) */}
      <div className="lg:col-span-6 flex flex-col justify-center px-6 py-12 sm:px-12 xl:px-16 z-10 bg-white">
        <div className="mx-auto w-full max-w-sm">
          {children}
        </div>
      </div>

      {/* Interactive Mobile Simulation Panel (Right Column) */}
      <div className="hidden lg:col-span-6 lg:flex flex-col justify-center items-center bg-neutral-bg p-12 border-l border-slate-200/80 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5 pointer-events-none" />

        {/* Onboarding Screen Phone Mockup */}
        <div className="w-[335px] h-[610px] rounded-[2.5rem] bg-white border-[7px] border-slate-900 shadow-2xl p-6 flex flex-col justify-between relative overflow-hidden">
          {/* Mobile Notch & Status Bar */}
          <div className="flex justify-between items-center text-[10px] font-bold text-slate-800 px-3 mt-1">
            <span>9:41</span>
            <div className="w-20 h-4.5 rounded-full bg-slate-900 absolute left-1/2 -translate-x-1/2 top-0" />
            <div className="flex items-center gap-1.5">
              {/* Simple signal icons */}
              <div className="flex gap-0.5 items-end h-2">
                <div className="w-0.5 h-1 bg-slate-850 rounded-sm" />
                <div className="w-0.5 h-1.5 bg-slate-850 rounded-sm" />
                <div className="w-0.5 h-2 bg-slate-850 rounded-sm" />
              </div>
              <span>5G</span>
            </div>
          </div>

          {/* SVG Vector Drawing */}
          <div className="my-auto py-2">
            <svg className="w-40 h-40 mx-auto text-slate-850" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="76" stroke="#f1f5f9" strokeWidth="1.5" />
              <path d="M 40,150 A 68 68 0 0 1 160,150" stroke="#9ee870" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 72,90 A 28 28 0 0 1 128,90" stroke="#152f16" strokeWidth="4" strokeLinecap="round" fill="none" />
              
              {/* Hair */}
              <circle cx="85" cy="75" r="7" fill="#152f16" />
              <circle cx="93" cy="70" r="8" fill="#152f16" />
              <circle cx="107" cy="70" r="8" fill="#152f16" />
              <circle cx="115" cy="75" r="7" fill="#152f16" />
              <circle cx="78" cy="85" r="7" fill="#152f16" />
              <circle cx="122" cy="85" r="7" fill="#152f16" />
              
              {/* Head / Neck */}
              <circle cx="100" cy="92" r="22" fill="#ffffff" stroke="#152f16" strokeWidth="3" />
              
              {/* Glasses */}
              <circle cx="91" cy="92" r="7" stroke="#152f16" strokeWidth="2.5" fill="none" />
              <circle cx="109" cy="92" r="7" stroke="#152f16" strokeWidth="2.5" fill="none" />
              <line x1="98" y1="92" x2="102" y2="92" stroke="#152f16" strokeWidth="2" />
              
              {/* Smile */}
              <path d="M 96,102 Q 100,105 104,102" stroke="#152f16" strokeWidth="2" strokeLinecap="round" fill="none" />
              
              {/* Headphone Cups */}
              <rect x="73" y="85" width="6" height="13" rx="3" fill="#152f16" />
              <rect x="121" y="85" width="6" height="13" rx="3" fill="#152f16" />
              
              {/* Shirt */}
              <path d="M 74,132 Q 100,118 126,132 L 132,158 H 68 Z" fill="#ffffff" stroke="#152f16" strokeWidth="3" />
              <path d="M 92,122 A 8 8 0 0 0 108,122" stroke="#152f16" strokeWidth="2" fill="none" />
              
              {/* Hands waving */}
              <path d="M 64,135 Q 48,125 52,122 Q 56,118 62,130" stroke="#152f16" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M 136,135 Q 152,135 150,140" stroke="#152f16" strokeWidth="2.5" strokeLinecap="round" fill="none" />

              {/* Laptop base */}
              <path d="M 52,170 H 148 L 154,182 H 46 Z" fill="#152f16" />
              {/* Laptop screen */}
              <rect x="58" y="142" width="84" height="28" rx="2.5" fill="#ffffff" stroke="#152f16" strokeWidth="3" />
              <circle cx="100" cy="156" r="3" fill="#152f16" />
            </svg>

            {/* Subtext */}
            <div className="text-center mt-4 px-2">
              <h2 className="text-lg font-bold text-primary">Private Coaching</h2>
              <p className="text-[10px] text-slate-500 font-bold max-w-[210px] mx-auto mt-1 leading-relaxed">
                Add one-on-one, confidential sessions for only $35 per session
              </p>
            </div>

            {/* Slider Dots */}
            <div className="flex justify-center gap-1.5 mt-3.5">
              <div className="w-10 h-0.5 rounded-full bg-secondary" />
              <div className="w-10 h-0.5 rounded-full bg-secondary" />
              <div className="w-10 h-0.5 rounded-full bg-slate-200" />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-2 mb-1">
            <div className="flex items-center justify-center gap-2 py-2 rounded-full bg-neutral-bg text-[10px] font-bold text-slate-800 border border-slate-200/50">
              <span className="w-3.5 h-3.5 bg-white rounded-full shadow-sm flex items-center justify-center text-[9px] font-black border border-slate-200">G</span>
              <span>Continue with Google</span>
            </div>
            <div className="flex items-center justify-center gap-2 py-2 rounded-full bg-secondary text-[10px] font-bold text-primary">
              <span className="text-[10px]"></span>
              <span>Continue with Apple</span>
            </div>
            <div className="flex items-center justify-center gap-2 py-2 rounded-full bg-neutral-bg text-[10px] font-bold text-slate-750">
              <span>Continue As Guest</span>
            </div>
            <p className="text-center text-[9px] text-slate-400 mt-2 font-semibold">
              Already have an account? <span className="text-primary font-bold">Log in</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
