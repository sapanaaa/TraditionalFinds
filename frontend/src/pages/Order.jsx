import React, { useEffect, useState } from 'react';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = 1; // Replace with actual user ID or retrieve it from context/auth

  useEffect(() => {
    async function fetchOrders() {
      try {
        // Replace with your API endpoint
        const response = await fetch(`https://your-backend.com/api/orders/${userId}`);
        const data = await response.json();
        setOrders(data.orders);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    }

    fetchOrders();
  }, [userId]);

  if (loading) {
    return <div>Loading orders...</div>;
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Your Orders</h2>
      <div className="space-y-8">
        {orders.length === 0 ? (
          <div className="text-center text-xl text-gray-500">You have no orders yet.</div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="text-xl font-semibold">Order #{order.id}</h3>
                <p className="text-gray-600">Date: {order.date}</p>
                <p className="text-gray-600">Status: <span className="font-semibold">{order.status}</span></p>
                <p className="text-lg font-semibold mt-2">Total: ${order.total.toFixed(2)}</p>
              </div>
              <div className="p-6">
                <h4 className="text-lg font-semibold mb-4">Items:</h4>
                <ul className="space-y-4">
                  {order.items.map((item, index) => (
                    <li key={index} className="flex justify-between">
                      <span>{item.name}</span>
                      <span>{item.quantity} x ${item.price.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Order;
