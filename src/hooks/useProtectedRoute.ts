"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './useAuth';
import { UserRole } from '@/types/auth';
import { ROUTES } from '@/lib/constants';

interface ProtectedRouteConfig {
  allowedRoles?: UserRole[];
  redirectTo?: string;
}

export const useProtectedRoute = (config: ProtectedRouteConfig = {}) => {
  const { allowedRoles, redirectTo = ROUTES.LOGIN } = config;
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.push(redirectTo);
      return;
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
      router.push(ROUTES.DASHBOARD);
    }
  }, [isAuthenticated, isLoading, user, router, allowedRoles, redirectTo]);

  return { isLoading, isAuthenticated, user };
};

export default useProtectedRoute;
