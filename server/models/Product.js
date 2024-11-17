// import mongoose from 'mongoose';

// const productSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   imageUrl: {
//     type: String,
//     required: true,
//   },
//   quantity: {
//     type: Number,
//     required: true,
//   },
//   category: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Category',
//     required: true,
//   },
//   discount: {
//     type: Number,
//     default: 0, 
//   },
//   newPrice: {
//     type: Number,
//     default: 0, 
//   },
// });

// const Product = mongoose.model('Product', productSchema);

// export { Product };



// models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  imageUrl: { type: String },
  quantity: { type: Number, default: 0 },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }
});

export const Product = mongoose.model('Product', productSchema);
