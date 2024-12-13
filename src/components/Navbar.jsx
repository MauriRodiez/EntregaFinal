import { useState } from "react";
import { Link } from "react-router-dom";
import Cart from "./Cart";
import { routes } from "../utils/routes";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-yellow-200 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logotipo */}
          <div className="flex-shrink-0">
            <Link to={routes.home}>
              <h2 className="text-black text-xl font-bold">LA TIENDA</h2>
            </Link>
          </div>

          <div className="hidden md:flex space-x-4 items-center">
            <Link
              to={routes.home}
              className="hover:text-yellow-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to={`${routes.category}/Prenda`}
              className="hover:text-yellow-600 font-medium transition-colors"
            >
              Vestimenta
            </Link>
            <Link
              to={`${routes.category}/Calzado`}
              className="hover:text-yellow-600 font-medium transition-colors"
            >
              Calzado
            </Link>
            <Link
              to={`${routes.category}/Accesorios`}
              className="hover:text-yellow-600 font-medium transition-colors"
            >
              Accesorios
            </Link>

            <Cart />
          </div>

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

      {isMenuOpen && (
        <div className="md:hidden bg-yellow-300 text-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to={routes.home}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-yellow-400 hover:text-gray-900"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to={`${routes.category}/Prenda`}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-yellow-400 hover:text-gray-900"
              onClick={() => setIsMenuOpen(false)}
            >
              Vestimenta
            </Link>
            <Link
              to={`${routes.category}/Calzado`}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-yellow-400 hover:text-gray-900"
              onClick={() => setIsMenuOpen(false)}
            >
              Calzado
            </Link>
            <Link
              to={`${routes.category}/Accesorios`}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-yellow-400 hover:text-gray-900"
              onClick={() => setIsMenuOpen(false)}
            >
              Accesorios
            </Link>

            <div
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-yellow-400 hover:text-gray-900"
              onClick={() => setIsMenuOpen(false)}
            >
              <Cart />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
