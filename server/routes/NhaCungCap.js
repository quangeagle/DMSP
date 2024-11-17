// E:\emart\server\routes\NhaCungCap.js
import express from 'express';
import { createSupplier , getAllSuppliers} from '../controllers/supplierController.js';

const router = express.Router();

router.post('/add', createSupplier);
router.get('/seen', getAllSuppliers); 


export { router as supplierRouter };
