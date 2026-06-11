import React from 'react';
import AuthLayout from '@/components/auth/AuthLayout';
import RegisterForm from '@/components/auth/RegisterForm';

export const metadata = {
  title: 'Create Account | MentorConnect',
  description: 'Join MentorConnect to match with expert guides, outline learning roadmaps, and scale your growth.',
};

export default function RegisterPage() {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
}
