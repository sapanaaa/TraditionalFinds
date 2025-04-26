import Product from '../models/Product.js';

// 🔸 CREATE product
export const createProduct = async (req, res) => {
  try {
    const { title, description, price, images, category, stock } = req.body;

    const product = new Product({
      title,
      description,
      price,
      images,
      category,
      stock,
      seller: req.user._id // Assuming user is already verified and set in req.user
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
};

// 🔸 READ all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('seller', 'name email');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

// 🔸 READ single product
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('seller', 'name email');
    if (!product)
         return res.status(404).json({ message: "Product not found" });
    res.json(product);
  }
  catch (error) {
   
    
    res.status(500).json({ message: "Error fetching product" });
  }
};


// 🔸 UPDATE product (Only seller who created it)
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not authorized to update this product" });
    }

    Object.assign(product, req.body);
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error updating product" });
  }
};

// 🔸 DELETE product (Only seller or admin)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (
      product.seller.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: "Not authorized to delete this product" });
    }

    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
};
