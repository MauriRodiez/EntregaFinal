import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/outline";
import { useCart } from "../context/CartContext"; 
import { routes } from "../utils/routes";

const Cart = () => {
  const { totalItems } = useCart(); 

  return (
    <Link to={routes.cart} className="relative">
      <button className="flex items-center justify-center p-2 bg-yellow-200 hover:bg-yellow-300 rounded-full">
        <ShoppingCartIcon className="w-6 h-6 text-black" />
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

