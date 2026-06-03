import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import {
  addDietPlan,
  getAllDietPlans,
  getDietPlanById,
  getMemberDietPlans,
} from '../controllers/dietController.js';

const router = express.Router();
router.use(authenticateToken);

router.post('/', authorizeRoles('admin', 'trainer'), addDietPlan);
router.get('/', authorizeRoles('admin', 'trainer'), getAllDietPlans);
router.get('/:id', authorizeRoles('admin', 'trainer', 'member'), getDietPlanById);
router.get('/member/:memberId', authorizeRoles('admin', 'trainer', 'member'), getMemberDietPlans);

export default router;
