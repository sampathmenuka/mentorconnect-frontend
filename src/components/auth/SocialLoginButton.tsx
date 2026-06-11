"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/lib/constants';
import Spinner from '../ui/Spinner';

export const SocialLoginButton = () => {
  const router = useRouter();
  const { login, register } = useAuth();
  const [googleLoading, setGoogleLoading] = useState(false);
  const [appleLoading, setAppleLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);

  const handleSocialLogin = async (provider: 'google' | 'apple' | 'guest') => {
    const setLoading = provider === 'google' 
      ? setGoogleLoading 
      : provider === 'apple' 
      ? setAppleLoading 
      : setGuestLoading;
      
    setLoading(true);

    setTimeout(async () => {
      try {
        if (provider === 'guest') {
          const guestData = {
            name: 'Guest User',
            email: `guest_${Math.floor(Math.random() * 10000)}@mentorconnect.dev`,
            role: 'mentee' as const,
            password: 'password123',
            confirmPassword: 'password123',
          };
          await register(guestData);
        } else {
          const mockCredentials = provider === 'google' 
            ? { email: 'mentor@mentorconnect.dev', password: 'password123' }
            : { email: 'mentee@mentorconnect.dev', password: 'password123' };

          await login(mockCredentials);
        }
        router.push(ROUTES.DASHBOARD);
      } catch (err) {
        console.error('Social login failed', err);
      } finally {
        setLoading(false);
      }
    }, 1200);
  };

  const isAnyLoading = googleLoading || appleLoading || guestLoading;

  return (
    <div className="flex flex-col gap-2.5 w-full">
      <div className="flex items-center my-2.5">
        <div className="flex-grow border-t border-slate-200" />
        <span className="flex-shrink mx-4 text-[9px] font-black uppercase tracking-wider text-slate-400">
          or
        </span>
        <div className="flex-grow border-t border-slate-200" />
      </div>

      <button
        type="button"
        onClick={() => handleSocialLogin('google')}
        disabled={isAnyLoading}
        className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-full text-xs font-bold bg-button-grey hover:bg-[#dfe2de] text-slate-800 transition-all cursor-pointer disabled:opacity-55 border border-slate-200/30"
      >
        {googleLoading ? (
          <Spinner size="sm" />
        ) : (
          <img src="/google-icon.png" alt="Google" className="w-4.5 h-4.5 object-contain" />
        )}
        <span>Continue with Google</span>
      </button>

      <button
        type="button"
        onClick={() => handleSocialLogin('apple')}
        disabled={isAnyLoading}
        className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-full text-xs font-bold bg-secondary hover:bg-secondary-hover text-primary transition-all cursor-pointer disabled:opacity-55"
      >
        {appleLoading ? (
          <Spinner size="sm" />
        ) : (
          <img src="/apple-icon.png" alt="Apple" className="w-4.5 h-4.5 object-contain" />
        )}
        <span>Continue with Apple</span>
      </button>

      <button
        type="button"
        onClick={() => handleSocialLogin('guest')}
        disabled={isAnyLoading}
        className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-full text-xs font-bold bg-button-grey hover:bg-[#dfe2de] text-slate-800 transition-all cursor-pointer disabled:opacity-55 border border-slate-200/30"
      >
        {guestLoading ? (
          <Spinner size="sm" />
        ) : (
          <img src="/guest-icon.png" alt="Guest" className="w-4.5 h-4.5 object-contain" />
        )}
        <span>Continue As Guest</span>
      </button>
    </div>
  );
};

export default SocialLoginButton;
