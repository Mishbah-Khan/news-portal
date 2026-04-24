import { Link } from 'react-router-dom';
import { FiAward, FiUser, FiCalendar, FiShare2, FiArrowRight, FiStar } from 'react-icons/fi';

const FeaturedSection = ({ featuredNews, categoryColors }) => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-3 mb-12">
          <FiAward className="h-8 w-8 text-yellow-500" />
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Featured Stories
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featuredNews.slice(0, 2).map((item, index) => (
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
};

export default FeaturedSection;