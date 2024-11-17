import express from 'express';
import { createProduct, getProductsByCategory, deleteProduct, updateProduct , getAllProducts,getProductById,addProductQuantity,getNewProducts,getLowStockProducts } from '../controllers/productController.js';

const router = express.Router();

router.post('/themSP', createProduct);
router.get('/category/:categoryId', getProductsByCategory);
router.delete('/xoaSP/:id', deleteProduct);
router.put('/suaSP/:id', updateProduct);
router.get('/get', getAllProducts);
router.get('/products/:id', getProductById);
router.get('/new-products', getNewProducts);
router.get('/low-stock-products', getLowStockProducts);
router.post('/add-quantity', addProductQuantity);

export { router as productRouter };
