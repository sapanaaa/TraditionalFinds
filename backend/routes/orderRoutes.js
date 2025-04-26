import express from 'express';
import { createOrder, getAllOrders, getOrderById, updateOrderStatus } from '../controllers/orderController.js';
import { verifyToken, isAdmin } from '../middlewares/authMiddleware.js'; // import your auth

const router = express.Router();

// 🔹 Create New Order (user must be logged in)
router.post('/', verifyToken, createOrder);

// 🔹 Get All Orders (admin only)
router.get('/', verifyToken, isAdmin(), getAllOrders);

// 🔹 Get Single Order by ID (user must be logged in)
router.get('/:id', verifyToken, getOrderById);

// 🔹 Update Order Status (admin only)
router.put('/:id', verifyToken, isAdmin(), updateOrderStatus);

export default router;
