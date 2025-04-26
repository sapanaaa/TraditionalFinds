import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';

import { verifyToken, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

// 📦 Public routes (no login required)
router.get('/', getAllProducts);     //working       
router.get('/:id', getProductById);     //working     

// 🔒 Protected routes (login + role check required)
router.post('/', verifyToken, authorize('seller'), createProduct);   //working    
router.put('/:id', verifyToken, authorize('seller'), updateProduct);     // Seller can update their own product
router.delete('/:id', verifyToken, authorize(['seller', 'admin']), deleteProduct); // Seller or Admin can delete

export default router;
