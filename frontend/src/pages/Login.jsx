import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { userLoginAPI } from '../lib/api/auth.api';
import toast from 'react-hot-toast';
import useAuthStore from '../lib/stores/auth.store';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Key,
  Sparkles,
  LogIn,
  UserPlus,
} from 'lucide-react';

const Login = () => {
    // Get the setAuth method from the store
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const loginMutation = useMutation({
    mutationKey: ['user-login'],
    mutationFn: (data) => userLoginAPI(data),
    onSuccess: (response) => {
      console.log('Login response:', response); // Debug log
      
      if (response?.success) {
        // Check what your API actually returns
        // It might be response.data, response.token, etc.
        const token = response?.token || response?.data?.token;
        const user = response?.user || response?.data?.user;
        
        if (token && user) {
          // Use setAuth which we know exists
          setAuth(user, token);
          toast.success(response?.message || 'User login successfully');
          navigate('/dashboard');
        } else {
          console.error('Invalid response structure:', response);
          toast.error('Invalid response from server');
        }
      }
    },
    onError: (error) => {
      console.error('Error login user:', error);
      toast.error(error?.response?.data?.message || 'Login failed');
    },
  });

  const onSubmit = (data) => {
    const loginData = {
      email: data.email,
      password: data.password,
    };
    loginMutation?.mutate(loginData);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Welcome Section */}
        <div className="hidden lg:block">
          <div className="bg-linear-to-br from-blue-600 to-indigo-700 rounded-3xl shadow-2xl p-12 text-white">
            <div className="mb-8">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Sparkles size={32} />
                </div>
                <h1 className="text-4xl font-bold">Welcome Back!</h1>
              </div>
              <p className="text-blue-100 text-lg">
                Sign in to continue your journey with News Portal. Share your
                stories, discover amazing content, and connect with fellow
                writers.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-6 mb-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <User className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-xl">Personalized Feed</h3>
                  <p className="text-blue-100">Content tailored just for you</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <Key className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-xl">Secure Access</h3>
                  <p className="text-blue-100">
                    Your data is protected with us
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <LogIn className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-xl">One Click Access</h3>
                  <p className="text-blue-100">Quick and easy sign in</p>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <p className="italic text-blue-100 mb-4">
                "News Portal has transformed how I share my thoughts. The
                community is incredible!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-linear-to-r from-cyan-400 to-blue-400"></div>
                <div>
                  <div className="font-semibold">Sarah Johnson</div>
                  <div className="text-blue-200 text-sm">
                    Writer & Content Creator
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-3 bg-linear-to-r from-blue-600 to-indigo-600 rounded-2xl">
                <Sparkles className="text-white" size={28} />
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-800">
                Sign In to{' '}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
                  <Link to="/">News Portal</Link>
                </span>
              </h1>
            </div>
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-800 font-semibold hover:underline"
              >
                Create one now
              </Link>
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="group">
              <label className="mb-2 font-semibold text-gray-700 flex items-center gap-2">
                <Mail size={18} />
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: 'Invalid email address',
                    },
                  })}
                  className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl 
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                           transition-all duration-300
                           placeholder-gray-400
                           hover:border-gray-300"
                  placeholder="you@example.com"
                />
                <Mail
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="group">
              <label className="mb-2 font-semibold text-gray-700 flex items-center gap-2">
                <Lock size={18} />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                  className="w-full p-4 pl-12 pr-12 border-2 border-gray-200 rounded-xl 
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                           transition-all duration-300
                           placeholder-gray-400
                           hover:border-gray-300"
                  placeholder="Enter your password"
                />
                <Lock
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('rememberMe')}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loginMutation?.isPending}
              className="group w-full inline-flex items-center justify-center gap-3 px-8 py-4 
                       rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 
                       text-white font-semibold text-lg
                       shadow-lg hover:shadow-2xl
                       hover:from-blue-700 hover:to-indigo-700
                       active:scale-95 transition-all duration-300
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loginMutation?.isPending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn size={20} />
                  Sign In
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </>
              )}
            </button>

            {/* Demo credentials */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Demo credentials:</p>
              <p className="text-xs text-gray-500">Email: demo@example.com</p>
              <p className="text-xs text-gray-500">Password: demo123</p>
            </div>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Quick Sign Up */}
          <div className="text-center">
            <p className="text-gray-600 mb-4">New to News Portal?</p>
            <Link
              to="/register"
              className="group inline-flex items-center justify-center gap-2 px-8 py-3 
                       rounded-xl bg-linear-to-r from-green-500 to-emerald-600 
                       text-white font-semibold
                       shadow-lg hover:shadow-xl
                       hover:from-green-600 hover:to-emerald-700
                       active:scale-95 transition-all duration-300"
            >
              <UserPlus size={20} />
              Create Free Account
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </div>

          {/* Terms */}
          <p className="text-center text-gray-500 text-sm mt-8">
            By signing in, you agree to our{' '}
            <Link to="/terms" className="text-blue-600 hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
