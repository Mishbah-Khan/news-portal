import React from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiUser, FiEye } from 'react-icons/fi';

const NewsCard = ({ news, featured = false }) => {
  return (
    <div className={`card ${featured ? 'col-span-2 row-span-2' : ''}`}>
      <Link to={`/news/${news.id}`}>
        <div className="relative">
          <img
            src={news.image || `https://source.unsplash.com/random/800x600?news&sig=${news.id}`}
            alt={news.title}
            className={`w-full object-cover ${featured ? 'h-96' : 'h-48'}`}
          />
          {news.category && (
            <span className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {news.category}
            </span>
          )}
        </div>
        <div className="p-6">
          <h3 className={`font-bold mb-2 ${featured ? 'text-2xl' : 'text-lg'} hover:text-primary-600 transition`}>
            {news.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2">
            {news.excerpt || news.content?.substring(0, 150) + '...'}
          </p>
          <div className="flex items-center text-sm text-gray-500 space-x-4">
            <div className="flex items-center space-x-1">
              <FiUser />
              <span>{news.author || 'Anonymous'}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FiCalendar />
              <span>{new Date(news.date || news.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FiEye />
              <span>{news.views || 0} views</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NewsCard;