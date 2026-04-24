import { useState } from 'react';
import { FiMail, FiArrowRight } from 'react-icons/fi';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert(`Subscribed with email: ${email}`);
    setEmail('');
  };

  return (
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
};

export default NewsletterSection;