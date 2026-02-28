import React, { useState } from 'react';
import { 
  FiUser, FiMail, FiLock, FiMapPin, FiPhone, FiCalendar, 
  FiEdit2, FiSave, FiX, FiCamera, FiLink, FiTwitter, FiLinkedin, 
  FiGithub, FiGlobe, FiClock, FiHeart, FiMessageCircle, 
  FiBookmark, FiShield, FiTrash2, FiSettings,
  FiAward, FiTrendingUp, FiStar
} from 'react-icons/fi';

const ProfilePage = () => {
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [activeSettingsTab, setActiveSettingsTab] = useState('general');
  
  // Dummy users data
  const dummyUsers = [
    {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "Password123",
      role: "user"
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      password: "SecurePass456",
      role: "user"
    },
    {
      name: "Admin User",
      email: "admin@example.com",
      password: "AdminPass789",
      role: "admin"
    },
    {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      password: "AlicePass321",
      role: "user"
    },
    {
      name: "Bob Wilson",
      email: "bob.wilson@example.com",
      password: "BobPass654",
      role: "moderator"
    }
  ];

  // Current user (John Doe for demo)
  const currentUser = dummyUsers[0];

  const [profileData, setProfileData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    role: currentUser.role,
    bio: "Passionate journalist and content creator with 5+ years of experience in digital media. Specializing in technology and business news. Featured in TechCrunch, Forbes, and Wired.",
    location: "New York, USA",
    phone: "+1 (555) 123-4567",
    joinDate: "January 15, 2024",
    articlesPublished: 47,
    followers: 1234,
    following: 567,
    website: "johndoe.com",
    twitter: "johndoe",
    linkedin: "john-doe-news",
    github: "johndoe",
    skills: ["Journalism", "Content Strategy", "SEO", "Data Analysis", "Photography"],
    languages: ["English (Native)", "Spanish (Intermediate)", "French (Basic)"],
    achievements: [
      { title: "Top Contributor 2024", icon: "🏆" },
      { title: "100K Views", icon: "📈" },
      { title: "Verified Writer", icon: "✓" }
    ]
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: FiUser },
    { id: 'analytics', label: 'Analytics', icon: FiTrendingUp },
    { id: 'saved', label: 'Saved', icon: FiBookmark },
    { id: 'settings', label: 'Settings', icon: FiSettings }
  ];

  const settingsTabs = [
    { id: 'general', label: 'General' },
    { id: 'security', label: 'Security' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'privacy', label: 'Privacy' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="container-custom max-w-7xl">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex text-sm text-gray-500">
            <a href="/" className="hover:text-primary-600 transition">Home</a>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Profile</span>
          </nav>
        </div>

        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 transform transition-all hover:shadow-2xl">
          {/* Cover Photo with Gradient */}
          <div className="relative h-64 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-700">
            {/* Decorative Pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Profile Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
              <div className="flex items-end space-x-6">
                {/* Avatar */}
                <div className="relative group">
                  <div className="w-28 h-28 bg-white rounded-2xl shadow-2xl flex items-center justify-center border-4 border-white transform transition-transform group-hover:scale-105">
                    <span className="text-5xl font-bold bg-gradient-to-br from-primary-600 to-primary-800 bg-clip-text text-transparent">
                      {profileData.name.charAt(0)}
                    </span>
                  </div>
                  <button className="absolute -bottom-2 -right-2 bg-primary-600 text-white p-2.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:bg-primary-700 hover:scale-110">
                    <FiCamera size={18} />
                  </button>
                </div>
                
                {/* User Info */}
                <div className="flex-1 text-white pb-2">
                  <h1 className="text-4xl font-bold mb-2">{profileData.name}</h1>
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center text-primary-100 bg-white/20 px-3 py-1 rounded-full text-sm">
                      <FiUser className="mr-2" size={14} />
                      {profileData.role.charAt(0).toUpperCase() + profileData.role.slice(1)}
                    </span>
                    <span className="flex items-center text-primary-100">
                      <FiCalendar className="mr-2" size={14} />
                      Joined {profileData.joinDate}
                    </span>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex space-x-3">
                  <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition flex items-center backdrop-blur-sm">
                    <FiMessageCircle className="mr-2" />
                    Message
                  </button>
                  <button className="bg-white text-primary-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition flex items-center font-medium shadow-lg">
                    <FiUser className="mr-2" />
                    Follow
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 divide-x bg-gray-50">
            {[
              { label: 'Articles', value: profileData.articlesPublished, icon: FiTrendingUp },
              { label: 'Followers', value: profileData.followers.toLocaleString(), icon: FiHeart },
              { label: 'Following', value: profileData.following.toLocaleString(), icon: FiUser },
              { label: 'Engagement', value: '89%', icon: FiStar }
            ].map((stat, index) => (
              <div key={index} className="p-4 text-center hover:bg-white transition group">
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className="text-gray-400 group-hover:text-primary-600 transition" size={20} />
                </div>
                <div className="font-bold text-xl text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24 border border-gray-100">
              {/* Navigation Tabs */}
              <nav className="space-y-1 mb-6">
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 font-medium border-l-4 border-primary-600'
                          : 'text-gray-600 hover:bg-gray-50 hover:pl-6'
                      }`}
                    >
                      <Icon className={`mr-3 ${activeTab === tab.id ? 'text-primary-600' : 'text-gray-400'}`} size={18} />
                      {tab.label}
                      {tab.id === 'saved' && (
                        <span className="ml-auto bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
                          12
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Skills Section */}
              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <FiAward className="mr-2 text-primary-600" />
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.map((skill, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-primary-100 hover:text-primary-700 transition">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="border-t pt-6 mt-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <FiGlobe className="mr-2 text-primary-600" />
                  Languages
                </h3>
                <div className="space-y-2">
                  {profileData.languages.map((lang, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <span className="w-2 h-2 bg-primary-400 rounded-full mr-2"></span>
                      {lang}
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div className="border-t pt-6 mt-4">
                <h3 className="font-semibold text-gray-900 mb-3">Achievements</h3>
                <div className="space-y-2">
                  {profileData.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center p-2 bg-gray-50 rounded-lg">
                      <span className="text-2xl mr-3">{achievement.icon}</span>
                      <span className="text-sm font-medium text-gray-700">{achievement.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9 space-y-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <>
                {/* Bio Card */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900">About</h2>
                    <button
                      onClick={() => setEditing(!editing)}
                      className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                        editing
                          ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          : 'bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg'
                      }`}
                    >
                      {editing ? (
                        <>
                          <FiX className="mr-2" />
                          Cancel
                        </>
                      ) : (
                        <>
                          <FiEdit2 className="mr-2" />
                          Edit Profile
                        </>
                      )}
                    </button>
                  </div>

                  {!editing ? (
                    <div className="prose max-w-none">
                      <p className="text-gray-700 leading-relaxed">{profileData.bio}</p>
                    </div>
                  ) : (
                    <textarea
                      name="bio"
                      value={profileData.bio}
                      onChange={handleInputChange}
                      rows="4"
                      className="input-field w-full"
                      placeholder="Tell us about yourself..."
                    />
                  )}
                </div>

                {/* Personal Information Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Contact Info */}
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                        <FiUser className="text-primary-600" size={16} />
                      </div>
                      Personal Information
                    </h3>
                    
                    <div className="space-y-4">
                      {[
                        { icon: FiUser, label: 'Full Name', value: profileData.name, name: 'name' },
                        { icon: FiMail, label: 'Email', value: profileData.email, name: 'email' },
                        { icon: FiPhone, label: 'Phone', value: profileData.phone, name: 'phone' },
                        { icon: FiMapPin, label: 'Location', value: profileData.location, name: 'location' }
                      ].map((field, index) => (
                        <div key={index} className="flex items-start">
                          <field.icon className="text-gray-400 mr-3 mt-1" size={16} />
                          <div className="flex-1">
                            <p className="text-xs text-gray-500">{field.label}</p>
                            {editing ? (
                              <input
                                type="text"
                                name={field.name}
                                value={field.value}
                                onChange={handleInputChange}
                                className="input-field text-sm mt-1"
                              />
                            ) : (
                              <p className="text-gray-900">{field.value}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                        <FiLink className="text-primary-600" size={16} />
                      </div>
                      Social Links
                    </h3>
                    
                    <div className="space-y-4">
                      {[
                        { icon: FiGlobe, label: 'Website', value: profileData.website, name: 'website', link: true },
                        { icon: FiTwitter, label: 'Twitter', value: profileData.twitter, name: 'twitter', link: true },
                        { icon: FiLinkedin, label: 'LinkedIn', value: profileData.linkedin, name: 'linkedin', link: true },
                        { icon: FiGithub, label: 'GitHub', value: profileData.github, name: 'github', link: true }
                      ].map((field, index) => (
                        <div key={index} className="flex items-start">
                          <field.icon className="text-gray-400 mr-3 mt-1" size={16} />
                          <div className="flex-1">
                            <p className="text-xs text-gray-500">{field.label}</p>
                            {editing ? (
                              <input
                                type="text"
                                name={field.name}
                                value={field.value}
                                onChange={handleInputChange}
                                className="input-field text-sm mt-1"
                                placeholder={`Enter ${field.label.toLowerCase()}`}
                              />
                            ) : field.link ? (
                              <a 
                                href={`https://${field.value}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-primary-600 hover:underline text-sm"
                              >
                                {field.value}
                              </a>
                            ) : (
                              <p className="text-gray-900">{field.value}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {editing && (
                      <div className="mt-6 pt-4 border-t">
                        <button
                          onClick={() => setEditing(false)}
                          className="btn-primary w-full flex items-center justify-center"
                        >
                          <FiSave className="mr-2" />
                          Save Changes
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                      <FiClock className="text-primary-600" size={16} />
                    </div>
                    Recent Activity
                  </h3>
                  
                  <div className="space-y-4">
                    {[
                      { action: 'Published new article', title: 'The Future of AI Technology', time: '2 hours ago', icon: FiEdit2 },
                      { action: 'Commented on', title: 'Climate Change Solutions', time: '5 hours ago', icon: FiMessageCircle },
                      { action: 'Received 50 likes on', title: 'Digital Marketing Trends', time: '1 day ago', icon: FiHeart }
                    ].map((activity, index) => {
                      const Icon = activity.icon;
                      return (
                        <div key={index} className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg transition group">
                          <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary-100 transition">
                            <Icon className="text-primary-600" size={14} />
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-900">
                              <span className="font-medium">{activity.action}</span>{' '}
                              <span className="text-primary-600 hover:underline cursor-pointer">"{activity.title}"</span>
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h2 className="text-xl font-bold mb-6">Content Analytics</h2>
                
                {/* Analytics Charts Placeholder */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-6 rounded-xl">
                    <p className="text-sm text-primary-600 mb-2">Total Views</p>
                    <p className="text-3xl font-bold text-gray-900">24.5K</p>
                    <p className="text-xs text-green-600 mt-2">↑ 12% from last month</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                    <p className="text-sm text-blue-600 mb-2">Total Reads</p>
                    <p className="text-3xl font-bold text-gray-900">18.2K</p>
                    <p className="text-xs text-green-600 mt-2">↑ 8% from last month</p>
                  </div>
                </div>

                {/* Top Articles */}
                <h3 className="font-semibold mb-4">Top Performing Articles</h3>
                <div className="space-y-3">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">The Impact of Technology on Modern Business</p>
                        <p className="text-sm text-gray-500">Published March 15, 2024</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary-600">2.3K views</p>
                        <p className="text-xs text-gray-500">45 comments</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                {/* Settings Sub-navigation */}
                <div className="border-b bg-gray-50">
                  <nav className="flex space-x-1 p-2">
                    {settingsTabs.map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveSettingsTab(tab.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          activeSettingsTab === tab.id
                            ? 'bg-white text-primary-600 shadow-sm'
                            : 'text-gray-600 hover:bg-white/50'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>

                <div className="p-6">
                  {/* General Settings */}
                  {activeSettingsTab === 'general' && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold mb-4">General Settings</h3>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Display Name
                        </label>
                        <input type="text" className="input-field" defaultValue={profileData.name} />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input type="email" className="input-field" defaultValue={profileData.email} />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Timezone
                        </label>
                        <select className="input-field">
                          <option>Eastern Time (UTC-5)</option>
                          <option>Central Time (UTC-6)</option>
                          <option>Mountain Time (UTC-7)</option>
                          <option>Pacific Time (UTC-8)</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Security Settings */}
                  {activeSettingsTab === 'security' && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
                      
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                        <div className="flex items-start">
                          <FiShield className="text-yellow-600 mr-3 mt-1" />
                          <div>
                            <p className="font-medium text-yellow-800">Two-Factor Authentication</p>
                            <p className="text-sm text-yellow-700">Protect your account by enabling 2FA</p>
                          </div>
                          <button className="ml-auto bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-yellow-700">
                            Enable
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Password
                        </label>
                        <div className="relative">
                          <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input type="password" className="pl-10 input-field" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          New Password
                        </label>
                        <div className="relative">
                          <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input type="password" className="pl-10 input-field" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input type="password" className="pl-10 input-field" />
                        </div>
                      </div>

                      <button className="btn-primary">
                        Update Password
                      </button>
                    </div>
                  )}

                  {/* Notifications Settings */}
                  {activeSettingsTab === 'notifications' && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
                      
                      <div className="space-y-4">
                        {[
                          { label: 'Email notifications', description: 'Receive updates via email' },
                          { label: 'Push notifications', description: 'Browser push notifications' },
                          { label: 'Article comments', description: 'Get notified when someone comments' },
                          { label: 'Newsletter', description: 'Weekly newsletter updates' }
                        ].map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium">{item.label}</p>
                              <p className="text-sm text-gray-500">{item.description}</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" defaultChecked />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Privacy Settings */}
                  {activeSettingsTab === 'privacy' && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold mb-4">Privacy Settings</h3>
                      
                      <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="font-medium mb-2">Profile Visibility</p>
                          <select className="input-field">
                            <option>Public</option>
                            <option>Private</option>
                            <option>Followers Only</option>
                          </select>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="font-medium mb-2">Show email on profile</p>
                          <div className="flex space-x-4">
                            <label className="flex items-center">
                              <input type="radio" name="email-visibility" className="mr-2" defaultChecked />
                              Yes
                            </label>
                            <label className="flex items-center">
                              <input type="radio" name="email-visibility" className="mr-2" />
                              No
                            </label>
                          </div>
                        </div>

                        {/* Danger Zone */}
                        <div className="border-t pt-6 mt-6">
                          <h4 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h4>
                          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-red-800">Delete Account</p>
                                <p className="text-sm text-red-600">Once deleted, this action cannot be undone</p>
                              </div>
                              <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition flex items-center">
                                <FiTrash2 className="mr-2" />
                                Delete Account
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Save Button for Settings */}
                  <div className="mt-6 pt-6 border-t">
                    <button className="btn-primary">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Saved Tab */}
            {activeTab === 'saved' && (
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h2 className="text-xl font-bold mb-6">Saved Items</h2>
                
                <div className="grid grid-cols-1 gap-4">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition group">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                          <FiBookmark className="text-primary-600" />
                        </div>
                        <div>
                          <p className="font-medium">10 Tips for Better Journalism</p>
                          <p className="text-sm text-gray-500">Saved 2 days ago • 5 min read</p>
                        </div>
                      </div>
                      <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition">
                        <FiX size={18} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Load More */}
                <div className="mt-6 text-center">
                  <button className="text-primary-600 hover:text-primary-700 font-medium">
                    Load More Saved Items
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Profile last updated: Today at 10:30 AM</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;