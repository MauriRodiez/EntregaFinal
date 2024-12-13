import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { createOrder } from "../services/productService";
import { useNavigate } from "react-router-dom";

const CheckOut = () => {
  const { cartItems, clearCart } = useCart();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    emailConfirm: "",
  });
  const [errors, setErrors] = useState({});
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!form.firstName) newErrors.firstName = "Este campo es obligatorio";
    if (!form.lastName) newErrors.lastName = "Este campo es obligatorio";
    if (!form.phone) newErrors.phone = "Este campo es obligatorio";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Por favor ingrese un correo electrónico válido";
    if (form.email !== form.emailConfirm)
      newErrors.emailConfirm = "Los correos electrónicos no coinciden";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handlePurchase = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const orderData = {
          customer: form,
          items: cartItems,
          total: cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          ),
          date: new Date(),
        };

        const newOrderId = await createOrder(orderData);
        setOrderId(newOrderId);
        setPurchaseSuccess(true);
        clearCart();

        navigate(`/order-success/${newOrderId}`);
      } catch (error) {
        console.error("Error al crear la orden:", error);
      }
    }
  };

  const calculateProductTotal = (price, quantity) => {
    return (price * quantity).toFixed(2);
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const groupedItems = cartItems.reduce((acc, item) => {
    const existingItem = acc.find((product) => product.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      acc.push({ ...item });
    }
    return acc;
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Checkout</h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600">
            No hay productos en el carrito.
          </p>
        ) : (
          <div>
            <ul className="space-y-2">
              {groupedItems.map((item, index) => (
                <li key={index} className="flex justify-between py-2 border-b">
                  <span>
                    {item.title} (x{item.quantity})
                  </span>
                  <span>{`$${calculateProductTotal(
                    item.price,
                    item.quantity
                  )}`}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-between font-bold">
              <span>Total:</span>
              <span>{`$${calculateTotal()}`}</span>
            </div>
          </div>
        )}

        <form onSubmit={handlePurchase} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium">Nombre</label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleFormChange}
              className="input w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.firstName && (
              <span className="text-red-500 text-xs">{errors.firstName}</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Apellido</label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleFormChange}
              className="input w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.lastName && (
              <span className="text-red-500 text-xs">{errors.lastName}</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Teléfono</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleFormChange}
              className="input w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.phone && (
              <span className="text-red-500 text-xs">{errors.phone}</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleFormChange}
              className="input w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <span className="text-red-500 text-xs">{errors.email}</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">
              Confirmar correo electrónico
            </label>
            <input
              type="email"
              name="emailConfirm"
              value={form.emailConfirm}
              onChange={handleFormChange}
              className="input w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.emailConfirm && (
              <span className="text-red-500 text-xs">
                {errors.emailConfirm}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Confirmar compra
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckOut;
