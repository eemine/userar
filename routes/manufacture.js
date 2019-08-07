import express from 'express';
import manufactureController from '../controllers/manufactureController';

const router = express.Router();

router.get('/', manufactureController.getAll);
router.get('/:id', manufactureController.getById);

export default router;
