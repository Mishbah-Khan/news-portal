import { Link } from 'react-router-dom';
import { 
  FiStar, FiChevronRight, FiCalendar, FiUser, 
  FiHeart, FiEye, FiBookmark, FiArrowRight 
} from 'react-icons/fi';
import LoadingSkeleton from './LoadingSkeleton';

const LatestNewsSection = ({ latestNews, loading, likedArticles, savedArticles, onLike, onSave, categoryColors }) => {
  return (
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
                          onClick={(e) => onSave(e, item._id)}
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
                      {item.description?.substring(0, 120) || 'No description available'}...
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={(e) => onLike(e, item._id)}
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
};

export default LatestNewsSection;