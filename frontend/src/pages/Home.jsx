import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NewsCard from '../components/NewsCard';
import { FiArrowRight } from 'react-icons/fi';

const Home = () => {
  const [featuredNews, setFeaturedNews] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - In real app, this would be API calls
    const mockNews = [
      {
        id: '1',
        title: 'Breaking: Major Technological Breakthrough Announced',
        excerpt: 'Scientists achieve quantum computing milestone that could revolutionize computing as we know it...',
        content: 'Full content here...',
        category: 'Technology',
        author: 'John Doe',
        date: '2024-01-15',
        views: 1234,
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3'
      },
      {
        id: '2',
        title: 'Global Climate Summit Reaches Historic Agreement',
        excerpt: 'World leaders commit to ambitious climate goals in landmark environmental accord...',
        category: 'Environment',
        author: 'Jane Smith',
        date: '2024-01-14',
        views: 2341,
        image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3'
      },
      {
        id: '3',
        title: 'New Study Reveals Health Benefits of Mediterranean Diet',
        excerpt: 'Research shows significant reduction in heart disease risk for those following traditional diet...',
        category: 'Health',
        author: 'Dr. Michael Chen',
        date: '2024-01-13',
        views: 3456,
        image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3'
      },
      {
        id: '4',
        title: 'Space Tourism: First Commercial Flight Reaches Orbit',
        excerpt: 'Historic mission marks new era in space exploration as civilians orbit Earth...',
        category: 'Science',
        author: 'Sarah Johnson',
        date: '2024-01-12',
        views: 4567,
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3'
      },
      {
        id: '5',
        title: 'AI Revolution: New Model Surpasses Human Performance',
        excerpt: 'Artificial intelligence achieves breakthrough in natural language understanding...',
        category: 'Technology',
        author: 'Alex Rivera',
        date: '2024-01-11',
        views: 5678,
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3'
      },
      {
        id: '6',
        title: 'Olympic Committee Announces New Sports for 2028',
        excerpt: 'Exciting additions to the Olympic program include cricket and flag football...',
        category: 'Sports',
        author: 'Mike Thompson',
        date: '2024-01-10',
        views: 6789,
        image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3'
      }
    ];

    setFeaturedNews(mockNews.slice(0, 6));
    setLatestNews(mockNews);
    setCategories(['Technology', 'Business', 'Sports', 'Entertainment', 'Health', 'Science']);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome to NewsPortal
            </h1>
            <p className="text-xl mb-8 text-primary-100">
              Your trusted source for the latest news, in-depth analysis, and breaking stories from around the world.
            </p>
            <Link to="/news" className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-flex items-center">
              Browse All News
              <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured News Section */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8">Featured News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredNews.map((news, index) => (
              <NewsCard key={news.id} news={news} featured={index === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-100">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8">Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/news?category=${category.toLowerCase()}`}
                className="bg-white p-6 rounded-lg text-center hover:shadow-lg transition group"
              >
                <h3 className="font-semibold group-hover:text-primary-600 transition">
                  {category}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Latest News</h2>
            <Link to="/news" className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
              View All
              <FiArrowRight className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestNews.slice(0, 6).map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-xl mb-8 text-primary-100">
            Get the latest news delivered directly to your inbox
          </p>
          <form className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none"
            />
            <button type="submit" className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;