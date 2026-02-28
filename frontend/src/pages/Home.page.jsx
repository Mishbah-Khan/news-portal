// src/pages/Home.page.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLatestNewsAPI, getAllNewsAPI } from '../lib/api/news.api.js';
import {
  FiArrowRight,
  FiTrendingUp,
  FiClock,
  FiMail,
  FiUser,
  FiCalendar,
  FiHash,
  FiChevronRight,
  FiStar,
  FiEye,
  FiHeart,
  FiBookmark,
  FiShare2,
  FiAward,
  FiGlobe,
  FiChevronUp,
} from 'react-icons/fi';

const HomePage = () => {
  const [latestNews, setLatestNews] = useState([]);
  const [trendingNews, setTrendingNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState({
    latest: true,
    trending: true,
    categories: true,
  });
  const [error, setError] = useState(null);
  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [likedArticles, setLikedArticles] = useState({});
  const [savedArticles, setSavedArticles] = useState({});
  const [email, setEmail] = useState('');
  const [dataFetched, setDataFetched] = useState(false); // Add this flag

  useEffect(() => {
    // Only fetch data once
    if (!dataFetched) {
      fetchHomePageData();
    }

    // Set greeting based on time
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    // Update time
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Scroll to top button visibility
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dataFetched]); // Add dataFetched as dependency

  const fetchHomePageData = async () => {
    try {
      setLoading((prev) => ({ ...prev, latest: true, trending: true, categories: true }));
      
      // Fetch latest 6 news
      const latestData = await getLatestNewsAPI();
      setLatestNews(latestData.slice(0, 6));

      // Fetch all news for trending and categories
      const allNews = await getAllNewsAPI();

      // Get trending news (most recent)
      setTrendingNews(allNews.slice(0, 4));

      // Extract unique categories
      const uniqueCategories = [
        ...new Set(allNews.map((item) => item.category)),
      ].filter(Boolean);
      setCategories(uniqueCategories.slice(0, 6));

      setError(null);
      setDataFetched(true); // Mark data as fetched
    } catch (err) {
      setError('Failed to fetch data');
      console.error('Error:', err);
    } finally {
      setLoading({
        latest: false,
        trending: false,
        categories: false,
      });
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription here
    alert(`Subscribed with email: ${email}`);
    setEmail('');
  };

  // Category icons mapping
  const categoryIcons = {
    Technology: '💻',
    Sports: '⚽',
    Health: '🏥',
    Business: '💼',
    Politics: '🏛️',
    Entertainment: '🎬',
    Science: '🔬',
    Education: '📚',
    Travel: '✈️',
    Food: '🍳',
    Fashion: '👗',
    Music: '🎵',
  };

  // Category colors mapping
  const categoryColors = {
    Technology: 'from-blue-500 to-cyan-500',
    Sports: 'from-green-500 to-emerald-500',
    Health: 'from-red-500 to-pink-500',
    Business: 'from-purple-500 to-indigo-500',
    Politics: 'from-gray-600 to-gray-800',
    Entertainment: 'from-pink-500 to-rose-500',
    Science: 'from-cyan-500 to-blue-500',
    Education: 'from-yellow-500 to-amber-500',
    Travel: 'from-indigo-500 to-purple-500',
    Food: 'from-orange-500 to-red-500',
    Fashion: 'from-fuchsia-500 to-pink-500',
    Music: 'from-violet-500 to-purple-500',
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLike = (e, id) => {
    e.preventDefault();
    setLikedArticles((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSave = (e, id) => {
    e.preventDefault();
    setSavedArticles((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Hero Section Component
  const HeroSection = () => (
    <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 -left-20 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-0 -right-20 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      <style>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-4xl mx-auto text-center">
          {/* Live indicator with time */}
          <div className="inline-flex items-center bg-white/10 backdrop-blur-lg px-6 py-3 rounded-full mb-8 border border-white/20">
            <span className="relative flex h-3 w-3 mr-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-sm font-medium text-white">{greeting}</span>
            <span className="ml-3 text-sm text-white/60">
              {currentTime.toLocaleTimeString()}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
              NewsPortal
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Stay informed with the latest news, trending stories, and in-depth
            coverage from around the world. Get real-time updates and expert
            analysis.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/news"
              className="group relative overflow-hidden bg-white text-indigo-900 px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center justify-center"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <span className="relative flex items-center">
                Browse All News
                <FiArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white/50 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );

  // Loading Skeleton Component
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="bg-white rounded-2xl shadow-lg p-4 animate-pulse"
        >
          <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      ))}
    </div>
  );

  // Latest News Section
  const LatestNewsSection = () => (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <FiStar className="h-6 w-6 text-yellow-500" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Latest News
              </h2>
            </div>
            <p className="text-gray-600">Most recent stories and updates</p>
          </div>
          <Link
            to="/news"
            className="group mt-4 sm:mt-0 inline-flex items-center text-indigo-600 hover:text-indigo-700 font-semibold bg-indigo-50 px-6 py-3 rounded-xl hover:bg-indigo-100 transition-all"
          >
            View All
            <FiChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading.latest ? (
          <LoadingSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestNews.map((item, index) => (
              <Link
                to={`/news/${item._id}`}
                key={item._id}
                className="group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <article className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500 overflow-hidden border border-gray-100 hover:border-indigo-200 h-full flex flex-col">
                  {item.image && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4">
                        <span
                          className={`bg-gradient-to-r ${categoryColors[item.category] || 'from-indigo-600 to-purple-600'} text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg`}
                        >
                          {item.category}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4 flex space-x-2">
                        <button
                          onClick={(e) => handleSave(e, item._id)}
                          className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300"
                          aria-label="Save article"
                        >
                          <FiBookmark
                            className={`h-4 w-4 ${savedArticles[item._id] ? 'fill-indigo-600 text-indigo-600' : 'text-gray-700'}`}
                          />
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <FiCalendar className="h-3.5 w-3.5 mr-1 text-indigo-400" />
                      <span>
                        {new Date(item.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="mx-2">•</span>
                      <FiUser className="h-3.5 w-3.5 mr-1 text-indigo-400" />
                      <span>{item.author?.name || 'NewsPortal'}</span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
                      {item.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                      {item.description.substring(0, 120)}...
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={(e) => handleLike(e, item._id)}
                          className="flex items-center text-sm text-gray-500 hover:text-red-500 transition-colors"
                          aria-label="Like article"
                        >
                          <FiHeart
                            className={`mr-1 h-4 w-4 ${likedArticles[item._id] ? 'fill-red-500 text-red-500' : ''}`}
                          />
                          <span>{item.likes || 24}</span>
                        </button>
                        <span className="flex items-center text-sm text-gray-500">
                          <FiEye className="mr-1 h-4 w-4" />
                          <span>{item.views || 156}</span>
                        </span>
                      </div>
                      <span className="inline-flex items-center text-indigo-600 font-medium group-hover:text-indigo-700">
                        Read More
                        <FiArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );

  // Categories Section
  const CategoriesSection = () => (
    <section id="categories-section" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl mb-4">
            <FiGlobe className="h-8 w-8 text-indigo-600" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Popular Categories
          </h2>
          <p className="text-gray-600 text-lg">
            Explore news by your favorite topics and interests
          </p>
        </div>

        {loading.categories ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-100 rounded-xl p-6 animate-pulse">
                <div className="h-10 w-10 bg-gray-200 rounded-full mx-auto mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Link
                to={`/news?category=${category}`}
                key={category}
                className="group relative overflow-hidden bg-gradient-to-br from-gray-50 to-white hover:from-indigo-50 hover:to-purple-50 p-6 rounded-2xl text-center transition-all duration-500 border border-gray-100 hover:border-indigo-200 hover:shadow-2xl hover:-translate-y-2"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="text-5xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                    {categoryIcons[category] || '📰'}
                  </div>
                  <h3 className="font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                    {category}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">24+ articles</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );

  // Trending News Section
  const TrendingSection = () => (
    <section
      id="trending-section"
      className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center mb-2">
              <FiTrendingUp className="h-8 w-8 text-pink-400 mr-3" />
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Trending Now
              </h2>
            </div>
            <p className="text-gray-300 text-lg">
              Most popular stories right now
            </p>
          </div>
          <FiHash className="h-8 w-8 text-white/30" />
        </div>

        {loading.trending ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-4 animate-pulse"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 rounded-lg"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-white/20 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-white/20 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trendingNews.map((item, index) => (
              <Link to={`/news/${item._id}`} key={item._id} className="group">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl hover:bg-white/20 transition-all duration-500 overflow-hidden border border-white/20 hover:border-white/40">
                  <div className="flex items-center p-4">
                    <div className="relative">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${categoryColors[item.category] || 'from-pink-500 to-purple-500'} rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-2xl`}
                      >
                        #{index + 1}
                      </div>
                      <div className="absolute -top-2 -right-2 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-bold text-gray-900">
                        🔥
                      </div>
                    </div>

                    {item.image && (
                      <div className="w-20 h-20 mx-4 rounded-xl overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    )}

                    <div className="flex-1">
                      <h3 className="font-bold text-white group-hover:text-pink-300 transition-colors line-clamp-2 mb-1">
                        {item.title}
                      </h3>
                      <div className="flex items-center text-xs text-gray-300">
                        <FiClock className="h-3 w-3 mr-1" />
                        <span>
                          {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                        <span className="mx-2">•</span>
                        <span className="bg-white/20 text-white px-2 py-0.5 rounded-full text-xs">
                          {item.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );

  // Featured Section
  const FeaturedSection = () => (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-3 mb-12">
          <FiAward className="h-8 w-8 text-yellow-500" />
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Featured Stories
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {latestNews.slice(0, 2).map((item, index) => (
            <Link to={`/news/${item._id}`} key={item._id} className="group">
              <div
                className={`relative rounded-3xl overflow-hidden h-125 shadow-2xl hover:shadow-3xl transition-shadow duration-500 ${
                  index === 0 ? 'lg:row-span-2' : ''
                }`}
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="mb-3 flex items-center space-x-2">
                    <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm px-4 py-1.5 rounded-full font-medium inline-flex items-center">
                      <FiStar className="h-3.5 w-3.5 mr-1" />
                      Featured Story
                    </span>
                    <span
                      className={`bg-gradient-to-r ${categoryColors[item.category] || 'from-indigo-600 to-purple-600'} text-white text-sm px-4 py-1.5 rounded-full font-medium`}
                    >
                      {item.category}
                    </span>
                  </div>

                  <h3 className="text-3xl font-bold mb-3 group-hover:text-yellow-300 transition-colors line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-gray-200 line-clamp-2 mb-4 text-lg">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-300">
                      <FiUser className="h-4 w-4 mr-2" />
                      <span>{item.author?.name || 'NewsPortal'}</span>
                      <span className="mx-3">•</span>
                      <FiCalendar className="h-4 w-4 mr-2" />
                      <span>
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button 
                        className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                        aria-label="Share article"
                      >
                        <FiShare2 className="h-4 w-4" />
                      </button>
                      <span className="inline-flex items-center text-yellow-400 font-medium group-hover:text-yellow-300 transition-colors">
                        Read Full Story
                        <FiArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );

  // Newsletter Section
  const NewsletterSection = () => (
    <section className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-400 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-lg rounded-3xl mb-8 border border-white/20 animate-pulse">
            <FiMail className="h-10 w-10 text-white" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Subscribe to Our Newsletter
          </h2>

          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Get the latest news delivered directly to your inbox. Stay updated
            with our daily digest of top stories.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 p-1 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20">
              <input
                type="email"
                id="newsletter-email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 bg-transparent text-white placeholder-blue-200 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="group relative overflow-hidden bg-white text-indigo-900 px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center justify-center"
                aria-label="Subscribe to newsletter"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="relative flex items-center">
                  Subscribe
                  <FiArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </span>
              </button>
            </div>
            <p className="text-sm text-blue-200 mt-4">
              No spam. Unsubscribe anytime. Join 10,000+ readers.
            </p>
          </form>
        </div>
      </div>
    </section>
  );

  // Scroll to Top Button
  const ScrollTopButton = () => (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 flex items-center justify-center z-50 ${
        showScrollTop
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-16 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <FiChevronUp className="h-6 w-6" />
    </button>
  );

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-12 text-center max-w-md border border-white/20">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">😕</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <button
            onClick={fetchHomePageData}
            className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:shadow-2xl hover:scale-105 transition-all font-semibold"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <LatestNewsSection />
      <CategoriesSection />
      <TrendingSection />
      <FeaturedSection />
      <NewsletterSection />
      <ScrollTopButton />
    </div>
  );
};

export default HomePage;