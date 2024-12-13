import React from "react";
import { Link } from "react-router-dom"; 

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-500">404 - Página no encontrada</h1>
        <p className="mt-4 text-lg text-gray-700">
          Lo siento, la página que estás buscando no existe.
        </p>
        <Link
          to={routes.home}
          className="mt-6 inline-block px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;