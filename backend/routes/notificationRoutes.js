import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { addNotification, getNotifications } from '../controllers/notificationController.js';

const router = express.Router();
router.use(authenticateToken);

router.post('/', authorizeRoles('admin'), addNotification);
router.get('/', authorizeRoles('admin', 'trainer', 'member'), getNotifications);

export default router;
