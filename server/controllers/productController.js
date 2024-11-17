import { Product } from '../models/Product.js';

export const createProduct = async (req, res) => {
  try {
    const { category, name, description, price, imageUrl } = req.body;
    
    const newProduct = new Product({ name, description, price, imageUrl, quantity: 0, category });
    const savedProduct = await newProduct.save();
    res.json(savedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const products = await Product.find({ category: categoryId });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, name, description, price, imageUrl, quantity } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(id, { category, name, description, price, imageUrl, quantity }, { new: true });
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const productDetail = await Product.findById(id);

    if (!productDetail) {
      return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
    }

    res.json(productDetail);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const addProductQuantity = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Sản phẩm không tìm thấy' });
    }

    product.quantity += quantity;
    await product.save();

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// 3. Lấy danh sách sản phẩm mới chưa có trong kho (nếu bạn vẫn cần)
export const getNewProducts = async (req, res) => {
  try {
    // Lấy tất cả sản phẩm có số lượng bằng 0
    const zeroQuantityProducts = await Product.find({ quantity: 0 });
    res.json(zeroQuantityProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4. Lấy danh sách sản phẩm có số lượng dưới 10
export const getLowStockProducts = async (req, res) => {
  try {
    const lowStockProducts = await Product.find({ quantity: { $lt: 10 } });
    res.json(lowStockProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
