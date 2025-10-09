import { useEffect, useState } from "react";
import API from "../utils/api";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart") || "[]")
  );

  useEffect(() => {
    API.get("/products").then(res => setProducts(res.data));
  }, []);

  const handleAdd = (product) => {
    const idx = cart.findIndex(i => i._id === product._id);
    let next;
    if (idx > -1) {
      next = [...cart];
      next[idx].quantity += 1;
    } else {
      next = [...cart, { ...product, quantity: 1 }];
    }
    setCart(next);
    localStorage.setItem("cart", JSON.stringify(next));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(p => (
          <ProductCard key={p._id} product={p} onAdd={handleAdd} />
        ))}
      </div>
    </div>
  );
}
