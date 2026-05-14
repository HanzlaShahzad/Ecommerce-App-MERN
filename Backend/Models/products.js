import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    required: false,
  },
  stock: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const Products = mongoose.model('products', productSchema);
export default Products;