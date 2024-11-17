import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'supplier', required: true }
});

const CategoryModel = mongoose.model('category', CategorySchema);

export { CategoryModel as category };
