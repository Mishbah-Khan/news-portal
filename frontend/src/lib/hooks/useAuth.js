
import { useState, useEffect } from 'react';

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('user-token');
    if (token) {
      const userData = localStorage.getItem('user-data');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('user-token');
    localStorage.removeItem('user-data');
    setUser(null);
  };

  return { user, logout };
};

export default useAuth;