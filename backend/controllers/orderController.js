import Order from '../models/Order.js';
import Product from '../models/Product.js'; // needed if you want to validate products

// 🔹 CREATE New Order
export const createOrder = async (req, res) => {
  try {
    const { products, shippingAddress } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No products in the order" });
    }

    // Calculate totalAmount (basic calculation assuming Product has 'price')
    let totalAmount = 0;
    for (const item of products) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.product}` });
      }
      totalAmount += product.price * item.quantity;
    }

    const newOrder = new Order({
      user: req.user._id, // logged-in user
      products,
      shippingAddress,
      totalAmount
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating order" });
  }
};

// 🔹 GET All Orders (Admin purpose maybe)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email') // show user name and email
      .populate('products.product', 'title price'); // show product title and price
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching orders" });
  }
};

// 🔹 GET Single Order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('products.product', 'title price');
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching order" });
  }
};

// 🔹 UPDATE Order Status (like shipped, delivered)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.orderStatus = status || order.orderStatus;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating order status" });
  }
};
