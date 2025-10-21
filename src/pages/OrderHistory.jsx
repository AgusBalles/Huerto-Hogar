import { useState } from "react";
import { useNavigate } from "react-router-dom";

function OrderHistory() {
  const navigate = useNavigate();
  
  // Ejemplo de pedidos (en una app real vendrían de una API o contexto)
  const [orders] = useState([
    {
      id: 1,
      date: "2025-10-15",
      total: 45.50,
      status: "Entregado",
      items: [
        { name: "Tomates orgánicos", quantity: 2, price: 12.00 },
        { name: "Lechugas frescas", quantity: 3, price: 7.50 }
      ]
    },
    {
      id: 2,
      date: "2025-10-18",
      total: 68.00,
      status: "En camino",
      items: [
        { name: "Zanahorias", quantity: 2, price: 10.00 },
        { name: "Espinacas", quantity: 4, price: 12.00 }
      ]
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Entregado":
        return "bg-green-100 text-green-800";
      case "En camino":
        return "bg-blue-100 text-blue-800";
      case "Procesando":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Historial de Pedidos</h1>
        <p className="text-gray-600 mb-6">Aún no has realizado ningún pedido</p>
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
      <h1 className="text-3xl font-bold mb-6">Historial de Pedidos</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-lg p-6 bg-white shadow-sm">
            {/* Encabezado del pedido */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold">Pedido #{order.id}</h2>
                <p className="text-gray-600">
                  Fecha: {new Date(order.date).toLocaleDateString("es-CL")}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>

            {/* Items del pedido */}
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Productos:</h3>
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-gray-700">
                    <span>
                      {item.name} x{item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="border-t pt-4 flex justify-between items-center">
              <span className="text-xl font-bold">Total</span>
              <span className="text-xl font-bold text-green-600">
                ${order.total.toFixed(2)}
              </span>
            </div>

            {/* Botón de acción */}
            <div className="mt-4">
              <button className="text-green-600 hover:text-green-700 font-semibold">
                Ver detalles
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => navigate("/products")}
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
        >
          Seguir Comprando
        </button>
      </div>
    </div>
  );
}

export default OrderHistory;