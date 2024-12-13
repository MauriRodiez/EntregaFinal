import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderById } from "../services/productService";

const OrderSuccess = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const data = await getOrderById(orderId);
        setOrderDetails(data);
      } catch (error) {
        setError("Error al obtener los detalles de la orden");
        console.error("Error al obtener los detalles de la orden:", error);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {orderDetails ? (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold text-center mb-4">
            Detalles de la Orden
          </h1>
          <div className="mb-4">
            <p className="text-lg font-medium">
              ID de la Orden:{" "}
              <span className="font-normal">{orderDetails.id}</span>
            </p>
            <p className="text-lg font-medium">
              Nombre:{" "}
              <span className="font-normal">
                {orderDetails.customer.firstName}{" "}
                {orderDetails.customer.lastName}
              </span>
            </p>
            <p className="text-lg font-medium">
              Correo:{" "}
              <span className="font-normal">{orderDetails.customer.email}</span>
            </p>
            <p className="text-lg font-medium">
              Teléfono:{" "}
              <span className="font-normal">{orderDetails.customer.phone}</span>
            </p>
          </div>

          <div className="mb-4">
            <h2 className="text-2xl font-semibold">Productos Comprados:</h2>
            <ul className="mt-2">
              {orderDetails.items.map((item, index) => (
                <li key={index} className="flex justify-between py-2 border-b">
                  <span className="font-medium">
                    {item.title} (x{item.quantity})
                  </span>
                  <span className="font-normal">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-between font-semibold text-xl mt-4">
            <span>Total:</span>
            <span>${orderDetails.total.toFixed(2)}</span>
          </div>
        </div>
      ) : (
        <p className="text-center text-lg">
          Cargando los detalles de la orden...
        </p>
      )}
    </div>
  );
};

export default OrderSuccess;
