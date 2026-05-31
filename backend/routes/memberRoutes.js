import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { upload } from '../utils/fileUpload.js';
import {
  addMember,
  updateMember,
  deleteMember,
  getMemberById,
  getAllMembers,
  searchMembers,
  getExpiringMembers,
} from '../controllers/memberController.js';

const router = express.Router();

router.use(authenticateToken);

router.post('/', authorizeRoles('admin', 'trainer'), upload.single('photo'), addMember);
router.get('/', authorizeRoles('admin', 'trainer'), getAllMembers);
router.get('/search', authorizeRoles('admin', 'trainer'), searchMembers);
router.get('/expiring', authorizeRoles('admin', 'trainer'), getExpiringMembers);
router.get('/:id', authorizeRoles('admin', 'trainer', 'member'), getMemberById);
router.put('/:id', authorizeRoles('admin', 'trainer'), upload.single('photo'), updateMember);
router.delete('/:id', authorizeRoles('admin'), deleteMember);

export default router;
