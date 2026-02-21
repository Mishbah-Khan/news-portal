import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const CreateNews = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Technology',
    content: '',
    excerpt: '',
    image: '',
    tags: ''
  });

  useEffect(() => {
    // If editing, load existing news
    if (id) {
      const allNews = JSON.parse(localStorage.getItem('news') || '[]');
      const newsToEdit = allNews.find(n => n.id === id);
      if (newsToEdit && newsToEdit.authorId === user?.id) {
        setFormData({
          title: newsToEdit.title,
          category: newsToEdit.category,
          content: newsToEdit.content,
          excerpt: newsToEdit.excerpt || '',
          image: newsToEdit.image || '',
          tags: newsToEdit.tags?.join(', ') || ''
        });
      } else {
        navigate('/dashboard');
      }
    }
  }, [id, user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const allNews = JSON.parse(localStorage.getItem('news') || '[]');
      
      const newsData = {
        id: id || Date.now().toString(),
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()),
        author: user?.name,
        authorId: user?.id,
        date: new Date().toISOString().split('T')[0],
        views: id ? undefined : 0,
        image: formData.image || `https://source.unsplash.com/random/800x600?${formData.category.toLowerCase()}&sig=${Date.now()}`
      };

      if (id) {
        // Update existing news
        const index = allNews.findIndex(n => n.id === id);
        if (index !== -1) {
          allNews[index] = { ...allNews[index], ...newsData };
          localStorage.setItem('news', JSON.stringify(allNews));
          toast.success('News updated successfully!');
        }
      } else {
        // Create new news
        allNews.push(newsData);
        localStorage.setItem('news', JSON.stringify(allNews));
        toast.success('News created successfully!');
      }

      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to save news');
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    'Technology',
    'Business',
    'Sports',
    'Entertainment',
    'Health',
    'Science',
    'Politics',
    'World'
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container-custom max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">
          {id ? 'Edit News Article' : 'Create New News Article'}
        </h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter news title"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              id="category"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="input-field"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Excerpt */}
          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
              Excerpt / Summary *
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              required
              rows="3"
              value={formData.excerpt}
              onChange={handleChange}
              className="input-field"
              placeholder="Brief summary of the news (max 200 characters)"
              maxLength="200"
            />
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Content *
            </label>
            <textarea
              id="content"
              name="content"
              required
              rows="10"
              value={formData.content}
              onChange={handleChange}
              className="input-field"
              placeholder="Write your news article content here..."
            />
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              Image URL (Optional)
            </label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="input-field"
              placeholder="https://example.com/image.jpg"
            />
            <p className="mt-1 text-sm text-gray-500">
              Leave empty to use a random image
            </p>
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
              Tags (Optional)
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="input-field"
              placeholder="technology, innovation, science (comma separated)"
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1"
            >
              {loading ? 'Saving...' : (id ? 'Update News' : 'Publish News')}
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNews;