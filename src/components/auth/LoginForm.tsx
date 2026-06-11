"use client";

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loginSchema, LoginInput } from '@/schemas/loginSchema';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/lib/constants';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { SocialLoginButton } from './SocialLoginButton';
import { AlertCircle, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export const LoginForm = () => {
  const router = useRouter();
  const { login, isAuthenticated, isLoading } = useAuth();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push(ROUTES.DASHBOARD);
    }
  }, [isAuthenticated, isLoading, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginInput) => {
    setErrorMsg(null);
    setIsSubmitting(true);
    try {
      await login(data);
      router.push(ROUTES.DASHBOARD);
    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid email or password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl font-black text-primary text-center tracking-tight mb-2">
        Login
      </h2>

      {errorMsg && (
        <div className="flex items-center gap-2.5 p-3 py-2.5 rounded-full border border-red-500/10 bg-red-500/5 text-red-500 text-xs font-bold">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3.5">
        <Input
          id="email"
          type="email"
          placeholder="Email"
          error={errors.email?.message}
          disabled={isSubmitting}
          icon={<Mail className="w-4 h-4 text-slate-400" />}
          {...register('email')}
        />

        <Input
          id="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          error={errors.password?.message}
          disabled={isSubmitting}
          icon={<Lock className="w-4 h-4 text-slate-400" />}
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-slate-400 hover:text-slate-650 focus:outline-none flex items-center justify-center"
            >
              {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
            </button>
          }
          {...register('password')}
        />

        <div className="text-center mt-1">
          <a href="#" className="text-xs text-slate-500 hover:text-slate-800 font-bold underline decoration-slate-350 underline-offset-4">
            Forgot Password?
          </a>
        </div>

        <Button type="submit" variant="primary" fullWidth isLoading={isSubmitting} className="mt-2.5 py-3">
          Login
        </Button>
      </form>

      <SocialLoginButton />

      <p className="text-center text-xs text-slate-500 font-bold mt-2">
        Need an account?{' '}
        <Link href={ROUTES.REGISTER} className="text-primary hover:text-primary-hover font-extrabold underline decoration-primary/25 underline-offset-4">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
