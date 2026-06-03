import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import {
  recordAttendance,
  getAttendanceByMember,
  getAllAttendance,
} from '../controllers/attendanceController.js';

const router = express.Router();
router.use(authenticateToken);

router.post('/', authorizeRoles('admin', 'trainer'), recordAttendance);
router.get('/', authorizeRoles('admin', 'trainer'), getAllAttendance);
router.get('/member/:memberId', authorizeRoles('admin', 'trainer', 'member'), getAttendanceByMember);

export default router;
