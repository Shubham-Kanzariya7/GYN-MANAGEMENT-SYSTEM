import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import {
  recordPayment,
  getPaymentsByMember,
  getAllPayments,
} from '../controllers/paymentController.js';

const router = express.Router();
router.use(authenticateToken);

router.post('/', authorizeRoles('admin', 'trainer'), recordPayment);
router.get('/', authorizeRoles('admin', 'trainer'), getAllPayments);
router.get('/member/:memberId', authorizeRoles('admin', 'trainer', 'member'), getPaymentsByMember);

export default router;
