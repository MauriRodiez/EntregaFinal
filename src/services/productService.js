import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";

const getProducts = async () => {
  try {
    const productsCollection = collection(db, "products");
    const productSnapshot = await getDocs(productsCollection);
    return productSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error obteniendo los productos: ", error);
    throw new Error("Error al obtener productos");
  }
};

const getProductsByCategory = async (category) => {
  try {
    if (!category) throw new Error("La categoría no está definida");
    const productsCollection = collection(db, "products");
    const q = query(productsCollection, where("category", "==", category));
    const productSnapshot = await getDocs(q);
    return productSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error obteniendo los productos por categoría: ", error);
    throw new Error("Error al obtener productos por categoría");
  }
};

const getProductById = async (id) => {
  try {
    if (!id) throw new Error("El ID del producto no está definido");
    const productRef = doc(db, "products", id);
    const productSnapshot = await getDoc(productRef);
    if (productSnapshot.exists()) {
      return { id: productSnapshot.id, ...productSnapshot.data() };
    } else {
      throw new Error("Producto no encontrado");
    }
  } catch (error) {
    console.error("Error obteniendo el producto por ID: ", error);
    throw new Error("Error al obtener el producto por ID");
  }
};

const createOrder = async (orderData) => {
  try {
    const ordersCollection = collection(db, "orders");
    const docRef = await addDoc(ordersCollection, orderData);
    return docRef.id; // Retorna el ID de la orden creada
  } catch (error) {
    console.error("Error creando la orden: ", error);
    throw new Error("Error al crear la orden");
  }
};

const getOrderById = async (orderId) => {
  try {
    if (!orderId) throw new Error("El ID de la orden no está definido");
    const orderRef = doc(db, "orders", orderId); // Asegúrate de que "orders" sea la colección correcta
    const orderSnapshot = await getDoc(orderRef);
    if (orderSnapshot.exists()) {
      return { id: orderSnapshot.id, ...orderSnapshot.data() };
    } else {
      throw new Error("Orden no encontrada");
    }
  } catch (error) {
    console.error("Error obteniendo la orden por ID: ", error);
    throw new Error("Error al obtener la orden por ID");
  }
};

export {
  getOrderById,
  getProducts,
  getProductsByCategory,
  getProductById,
  createOrder,
};
