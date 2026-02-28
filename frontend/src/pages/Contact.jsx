import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have a question or feedback? We'd love to hear from you. Send us a
            message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>

              <div className="space-y-4">
                {/* Head Office */}
                <div className="flex items-start space-x-3">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <FiMapPin className="text-primary-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium">Head Office</h3>
                    <p className="text-gray-600">123 Shaheed Minar Road</p>
                    <p className="text-gray-600">Boalia, Rajshahi - 6100</p>
                    <p className="text-gray-600">Bangladesh</p>
                  </div>
                </div>

                {/* Email Us */}
                <div className="flex items-start space-x-3">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <FiMail className="text-primary-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email Us</h3>
                    <p className="text-gray-600">news@newsportalbd.com</p>
                    <p className="text-gray-600">editor@newsportalbd.com</p>
                    <p className="text-gray-600">tips@newsportalbd.com</p>
                  </div>
                </div>

                {/* Call Our Newsroom */}
                <div className="flex items-start space-x-3">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <FiPhone className="text-primary-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium">Call Our Newsroom</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>

              {/* Map - Updated to Rajshahi, Bangladesh */}
              <div className="mt-6">
                <iframe
                  title="Office Location - Rajshahi, Bangladesh"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116833.831415748!2d88.56353937407118!3d24.37448280982206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fbef4c50af3b6b%3A0x2a23b403882b83f5!2sRajshahi!5e0!3m2!1sen!2sbd!4v1710345678901!5m2!1sen!2sbd"
                  className="w-full h-64 rounded-lg"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Contact Form - Updated */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Your Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="What is this regarding?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Please write your message here..."
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    📝 We typically respond within 24-48 hours. For urgent
                    matters, please call our newsroom directly.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full flex items-center justify-center"
                >
                  {loading ? (
                    'Sending...'
                  ) : (
                    <>
                      <FiSend className="mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
