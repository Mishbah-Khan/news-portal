import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FiMenu,
  FiX,
  FiUser,
  FiLogOut,
  FiEdit,
  FiHome,
  FiMail,
  FiFileText,
  FiChevronDown,
  FiBell,
  FiSettings,
  FiHelpCircle,
  FiStar,
  FiTrendingUp,
  FiGrid,
  FiBookmark,
  FiHeart,
} from 'react-icons/fi';
import { FaNewspaper } from 'react-icons/fa';
import useAuthStore from '../lib/stores/auth.store';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  // Fix: Use individual selectors instead of creating a new object
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    clearAuth();
    setIsOpen(false);
    setDropdownOpen(false);
    navigate('/');
  };

  // Function to scroll to section
  const scrollToSection = (sectionId) => {
    // First navigate to home page
    navigate('/');

    // Then scroll to section after navigation
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Handle navigation with section scroll
  const handleNavigation = (e, path, sectionId) => {
    e.preventDefault();

    if (location.pathname === '/') {
      // Already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setIsOpen(false);
      setDropdownOpen(false);
    } else {
      // Navigate to home then scroll
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      setIsOpen(false);
      setDropdownOpen(false);
    }
  };

  const navigation = [
    {
      name: 'Home',
      href: '/',
      icon: FiHome,
      active: location.pathname === '/',
      isHash: false,
    },
    {
      name: 'News',
      href: '/news',
      icon: FiFileText,
      active: location.pathname === '/news',
      isHash: false,
    },
    {
      name: 'Trending',
      href: '/#trending',
      icon: FiTrendingUp,
      active: location.pathname === '/' && location.hash === '#trending',
      isHash: true,
      sectionId: 'trending-section',
    },
    {
      name: 'Categories',
      href: '/#categories',
      icon: FiGrid,
      active: location.pathname === '/' && location.hash === '#categories',
      isHash: true,
      sectionId: 'categories-section',
    },
    {
      name: 'Contact',
      href: '/contact',
      icon: FiMail,
      active: location.pathname === '/contact',
      isHash: false,
    },
    {
      name: 'About',
      href: '/about',
      icon: FiStar,
      active: location.pathname === '/about',
      isHash: false,
    },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-2xl'
          : 'bg-white shadow-lg'
      }`}
    >
      {/* Top bar with gradient */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>

      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo with enhanced animation */}
          <Link
            to="/"
            className="flex items-center space-x-2 group"
            onClick={() => {
              setIsOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur-md opacity-0 group-hover:opacity-75 transition-opacity"></div>
              <span className="relative flex items-center font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-2 pr-5 pl-3 rounded-xl text-white cursor-pointer transform group-hover:scale-105 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                <img
                  src="/logo.png"
                  alt="News Portal Logo"
                  className="h-8 w-8 mr-2 rounded-full border-2 border-white bg-white 
                         transition-all duration-500 
                         group-hover:rotate-180 
                         group-hover:scale-110"
                />
                <span className="relative">
                  News<span className="text-yellow-300">Portal</span>
                </span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation with active states */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) =>
              item.isHash ? (
                <button
                  key={item.name}
                  onClick={(e) =>
                    handleNavigation(e, item.href, item.sectionId)
                  }
                  className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 group ${
                    item.active
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon
                    className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                      item.active ? 'text-blue-600' : 'text-gray-500'
                    }`}
                  />
                  <span>{item.name}</span>
                  {item.active && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></span>
                  )}
                </button>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 group ${
                    item.active
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    if (item.href === '/') {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                    setIsOpen(false);
                    setDropdownOpen(false);
                  }}
                >
                  <item.icon
                    className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                      item.active ? 'text-blue-600' : 'text-gray-500'
                    }`}
                  />
                  <span>{item.name}</span>
                  {item.active && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></span>
                  )}
                </Link>
              )
            )}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                {/* Notification Bell */}
                <button className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all group">
                  <FiBell className="w-5 h-5" />
                  {notifications > 0 && (
                    <>
                      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </>
                  )}
                </button>

                {/* User Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className={`flex items-center space-x-3 p-2 rounded-xl transition-all duration-300 ${
                      dropdownOpen
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                    }`}
                  >
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-semibold shadow-lg">
                        {user?.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-10 h-10 rounded-xl object-cover"
                          />
                        ) : (
                          user?.name?.charAt(0).toUpperCase() ||
                          user?.email?.charAt(0).toUpperCase() ||
                          'U'
                        )}
                      </div>
                      <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    </div>
                    <div className="hidden lg:block text-left">
                      <p className="text-sm font-semibold">
                        {user?.name || user?.email?.split('@')[0]}
                      </p>
                      <p className="text-xs text-gray-500">Premium Member</p>
                    </div>
                    <FiChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        dropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {dropdownOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setDropdownOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl py-2 z-20 border border-gray-100 overflow-hidden animate-slideDown">
                        {/* User Info Card */}
                        <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                              {user?.name?.charAt(0) ||
                                user?.email?.charAt(0) ||
                                'U'}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">
                                {user?.name || 'User'}
                              </p>
                              <p className="text-xs text-gray-600">
                                {user?.email}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-3 gap-2 p-3 border-b border-gray-100">
                          <div className="text-center">
                            <p className="text-lg font-bold text-gray-900">
                              12
                            </p>
                            <p className="text-xs text-gray-500">Articles</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-bold text-gray-900">
                              1.2k
                            </p>
                            <p className="text-xs text-gray-500">Views</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-bold text-gray-900">
                              56
                            </p>
                            <p className="text-xs text-gray-500">Likes</p>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="py-2">
                          <Link
                            to="/dashboard"
                            className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all group"
                            onClick={() => setDropdownOpen(false)}
                          >
                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-100">
                              <FiGrid className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="font-medium">Dashboard</p>
                              <p className="text-xs text-gray-500">
                                Manage your content
                              </p>
                            </div>
                          </Link>

                          <Link
                            to="/dashboard/create-news"
                            className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all group"
                            onClick={() => setDropdownOpen(false)}
                          >
                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-100">
                              <FiEdit className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="font-medium">Create News</p>
                              <p className="text-xs text-gray-500">
                                Write new article
                              </p>
                            </div>
                          </Link>

                          <button
                            onClick={(e) => {
                              setDropdownOpen(false);
                              handleNavigation(
                                e,
                                '/#trending',
                                'trending-section'
                              );
                            }}
                            className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all group text-left"
                          >
                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-100">
                              <FiTrendingUp className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="font-medium">Trending</p>
                              <p className="text-xs text-gray-500">
                                Popular stories
                              </p>
                            </div>
                          </button>

                          <button
                            onClick={(e) => {
                              setDropdownOpen(false);
                              handleNavigation(
                                e,
                                '/#categories',
                                'categories-section'
                              );
                            }}
                            className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all group text-left"
                          >
                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-100">
                              <FiGrid className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="font-medium">Categories</p>
                              <p className="text-xs text-gray-500">
                                Browse topics
                              </p>
                            </div>
                          </button>
                        </div>

                        <hr className="my-2" />

                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-all group"
                        >
                          <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-red-200">
                            <FiLogOut className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-medium">Logout</p>
                            <p className="text-xs text-red-400">
                              Sign out of your account
                            </p>
                          </div>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2.5 text-gray-700 hover:text-blue-600 font-medium transition-all hover:bg-gray-50 rounded-xl"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="relative group overflow-hidden px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  <span className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                  <span className="relative">Register</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button with animation */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative w-10 h-10 rounded-xl bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all group"
            aria-label="Toggle menu"
          >
            <div className="absolute inset-0 rounded-xl bg-blue-100 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative flex items-center justify-center">
              {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </div>
          </button>
        </div>

        {/* Mobile Navigation with animations */}
        <div
          className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${
            isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-1">
            {navigation.map((item) =>
              item.isHash ? (
                <button
                  key={item.name}
                  onClick={(e) => {
                    handleNavigation(e, item.href, item.sectionId);
                    setIsOpen(false);
                  }}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition-all transform hover:translate-x-2 ${
                    item.active
                      ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                  }`}
                >
                  <item.icon
                    className={`w-5 h-5 ${
                      item.active ? 'text-blue-600' : 'text-gray-500'
                    }`}
                  />
                  <span className="font-medium">{item.name}</span>
                  {item.active && (
                    <span className="ml-auto w-2 h-2 bg-blue-600 rounded-full"></span>
                  )}
                </button>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all transform hover:translate-x-2 ${
                    item.active
                      ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                  }`}
                  onClick={() => {
                    if (item.href === '/') {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                    setIsOpen(false);
                  }}
                >
                  <item.icon
                    className={`w-5 h-5 ${
                      item.active ? 'text-blue-600' : 'text-gray-500'
                    }`}
                  />
                  <span className="font-medium">{item.name}</span>
                  {item.active && (
                    <span className="ml-auto w-2 h-2 bg-blue-600 rounded-full"></span>
                  )}
                </Link>
              )
            )}

            <div className="border-t border-gray-200 my-4"></div>

            {isAuthenticated ? (
              <>
                {/* User Profile Card */}
                <div className="px-4 py-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl mx-2 mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">
                        {user?.name || 'User'}
                      </p>
                      <p className="text-sm text-gray-600">{user?.email}</p>
                      <span className="inline-flex items-center mt-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        <span className="w-1 h-1 bg-green-600 rounded-full mr-1"></span>
                        Online
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mobile Menu Items */}
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <FiGrid className="w-4 h-4" />
                  </div>
                  <span className="font-medium">Dashboard</span>
                </Link>

                <Link
                  to="/dashboard/create-news"
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <FiEdit className="w-4 h-4" />
                  </div>
                  <span className="font-medium">Create News</span>
                </Link>

                <button
                  onClick={(e) => {
                    handleNavigation(e, '/#trending', 'trending-section');
                    setIsOpen(false);
                  }}
                  className="flex items-center space-x-3 w-full px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all text-left"
                >
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <FiTrendingUp className="w-4 h-4" />
                  </div>
                  <span className="font-medium">Trending</span>
                </button>

                <button
                  onClick={(e) => {
                    handleNavigation(e, '/#categories', 'categories-section');
                    setIsOpen(false);
                  }}
                  className="flex items-center space-x-3 w-full px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all text-left"
                >
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <FiGrid className="w-4 h-4" />
                  </div>
                  <span className="font-medium">Categories</span>
                </button>

                <Link
                  to="/dashboard"
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <FiSettings className="w-4 h-4" />
                  </div>
                  <span className="font-medium">Settings</span>
                </Link>

                <Link
                  to="/help"
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <FiHelpCircle className="w-4 h-4" />
                  </div>
                  <span className="font-medium">Help & Support</span>
                </Link>

                <div className="border-t border-gray-200 my-4"></div>

                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all"
                >
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <FiLogOut className="w-4 h-4" />
                  </div>
                  <span className="font-medium">Logout</span>
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-3 px-4 mt-4">
                <Link
                  to="/login"
                  className="px-4 py-3 text-center text-gray-700 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 transition-all font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="relative group overflow-hidden px-4 py-3 text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:shadow-2xl transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                  <span className="relative">Register</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;