import express from 'express';
import productController from '../controllers/productController';

const router = express.Router();

router.get('/', productController.getAll);
router.get('/:id', productController.getById);

export default router;
