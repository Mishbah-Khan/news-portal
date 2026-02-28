// src/pages/About.page.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaNewspaper,
  FaUsers,
  FaClock,
  FaGlobe,
  FaAward,
  FaHeart,
  FaVideo,
  FaCamera,
  FaMicrophone,
} from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

const AboutPage = () => {
  const team = [
    {
      name: 'Taskin Ahmed',
      role: 'Founder & Editor-in-Chief',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
      bio: 'Former senior journalist at Daily Star with 12+ years of experience in print and digital media.',
    },
    {
      name: 'Mubassir Hossain',
      role: 'News Director',
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
      bio: 'Award-winning journalist specializing in political and current affairs coverage.',
    },
    {
      name: 'Mishba Rahman',
      role: 'Senior Correspondent',
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
      bio: 'Expert in investigative journalism and human interest stories from across Bangladesh.',
    },
    {
      name: 'Mobin Khan',
      role: 'Digital Media Editor',
      image: 'https://randomuser.me/api/portraits/men/3.jpg',
      bio: 'Leading our digital transformation with innovative multimedia news coverage.',
    },
  ];

  const stats = [
    { icon: FaNewspaper, value: '15K+', label: 'News Articles' },
    { icon: FaUsers, value: '100K+', label: 'Daily Readers' },
    { icon: FaClock, value: '24/7', label: 'Breaking News' },
    { icon: FaGlobe, value: '45+', label: 'Districts Covered' },
  ];

  const values = [
    {
      title: 'Truth First',
      description:
        'We verify every fact, cross-check every source, and ensure our reporting is accurate before publication.',
      icon: FaAward,
    },
    {
      title: 'Unbiased Reporting',
      description:
        'We present news without agenda, giving you the full picture to form your own opinion.',
      icon: FaHeart,
    },
    {
      title: 'Community Voice',
      description:
        'We amplify local stories and give voice to communities across Bangladesh.',
      icon: FaUsers,
    },
  ];

  const services = [
    {
      icon: FaNewspaper,
      title: 'Daily Newspaper',
      description: 'Comprehensive coverage of national and international news.',
    },
    {
      icon: FaVideo,
      title: 'News Broadcast',
      description: 'Live news updates and video reports from our studios.',
    },
    {
      icon: FaCamera,
      title: 'Photo Journalism',
      description: 'Visual storytelling through powerful imagery.',
    },
    {
      icon: FaMicrophone,
      title: 'Podcast & Radio',
      description: 'Audio news and discussions on current affairs.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            About NewsPortal Bangladesh
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Your trusted source for authentic news, breaking updates, and
            comprehensive coverage from across Bangladesh and around the world
            since 2026.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              At NewsPortal Bangladesh, we are committed to delivering accurate,
              timely, and impactful news that matters to you. From politics and
              economics to sports and entertainment, our dedicated team works
              around the clock to keep you informed. We believe in the power of
              journalism to strengthen democracy and build an informed society.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-12 h-12 mx-auto text-blue-600 mb-4" />
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Our Services</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Multiple platforms to keep you informed, wherever you are
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
              >
                <service.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Our Editorial Team
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Dedicated journalists bringing you news with integrity and
            excellence
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-blue-600 text-sm mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Our Journey</h2>
            <div className="prose prose-lg mx-auto text-gray-600">
              <p className="mb-4">
                Founded in <strong>2026</strong> in Rajshahi, Bangladesh,
                NewsPortal began with a simple vision: to provide authentic,
                unbiased news to the people of Bangladesh. What started as a
                small team of four passionate journalists has grown into one of
                the country's most trusted digital news platforms.
              </p>
              <p className="mb-4">
                Today, with Taskin, Mubassir, Mishba, and Mobin leading our
                newsroom, we've expanded our coverage to all 64 districts of
                Bangladesh. Our team of correspondents brings you news from the
                grassroots level to the national stage, ensuring no story goes
                untold.
              </p>
              <p>
                We've embraced digital innovation while maintaining the highest
                journalistic standards. From breaking news alerts to in-depth
                investigative reports, we're committed to keeping Bangladesh
                informed, one story at a time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Contact Our Newsroom
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-4">
                  Newsroom Information
                </h3>

                <div className="flex items-start space-x-4">
                  <MdLocationOn className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium">Head Office</p>
                    <p className="text-gray-600">
                      123 Shaheed Minar Road
                      <br />
                      Boalia, Rajshahi - 6100
                      <br />
                      Bangladesh
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MdEmail className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium">Email Us</p>
                    <p className="text-gray-600">news@newsportalbd.com</p>
                    <p className="text-gray-600">editor@newsportalbd.com</p>
                    <p className="text-gray-600">tips@newsportalbd.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MdPhone className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium">Call Our Newsroom</p>
                    <p className="text-gray-600">+880 1712-345678</p>
                    <p className="text-gray-600">+880 1812-345678</p>
                    <p className="text-sm text-gray-500 mt-1">
                      (24/7 News Hotline)
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    Send Your News Tip
                  </h4>
                  <p className="text-sm text-gray-600">
                    Have a story? Contact our news desk directly. Your identity
                    will be protected.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-4">Send a Message</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>News Tip</option>
                      <option>Press Release</option>
                      <option>Interview Request</option>
                      <option>Feedback</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      rows="4"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your message..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Send to Newsroom
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-8 bg-gray-900 text-white text-center">
        <div className="container mx-auto px-4">
          <p className="text-sm">
            © 2026 NewsPortal Bangladesh. All rights reserved. | Established in
            Rajshahi, serving the nation.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
