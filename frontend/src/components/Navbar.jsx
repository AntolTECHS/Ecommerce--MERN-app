import { useState } from "react";
import AuthModal from "./AuthModal";

export default function Navbar() {
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      return null;
    }
  });

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload();
  };

  return (
    <nav className="flex justify-between items-center px-6 py-3 border-b bg-white">
      <div className="text-xl font-bold text-green-700">MERN Shop</div>
      <div className="flex gap-4 items-center">
        <a href="/" className="hover:underline">Products</a>
        <a href="/orders" className="hover:underline">Orders</a>
        <a href="/checkout" className="hover:underline">Cart</a>
        {!user ? (
          <button
            className="bg-blue-600 text-white px-3 py-1 rounded"
            onClick={() => setShowAuth(true)}
          >Login</button>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-sm">{user.name}</span>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >Logout</button>
          </div>
        )}
      </div>
      <AuthModal
        open={showAuth}
        onClose={() => setShowAuth(false)}
        onAuth={(data) => {
          localStorage.setItem("user", JSON.stringify(data.user));
          setUser(data.user);
          setShowAuth(false);
        }}
      />
    </nav>
  );
}
