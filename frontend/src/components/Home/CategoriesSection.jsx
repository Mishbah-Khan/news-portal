import { Link } from 'react-router-dom';
import { FiGlobe } from 'react-icons/fi';

const CategoriesSection = ({ categories, loading, categoryIcons }) => {
  return (
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
};

export default CategoriesSection;