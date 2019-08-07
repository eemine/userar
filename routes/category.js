import express from 'express';
import categoryController from '../controllers/categoryController';

const router = express.Router();

router.get('/', categoryController.getAll);
router.get('/:id', categoryController.getById);

export default router;
