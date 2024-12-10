import { collection, getDocs } from "firebase/firestore";
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

export { getProducts };
