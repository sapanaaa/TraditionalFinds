import express from "express"; 
import { registerUser, loginUser, logoutUser } from '../controllers/authController.js';
import { verifyToken } from '../middlewares/authMiddleware.js'; // Only need verifyToken here

const router = express.Router();

// Public Routes
router.post('/signup', registerUser);
router.post('/login', loginUser);

// Protected Route (only logged-in users can logout)
router.get('/logout', verifyToken, logoutUser);

export default router;
