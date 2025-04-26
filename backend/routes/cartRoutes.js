import express from "express";
import { addToCart, getCart, removeFromCart, clearCart } from "../controllers/cartController.js";
import { verifyUser } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protect all cart routes (user must be logged in)
router.post('/add', verifyUser, addToCart);
router.get('/', verifyUser, getCart);
router.delete('/remove', verifyUser, removeFromCart);
router.delete('/clear', verifyUser, clearCart);

export default router;
