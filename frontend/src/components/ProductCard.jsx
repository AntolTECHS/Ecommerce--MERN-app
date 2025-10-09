export default function ProductCard({ product, onAdd }) {
  return (
    <div className="border rounded-xl shadow p-3 flex flex-col">
      <img src={product.image} alt={product.name} className="h-32 object-cover mb-2" />
      <h3 className="text-lg font-bold">{product.name}</h3>
      <div className="flex-1">{product.description}</div>
      <div className="flex justify-between items-center mt-2">
        <span className="font-semibold">{product.price} KES</span>
        <button
          onClick={() => onAdd(product)}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >Add to Cart</button>
      </div>
    </div>
  );
}
