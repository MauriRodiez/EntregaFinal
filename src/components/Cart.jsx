
import { Link } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/outline'; 

const Cart = () => {
  let totalItems = 0;

  return (
    <Link to="/cart" className="relative">
      <button className="flex items-center justify-center p-2 bg-yellow-200 hover:bg-yellow-300 rounded-full">
        <ShoppingCartIcon className="w-6 h-6 text-black" />
        
        {/* Mostrar el badge si hay items en el carrito */}
        {totalItems > 0 && (
          <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 bg-red-600 text-white text-xs font-bold rounded-full">
            {totalItems}
          </span>
        )}
      </button>
    </Link>
  );
};

export default Cart;
