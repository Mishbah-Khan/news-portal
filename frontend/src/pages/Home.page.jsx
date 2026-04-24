import { useState, useEffect, useCallback } from 'react';
import { getLatestNewsAPI, getAllNewsAPI } from '../lib/api/news.api.js';
import HeroSection from '../components/Home/HeroSection';
import LatestNewsSection from '../components/Home/LatestNewsSection';
import CategoriesSection from '../components/Home/CategoriesSection';
import TrendingSection from '../components/Home/TrendingSection';
import FeaturedSection from '../components/Home/FeaturedSection';
import NewsletterSection from '../components/Home/NewsletterSection';
import ScrollTopButton from '../components/Home/ScrollTopButton';
import ErrorDisplay from '../components/Home/ErrorDisplay';

// Category icons mapping
export const categoryIcons = {
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
export const categoryColors = {
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
  const [dataFetched, setDataFetched] = useState(false);

  const fetchHomePageData = useCallback(async () => {
    if (dataFetched) return;
    
    try {
      setLoading((prev) => ({ ...prev, latest: true, trending: true, categories: true }));
      
      const latestData = await getLatestNewsAPI();
      setLatestNews(latestData.slice(0, 6));

      const allNews = await getAllNewsAPI();
      setTrendingNews(allNews.slice(0, 4));

      const uniqueCategories = [
        ...new Set(allNews.map((item) => item.category)),
      ].filter(Boolean);
      setCategories(uniqueCategories.slice(0, 6));

      setError(null);
      setDataFetched(true);
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
  }, [dataFetched]);

  // Set greeting based on time (runs once)
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch data once
  useEffect(() => {
    if (!dataFetched) {
      fetchHomePageData();
    }
  }, [fetchHomePageData, dataFetched]);

  const handleLike = (e, id) => {
    e.preventDefault();
    setLikedArticles((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSave = (e, id) => {
    e.preventDefault();
    setSavedArticles((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (error) {
    return <ErrorDisplay error={error} onRetry={fetchHomePageData} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <HeroSection greeting={greeting} currentTime={currentTime} />
      <LatestNewsSection 
        latestNews={latestNews}
        loading={loading}
        likedArticles={likedArticles}
        savedArticles={savedArticles}
        onLike={handleLike}
        onSave={handleSave}
        categoryColors={categoryColors}
      />
      <CategoriesSection 
        categories={categories}
        loading={loading}
        categoryIcons={categoryIcons}
      />
      <TrendingSection 
        trendingNews={trendingNews}
        loading={loading}
        categoryColors={categoryColors}
      />
      <FeaturedSection 
        featuredNews={latestNews}
        categoryColors={categoryColors}
      />
      <NewsletterSection />
      <ScrollTopButton showScrollTop={showScrollTop} onClick={scrollToTop} />
    </div>
  );
};

export default HomePage;