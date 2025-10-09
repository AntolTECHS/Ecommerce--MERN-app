export default function Cart({ cart, onRemove }) {
  if (!cart.length) return <div>Your cart is empty.</div>;
  return (
    <div>
      <h2 className="font-bold text-lg mb-2">Cart</h2>
      <ul className="divide-y">
        {cart.map((item, idx) => (
          <li key={item._id + idx} className="flex justify-between py-2 items-center">
            <span>{item.name} x {item.quantity}</span>
            <span className="font-semibold">{item.price * item.quantity} KES</span>
            <button
              onClick={() => onRemove(item._id)}
              className="text-red-600 underline"
            >Remove</button>
          </li>
        ))}
      </ul>
      <div className="mt-2 font-bold">
        Total: {cart.reduce((s, i) => s + i.price * i.quantity, 0)} KES
      </div>
    </div>
  );
}
