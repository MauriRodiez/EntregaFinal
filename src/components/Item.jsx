import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext"; // Importa el contexto

const Item = ({ product }) => {
  const { addToCart } = useCart(); // Obtén la función del contexto
  const MAX_DESCRIPTION_LENGTH = 100;

  const truncatedDescription =
    product.description.length > MAX_DESCRIPTION_LENGTH
      ? product.description.slice(0, MAX_DESCRIPTION_LENGTH) + "..."
      : product.description;

  return (
    <div className="card p-4 m-2 bg-white rounded shadow-lg">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-40 object-cover rounded-t"
      />
      <div className="p-2">
        <h3 className="font-semibold text-lg">{product.title}</h3>
        <p className="text-gray-500">{truncatedDescription}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="font-bold text-xl">{`$${product.price}`}</span>
          <button
            onClick={() => addToCart(product)}
            className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
          >
            Agregar al carrito
          </button>
        </div>
        <Link
          to={`/product/${product.id}`}
          className="text-yellow-600 hover:text-yellow-500 font-medium mt-2 inline-block"
        >
          Ver detalle
        </Link>
      </div>
    </div>
  );
};

export default Item;
