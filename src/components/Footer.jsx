import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logotipo */}
          <div className="mb-4 md:mb-0 flex-shrink-0">
            <Link to="/">
              <img
                src="/images/logotipo.png"
                alt="Logotipo"
                className="h-12 w-auto"
                style={{ filter: "brightness(0)" }} // Filtro para hacerlo negro
              />
            </Link>
          </div>

          {/* Menú */}
          <div className="mb-4 md:mb-0">
            <nav className="flex space-x-4 text-center">
              <Link
                to="/"
                className="hover:text-yellow-400 font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                to="/categories/vestimenta"
                className="hover:text-yellow-400 font-medium transition-colors"
              >
                Vestimenta
              </Link>
              <Link
                to="/categories/calzado"
                className="hover:text-yellow-400 font-medium transition-colors"
              >
                Calzado
              </Link>
              <Link
                to="/categories/accesorios"
                className="hover:text-yellow-400 font-medium transition-colors"
              >
                Accesorios
              </Link>
            </nav>
          </div>

          {/* Redes Sociales */}
          <div className="flex space-x-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-yellow-400 transition-colors"
            >
              <FaFacebook className="h-6 w-6" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-yellow-400 transition-colors"
            >
              <FaTwitter className="h-6 w-6" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-yellow-400 transition-colors"
            >
              <FaInstagram className="h-6 w-6" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 border-t border-gray-700 pt-4 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} sicompralo.com. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
