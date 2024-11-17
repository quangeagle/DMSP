import { Warehouse } from '../models/Warehouse.js';
import { Product } from '../models/Product.js';

// 1. Lấy danh sách sản phẩm mới chưa có trong kho
export const getNewProducts = async (req, res) => {
  try {
    const warehouse = await Warehouse.findOne().populate('products.product');
    
    if (!warehouse) {
      return res.status(404).json({ message: 'Warehouse not found' });
    }

    // Lấy tất cả sản phẩm
    const allProducts = await Product.find();

    // Lấy danh sách sản phẩm có trong kho
    const existingProductIds = warehouse.products.map(p => p.product.toString());

    // Lọc các sản phẩm mới chưa có trong kho
    const newProducts = allProducts.filter(p => !existingProductIds.includes(p._id.toString()));

    res.json(newProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Lấy danh sách sản phẩm có số lượng dưới 10
export const getLowStockProducts = async (req, res) => {
  try {
    const warehouse = await Warehouse.findOne().populate('products.product');
    
    if (!warehouse) {
      return res.status(404).json({ message: 'Warehouse not found' });
    }

    // Lọc các sản phẩm có số lượng dưới 10
    const lowStockProducts = warehouse.products.filter(p => p.quantity < 10);

    res.json(lowStockProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Thêm số lượng sản phẩm vào kho
export const addProductQuantity = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const warehouse = await Warehouse.findOne();

    if (!warehouse) {
      return res.status(404).json({ message: 'Warehouse not found' });
    }

    // Kiểm tra xem sản phẩm đã tồn tại trong kho chưa
    const productInWarehouse = warehouse.products.find(p => p.product.toString() === productId);

    if (productInWarehouse) {
      // Nếu sản phẩm đã tồn tại, tăng số lượng
      productInWarehouse.quantity += quantity;
    } else {
      // Nếu sản phẩm chưa tồn tại, thêm mới
      warehouse.products.push({ product: productId, quantity });
    }

    await warehouse.save();
    res.json(warehouse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4. Lấy danh sách tất cả sản phẩm trong kho
export const getAllProductsInWarehouse = async (req, res) => {
  try {
    const warehouse = await Warehouse.findOne().populate('products.product');
    
    if (!warehouse) {
      return res.status(404).json({ message: 'Warehouse not found' });
    }

    res.json(warehouse.products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
