import User from '../models/User.model.js';
import News from '../models/News.model.js';

// controllers/dashboardController.js

// @desc    Get dashboard stats
// @route   GET /api/dashboard/stats
// @access  Private
export const getDashboardStats = async (req, res) => {
  try {
    // Get basic counts
    const totalUsers = await User.countDocuments();
    const totalNews = await News.countDocuments();

    // Get recent news (last 6)
    const recentNews = await News.find()
      .sort({ createdAt: -1 })
      .limit(6)
      .populate('author', 'name email');

    // Simple stats object
    const stats = {
      totalUsers,
      totalNews,
      recentNews,
      message: 'Dashboard data fetched successfully',
    };

    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server Error',
      error: error.message,
    });
  }
};

// @desc    Get user dashboard (for logged in users)
// @route   GET /api/dashboard/user
// @access  Private
export const getUserDashboard = async (req, res) => {
  try {
    const News = require('../models/News');

    // Get user's own news
    const myNews = await News.find({ author: req.user.id }).sort({
      createdAt: -1,
    });

    // Simple user dashboard
    const userStats = {
      myTotalNews: myNews.length,
      myRecentNews: myNews.slice(0, 3),
      message: 'User dashboard data fetched successfully',
    };

    res.json(userStats);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server Error',
      error: error.message,
    });
  }
};

// @desc    Get admin dashboard
// @route   GET /api/dashboard/admin
// @access  Private/Admin
export const getAdminDashboard = async (req, res) => {
  try {
    const User = require('../models/User');
    const News = require('../models/News');

    // Get all counts
    const totalUsers = await User.countDocuments();
    const totalNews = await News.countDocuments();
    const totalAdmins = await User.countDocuments({ role: 'admin' });
    const totalRegularUsers = await User.countDocuments({ role: 'user' });

    // Get latest users
    const latestUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('-password');

    // Get latest news with author info
    const latestNews = await News.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('author', 'name email');

    // Admin dashboard data
    const adminStats = {
      counts: {
        totalUsers,
        totalAdmins,
        totalRegularUsers,
        totalNews,
      },
      latestUsers,
      latestNews,
      message: 'Admin dashboard data fetched successfully',
    };

    res.json(adminStats);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server Error',
      error: error.message,
    });
  }
};
