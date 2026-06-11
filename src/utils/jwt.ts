export interface JwtPayload {
  exp?: number;
  sub?: string;
  role?: string;
  [key: string]: any;
}

export const parseJwt = (token: string): JwtPayload | null => {
  try {
    const segments = token.split('.');
    if (segments.length < 3) return null;
    const base64Url = segments[1];
    if (!base64Url) return null;
    
    // Convert base64url characters to standard base64
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    
    // Pad standard base64 string to a multiple of 4
    while (base64.length % 4) {
      base64 += '=';
    }
    
    const decoded = atob(base64);
    
    try {
      const jsonPayload = decodeURIComponent(
        decoded
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (urlError) {
      // Fallback: parse raw decoded string directly if decodeURIComponent throws URIError: URI malformed
      return JSON.parse(decoded);
    }
  } catch (error) {
    console.warn('JWT parse failed:', error instanceof Error ? error.message : error);
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  const payload = parseJwt(token);
  // If token is completely invalid and cannot be parsed, treat as expired/invalid.
  if (!payload) return true;
  
  // If there is no exp field, assume it does not expire.
  if (!payload.exp) return false;
  
  // exp is in seconds, Date.now() is in ms. Add a buffer of 10s.
  return payload.exp * 1000 < Date.now() + 10000;
};
