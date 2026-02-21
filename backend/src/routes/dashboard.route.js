import express from 'express';
import {
  getDashboardStats,
  getUserDashboard,
  getAdminDashboard,
} from '../controllers/dashboard.controller.js';
import { validateUser } from '../middlewares/validation.middleware.js';

const router = express.Router();

router.get('/stats', validateUser, getDashboardStats);
router.get('/user', validateUser, getUserDashboard);
router.get('/admin', validateUser, getAdminDashboard);

export default router;
