import { STORAGE_KEYS } from './constants';

export const setCookie = (name: string, value: string, days = 1) => {
  if (typeof window === 'undefined') return;
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `; expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value || ''}${expires}; path=/; SameSite=Lax; Secure`;
};

export const getCookie = (name: string): string | null => {
  if (typeof window === 'undefined') return null;
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const eraseCookie = (name: string) => {
  if (typeof window === 'undefined') return;
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax; Secure`;
};

export const getAccessToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN) || getCookie(STORAGE_KEYS.ACCESS_TOKEN);
};

export const getRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN) || getCookie(STORAGE_KEYS.REFRESH_TOKEN);
};

export const setTokens = (accessToken: string, refreshToken: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
  localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  
  // Set cookies for middleware
  setCookie(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
  setCookie(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);

  // Safely store user role cookie if possible
  try {
    const userStr = localStorage.getItem(STORAGE_KEYS.USER);
    if (userStr) {
      const user = JSON.parse(userStr);
      setCookie('mentorconnect_user_role', user.role);
    }
  } catch (e) {
    console.error('Error syncing user role cookie', e);
  }
};

export const clearTokens = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
  
  // Erase cookies
  eraseCookie(STORAGE_KEYS.ACCESS_TOKEN);
  eraseCookie(STORAGE_KEYS.REFRESH_TOKEN);
  eraseCookie('mentorconnect_user_role');
};

