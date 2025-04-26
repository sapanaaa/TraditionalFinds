import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    unique: true,
    sparse: true
  },

  phone: {
    type: String,
    unique: true,
    sparse: true
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ['buyer', 'seller', 'admin'], 
    default: 'buyer'
  },

  refreshToken: {
    type: String
  }

}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
