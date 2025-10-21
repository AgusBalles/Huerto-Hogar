import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí procesarías el pedido
    alert("Pedido realizado con éxito");
    clearCart();
    navigate("/order-history");
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Tu carrito está vacío</h2>
        <button
          onClick={() => navigate("/products")}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Ver Productos
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Finalizar Compra</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Formulario */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 font-semibold">Nombre completo</label>
              <input
                type="text"
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
            
            <div>
              <label className="block mb-2 font-semibold">Dirección</label>
              <input
                type="text"
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
            
            <div>
              <label className="block mb-2 font-semibold">Teléfono</label>
              <input
                type="tel"
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 font-semibold"
            >
              Confirmar Pedido
            </button>
          </form>
        </div>

        {/* Resumen */}
        <div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Resumen del pedido</h2>
            
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between mb-2">
                <span>{item.name} x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            
            <hr className="my-4" />
            
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;