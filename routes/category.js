import express from 'express';
import { indexAction, getCategoryById, addNewCategory } from '../controllers/categoryController';

const router = express.Router();

router.get('/', indexAction);
router.post('/', addNewCategory);
router.get('/:categoryId', getCategoryById);

export default router;
