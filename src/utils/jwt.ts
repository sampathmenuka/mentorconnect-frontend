export interface JwtPayload {
  exp?: number;
  sub?: string;
  role?: string;
  [key: string]: any;
}

export const parseJwt = (token: string): JwtPayload | null => {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  const payload = parseJwt(token);
  if (!payload || !payload.exp) return true;
  // exp is in seconds, Date.now() is in ms. Add a buffer of 10s.
  return payload.exp * 1000 < Date.now() + 10000;
};
