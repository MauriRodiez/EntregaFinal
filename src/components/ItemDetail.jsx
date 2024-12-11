import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/productService'; // Servicio para obtener un producto por ID
import { useCart } from '../context/CartContext'; // Importar el contexto del carrito

const ItemDetail = () => {
  const { id } = useParams(); // Obtener el parámetro de ID desde la URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useCart(); // Usar la función para agregar al carrito

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const fetchedProduct = await getProductById(id); // Llama al servicio con el ID
        setProduct(fetchedProduct);
      } catch (err) {
        console.error('Error al obtener el producto:', err);
        setError('No se pudo cargar el producto.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]); // Ejecutar el efecto cuando cambie el ID

  if (loading) return <p>Cargando detalles del producto...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      {product && (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{product.title}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl font-bold text-yellow-600">${product.price}</span>
              <span className="text-sm text-gray-500">Categoría: {product.category}</span>
            </div>
            <button
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-500"
              onClick={() => addToCart(product)} // Llama a la función para agregar al carrito
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetail;
