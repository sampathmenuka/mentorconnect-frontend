import React, { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-[#f4f6f3]/65 relative overflow-hidden py-10 px-4">
      {/* Background radial glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      {/* iPhone style mockup container */}
      <div className="w-[340px] h-[720px] rounded-[2.75rem] bg-white border-[8px] border-slate-900 shadow-2xl px-6 py-7 flex flex-col justify-between relative overflow-hidden z-10 border-t-[8px] border-b-[8px]">
        
        {/* Status Bar */}
        <div className="flex justify-between items-center text-[10px] font-bold text-slate-800 px-3 select-none relative z-20">
          <span>9:41</span>
          
          {/* Dynamic Island / Notch */}
          <div className="w-24 h-5 rounded-full bg-slate-900 absolute left-1/2 -translate-x-1/2 top-[-2px]" />
          
          <div className="flex items-center gap-1.2">
            {/* Cellular/Wifi/Battery Icons */}
            <svg className="w-3.5 h-3.5 text-slate-900" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3c-1.2 0-2.4.4-3.4 1.1L3 8.6c-.6.4-.6 1.3 0 1.7l1.1.8c.4.3 1 .2 1.3-.2l4.2-3.8c1.3-1.2 3.5-1.2 4.8 0l4.2 3.8c.3.4.9.5 1.3.2l1.1-.8c.6-.4.6-1.3 0-1.7L15.4 4.1C14.4 3.4 13.2 3 12 3z"/>
            </svg>
            <span className="text-[9px]">5G</span>
          </div>
        </div>

        {/* Scrollable Form Content inside Mobile Display */}
        <div className="flex-grow flex flex-col justify-center overflow-y-auto py-3 scrollbar-none">
          <div className="mx-auto w-full max-w-xs">
            {children}
          </div>
        </div>

        {/* Home Indicator */}
        <div className="w-28 h-1 bg-slate-900 rounded-full mx-auto select-none" />
      </div>
    </div>
  );
};

export default AuthLayout;
