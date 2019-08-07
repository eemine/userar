import express from 'express';
import orderController from '../controllers/orderController';

const router = express.Router();

router.get('/', orderController.getAll);
router.get('/:id', orderController.getById);

export default router;
