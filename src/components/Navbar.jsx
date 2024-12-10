import { useState } from "react";
import { Link } from "react-router-dom";
import Cart from './Cart'; // Importar el componente Cart

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-yellow-200 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logotipo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img
                src="/images/logotipo.png"
                alt="Logotipo"
                className="h-20 w-auto"
              />
            </Link>
          </div>

          {/* Menú principal */}
          <div className="hidden md:flex space-x-4 items-center">
            <Link
              to="/"
              className="hover:text-yellow-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/categories/vestimenta"
              className="hover:text-yellow-600 font-medium transition-colors"
            >
              Vestimenta
            </Link>
            <Link
              to="/categories/calzado"
              className="hover:text-yellow-600 font-medium transition-colors"
            >
              Calzado
            </Link>
            <Link
              to="/categories/accesorios"
              className="hover:text-yellow-600 font-medium transition-colors"
            >
              Accesorios
            </Link>

            {/* Componente del carrito */}
            <Cart />
          </div>

          {/* Botón hamburguesa */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-yellow-600 hover:bg-yellow-300 focus:outline-none"
            >
              <span className="sr-only">Abrir menú</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menú desplegable */}
      {isMenuOpen && (
        <div className="md:hidden bg-yellow-300 text-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-yellow-400 hover:text-gray-900"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/categories/vestimenta"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-yellow-400 hover:text-gray-900"
              onClick={() => setIsMenuOpen(false)}
            >
              Vestimenta
            </Link>
            <Link
              to="/categories/calzado"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-yellow-400 hover:text-gray-900"
              onClick={() => setIsMenuOpen(false)}
            >
              Calzado
            </Link>
            <Link
              to="/categories/accesorios"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-yellow-400 hover:text-gray-900"
              onClick={() => setIsMenuOpen(false)}
            >
              Accesorios
            </Link>

            {/* Componente del carrito en el menú móvil */}
            <div className="block px-3 py-2 rounded-md text-base font-medium hover:bg-yellow-400 hover:text-gray-900" onClick={() => setIsMenuOpen(false)}>
              <Cart />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
