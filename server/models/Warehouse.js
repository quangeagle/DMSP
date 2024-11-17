// models/Warehouse.js
import mongoose from 'mongoose';

const warehouseSchema = new mongoose.Schema({
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 0 }
  }]
});

export const Warehouse = mongoose.model('Warehouse', warehouseSchema);
