import express from 'express';
import { indexAction, getOrderById, addNewOrder } from '../controllers/orderController';

const router = express.Router();

router.get('/', indexAction);
router.post('/', addNewOrder);
router.get('/:orderId', getOrderById);

export default router;
