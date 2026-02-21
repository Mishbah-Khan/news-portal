import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiCalendar, FiUser, FiEye, FiShare2, FiBookmark } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const SingleNews = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [news, setNews] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Mock data - In real app, this would be an API call
    const mockNews = {
      id: id,
      title: 'Breaking: Major Technological Breakthrough Announced',
      content: `
        <p class="mb-4">Scientists at the Quantum Computing Institute have announced a major breakthrough in quantum computing technology that could revolutionize the field of computing as we know it. The breakthrough involves a new method of maintaining quantum coherence for extended periods, which has been one of the biggest challenges in quantum computing.</p>
        
        <p class="mb-4">Dr. Sarah Chen, lead researcher on the project, explained: "This discovery opens up new possibilities for quantum computing that we previously thought were decades away. We've managed to maintain quantum states for over 10 minutes at room temperature, which is unprecedented in the field."</p>
        
        <h2 class="text-2xl font-bold mb-4">Implications for the Future</h2>
        
        <p class="mb-4">The implications of this breakthrough are far-reaching. Quantum computers could potentially solve complex problems in seconds that would take traditional computers thousands of years. This includes applications in drug discovery, climate modeling, financial modeling, and artificial intelligence.</p>
        
        <p class="mb-4">Industry experts are calling this the "quantum leap" that the tech world has been waiting for. Major tech companies have already expressed interest in licensing the technology for commercial applications.</p>
        
        <div class="bg-gray-100 p-6 rounded-lg my-6">
          <p class="italic text-gray-700">"This is not just an incremental improvement; it's a complete paradigm shift in how we approach quantum computing. We're entering a new era of computational capability."</p>
          <p class="mt-2 font-semibold">- Dr. James Wilson, MIT Quantum Computing Lab</p>
        </div>
        
        <h2 class="text-2xl font-bold mb-4">What's Next?</h2>
        
        <p class="mb-4">The research team is now working on scaling up the technology for practical applications. They expect to have a working prototype within the next 18 months, with commercial applications following shortly after.</p>
        
        <p class="mb-4">The scientific community is buzzing with excitement, and several research institutions have already announced plans to replicate and build upon these findings.</p>
      `,
      category: 'Technology',
      author: 'John Doe',
      authorId: 'author1',
      date: '2024-01-15',
      views: 1234,
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3',
      tags: ['Technology', 'Science', 'Innovation']
    };

    const mockRelated = Array.from({ length: 3 }, (_, i) => ({
      id: (i + 10).toString(),
      title: `Related News Article ${i + 1}`,
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      category: 'Technology',
      image: `https://source.unsplash.com/random/800x600?tech&sig=${i}`
    }));

    setNews(mockNews);
    setRelatedNews(mockRelated);
    setLoading(false);
  }, [id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  const handleSave = () => {
    if (!user) {
      toast.error('Please login to save articles');
      return;
    }
    setSaved(!saved);
    toast.success(saved ? 'Article removed from saved' : 'Article saved');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container-custom">
        {/* Article */}
        <article className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <div className="mb-4">
              <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {news.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{news.title}</h1>
            
            {/* Meta Info */}
            <div className="flex flex-wrap items-center text-gray-600 mb-6 gap-4">
              <div className="flex items-center space-x-1">
                <FiUser />
                <span>{news.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <FiCalendar />
                <span>{new Date(news.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center space-x-1">
                <FiEye />
                <span>{news.views} views</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              <button
                onClick={handleShare}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              >
                <FiShare2 />
                <span>Share</span>
              </button>
              <button
                onClick={handleSave}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
                  saved 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <FiBookmark />
                <span>{saved ? 'Saved' : 'Save'}</span>
              </button>
            </div>
          </header>

          {/* Featured Image */}
          <div className="mb-8">
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />

          {/* Tags */}
          <div className="border-t pt-8 mb-12">
            <h3 className="font-semibold mb-4">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {news.tags.map(tag => (
                <Link
                  key={tag}
                  to={`/news?tag=${tag}`}
                  className="bg-gray-100 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        </article>

        {/* Related News */}
        <section className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Related News</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedNews.map(related => (
              <Link
                key={related.id}
                to={`/news/${related.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={related.image}
                  alt={related.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold hover:text-primary-600 transition">
                    {related.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SingleNews;