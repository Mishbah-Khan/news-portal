import { Link, useNavigate } from 'react-router-dom';
import {
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiLogOut,
  FiEye,
  FiFileText,
  FiGrid,
  FiList,
  FiBarChart2,
  FiCalendar,
  FiTrendingUp,
  FiUser,
  FiClock,
  FiAward,
  FiStar,
  FiActivity,
  FiPieChart,
  FiBell,
  FiSearch,
  FiFilter,
  FiDownload,
  FiMoreVertical,
  FiChevronRight,
  FiHome,
  FiBookmark,
  FiHeart,
  FiShare2,
} from 'react-icons/fi';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getMyNewsAPI,
  deleteNewsAPI,
  getMyDashboardStatsAPI,
} from '../lib/api/news.api';
import useAuthStore from '../lib/stores/auth.store';
import toast from 'react-hot-toast';
import StatsCards from '../components/Dashboard/StatsCards';
import RecentActivity from '../components/Dashboard/RecentActivity';
import { useState, useEffect } from 'react';

const Dashboard = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [greeting, setGreeting] = useState('');

  // Get auth state from store
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  // Set greeting based on time
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  // ✅ Fetch user's news
  const {
    data: newsData,
    isLoading: newsLoading,
    isError: newsError,
    error: newsErrorDetails,
  } = useQuery({
    queryKey: ['my-news'],
    queryFn: getMyNewsAPI,
    retry: 1,
    enabled: isAuthenticated,
  });

  // ✅ Fetch dashboard stats
  const {
    data: statsData,
    isLoading: statsLoading,
    isError: statsError,
  } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: getMyDashboardStatsAPI,
    retry: 1,
    enabled: isAuthenticated,
  });

  // ✅ Delete mutation
  const deleteMutation = useMutation({
    mutationFn: deleteNewsAPI,
    onSuccess: () => {
      toast.success('Deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['my-news'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Delete failed');
    },
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this news?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleLogout = () => {
    clearAuth();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  // Filter and sort articles
  const filteredNews = newsData?.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedNews = filteredNews?.sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortBy === 'oldest') {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else if (sortBy === 'views') {
      return (b.views || 0) - (a.views || 0);
    }
    return 0;
  });

  // Get unique categories for filter
  const categories = [
    ...new Set(newsData?.map((item) => item.category).filter(Boolean)),
  ];

  // Calculate achievements
  const achievements = [
    { name: 'First Article', achieved: newsData?.length >= 1, icon: '🌟' },
    { name: '5 Articles', achieved: newsData?.length >= 5, icon: '📚' },
    { name: '10 Articles', achieved: newsData?.length >= 10, icon: '🏆' },
    { name: '1000 Views', achieved: statsData?.totalViews >= 1000, icon: '👁️' },
  ];

  // Show loading state
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-linear-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-white/20 border-t-white"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-10 w-10 bg-white rounded-full animate-pulse"></div>
          </div>
          <p className="text-white mt-4 font-medium">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-linear-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-linear-to-br from-pink-200/30 to-indigo-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Glassmorphism */}
        <div className="mb-8 backdrop-blur-xl bg-white/70 rounded-3xl shadow-2xl border border-white/50 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start space-x-4">
              {/* Animated Logo/Icon */}
              <div className="relative">
                <div className="h-20 w-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-200 group hover:scale-105 hover:rotate-3 transition-all duration-500">
                  <FiGrid className="h-10 w-10 text-white group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <div className="absolute -top-1 -right-1 h-5 w-5 bg-green-500 border-2 border-white rounded-full animate-pulse"></div>
              </div>

              {/* User Info */}
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
                    Dashboard
                  </h1>
                  <span className="px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-semibold rounded-full shadow-lg">
                    PRO MEMBER
                  </span>
                  <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full shadow-lg animate-pulse">
                    ● ONLINE
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-indigo-100 shadow-sm">
                    <FiUser className="h-4 w-4 text-indigo-500 mr-2" />
                    <p className="text-gray-700">
                      <span className="text-gray-500">{greeting},</span>
                      <span className="font-semibold text-indigo-600 ml-1">
                        <Link to={'/dashboard/profile'}>
                          {user?.name || user?.email?.split('@')[0] || 'User'}
                        </Link>
                      </span>
                    </p>
                  </div>

                  {/* Quick Stats Pills */}
                  <div className="hidden md:flex items-center space-x-2">
                    <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                      <FiAward className="mr-1 h-3 w-3" />
                      {newsData?.length || 0} Articles
                    </div>
                    <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                      <FiEye className="mr-1 h-3 w-3" />
                      {statsData?.totalViews?.toLocaleString() || 0} Views
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <Link
                to="/"
                className="group relative overflow-hidden bg-white text-gray-700 px-5 py-3 rounded-xl border border-gray-200 hover:border-indigo-300 hover:text-indigo-600 transition-all shadow-md hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                <span className="relative flex items-center">
                  <FiHome className="mr-2 h-5 w-5" />
                  Home
                </span>
              </Link>

              <Link
                to="/dashboard/create-news"
                className="group relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative flex items-center">
                  <FiPlus className="mr-2 h-5 w-5 animate-pulse" />
                  Create News
                </span>
              </Link>

              <button
                onClick={handleLogout}
                className="group relative overflow-hidden bg-white text-gray-700 px-5 py-3 rounded-xl border border-gray-200 hover:border-red-300 hover:text-red-600 hover:bg-red-50 transition-all shadow-md hover:shadow-xl"
              >
                <span className="relative flex items-center">
                  <FiLogOut className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  Logout
                </span>
              </button>
            </div>
          </div>

          {/* Tabs with enhanced styling */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex space-x-2 bg-white/80 backdrop-blur-sm p-1.5 rounded-2xl border border-gray-200 shadow-inner">
              <button
                onClick={() => setActiveTab('overview')}
                className={`relative px-6 py-3 rounded-xl font-medium text-sm transition-all ${
                  activeTab === 'overview'
                    ? 'text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {activeTab === 'overview' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg shadow-indigo-200"></div>
                )}
                <span className="relative flex items-center">
                  <FiBarChart2 className="mr-2 h-4 w-4" />
                  Overview
                </span>
              </button>

              <button
                onClick={() => setActiveTab('articles')}
                className={`relative px-6 py-3 rounded-xl font-medium text-sm transition-all ${
                  activeTab === 'articles'
                    ? 'text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {activeTab === 'articles' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg shadow-indigo-200"></div>
                )}
                <span className="relative flex items-center">
                  <FiList className="mr-2 h-4 w-4" />
                  My Articles
                  {newsData?.length > 0 && (
                    <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs">
                      {newsData.length}
                    </span>
                  )}
                </span>
              </button>
            </div>

            {/* Notification Bell */}
            <button className="relative p-3 bg-white rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all">
              <FiBell className="h-5 w-5 text-gray-600" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full animate-ping"></span>
              <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {statsError ? (
              <div className="backdrop-blur-xl bg-white/70 rounded-3xl shadow-2xl p-12 text-center max-w-lg mx-auto border border-white/50">
                <div className="h-20 w-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiBarChart2 className="h-10 w-10 text-red-600" />
                </div>
                <p className="text-red-600 text-xl mb-6 font-semibold">
                  Failed to load dashboard stats
                </p>
                <button
                  onClick={() =>
                    queryClient.invalidateQueries({
                      queryKey: ['dashboard-stats'],
                    })
                  }
                  className="px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl hover:shadow-2xl hover:scale-105 transition-all font-medium"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <>
                {/* Achievements Bar */}
                <div className="mb-6 backdrop-blur-xl bg-white/70 rounded-2xl shadow-xl border border-white/50 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-700 flex items-center">
                      <FiAward className="mr-2 h-5 w-5 text-yellow-500" />
                      Your Achievements
                    </h3>
                    <span className="text-xs text-gray-400">
                      {achievements.filter((a) => a.achieved).length}/
                      {achievements.length} unlocked
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {achievements.map((ach, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center px-3 py-2 rounded-xl border ${
                          ach.achieved
                            ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200'
                            : 'bg-gray-50 border-gray-200 opacity-50'
                        }`}
                      >
                        <span className="text-xl mr-2">{ach.icon}</span>
                        <span
                          className={`text-sm font-medium ${
                            ach.achieved ? 'text-yellow-700' : 'text-gray-400'
                          }`}
                        >
                          {ach.name}
                        </span>
                        {ach.achieved && (
                          <FiStar className="ml-2 h-4 w-4 text-yellow-500 fill-current" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <StatsCards stats={statsData} isLoading={statsLoading} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                  {/* Recent Activity - Enhanced */}
                  <div className="lg:col-span-2 backdrop-blur-xl bg-white/70 rounded-3xl shadow-2xl border border-white/50 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-800 flex items-center">
                        <FiActivity className="mr-2 h-5 w-5 text-indigo-600" />
                        Recent Activity
                      </h3>
                      <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center">
                        View All
                        <FiChevronRight className="ml-1 h-4 w-4" />
                      </button>
                    </div>
                    <RecentActivity
                      news={statsData?.recentNews}
                      isLoading={statsLoading}
                    />
                  </div>

                  {/* Quick Stats - Enhanced */}
                  <div className="backdrop-blur-xl bg-white/70 rounded-3xl shadow-2xl border border-white/50 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-800 flex items-center">
                        <FiPieChart className="mr-2 h-5 w-5 text-purple-600" />
                        Quick Stats
                      </h3>
                      <FiTrendingUp className="h-5 w-5 text-green-500 animate-pulse" />
                    </div>

                    {statsLoading ? (
                      <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="animate-pulse">
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                            <div className="h-8 bg-gray-200 rounded"></div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="relative p-5 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl border border-indigo-100 group hover:scale-105 transition-transform">
                          <p className="text-sm text-indigo-600 mb-1 font-medium">
                            Total Views
                          </p>
                          <p className="text-3xl font-bold text-indigo-700">
                            {statsData?.totalViews?.toLocaleString() || 0}
                          </p>
                          <div className="absolute top-3 right-3 opacity-10 group-hover:opacity-20">
                            <FiEye className="h-12 w-12 text-indigo-600" />
                          </div>
                        </div>

                        <div className="relative p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 group hover:scale-105 transition-transform">
                          <p className="text-sm text-green-600 mb-1 font-medium">
                            Published
                          </p>
                          <p className="text-3xl font-bold text-green-700">
                            {statsData?.publishedCount || 0}
                          </p>
                          <div className="absolute top-3 right-3 opacity-10 group-hover:opacity-20">
                            <FiFileText className="h-12 w-12 text-green-600" />
                          </div>
                        </div>

                        <div className="relative p-5 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100 group hover:scale-105 transition-transform">
                          <p className="text-sm text-purple-600 mb-1 font-medium">
                            Drafts
                          </p>
                          <p className="text-3xl font-bold text-purple-700">
                            {statsData?.draftCount || 0}
                          </p>
                          <div className="absolute top-3 right-3 opacity-10 group-hover:opacity-20">
                            <FiEdit2 className="h-12 w-12 text-purple-600" />
                          </div>
                        </div>

                        {/* Performance Indicator */}
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">
                              Performance
                            </span>
                            <span className="text-sm font-semibold text-green-600">
                              {statsData?.totalViews > 1000
                                ? 'Excellent'
                                : 'Good'}
                            </span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                              style={{
                                width: `${Math.min((statsData?.totalViews / 2000) * 100, 100)}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Monthly Activity - Enhanced */}
                {statsData?.monthlyActivity?.length > 0 && (
                  <div className="mt-6 backdrop-blur-xl bg-white/70 rounded-3xl shadow-2xl border border-white/50 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <FiCalendar className="h-5 w-5 text-indigo-600 mr-2" />
                        <h3 className="text-xl font-bold text-gray-800">
                          Monthly Activity (Last 6 Months)
                        </h3>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 bg-indigo-50 rounded-lg text-indigo-600 hover:bg-indigo-100 transition-colors">
                          <FiDownload className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="h-72 flex items-end space-x-3">
                      {statsData.monthlyActivity.map((month, index) => {
                        const monthName = new Date(
                          month._id.year,
                          month._id.month - 1
                        ).toLocaleString('default', { month: 'short' });
                        const maxCount = Math.max(
                          ...statsData.monthlyActivity.map((m) => m.count)
                        );
                        const height =
                          maxCount > 0 ? (month.count / maxCount) * 100 : 0;

                        return (
                          <div
                            key={`${month._id.year}-${month._id.month}`}
                            className="flex-1 flex flex-col items-center group"
                          >
                            <div className="relative w-full">
                              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1.5 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap shadow-xl">
                                {month.count} articles
                                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                              </div>
                              <div
                                className="w-full bg-gradient-to-t from-indigo-100 to-purple-100 rounded-t-2xl relative overflow-hidden cursor-pointer"
                                style={{ height: '200px' }}
                              >
                                <div
                                  className="absolute bottom-0 w-full bg-gradient-to-t from-indigo-600 via-purple-600 to-pink-600 rounded-t-2xl transition-all duration-500 transform group-hover:scale-y-105 group-hover:shadow-2xl"
                                  style={{ height: `${height}%` }}
                                >
                                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                              </div>
                            </div>
                            <div className="mt-3 text-sm font-semibold text-gray-700">
                              {monthName}
                            </div>
                            <div className="text-xs text-gray-400">
                              {month._id.year}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {/* Articles Tab */}
        {activeTab === 'articles' && (
          <div className="backdrop-blur-xl bg-white/70 rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
            {/* Article Header with Filters */}
            <div className="p-6 border-b border-gray-200/50">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                    <FiList className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      My Articles
                    </h2>
                    <p className="text-sm text-gray-500">
                      Manage and track your published content
                    </p>
                  </div>
                </div>

                {/* Search and Filter */}
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search articles..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all w-64"
                    />
                  </div>

                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="p-2 bg-white border border-gray-200 rounded-xl hover:border-indigo-300 hover:text-indigo-600 transition-all relative"
                  >
                    <FiFilter className="h-5 w-5" />
                    {(selectedCategory !== 'all' || sortBy !== 'newest') && (
                      <span className="absolute -top-1 -right-1 h-3 w-3 bg-indigo-600 rounded-full animate-pulse"></span>
                    )}
                  </button>
                </div>
              </div>

              {/* Filter Panel */}
              {showFilters && (
                <div className="mt-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 animate-slideDown">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-gray-500 mb-1 block">
                        Category
                      </label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-300"
                      >
                        <option value="all">All Categories</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 mb-1 block">
                        Sort By
                      </label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-300"
                      >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="views">Most Views</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Stats Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-3 border border-indigo-100">
                  <p className="text-xs text-indigo-600">Total Articles</p>
                  <p className="text-xl font-bold text-indigo-700">
                    {newsData?.length || 0}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3 border border-green-100">
                  <p className="text-xs text-green-600">Published</p>
                  <p className="text-xl font-bold text-green-700">
                    {statsData?.publishedCount || 0}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-3 border border-purple-100">
                  <p className="text-xs text-purple-600">Drafts</p>
                  <p className="text-xl font-bold text-purple-700">
                    {statsData?.draftCount || 0}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-3 border border-amber-100">
                  <p className="text-xs text-amber-600">Total Views</p>
                  <p className="text-xl font-bold text-amber-700">
                    {statsData?.totalViews?.toLocaleString() || 0}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* Loading State */}
              {newsLoading && (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="bg-white/50 rounded-2xl p-6 animate-pulse border border-gray-200"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="h-20 w-20 bg-gray-200 rounded-xl"></div>
                        <div className="flex-1">
                          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Error State */}
              {newsError && (
                <div className="text-center py-16">
                  <div className="h-24 w-24 bg-red-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <FiFileText className="h-12 w-12 text-red-600" />
                  </div>
                  <p className="text-red-600 text-xl mb-6 font-semibold">
                    {newsErrorDetails?.response?.data?.message ||
                      'Failed to load articles'}
                  </p>
                  <button
                    onClick={() =>
                      queryClient.invalidateQueries({ queryKey: ['my-news'] })
                    }
                    className="px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl hover:shadow-2xl hover:scale-105 transition-all font-medium"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {/* Empty State */}
              {!newsLoading &&
                !newsError &&
                (!newsData || newsData.length === 0) && (
                  <div className="text-center py-16">
                    <div className="relative w-32 h-32 mx-auto mb-6">
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-3xl animate-pulse"></div>
                      <div className="absolute inset-2 bg-white rounded-2xl flex items-center justify-center">
                        <FiFileText className="h-12 w-12 text-indigo-400" />
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-800 mb-3">
                      No articles yet
                    </h3>
                    <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
                      Start your journey by creating your first news article and
                      share your stories with the world.
                    </p>
                    <Link
                      to="/dashboard/create-news"
                      className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-xl hover:shadow-2xl hover:scale-105 transition-all font-medium group"
                    >
                      <FiPlus className="mr-2 h-5 w-5 group-hover:rotate-90 transition-transform" />
                      Create Your First Article
                    </Link>
                  </div>
                )}

              {/* Articles List */}
              {!newsLoading &&
                !newsError &&
                sortedNews &&
                sortedNews.length > 0 && (
                  <div className="space-y-4">
                    {sortedNews.map((news, index) => (
                      <div
                        key={news._id}
                        className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:border-indigo-200 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div className="flex-1">
                            <div className="flex items-start space-x-4">
                              <div className="relative">
                                {news.image ? (
                                  <img
                                    src={news.image}
                                    alt={news.title}
                                    className="w-24 h-24 object-cover rounded-2xl shadow-md group-hover:shadow-xl transition-all"
                                  />
                                ) : (
                                  <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                                    <FiFileText className="h-10 w-10 text-gray-400" />
                                  </div>
                                )}
                                {/* Status Badge */}
                                <div
                                  className={`absolute -top-2 -right-2 h-5 w-5 rounded-full border-2 border-white ${
                                    news.published
                                      ? 'bg-green-500'
                                      : 'bg-yellow-500'
                                  }`}
                                >
                                  <span className="sr-only">
                                    {news.published ? 'Published' : 'Draft'}
                                  </span>
                                </div>
                              </div>

                              <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                                  <Link to={`/news/${news._id}`}>
                                    {news.title}
                                  </Link>
                                </h3>

                                <div className="flex flex-wrap items-center gap-3">
                                  <span className="flex items-center text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                    <FiClock className="mr-1 h-3 w-3" />
                                    {new Date(
                                      news.createdAt
                                    ).toLocaleDateString('en-US', {
                                      month: 'short',
                                      day: 'numeric',
                                      year: 'numeric',
                                    })}
                                  </span>

                                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>

                                  <span className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 text-xs px-3 py-1.5 rounded-full font-medium border border-indigo-200">
                                    {news.category}
                                  </span>

                                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>

                                  <span className="flex items-center text-sm text-gray-500">
                                    <FiEye className="mr-1 h-3 w-3" />
                                    {news.views || 0} views
                                  </span>

                                  {news.featured && (
                                    <>
                                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                      <span className="flex items-center text-yellow-600 bg-yellow-50 px-3 py-1.5 rounded-full text-xs font-medium">
                                        <FiStar className="mr-1 h-3 w-3 fill-current" />
                                        Featured
                                      </span>
                                    </>
                                  )}
                                </div>

                                {/* Read Time Estimate */}
                                <p className="text-xs text-gray-400 mt-2">
                                  {Math.ceil(
                                    news.description?.split(' ').length / 200
                                  )}{' '}
                                  min read
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center space-x-2 mt-4 md:mt-0">
                            <Link
                              to={`/dashboard/edit-news/${news._id}`}
                              className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 rounded-xl hover:from-blue-100 hover:to-indigo-100 hover:scale-110 transition-all border border-blue-200 hover:border-blue-300"
                              title="Edit"
                            >
                              <FiEdit2 className="h-5 w-5" />
                            </Link>

                            <button
                              onClick={() => handleDelete(news._id)}
                              className="p-3 bg-gradient-to-br from-red-50 to-pink-50 text-red-600 rounded-xl hover:from-red-100 hover:to-pink-100 hover:scale-110 transition-all border border-red-200 hover:border-red-300"
                              title="Delete"
                              disabled={deleteMutation.isLoading}
                            >
                              <FiTrash2 className="h-5 w-5" />
                            </button>

                            <Link
                              to={`/news/${news._id}`}
                              className="p-3 bg-gradient-to-br from-gray-50 to-gray-100 text-gray-600 rounded-xl hover:from-gray-100 hover:to-gray-200 hover:scale-110 transition-all border border-gray-200 hover:border-gray-300"
                              title="View"
                            >
                              <FiEye className="h-5 w-5" />
                            </Link>

                            <button
                              className="p-3 bg-gradient-to-br from-purple-50 to-pink-50 text-purple-600 rounded-xl hover:from-purple-100 hover:to-pink-100 hover:scale-110 transition-all border border-purple-200 hover:border-purple-300"
                              title="Share"
                            >
                              <FiShare2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>

                        {/* Progress Bar for Views */}
                        <div className="mt-4">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-gray-400">Engagement</span>
                            <span className="text-gray-600 font-medium">
                              {Math.min(
                                Math.round((news.views / 1000) * 100),
                                100
                              )}
                              %
                            </span>
                          </div>
                          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                              style={{
                                width: `${Math.min((news.views / 1000) * 100, 100)}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
