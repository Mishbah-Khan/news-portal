// lib/store/auth.store.js
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const useAuthStore = create()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        token: null,
        isAuthenticated: false,

        // Initialize auth state from token
        initializeAuth: () => {
          const token = localStorage.getItem('user-token');
          if (token) {
            try {
              // Decode token to get user data (if your token contains user info)
              // const decoded = jwtDecode(token);
              // OR get user data from localStorage
              const userData = localStorage.getItem('user-data');
              if (userData) {
                set({ 
                  user: JSON.parse(userData), 
                  token, 
                  isAuthenticated: true 
                });
              } else {
                // If no user data, clear everything
                localStorage.removeItem('user-token');
              }
            } catch (error) {
              console.error('Invalid token:', error);
              localStorage.removeItem('user-token');
              localStorage.removeItem('user-data');
            }
          }
        },

        setAuth: (user, token) => {
          // Store in state
          set({ 
            user, 
            token, 
            isAuthenticated: true 
          });
          
          // Store in localStorage
          localStorage.setItem('user-token', token);
          localStorage.setItem('user-data', JSON.stringify(user));
        },
        
        setToken: (token) => {
          // This function seems to be used in Login.jsx
          // But we need to fetch user data or store it
          set({ token, isAuthenticated: true });
          localStorage.setItem('user-token', token);
          
          // You might want to fetch user data here or store it during login
        },

        clearAuth: () => {
          set({ 
            user: null, 
            token: null, 
            isAuthenticated: false 
          });
          localStorage.removeItem('user-token');
          localStorage.removeItem('user-data');
        },
      }),
      {
        name: 'auth-storage',
        getStorage: () => localStorage,
      }
    )
  )
);

// Initialize auth on store creation
if (typeof window !== 'undefined') {
  useAuthStore.getState().initializeAuth();
}

export default useAuthStore;