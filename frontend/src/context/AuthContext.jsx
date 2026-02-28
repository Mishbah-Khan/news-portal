// context/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

// Create context
const AuthContext = createContext(null);

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('user-token'));

  // Check for existing session on mount
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedToken = localStorage.getItem('user-token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        // Clear invalid data
        localStorage.removeItem('user-token');
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);

      // Mock API call - In real app, this would be your actual backend API
      // const response = await axios.post('/api/auth/login', { email, password });
      // const { user, token } = response.data;

      // For demo purposes - using localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find((u) => u.email === email);

      if (!foundUser) {
        toast.error('User not found');
        return { success: false, error: 'User not found' };
      }

      // In real app, password comparison would be done on backend
      // This is just for demo - don't do this in production!
      if (foundUser.password !== password) {
        toast.error('Invalid password');
        return { success: false, error: 'Invalid password' };
      }

      // Remove password from user object
      const { password: _, ...userWithoutPassword } = foundUser;

      // Generate mock token (in real app, this comes from backend)
      const mockToken = `mock_token_${Date.now()}_${foundUser.id}`;

      // Save to state and localStorage
      setUser(userWithoutPassword);
      setToken(mockToken);
      localStorage.setItem('user-token', mockToken);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));

      toast.success('Login successful!');
      return { success: true, user: userWithoutPassword };
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setLoading(true);

      // Mock API call - In real app, this would be your actual backend API
      // const response = await axios.post('/api/auth/register', userData);
      // const { user, token } = response.data;

      // For demo purposes - using localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      // Check if user already exists
      if (users.some((u) => u.email === userData.email)) {
        toast.error('User already exists');
        return { success: false, error: 'User already exists' };
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        password: userData.password, // In real app, this would be hashed on backend
        role: 'user',
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      // Remove password from response
      const { password: _, ...userWithoutPassword } = newUser;

      // Generate mock token
      const mockToken = `mock_token_${Date.now()}_${newUser.id}`;

      // Save to state and localStorage
      setUser(userWithoutPassword);
      setToken(mockToken);
      localStorage.setItem('user-token', mockToken);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));

      toast.success('Registration successful!');
      return { success: true, user: userWithoutPassword };
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user-token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
  };

  // Update user profile
  const updateUser = async (updatedData) => {
    try {
      setLoading(true);

      if (!user) {
        throw new Error('No user logged in');
      }

      // Mock API call - In real app, this would be your actual backend API
      // const response = await axios.put('/api/users/profile', updatedData);

      // For demo purposes - update localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = users.findIndex((u) => u.id === user.id);

      if (userIndex === -1) {
        throw new Error('User not found');
      }

      // Update user data
      const updatedUser = {
        ...users[userIndex],
        ...updatedData,
      };

      users[userIndex] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));

      // Remove password from response
      const { password: _, ...userWithoutPassword } = updatedUser;

      // Update state and localStorage
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));

      toast.success('Profile updated successfully');
      return { success: true, user: userWithoutPassword };
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Update failed');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return user?.role === role;
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!user && !!token;
  };

  // Value object to be provided
  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateUser,
    hasRole,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
