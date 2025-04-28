import { create } from 'zustand';
import { AuthState, User } from '../types';

// Dummy user data
const DUMMY_USERS: Record<string, User> = {
  'test@example.com': {
    id: '1',
    name: 'Test User',
    email: 'test@example.com'
  }
};

const useAuthStore = create<AuthState>((set) => {
  // Check for existing token in localStorage
  const token = localStorage.getItem('token');
  let user = null;
  
  if (token) {
    try {
      const email = localStorage.getItem('userEmail');
      if (email) {
        user = DUMMY_USERS[email];
      }
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('userEmail');
    }
  }

  return {
    user,
    token,
    isAuthenticated: !!token,
    isLoading: false,
    
    login: async (email, password) => {
      set({ isLoading: true });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      try {
        // Check if user exists and password is "password"
        if (DUMMY_USERS[email] && password === 'password') {
          const dummyToken = 'dummy-jwt-token';
          localStorage.setItem('token', dummyToken);
          localStorage.setItem('userEmail', email);
          
          set({ 
            token: dummyToken, 
            user: DUMMY_USERS[email], 
            isAuthenticated: true, 
            isLoading: false 
          });
        } else {
          throw new Error('Invalid credentials');
        }
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        set({ isLoading: false });
        throw error;
      }
    },
    
    register: async (name, email, password) => {
      set({ isLoading: true });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      try {
        // Check if user already exists
        if (DUMMY_USERS[email]) {
          throw new Error('User already exists');
        }
        
        // Add new user to dummy data
        DUMMY_USERS[email] = {
          id: String(Object.keys(DUMMY_USERS).length + 1),
          name,
          email
        };
        
        set({ isLoading: false });
      } catch (error) {
        set({ isLoading: false });
        throw error;
      }
    },
    
    logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userEmail');
      set({ token: null, user: null, isAuthenticated: false });
    }
  };
});

export default useAuthStore;