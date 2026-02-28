// src/pages/SingleNews.page.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getSingleNewsAPI } from '../../lib/api/news.api.js';
import {
  FiArrowLeft,
  FiCalendar,
  FiUser,
  FiClock,
  FiShare2,
  FiBookmark,
  FiThumbsUp,
  FiMessageCircle,
  FiTwitter,
  FiFacebook,
  FiLink,
  FiChevronRight,
  FiEye,
  FiTag,
} from 'react-icons/fi';

const SingleNewsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    if (id) {
      loadSingleNews();
    }
  }, [id]);

  const loadSingleNews = async () => {
    try {
      setLoading(true);
      const data = await getSingleNewsAPI(id);
      setNews(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch news details');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const readingTime = news?.description
    ? Math.ceil(news.description.split(' ').length / 200)
    : 1;

  // Loading Skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Back button skeleton */}
          <div className="mb-6">
            <div className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>

          {/* Content skeleton */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="h-12 bg-gray-200 rounded w-3/4"></div>
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
              <div className="h-96 bg-gray-200 rounded-2xl"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-xl p-12 text-center max-w-md">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl">😕</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {error || 'News not found'}
          </h2>
          <p className="text-gray-600 mb-8">
            The article you're looking for might have been removed or doesn't
            exist.
          </p>
          <button
            onClick={() => navigate('/news')}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl font-medium"
          >
            <FiArrowLeft className="mr-2 h-5 w-5" />
            Back to News
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center text-gray-600 hover:text-gray-900 transition-colors bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-200 hover:shadow-md"
          >
            <FiArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setLiked(!liked)}
              className={`p-2 rounded-xl transition-all ${
                liked
                  ? 'bg-red-50 text-red-600 border-red-200'
                  : 'bg-white text-gray-600 border-gray-200 hover:text-red-600 hover:border-red-200'
              } border shadow-sm hover:shadow`}
            >
              <FiThumbsUp
                className={`h-5 w-5 ${liked ? 'fill-current' : ''}`}
              />
            </button>
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`p-2 rounded-xl transition-all ${
                bookmarked
                  ? 'bg-blue-50 text-blue-600 border-blue-200'
                  : 'bg-white text-gray-600 border-gray-200 hover:text-blue-600 hover:border-blue-200'
              } border shadow-sm hover:shadow`}
            >
              <FiBookmark
                className={`h-5 w-5 ${bookmarked ? 'fill-current' : ''}`}
              />
            </button>
          </div>
        </div>

        {/* Main Article */}
        <article className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Category Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4">
            <div className="flex items-center text-white/90">
              <FiTag className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Category</span>
              <FiChevronRight className="h-4 w-4 mx-2" />
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
                {news.category}
              </span>
            </div>
          </div>

          <div className="p-8 md:p-12">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {news.title}
            </h1>

            {/* Author and Meta Info */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-8 border-b border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-blue-100">
                    {news.author?.name?.charAt(0) || 'U'}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-lg">
                    {news.author?.name || 'NewsPortal'}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <FiUser className="mr-1 h-3.5 w-3.5" />
                    <span>{news.author?.email || 'Author'}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
                  <FiCalendar className="mr-2 h-4 w-4 text-blue-500" />
                  <span>
                    {new Date(news.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex items-center text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
                  <FiClock className="mr-2 h-4 w-4 text-blue-500" />
                  <span>{readingTime} min read</span>
                </div>
                <div className="flex items-center text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
                  <FiEye className="mr-2 h-4 w-4 text-blue-500" />
                  <span>{news.views || 0} views</span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            {news.image && (
              <div className="mb-10 rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-auto max-h-[500px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                {news.description}
              </p>
            </div>

            {/* Tags Section */}
            <div className="mt-10 pt-6 border-t border-gray-100">
              <h3 className="text-sm font-semibold text-gray-500 mb-3">
                Related Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors cursor-pointer">
                  #{news.category}
                </span>
                <span className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors cursor-pointer">
                  #BreakingNews
                </span>
                <span className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors cursor-pointer">
                  #Trending
                </span>
              </div>
            </div>

            {/* Share and Interaction Section */}
            <div className="mt-10 pt-6 border-t border-gray-100">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Share this Article
                  </h3>
                  <p className="text-sm text-gray-500">
                    Spread the word about this story
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() =>
                      window.open(
                        `https://twitter.com/intent/tweet?text=${encodeURIComponent(news.title)}&url=${window.location.href}`
                      )
                    }
                    className="group relative p-3 bg-gradient-to-br from-blue-400 to-blue-500 text-white rounded-xl hover:shadow-lg hover:scale-110 transition-all duration-300"
                    title="Share on Twitter"
                  >
                    <FiTwitter className="h-5 w-5" />
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      Twitter
                    </span>
                  </button>

                  <button
                    onClick={() =>
                      window.open(
                        `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`
                      )
                    }
                    className="group relative p-3 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg hover:scale-110 transition-all duration-300"
                    title="Share on Facebook"
                  >
                    <FiFacebook className="h-5 w-5" />
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      Facebook
                    </span>
                  </button>

                  <button
                    onClick={handleCopyLink}
                    className="group relative p-3 bg-gradient-to-br from-gray-600 to-gray-700 text-white rounded-xl hover:shadow-lg hover:scale-110 transition-all duration-300"
                    title="Copy link"
                  >
                    <FiLink className="h-5 w-5" />
                    <span
                      className={`absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded transition-opacity whitespace-nowrap ${
                        copySuccess
                          ? 'opacity-100'
                          : 'opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      {copySuccess ? 'Copied!' : 'Copy link'}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Comments Section Placeholder */}
            <div className="mt-10 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Comments (0)
                </h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                  <FiMessageCircle className="mr-2 h-4 w-4" />
                  Add Comment
                </button>
              </div>

              <div className="bg-gray-50 rounded-2xl p-8 text-center">
                <FiMessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">
                  No comments yet. Be the first to share your thoughts!
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all group"
              >
                <div className="h-32 bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-2 left-2">
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                      {news.category}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    Related article about {news.category} you might enjoy
                    reading
                  </h3>
                  <p className="text-xs text-gray-500">Just now</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleNewsPage;
