import express from 'express';
import { getProductById, indexAction, addNewProduct } from '../controllers/productController';

const router = express.Router();

router.get('/', indexAction);
router.post('/', addNewProduct);
router.get('/:productId', getProductById);

export default router;
