import React, { useState } from "react";
import { useCart } from "../context/CartContext"; // Importa el contexto

const CheckOut = () => {
  const { cartItems, clearCart } = useCart(); // Obtén los productos y la función para vaciar el carrito
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    emailConfirm: "",
  });

  const [errors, setErrors] = useState({});
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  // Validación del formulario
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

    // Si no hay errores, devuelve true para permitir el envío del formulario
    return Object.keys(newErrors).length === 0;
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handlePurchase = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Aquí puedes manejar la lógica de compra
      alert("Compra realizada con éxito");
      clearCart(); // Vaciar el carrito después de la compra
      setPurchaseSuccess(true);
    }
  };

  // Función para calcular el precio total de un solo producto, multiplicando el precio por la cantidad
  const calculateProductTotal = (price, quantity) => {
    return (price * quantity).toFixed(2);
  };

  // Función para calcular el total de todos los productos en el carrito
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      // Asegurarse de que `price` y `quantity` sean números válidos
      const price = parseFloat(item.price);
      const quantity = parseInt(item.quantity, 10) || 1; // Asigna 1 si quantity no está definido

      if (isNaN(price) || isNaN(quantity)) {
        console.error(`Precio o cantidad inválido:`, item);
        return total; // Si el precio o la cantidad no son válidos, no los sumamos
      }

      return total + price * quantity;
    }, 0).toFixed(2); // Redondea el total a dos decimales
  };

  // Agrupar productos para mostrar solo una línea por tipo, con la cantidad
  const groupedItems = cartItems.reduce((acc, item) => {
    const existingItem = acc.find((product) => product.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity; // Sumar la cantidad si el producto ya está en el carrito
    } else {
      acc.push({ ...item });
    }
    return acc;
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {cartItems.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <div>
          <ul>
            {groupedItems.map((item, index) => (
              <li key={index} className="flex justify-between border-b py-2">
                <span>{item.title} (x{item.quantity})</span>
                <span>{`$${calculateProductTotal(item.price, item.quantity)}`}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between font-bold">
            <span>Total:</span>
            <span>{`$${calculateTotal()}`}</span>
          </div>
        </div>
      )}

      <form onSubmit={handlePurchase} className="mt-8 space-y-4">
        <div>
          <label htmlFor="firstName" className="block">Nombre</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={form.firstName}
            onChange={handleFormChange}
            className="w-full p-2 border"
          />
          {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
        </div>

        <div>
          <label htmlFor="lastName" className="block">Apellido</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={form.lastName}
            onChange={handleFormChange}
            className="w-full p-2 border"
          />
          {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block">Teléfono</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleFormChange}
            className="w-full p-2 border"
          />
          {errors.phone && <p className="text-red-500">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleFormChange}
            className="w-full p-2 border"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="emailConfirm" className="block">Confirmar Email</label>
          <input
            type="email"
            id="emailConfirm"
            name="emailConfirm"
            value={form.emailConfirm}
            onChange={handleFormChange}
            className="w-full p-2 border"
          />
          {errors.emailConfirm && <p className="text-red-500">{errors.emailConfirm}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 w-full"
          disabled={cartItems.length === 0 || purchaseSuccess}
        >
          Finalizar compra
        </button>
      </form>
    </div>
  );
};

export default CheckOut;
