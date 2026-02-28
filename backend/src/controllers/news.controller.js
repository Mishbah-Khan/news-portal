import News from '../models/News.model.js';

const createNews = async (req, res) => {
  try {
    const { title, description, category } = JSON.parse(req.body.data);

    // Check if user exists
    if (!req.user && !req.headers._id) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
    }

    const author = req.headers._id;

    const imgUrl = req.file ? req.file.path : null;

    const news = await News.create({
      title,
      description,
      category,
      image: imgUrl,
      author: author,
    });

    res.status(201).json({
      success: true,
      message: 'News CREATED SUCCESSFULLY',
      data: news,
    });
  } catch (error) {}
};

// NEW: Get all news with author details
const getAllNews = async (req, res) => {
  try {
    // Find all news, populate author details, sort by newest first
    const news = await News.find()
      .populate('author', 'name email') // This will get author's name and email from User model
      .sort({ createdAt: -1 }); // -1 for descending (newest first)

    res.status(200).json({
      success: true,
      message: 'News FETCHED SUCCESSFULLY',
      count: news.length,
      data: news,
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({
      success: false,
      message: 'News FETCH FAILED',
      error: error.message,
    });
  }
};

// NEW: Get single news by ID
const getNewsById = async (req, res) => {
  try {
    const { id } = req.params;

    const news = await News.findById(id).populate('author', 'name email');

    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'News FETCHED SUCCESSFULLY',
      data: news,
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({
      success: false,
      message: 'News FETCH FAILED',
      error: error.message,
    });
  }
};

// NEW: Get news by category
const getNewsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const news = await News.find({ category })
      .populate('author', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: `News in category '${category}' FETCHED SUCCESSFULLY`,
      count: news.length,
      data: news,
    });
  } catch (error) {
    console.error('Error fetching news by category:', error);
    res.status(500).json({
      success: false,
      message: 'News FETCH FAILED',
      error: error.message,
    });
  }
};

// NEW: Get latest 6 news (for homepage)
const getLatestNews = async (req, res) => {
  try {
    const news = await News.find()
      .populate('author', 'name email')
      .sort({ createdAt: -1 })
      .limit(6); // Get only 6 most recent news

    res.status(200).json({
      success: true,
      message: 'Latest news FETCHED SUCCESSFULLY',
      count: news.length,
      data: news,
    });
  } catch (error) {
    console.error('Error fetching latest news:', error);
    res.status(500).json({
      success: false,
      message: 'Latest news FETCH FAILED',
      error: error.message,
    });
  }
};

// NEW: Get logged-in user's own news (for dashboard)
const getMyNews = async (req, res) => {
  try {
    // Get user ID from headers (set by validateUser middleware)
    const userId = req.headers._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
    }

    // Find all news where author is the logged-in user
    const myNews = await News.find({ author: userId })
      .populate('author', 'name email')
      .sort({ createdAt: -1 }); // Most recent first

    res.status(200).json({
      success: true,
      message: 'Your news FETCHED SUCCESSFULLY',
      count: myNews.length,
      data: myNews,
    });
  } catch (error) {
    console.error('Error fetching your news:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch your news',
      error: error.message,
    });
  }
};

// NEW: Update user's own news
const updateMyNews = async (req, res) => {
  try {
    const userId = req.headers._id;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
    }

    // Find the news and check if it belongs to user
    const news = await News.findById(id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News not found',
      });
    }

    // Check if the news belongs to the logged-in user
    if (news.author.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'You can only update your own news',
      });
    }

    // Parse the data if it's in FormData format
    let updateData;
    if (req.body.data) {
      updateData = JSON.parse(req.body.data);
    } else {
      updateData = req.body;
    }

    // If new image is uploaded
    if (req.file) {
      updateData.image = req.file.path;
    }

    // Update the news
    const updatedNews = await News.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).populate('author', 'name email');

    res.status(200).json({
      success: true,
      message: 'News UPDATED SUCCESSFULLY',
      data: updatedNews,
    });
  } catch (error) {
    console.error('Error updating news:', error);
    res.status(500).json({
      success: false,
      message: 'News UPDATE FAILED',
      error: error.message,
    });
  }
};

// NEW: Delete user's own news
const deleteMyNews = async (req, res) => {
  try {
    const userId = req.headers._id;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
    }

    // Find the news and check if it belongs to user
    const news = await News.findById(id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News not found',
      });
    }

    // Check if the news belongs to the logged-in user
    if (news.author.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own news',
      });
    }

    await News.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'News DELETED SUCCESSFULLY',
    });
  } catch (error) {
    console.error('Error deleting news:', error);
    res.status(500).json({
      success: false,
      message: 'News DELETE FAILED',
      error: error.message,
    });
  }
};

// NEW: Get dashboard stats for logged-in user
const getMyDashboardStats = async (req, res) => {
  try {
    const userId = req.headers._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
    }

    // Get total count of user's news
    const totalMyNews = await News.countDocuments({ author: userId });

    // Get most recent 5 news
    const recentNews = await News.find({ author: userId })
      .populate('author', 'name email')
      .sort({ createdAt: -1 })
      .limit(5);

    // Get news count by category (for charts)
    const newsByCategory = await News.aggregate([
      { $match: { author: userId } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    // Get monthly stats (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyStats = await News.aggregate([
      {
        $match: {
          author: userId,
          createdAt: { $gte: sixMonthsAgo },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);

    res.status(200).json({
      success: true,
      message: 'Dashboard stats fetched successfully',
      data: {
        totalNews: totalMyNews,
        recentNews,
        categoryDistribution: newsByCategory,
        monthlyActivity: monthlyStats,
      },
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard stats',
      error: error.message,
    });
  }
};

// Export all functions
const NewsController = {
  createNews,
  getAllNews,
  getNewsById,
  getNewsByCategory,
  getLatestNews,
  getMyNews, // New
  getMyDashboardStats, // New
  updateMyNews, // New
  deleteMyNews, // New
};

export default NewsController;
