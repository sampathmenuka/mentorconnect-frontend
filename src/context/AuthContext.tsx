"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '@/types/auth';
import { LoginInput } from '@/schemas/loginSchema';
import { RegisterInput } from '@/schemas/registerSchema';
import { authService } from '@/services/authService';
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from '@/lib/token';
import { STORAGE_KEYS } from '@/lib/constants';
import { isTokenExpired } from '@/utils/jwt';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginInput) => Promise<void>;
  register: (data: RegisterInput) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const initializeAuth = () => {
      const token = getAccessToken();
      const refreshToken = getRefreshToken();
      const storedUser = localStorage.getItem(STORAGE_KEYS.USER);

      if (token && storedUser) {
        if (isTokenExpired(token)) {
          clearTokens();
          setState({
            user: null,
            token: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
          });
        } else {
          try {
            setState({
              user: JSON.parse(storedUser),
              token,
              refreshToken,
              isAuthenticated: true,
              isLoading: false,
            });
          } catch (e) {
            clearTokens();
            setState((prev) => ({ ...prev, isLoading: false }));
          }
        }
      } else {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    initializeAuth();

    const handleLogoutEvent = () => {
      clearTokens();
      setState({
        user: null,
        token: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
      });
    };

    window.addEventListener('auth-logout', handleLogoutEvent);
    return () => {
      window.removeEventListener('auth-logout', handleLogoutEvent);
    };
  }, []);

  const login = async (credentials: LoginInput) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const data = await authService.login(credentials);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user));
      setTokens(data.token, data.refreshToken);

      setState({
        user: data.user,
        token: data.token,
        refreshToken: data.refreshToken,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const register = async (inputData: RegisterInput) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const data = await authService.register(inputData);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user));
      setTokens(data.token, data.refreshToken);

      setState({
        user: data.user,
        token: data.token,
        refreshToken: data.refreshToken,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const logout = async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      await authService.logout();
    } finally {
      clearTokens();
      setState({
        user: null,
        token: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        isLoading: state.isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
