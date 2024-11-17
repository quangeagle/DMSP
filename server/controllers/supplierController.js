// E:\emart\server\controllers\supplierController.js
import { supplier } from '../models/NhaCungCap.js';

export const createSupplier = async (req, res) => {
  try {
    const newSupplier = new supplier(req.body);
    const savedSupplier = await newSupplier.save();
    res.json(savedSupplier);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await supplier.find();
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};