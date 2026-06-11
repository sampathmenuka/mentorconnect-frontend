"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { registerSchema, RegisterInput } from '@/schemas/registerSchema';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/lib/constants';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { SocialLoginButton } from './SocialLoginButton';
import { AlertCircle, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export const RegisterForm = () => {
  const router = useRouter();
  const { register: registerUser } = useAuth();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: RegisterInput) => {
    setErrorMsg(null);
    setIsSubmitting(true);
    try {
      await registerUser(data);
      router.push(ROUTES.DASHBOARD);
    } catch (err: any) {
      setErrorMsg(err.message || 'Registration failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl font-black text-primary text-center tracking-tight mb-2">
        Sign Up
      </h2>

      {errorMsg && (
        <div className="flex items-center gap-2.5 p-3 py-2.5 rounded-full border border-red-500/10 bg-red-500/5 text-red-500 text-xs font-bold">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3.5">
        <Input
          id="name"
          placeholder="Full Name"
          error={errors.name?.message}
          disabled={isSubmitting}
          icon={<User className="w-4 h-4 text-slate-400" />}
          {...register('name')}
        />

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

        <Button type="submit" variant="primary" fullWidth isLoading={isSubmitting} className="mt-2.5 py-3">
          Sign Up
        </Button>
      </form>

      <SocialLoginButton />

      <p className="text-center text-xs text-slate-500 font-bold mt-2">
        Already have an account?{' '}
        <Link href={ROUTES.LOGIN} className="text-primary hover:text-primary-hover font-extrabold underline decoration-primary/25 underline-offset-4">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
