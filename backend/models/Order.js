import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // RELATIONSHIP to User
    required: true
  },

  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // RELATIONSHIP to Product
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        default: 1
      }
    }
  ],

  totalAmount: {
    type: Number,
    required: true
  },

  shippingAddress: {
    street: String,
    city: String,
    state: String,
    country: String,
    zip: String
  },

  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },

  orderStatus: {
    type: String,
    enum: ['processing', 'shipped', 'delivered', 'cancelled'],
    default: 'processing'
  }

}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;
