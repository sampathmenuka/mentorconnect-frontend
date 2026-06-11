import { API_ROUTES } from '@/lib/constants';
import { AuthResponse, User, UserRole } from '@/types/auth';
import { LoginInput } from '@/schemas/loginSchema';
import { RegisterInput } from '@/schemas/registerSchema';
import api from '@/lib/axios';
import { parseJwt } from '@/utils/jwt';

const INITIAL_MOCK_USERS: User[] = [
  { id: '1', name: 'System Admin', email: 'admin@mentorconnect.dev', role: 'admin' },
  { id: '2', name: 'Jane Doe (Mentor)', email: 'mentor@mentorconnect.dev', role: 'mentor' },
  { id: '3', name: 'John Smith (Mentee)', email: 'mentee@mentorconnect.dev', role: 'mentee' },
];

const getMockUsers = (): User[] => {
  if (typeof window === 'undefined') return INITIAL_MOCK_USERS;
  const stored = localStorage.getItem('mentorconnect_mock_users');
  if (!stored) {
    localStorage.setItem('mentorconnect_mock_users', JSON.stringify(INITIAL_MOCK_USERS));
    return INITIAL_MOCK_USERS;
  }
  return JSON.parse(stored);
};

const saveMockUser = (user: User) => {
  if (typeof window === 'undefined') return;
  const users = getMockUsers();
  users.push(user);
  localStorage.setItem('mentorconnect_mock_users', JSON.stringify(users));
};

// Helper to map backend API response to frontend AuthResponse structure
const mapAuthResponse = (apiData: any, originalName?: string, selectedRole?: UserRole): AuthResponse => {
  const token = apiData.token;
  const email = apiData.email;
  const backendRole = apiData.role;
  
  const payload = parseJwt(token);
  
  let mappedRole: UserRole = 'mentee';
  if (backendRole === 'ROLE_ADMIN') {
    mappedRole = 'admin';
  } else if (backendRole === 'ROLE_MENTOR') {
    mappedRole = 'mentor';
  } else {
    // Default fallback to form selected role or token role payload
    mappedRole = selectedRole || (payload?.role as UserRole) || 'mentee';
  }

  return {
    user: {
      id: payload?.sub || email,
      name: payload?.name || originalName || email.split('@')[0],
      email: email,
      role: mappedRole,
    },
    token,
    refreshToken: token, // Default to access token since backend does not output refresh tokens
  };
};

export const authService = {
  login: async (credentials: LoginInput): Promise<AuthResponse> => {
    try {
      const res = await api.post(API_ROUTES.LOGIN, credentials);
      return mapAuthResponse(res.data, undefined, undefined);
    } catch (err: any) {
      // If the API server returned a specific error (e.g. 401/400), throw that message directly
      if (err.response?.data) {
        throw new Error(err.response.data.message || 'Login failed');
      }

      // If server is not listening (network error), trigger mock fallback for development ease
      if (err.code === 'ERR_NETWORK' || err.message?.includes('Network Error')) {
        console.warn('Real API server offline, falling back to mock authentication');
        const users = getMockUsers();
        const user = users.find(
          (u) => u.email.toLowerCase() === credentials.email.toLowerCase()
        );
        if (!user) {
          throw new Error('User not found. Use admin@mentorconnect.dev, mentor@mentorconnect.dev, or register a new account.');
        }
        if (credentials.password.length < 6) {
          throw new Error('Incorrect password');
        }

        const payloadObj = {
          sub: user.id,
          email: user.email,
          role: user.role,
          name: user.name,
          exp: Math.floor(Date.now() / 1000) + 3600,
        };
        const mockPayload = btoa(JSON.stringify(payloadObj));
        const mockToken = `mock.header.${mockPayload}.signature`;

        return {
          user,
          token: mockToken,
          refreshToken: mockToken,
        };
      }
      
      throw new Error(err.message || 'Login failed');
    }
  },

  register: async (data: RegisterInput): Promise<AuthResponse> => {
    try {
      // Strip fields not expected by the backend registry payload (role/confirmPassword)
      const registerPayload = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      const res = await api.post(API_ROUTES.REGISTER, registerPayload);
      // Map properties
      return mapAuthResponse(res.data, data.name, undefined);
    } catch (err: any) {
      // Handle Conflict 409 error messages from the backend
      if (err.response?.data) {
        throw new Error(err.response.data.message || 'Registration failed');
      }

      // Network Offline Fallback
      if (err.code === 'ERR_NETWORK' || err.message?.includes('Network Error')) {
        console.warn('Real API server offline, falling back to mock registration');
        const users = getMockUsers();
        if (users.some((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
          throw new Error('User already exists with email: ' + data.email);
        }

        const newUser: User = {
          id: String(users.length + 1),
          name: data.name,
          email: data.email,
          role: 'mentee',
        };

        saveMockUser(newUser);

        const payloadObj = {
          sub: newUser.id,
          email: newUser.email,
          role: newUser.role,
          name: newUser.name,
          exp: Math.floor(Date.now() / 1000) + 3600,
        };
        const mockPayload = btoa(JSON.stringify(payloadObj));
        const mockToken = `mock.header.${mockPayload}.signature`;

        return {
          user: newUser,
          token: mockToken,
          refreshToken: mockToken,
        };
      }

      throw new Error(err.message || 'Registration failed');
    }
  },

  getCurrentUser: async (): Promise<User> => {
    try {
      const res = await api.get<User>(API_ROUTES.ME);
      return res.data;
    } catch (err) {
      throw new Error('Could not retrieve session info');
    }
  },

  logout: async (): Promise<void> => {
    try {
      await api.post(API_ROUTES.LOGOUT);
    } catch (err) {
      console.warn('API logout failed, performing local logout only');
    }
  },
};

export default authService;
