// routes/warehouse.js
import express from 'express';
import { getNewProducts, getLowStockProducts, addProductQuantity, getAllProductsInWarehouse } from '../controllers/warehouse.js';

const router = express.Router();

router.get('/new-products', getNewProducts);
router.get('/low-stock-products', getLowStockProducts);
router.post('/add-product-quantity', addProductQuantity);
router.get('/all-products', getAllProductsInWarehouse);




export { router as KhoRouter };
