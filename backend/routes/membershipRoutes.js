import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import {
  addMembership,
  getAllMemberships,
  getMembershipById,
  updateMembership,
  deleteMembership,
} from '../controllers/membershipController.js';

const router = express.Router();
router.use(authenticateToken);

router.post('/', authorizeRoles('admin', 'trainer'), addMembership);
router.get('/', authorizeRoles('admin', 'trainer'), getAllMemberships);
router.get('/:id', authorizeRoles('admin', 'trainer', 'member'), getMembershipById);
router.put('/:id', authorizeRoles('admin', 'trainer'), updateMembership);
router.delete('/:id', authorizeRoles('admin'), deleteMembership);

export default router;
