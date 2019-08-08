import express from 'express';
import { indexAction, addNewManufacture, getManufactureById } from '../controllers/manufactureController';

const router = express.Router();

router.get('/', indexAction);
router.post('/', addNewManufacture);
router.get('/:manufactureId', getManufactureById);

export default router;
