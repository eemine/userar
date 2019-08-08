import express from 'express';
import { indexAction, addNewComment, getCommentById } from '../controllers/commentController';

const router = express.Router();

router.get('/', indexAction);
router.post('/', addNewComment)
router.get('/:commentId', getCommentById);

export default router;
