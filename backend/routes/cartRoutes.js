import express from "express";
import { addToCart, getCart, updateCartItem, removeFromCart, clearCart } from "../controllers/cartController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Add product to cart
router.post("/add", verifyToken, addToCart);

// Get user's cart
router.get("/", verifyToken, getCart);

// Update product quantity in cart
router.put("/update", verifyToken, updateCartItem);

// Remove product from cart
router.delete("/remove", verifyToken, removeFromCart);

// Clear entire cart
router.delete("/clear", verifyToken, clearCart);

export default router;
