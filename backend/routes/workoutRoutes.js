import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import {
  addWorkoutPlan,
  getAllWorkoutPlans,
  getWorkoutPlanById,
  getMemberWorkoutPlans,
} from '../controllers/workoutController.js';

const router = express.Router();
router.use(authenticateToken);

router.post('/', authorizeRoles('admin', 'trainer'), addWorkoutPlan);
router.get('/', authorizeRoles('admin', 'trainer'), getAllWorkoutPlans);
router.get('/:id', authorizeRoles('admin', 'trainer', 'member'), getWorkoutPlanById);
router.get('/member/:memberId', authorizeRoles('admin', 'trainer', 'member'), getMemberWorkoutPlans);

export default router;
