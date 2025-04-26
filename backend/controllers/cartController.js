import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

// 🔹 ADD Product to Cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: "Product ID and quantity are required" });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const productPrice = product.price * quantity;

    if (!cart) {
      // No cart? Create one
      cart = new Cart({
        user: req.user._id,
        products: [{ product: productId, quantity }],
        totalPrice: productPrice
      });
    } else {
      // Cart exists
      const itemIndex = cart.products.findIndex(p => p.product.toString() === productId);

      if (itemIndex > -1) {
        // If product exists in cart, update quantity
        cart.products[itemIndex].quantity += quantity;
      } else {
        // Else push new product
        cart.products.push({ product: productId, quantity });
      }

      cart.totalPrice += productPrice;
    }

    const savedCart = await cart.save();
    res.status(200).json(savedCart);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding to cart" });
  }
};

// 🔹 GET User's Cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
      .populate('products.product', 'title price');

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.json(cart);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching cart" });
  }
};

// 🔹 REMOVE Product from Cart
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.products.findIndex(p => p.product.toString() === productId);

    if (itemIndex > -1) {
      const product = await Product.findById(productId);
      if (product) {
        cart.totalPrice -= product.price * cart.products[itemIndex].quantity;
      }
      cart.products.splice(itemIndex, 1);
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    const updatedCart = await cart.save();
    res.json(updatedCart);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error removing product from cart" });
  }
};

// 🔹 CLEAR Entire Cart
export const clearCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.products = [];
    cart.totalPrice = 0;

    const clearedCart = await cart.save();
    res.json(clearedCart);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error clearing cart" });
  }
};
