import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAasMwpNNW4YjCVz_1UMmFY6Telfn5rZV4",
  authDomain: "tiendaonline-c0181.firebaseapp.com",
  projectId: "tiendaonline-c0181",
  storageBucket: "tiendaonline-c0181.firebasestorage.app",
  messagingSenderId: "528765516511",
  appId: "1:528765516511:web:4d6400ac9aa25aea36c76a"

};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
