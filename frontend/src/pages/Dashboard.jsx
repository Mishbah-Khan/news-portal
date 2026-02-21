import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiEdit2, FiTrash2, FiPlus, FiUser, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [userNews, setUserNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    location: user?.location || '',
    phone: user?.phone || ''
  });

  useEffect(() => {
    // Load user's news from localStorage
    const allNews = JSON.parse(localStorage.getItem('news') || '[]');
    const userArticles = allNews.filter(news => news.authorId === user?.id);
    setUserNews(userArticles);
    setLoading(false);
  }, [user]);

  const handleDelete = (newsId) => {
    if (window.confirm('Are you sure you want to delete this news article?')) {
      const allNews = JSON.parse(localStorage.getItem('news') || '[]');
      const updatedNews = allNews.filter(news => news.id !== newsId);
      localStorage.setItem('news', JSON.stringify(updatedNews));
      setUserNews(userNews.filter(news => news.id !== newsId));
      toast.success('News deleted successfully');
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const result = await updateUser(profileData);
    if (result.success) {
      setEditing(false);
    }
  };

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
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
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
              
              {!editing ? (
                <>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                        <FiUser className="text-primary-600 text-xl" />
                      </div>
                      <div>
                        <p className="font-medium">{user?.name}</p>
                        <p className="text-sm text-gray-600">{user?.email}</p>
                      </div>
                    </div>
                    
                    {user?.bio && (
                      <div>
                        <p className="text-sm text-gray-600">Bio</p>
                        <p>{user.bio}</p>
                      </div>
                    )}
                    
                    {user?.location && (
                      <div className="flex items-center space-x-2 text-gray-600">
                        <FiMapPin />
                        <span>{user.location}</span>
                      </div>
                    )}
                    
                    {user?.phone && (
                      <div className="flex items-center space-x-2 text-gray-600">
                        <FiPhone />
                        <span>{user.phone}</span>
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={() => setEditing(true)}
                    className="mt-4 w-full btn-primary"
                  >
                    Edit Profile
                  </button>
                </>
              ) : (
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleProfileChange}
                      className="input-field"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      className="input-field bg-gray-100"
                      required
                      disabled
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={profileData.bio}
                      onChange={handleProfileChange}
                      rows="3"
                      className="input-field"
                      placeholder="Tell us about yourself"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={profileData.location}
                      onChange={handleProfileChange}
                      className="input-field"
                      placeholder="City, Country"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleProfileChange}
                      className="input-field"
                      placeholder="Your phone number"
                    />
                  </div>
                  
                  <div className="flex space-x-2">
                    <button type="submit" className="btn-primary flex-1">
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditing(false)}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* My News Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">My News Articles</h2>
                <Link to="/create-news" className="btn-primary flex items-center">
                  <FiPlus className="mr-2" />
                  Create News
                </Link>
              </div>

              {userNews.length > 0 ? (
                <div className="space-y-4">
                  {userNews.map(news => (
                    <div key={news.id} className="border rounded-lg p-4">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-semibold text-lg mb-2">{news.title}</h3>
                          <p className="text-gray-600 text-sm mb-2">
                            {new Date(news.createdAt).toLocaleDateString()}
                          </p>
                          <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded">
                            {news.category}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <Link
                            to={`/edit-news/${news.id}`}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                          >
                            <FiEdit2 />
                          </Link>
                          <button
                            onClick={() => handleDelete(news.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 mb-4">You haven't created any news articles yet.</p>
                  <Link to="/create-news" className="btn-primary inline-flex items-center">
                    <FiPlus className="mr-2" />
                    Create Your First News
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;