import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { userRegisterAPI } from '../lib/api/auth.api';
import toast from 'react-hot-toast';
import {
  User,
  Mail,
  Lock,
  Sparkles,
  UserPlus,
  LogIn,
  Shield,
  Award,
  PenTool,
  Eye,
  EyeOff,
} from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false,
    },
  });

  const registerMutation = useMutation({
    mutationKey: ['user-register'],
    mutationFn: (data) => userRegisterAPI(data),
    onSuccess: (response) => {
      toast.success(response.message || 'Account created successfully!');
      navigate('/login');
    },
    onError: (error) => {
      console.error('Error registering user:', error);
      toast.error(error?.response?.data?.message || 'Registration failed');
    },
  });

  const onSubmit = (data) => {
    // Remove confirmPassword and agreeTerms before sending to API
    const { ...registerData } = data;
    registerMutation?.mutate(registerData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Welcome Section */}
        <div className="hidden lg:block">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl shadow-2xl p-12 text-white">
            <div className="mb-8">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Sparkles size={32} />
                </div>
                <h1 className="text-4xl font-bold">Join Us Today!</h1>
              </div>
              <p className="text-blue-100 text-lg">
                Start your journey with News Portal. Share your stories,
                discover amazing content, and connect with fellow writers from
                around the world.
              </p>
            </div>

            {/* Benefits List */}
            <div className="space-y-6 mb-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <PenTool className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-xl">Write & Publish</h3>
                  <p className="text-blue-100">
                    Share your stories with the world
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <Award className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-xl">Build Reputation</h3>
                  <p className="text-blue-100">
                    Earn recognition for your content
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <Shield className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-xl">Secure Platform</h3>
                  <p className="text-blue-100">Your data is always protected</p>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <p className="italic text-blue-100 mb-4">
                "Joining News Portal was the best decision for my writing
                career. The community support is amazing!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400"></div>
                <div>
                  <div className="font-semibold">Michael Chen</div>
                  <div className="text-blue-200 text-sm">Featured Writer</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl">
                <UserPlus className="text-white" size={28} />
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-800">
                Create{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Account
                </span>
              </h1>
            </div>
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-800 font-semibold hover:underline"
              >
                Sign in here
              </Link>
            </p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name Field */}
            <div className="group">
              <label className="mb-2 font-semibold text-gray-700 flex items-center gap-2">
                <User size={18} />
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  {...register('name', {
                    required: 'Full name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters',
                    },
                  })}
                  className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl 
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                           transition-all duration-300
                           placeholder-gray-400
                           hover:border-gray-300"
                  placeholder="Enter your full name"
                />
                <User
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
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

            {/* Password Field */}
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
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                      message:
                        'Password must contain at least one letter and one number',
                    },
                  })}
                  className="w-full p-4 pl-12 pr-12 border-2 border-gray-200 rounded-xl 
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                           transition-all duration-300
                           placeholder-gray-400
                           hover:border-gray-300"
                  placeholder="Create a strong password"
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

            {/* Confirm Password Field */}
            <div className="group">
              <label className="mb-2 font-semibold text-gray-700 flex items-center gap-2">
                <Lock size={18} />
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value) =>
                      value === watch('password') || 'Passwords do not match',
                  })}
                  className="w-full p-4 pl-12 pr-12 border-2 border-gray-200 rounded-xl 
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                           transition-all duration-300
                           placeholder-gray-400
                           hover:border-gray-300"
                  placeholder="Confirm your password"
                />
                <Lock
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                {...register('agreeTerms', {
                  required: 'You must agree to the terms and conditions',
                })}
                className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <label className="text-gray-600 text-sm">
                I agree to the{' '}
                <Link
                  to="/terms"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link
                  to="/privacy"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.agreeTerms && (
              <p className="mt-1 text-sm text-red-500">
                {errors.agreeTerms.message}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={registerMutation?.isPending}
              className="group w-full inline-flex items-center justify-center gap-3 px-8 py-4 
                       rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 
                       text-white font-semibold text-lg
                       shadow-lg hover:shadow-2xl
                       hover:from-blue-700 hover:to-indigo-700
                       active:scale-95 transition-all duration-300
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {registerMutation?.isPending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Account...
                </>
              ) : (
                <>
                  <UserPlus size={20} />
                  Create Account
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </>
              )}
            </button>

            {/* Password Requirements Hint */}
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800 font-medium mb-2">
                Password requirements:
              </p>
              <ul className="text-xs text-blue-600 space-y-1">
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                  At least 6 characters long
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                  Contains at least one letter
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                  Contains at least one number
                </li>
              </ul>
            </div>
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="group inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold"
              >
                <LogIn size={18} />
                Sign in here
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
            </p>
          </div>

          {/* Terms Footer */}
          <p className="text-center text-gray-500 text-xs mt-8">
            By creating an account, you agree to our{' '}
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

export default Register;
