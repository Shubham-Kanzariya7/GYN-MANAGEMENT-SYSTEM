import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import {
  addTrainer,
  getAllTrainers,
  getTrainerById,
  updateTrainer,
  deleteTrainer,
} from '../controllers/trainerController.js';

const router = express.Router();
router.use(authenticateToken);

router.post('/', authorizeRoles('admin'), addTrainer);
router.get('/', authorizeRoles('admin', 'trainer'), getAllTrainers);
router.get('/:id', authorizeRoles('admin', 'trainer', 'member'), getTrainerById);
router.put('/:id', authorizeRoles('admin'), updateTrainer);
router.delete('/:id', authorizeRoles('admin'), deleteTrainer);

export default router;
