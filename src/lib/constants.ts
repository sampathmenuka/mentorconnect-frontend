export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'mentorconnect_access_token',
  REFRESH_TOKEN: 'mentorconnect_refresh_token',
  USER: 'mentorconnect_user',
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  ADMIN: '/admin',
} as const;

export const API_ROUTES = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  REFRESH: '/auth/refresh',
  LOGOUT: '/auth/logout',
  ME: '/auth/me',
} as const;
