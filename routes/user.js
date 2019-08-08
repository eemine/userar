import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

router.get('/', userController.getAll);
router.get('/:userId', userController.getUserById);

export default router;
