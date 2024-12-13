import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductsByCategory, getProducts } from "../services/productService";
import ItemList from "./ItemList";

const ItemListContainer = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (category) {
          const fetchedProducts = await getProductsByCategory(category);
          setProducts(fetchedProducts);
        } else {
          const fetchedProducts = await getProducts();
          setProducts(fetchedProducts);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar productos:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

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
