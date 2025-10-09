import { useEffect, useState } from "react";
import API from "../utils/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (user) {
      API.get(`/orders/${user.id}`).then(res => setOrders(res.data));
    }
  }, [user]);

  if (!user) return <div className="mt-8">Please login to view your orders.</div>;

  return (
    <div className="max-w-xl mx-auto my-8">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      {!orders.length ? (
        <div>No orders yet.</div>
      ) : (
        <ul className="divide-y">
          {orders.map(order => (
            <li key={order._id} className="py-4">
              <div className="font-bold">Order #{order._id.slice(-5)}</div>
              <div>Status: {order.status}</div>
              <div>Payment: {order.payment}</div>
              <ul className="text-sm pl-4 mt-1">
                {order.items.map(i => (
                  <li key={i.product._id}>{i.product.name} x {i.quantity}</li>
                ))}
              </ul>
              <div className="font-semibold mt-1">Total: {order.total} KES</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
