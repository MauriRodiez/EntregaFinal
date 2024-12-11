import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config"; // Asegúrate de tener la configuración de Firebase en 'config.js'

/**
 * Obtiene todos los productos desde la base de datos de Firebase.
 * @returns {Promise<Array>} Lista de productos.
 */
const getProducts = async () => {
  try {
    const productsCollection = collection(db, "products"); // 'products' es el nombre de tu colección en Firebase
    const productSnapshot = await getDocs(productsCollection);
    const productList = productSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return productList;
  } catch (error) {
    console.error("Error obteniendo los productos: ", error);
    throw new Error("Error al obtener productos");
  }
};

/**
 * Obtiene los productos filtrados por categoría.
 * @param {string} category La categoría por la que filtrar los productos.
 * @returns {Promise<Array>} Lista de productos filtrados.
 */
const getProductsByCategory = async (category) => {
  try {
    if (!category) {
      throw new Error("categoryId no está definido");
    }
    const productsCollection = collection(db, "products"); 
    const q = query(productsCollection, where("category", "==", category)); // Filtra por categoría
    const productSnapshot = await getDocs(q);
    const productList = productSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return productList;
  } catch (error) {
    console.error("Error obteniendo los productos por categoría: ", error);
    throw new Error("Error al obtener productos por categoría");
  }
};

/**
 * Obtiene un producto por su ID.
 * @param {string} id ID del producto a obtener.
 * @returns {Promise<Object>} Producto con el ID especificado.
 */
const getProductById = async (id) => {
  try {
    if (!id) {
      throw new Error("El ID del producto no está definido");
    }
    const productRef = doc(db, "products", id); // Referencia al documento
    const productSnapshot = await getDoc(productRef); // Obtén el documento
    if (productSnapshot.exists()) {
      return { id: productSnapshot.id, ...productSnapshot.data() }; // Retorna los datos del producto
    } else {
      throw new Error("Producto no encontrado");
    }
  } catch (error) {
    console.error("Error obteniendo el producto por ID: ", error);
    throw new Error("Error al obtener el producto por ID");
  }
};

export { getProducts, getProductsByCategory, getProductById };
