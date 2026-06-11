import { UserRole } from '@/types/auth';

const ROLE_HIERARCHY: Record<UserRole, number> = {
  admin: 3,
  mentor: 2,
  mentee: 1,
};

export const hasRequiredRole = (userRole: UserRole, requiredRole: UserRole): boolean => {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
};

export const isAdmin = (role?: UserRole): boolean => role === 'admin';
export const isMentor = (role?: UserRole): boolean => role === 'mentor';
export const isMentee = (role?: UserRole): boolean => role === 'mentee';
export const formatRole = (role: UserRole): string => {
  return role.charAt(0).toUpperCase() + role.slice(1);
};
