import { Link } from 'react-router-dom';
import { FiTrendingUp, FiHash, FiClock } from 'react-icons/fi';

const TrendingSection = ({ trendingNews, loading, categoryColors }) => {
  return (
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
};

export default TrendingSection;