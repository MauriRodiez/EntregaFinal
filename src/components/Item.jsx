import React from 'react';
import { Link } from 'react-router-dom';

const Item = ({ product }) => {
  return (
    <div className="card p-4 m-2 bg-white rounded shadow-lg">
      <img
        src={product.image} // Corregido a 'image' que es la propiedad correcta
        alt={product.title} // Corregido a 'title' que es la propiedad correcta
        className="w-full h-40 object-cover rounded-t"
      />
      <div className="p-2">
        <h3 className="font-semibold text-lg">{product.title}</h3> {/* Corregido 'name' a 'title' */}
        <p className="text-gray-500">{product.description}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="font-bold text-xl">{`$${product.price}`}</span>
          <Link
            to={`/product/${product.id}`}
            className="text-yellow-600 hover:text-yellow-500 font-medium"
          >
            Ver detalle
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Item;
