import express from 'express';
import { getProductById, indexAction, modifyProduct, deleteProduct } from '../controllers/productController';

const router = express.Router();

router.get('/', indexAction);
router.post('/', modifyProduct);
router.put('/:productId', modifyProduct)
router.get('/:productId', getProductById);
router.get('/', deleteProduct);

export default router;
