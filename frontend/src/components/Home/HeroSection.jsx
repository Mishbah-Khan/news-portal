import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const HeroSection = ({ greeting, currentTime }) => {
  return (
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
};

export default HeroSection;