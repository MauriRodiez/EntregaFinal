import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Para obtener el parámetro de la URL
import { getProductsByCategory, getProducts } from "../services/productService"; // Servicios para obtener productos
import ItemList from "./ItemList"; // El componente para mostrar los productos

const ItemListContainer = () => {
  const { category } = useParams(); // Obtener el parámetro de la categoría desde la URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Si categoryId está presente, obtenemos los productos por categoría, sino obtenemos todos los productos
        if (category) {
          console.log("categoryId:", category); // Debugging para verificar categoryId
          const fetchedProducts = await getProductsByCategory(category); // Llamamos al servicio con el parámetro categoryId
          setProducts(fetchedProducts);
        } else {
          console.log("categoryId no está presente, obteniendo todos los productos"); // Debugging
          const fetchedProducts = await getProducts(); // Llamamos al servicio para obtener todos los productos
          setProducts(fetchedProducts);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar productos:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]); // Dependencia de categoryId para actualizar cuando cambie

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <ItemList products={products} />
      )}
    </div>
  );
};

export default ItemListContainer;
