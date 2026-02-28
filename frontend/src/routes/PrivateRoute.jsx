import { Navigate, Outlet } from 'react-router';
import useAuthStore from '../lib/stores/auth.store';
import { useEffect, useState } from 'react';

const PrivateRoute = () => {
  const { isAuthenticated, initializeAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Re-initialize auth when component mounts
    initializeAuth();
    setIsLoading(false);
  }, [initializeAuth]);

  if (isLoading) {
    // Show loading spinner while checking auth
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;