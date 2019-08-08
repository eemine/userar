import express from 'express';
import orderController from '../controllers/orderController';

const router = express.Router();

router.get('/', orderController.getAll);
router.get('/:orderId', orderController.getOrderById);

export default router;
