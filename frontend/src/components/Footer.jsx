import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaNewspaper } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FaNewspaper className="h-6 w-6 text-primary-400" />
              <span className="font-bold text-xl">NewsPortal</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your trusted source for the latest news, analysis, and insights from around the world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-primary-400 transition">Home</Link></li>
              <li><Link to="/news" className="text-gray-400 hover:text-primary-400 transition">News</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-primary-400 transition">Contact</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-primary-400 transition">About Us</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition">Technology</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition">Business</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition">Sports</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition">Entertainment</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Get in Touch</h3>
            <ul className="space-y-2 text-gray-400">
              <li>123 News Street</li>
              <li>New York, NY 10001</li>
              <li>contact@newsportal.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
            
            {/* Social Links */}
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} NewsPortal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;