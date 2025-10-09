import { useState } from "react";
import Cart from "../components/Cart";
import STKModal from "../components/STKModal";
import AuthModal from "../components/AuthModal";
import API from "../utils/api";

export default function Checkout() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart") || "[]")
  );
  const [showSTK, setShowSTK] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || "null"));

  const handleRemove = (id) => {
    const next = cart.filter(i => i._id !== id);
    setCart(next);
    localStorage.setItem("cart", JSON.stringify(next));
  };

  const handleCheckout = () => {
    if (!user) {
      setShowAuth(true);
      return;
    }
    setShowSTK(true);
  };

  const handlePaid = async () => {
    // Place order in DB
    await API.post("/orders", {
      user: user.id,
      items: cart.map(({ _id, quantity }) => ({ product: _id, quantity })),
      total: cart.reduce((s, i) => s + i.price * i.quantity, 0)
    });
    setCart([]);
    localStorage.removeItem("cart");
    alert("Order placed successfully!");
    setShowSTK(false);
  };

  return (
    <div className="max-w-lg mx-auto my-8">
      <Cart cart={cart} onRemove={handleRemove} />
      <button
        className="mt-6 bg-green-600 text-white px-6 py-2 rounded w-full"
        onClick={handleCheckout}
        disabled={!cart.length}
      >
        Pay via M-Pesa
      </button>
      <AuthModal open={showAuth} onClose={() => setShowAuth(false)} onAuth={(data) => {
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        setShowAuth(false);
        setShowSTK(true);
      }} />
      <STKModal open={showSTK} onClose={() => setShowSTK(false)} amount={cart.reduce((s, i) => s + i.price * i.quantity, 0)} onPaid={handlePaid} />
    </div>
  );
}
