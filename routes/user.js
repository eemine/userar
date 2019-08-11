import express from 'express';
import { indexAction, addNewUser, getUserById } from '../controllers/userController';

const router = express.Router();

router.get('/', indexAction);
router.post('/', addNewUser)
router.get('/:userId', getUserById);

export default router;

