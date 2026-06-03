import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { getDashboardStats } from '../controllers/dashboardController.js';

const router = express.Router();
router.use(authenticateToken);
router.get('/', authorizeRoles('admin', 'trainer'), getDashboardStats);

export default router;
