import express from 'express';
import NewsController from '../controllers/news.controller.js';
import upload from '../configs/multer.config.js';
import { validateUser } from '../middlewares/validation.middleware.js';

const router = express.Router();

router.get('/all-news', NewsController.getAllNews);

router.get('/news/:id', NewsController.getNewsById);

router.get('/news/category/:category', NewsController.getNewsByCategory);

router.get('/latest-news', NewsController.getLatestNews);

// Protected routes (require authentication) - DASHBOARD ROUTES
router.post(
  '/create-news',
  validateUser,
  upload.single('image'),
  NewsController.createNews
);

router.get('/my-news', validateUser, NewsController.getMyNews);

router.get(
  '/my-dashboard-stats',
  validateUser,
  NewsController.getMyDashboardStats
);

router.put(
  '/my-news/:id',
  validateUser,
  upload.single('image'),
  NewsController.updateMyNews
);

router.delete('/my-news/:id', validateUser, NewsController.deleteMyNews);

export default router;
