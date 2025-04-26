import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  images: [{
    type: String // URLs or file paths
  }],

  category: {
    type: String,
    required: true
  },

  stock: {
    type: Number,
    default: 0
  },

  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // RELATIONSHIP to User
    required: true
  }

}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;
