import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import {
  addMembershipPlan,
  getAllMembershipPlans,
  getMembershipPlanById,
  updateMembershipPlan,
  deleteMembershipPlan,
} from '../controllers/planController.js';

const router = express.Router();
router.use(authenticateToken);

router.post('/', authorizeRoles('admin'), addMembershipPlan);
router.get('/', authorizeRoles('admin', 'trainer', 'member'), getAllMembershipPlans);
router.get('/:id', authorizeRoles('admin', 'trainer', 'member'), getMembershipPlanById);
router.put('/:id', authorizeRoles('admin'), updateMembershipPlan);
router.delete('/:id', authorizeRoles('admin'), deleteMembershipPlan);

export default router;
