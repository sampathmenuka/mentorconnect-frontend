"use client";

import React from 'react';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants';
import { SocialLoginButton } from './SocialLoginButton';

export const RegisterForm = () => {
  return (
    <div className="flex flex-col gap-5 items-center w-full">
      {/* Onboarding Screen Graphic */}
      <div className="my-1 flex justify-center">
        <img 
          src="/login-illustration.png" 
          alt="Mentorship illustration" 
          className="w-40 h-40 object-contain mx-auto"
        />
      </div>

      {/* Onboarding Text */}
      <div className="text-center px-1">
        <h2 className="text-2xl font-black text-primary tracking-tight leading-tight">
          Private Coaching
        </h2>
        <p className="text-xs text-slate-500 font-bold max-w-[240px] mx-auto mt-2 leading-relaxed">
          Add one-on-one, confidential sessions for only $35 per session
        </p>
      </div>

      {/* Progress Indicator Lines (3 segments: 2 green, 1 grey) */}
      <div className="flex justify-center gap-1.5 w-full max-w-[240px] my-1">
        <div className="flex-grow h-1 rounded-full bg-secondary" />
        <div className="flex-grow h-1 rounded-full bg-secondary" />
        <div className="flex-grow h-1 rounded-full bg-slate-200" />
      </div>

      {/* Social and Guest login buttons */}
      <SocialLoginButton />

      {/* Log in link */}
      <p className="text-center text-xs text-slate-500 font-bold mt-1.5">
        Already have an account?{' '}
        <Link 
          href={ROUTES.LOGIN} 
          className="text-primary hover:text-primary-hover font-extrabold underline decoration-primary/25 underline-offset-4"
        >
          Log in
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
