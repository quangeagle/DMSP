// models/shipping.js
import mongoose from 'mongoose';

const shippingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  address: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  selectedDate: {
    type: Date,
    required: true
  },
  selectedTime: {
    type: String,
 
  },
 
  orderItems: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    }
  }],
  district: {  // Thêm thông tin quận
    type: String,
    required: true
  },
  ward: {     // Thêm thông tin phường
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Shipping = mongoose.model('Shipping', shippingSchema);
