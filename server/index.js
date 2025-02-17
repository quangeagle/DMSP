// E:\emart\server\index.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import './db.js';
import { AdminRouter } from './routes/auth.js';
import { UserRouter } from './routes/user.js';
import { categoryRouter } from './routes/DanhMucSP.js';
import { productRouter } from './routes/product.js';
import { supplierRouter } from './routes/NhaCungCap.js';
import { promotionRouter } from './routes/KhuyenMai.js';
import { OrderRouter } from './routes/Order.js';
import{shippingRoutes} from './routes/ship.js'
import { invoiceRoutes } from './routes/invoiceRoutes.js';
import likelistRoutes from './routes/Likelist.js';
import { KhoRouter } from './routes/warehouse.js';
const app = express();

dotenv.config();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(cookieParser());

app.use('/auth', AdminRouter);
app.use('/user', UserRouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.use('/supplier', supplierRouter);
app.use('/promotion', promotionRouter);
app.use('/likelist', likelistRoutes);
app.use('/cart', OrderRouter);
app.use('/ship', shippingRoutes);
app.use('/invoice', invoiceRoutes);
app.use('/kho', KhoRouter);
app.use('/promotion', promotionRouter);





app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', process.env.React_URL);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});
