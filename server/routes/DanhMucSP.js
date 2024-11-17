// E:\emart\server\routes\DanhMucSP.js
import express from 'express';
import { createCategory, getCategoriesBySupplier, deleteCategory, updateCategory, getAllCategories, getCategoryById } from '../controllers/categoryController.js';

const router = express.Router();

router.post('/them', createCategory);
router.get('/bysupplier/:supplierId', getCategoriesBySupplier);
router.get('/xem', getAllCategories);
router.delete('/delete/:id', deleteCategory); 
router.put('/update/:id', updateCategory); 
router.get('/:id', getCategoryById);

export { router as categoryRouter };
