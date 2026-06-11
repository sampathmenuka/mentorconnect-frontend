"use client";

import React, { ReactNode } from 'react';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { UserRole } from '@/types/auth';
import Spinner from '../ui/Spinner';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
  redirectTo?: string;
}

export const ProtectedRoute = ({ children, allowedRoles, redirectTo }: ProtectedRouteProps) => {
  const { isLoading, isAuthenticated } = useProtectedRoute({ allowedRoles, redirectTo });

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col justify-center items-center gap-4">
        <div className="relative flex justify-center items-center">
          <div className="absolute w-16 h-16 rounded-full border border-primary/20 animate-ping" />
          <div className="absolute w-12 h-12 rounded-full border border-secondary/20 animate-pulse" />
          <Spinner size="lg" />
        </div>
        <p className="text-slate-400 text-sm font-semibold tracking-wider uppercase animate-pulse">
          Verifying credentials...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
