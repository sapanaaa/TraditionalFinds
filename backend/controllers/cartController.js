import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

// 🔹 CREATE / ADD Product to Cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: "Product ID and quantity are required" });
    }

    let cart = await Cart.findOne({ user: req.user });

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const productPrice = product.price * quantity;

    if (!cart) {
      // Create new cart
      cart = new Cart({
        user: req.user,
        products: [{ product: productId, quantity }],
        totalPrice: productPrice
      });
    } else {
      // Cart exists
      const itemIndex = cart.products.findIndex(p => p.product.toString() === productId);

      if (itemIndex > -1) {
        // Update quantity
        cart.products[itemIndex].quantity += quantity;
      } else {
        // Add new product
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

// 🔹 READ / GET User Cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user })
      .populate('products.product', 'title price');

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching cart" });
  }
};

// 🔹 UPDATE Quantity of Product in Cart
export const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: req.user });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.products.findIndex(p => p.product.toString() === productId);

    if (itemIndex > -1) {
      // Update totalPrice
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const oldQuantity = cart.products[itemIndex].quantity;
      cart.totalPrice -= product.price * oldQuantity;
      cart.products[itemIndex].quantity = quantity;
      cart.totalPrice += product.price * quantity;

      const updatedCart = await cart.save();
      res.status(200).json(updatedCart);
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating cart item" });
  }
};

// 🔹 DELETE / Remove Product from Cart
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;

    let cart = await Cart.findOne({ user: req.user });

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

      const updatedCart = await cart.save();
      res.status(200).json(updatedCart);
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error removing from cart" });
  }
};

// 🔹 DELETE / Clear Entire Cart
export const clearCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.products = [];
    cart.totalPrice = 0;

    const clearedCart = await cart.save();
    res.status(200).json(clearedCart);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error clearing cart" });
  }
};
