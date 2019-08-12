import express from 'express';
import {
  getProductById,
  indexAction,
  modifyProduct,
  deleteProduct,
} from '../controllers/productController';

const router = express.Router();

// GET - is used to get data
// POST - is used to add new data to table
// PUT - is used to modify/edit existing data in table
// DELETE - is used to remove/delete data from table

router.get('/', indexAction);
router.post('/', modifyProduct);
router.put('/:productId', modifyProduct)
router.get('/:productId', getProductById);
router.delete('/:productId', deleteProduct);

export default router;
