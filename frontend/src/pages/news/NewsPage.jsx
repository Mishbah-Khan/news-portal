import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllNewsAPI } from '../../lib/api/news.api';
import {
  FiClock,
  FiUser,
  FiBookmark,
  FiShare2,
  FiFilter,
  FiSearch,
  FiGrid,
  FiList,
  FiChevronRight,
  FiCalendar,
  FiEye,
} from 'react-icons/fi';

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      setLoading(true);
      const data = await getAllNewsAPI();
      setNews(data);

      // Extract unique categories
      const uniqueCategories = [
        ...new Set(data.map((item) => item.category).filter(Boolean)),
      ];
      setCategories(uniqueCategories);

      setError(null);
    } catch (err) {
      setError('Failed to fetch news');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter news based on category and search
  const filteredNews = news.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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

  // Loading Skeleton
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="bg-white rounded-2xl shadow-sm p-4 animate-pulse border border-gray-100"
        >
          <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
          <div className="flex justify-between">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      ))}
    </div>
  );

  // Grid View
  const GridView = ({ news }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {news.map((item, index) => (
        <article
          key={item._id}
          className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {/* Image Container */}
          <div className="relative h-48 overflow-hidden">
            {item.image ? (
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <span className="text-4xl opacity-50">📰</span>
              </div>
            )}

            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg backdrop-blur-sm bg-opacity-90">
                {item.category}
              </span>
            </div>

            {/* Bookmark Button */}
            <button className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg">
              <FiBookmark className="h-4 w-4 text-gray-700" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Meta Info */}
            <div className="flex items-center text-sm text-gray-500 mb-3">
              <FiCalendar className="h-3.5 w-3.5 mr-1" />
              <span>
                {new Date(item.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              <span className="mx-2">•</span>
              <FiEye className="h-3.5 w-3.5 mr-1" />
              <span>{item.views || 0} views</span>
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
              {item.title}
            </h2>

            {/* Description */}
            <p className="text-gray-600 mb-4 line-clamp-3">
              {item.description.substring(0, 120)}...
            </p>

            {/* Author and Read More */}
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500">
                <FiUser className="h-3.5 w-3.5 mr-1" />
                <span className="truncate max-w-[100px]">
                  {item.author?.name || 'NewsPortal'}
                </span>
              </div>

              <Link
                to={`/news/${item._id}`}
                className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 group/link"
              >
                Read More
                <FiChevronRight className="ml-1 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );

  // List View
  const ListView = ({ news }) => (
    <div className="space-y-4">
      {news.map((item, index) => (
        <article
          key={item._id}
          className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="flex flex-col md:flex-row">
            {/* Image */}
            <div className="md:w-64 h-48 md:h-auto relative overflow-hidden">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <span className="text-4xl opacity-50">📰</span>
                </div>
              )}

              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg">
                  {item.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6">
              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-3">
                <div className="flex items-center">
                  <FiCalendar className="h-3.5 w-3.5 mr-1" />
                  <span>
                    {new Date(item.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <div className="flex items-center">
                  <FiUser className="h-3.5 w-3.5 mr-1" />
                  <span>{item.author?.name || 'NewsPortal'}</span>
                </div>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <div className="flex items-center">
                  <FiEye className="h-3.5 w-3.5 mr-1" />
                  <span>{item.views || 0} views</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {item.title}
              </h2>

              {/* Description */}
              <p className="text-gray-600 mb-4 line-clamp-2">
                {item.description}
              </p>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <Link
                  to={`/news/${item._id}`}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Read Full Article
                  <FiChevronRight className="ml-1 h-4 w-4" />
                </Link>

                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <FiShare2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">All News</h1>
            <p className="text-xl text-blue-100">
              Stay updated with the latest stories and in-depth coverage
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters and Search Bar */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search news by title or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* View Toggle */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-xl transition-all ${
                    viewMode === 'grid'
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <FiGrid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-xl transition-all ${
                    viewMode === 'list'
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <FiList className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Categories Filter */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <FiFilter className="h-5 w-5 text-gray-400 mr-2" />
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all inline-flex items-center ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="mr-2">
                    {categoryIcons[category] || '📰'}
                  </span>
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              Showing{' '}
              <span className="font-semibold text-gray-900">
                {filteredNews.length}
              </span>{' '}
              articles
            </p>
            <p className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* News Grid/List */}
          {loading ? (
            <LoadingSkeleton />
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-12 text-center max-w-lg mx-auto">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">😕</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Oops! Something went wrong
              </h3>
              <p className="text-red-600 mb-6">{error}</p>
              <button
                onClick={loadNews}
                className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all shadow-md hover:shadow-lg font-medium"
              >
                Try Again
              </button>
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiSearch className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No articles found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filter to find what you're looking
                for.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-md hover:shadow-lg font-medium"
              >
                Clear Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <GridView news={filteredNews} />
          ) : (
            <ListView news={filteredNews} />
          )}
        </div>
      </section>
    </div>
  );
};

export default NewsPage;
