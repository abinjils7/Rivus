import {
  MagnifyingGlassIcon,
  HeartIcon,
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { useContext, useState } from "react";
import { CartContext } from "../../ContextAPI/Cartcontext";
import AuthContext from "../../ContextAPI/Authcontext";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const { cart } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Left: Navigation Links */}
        <div className="flex items-center">
          {/* Hamburger on small screens */}
          <button
            className="lg:hidden text-gray-700 mr-4"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>

          {/* Links - visible on large screens */}
          <nav className="hidden lg:flex space-x-6 text-gray-700 font-medium">
            <a
              href="/"
              className="hover:text-indigo-600 transition duration-300"
            >
              Home
            </a>
            <a
              href="/about"
              className="hover:text-indigo-600 transition duration-300"
            >
              About Us
            </a>
            <a
              href="/marketplace"
              className="hover:text-indigo-600 transition duration-300"
            >
              Cars
            </a>
            {/* <a
              href="/testdrive"
              className="hover:text-indigo-600 transition duration-300"
            >
              Book A Drive
            </a> */}
          </nav>
        </div>

        {/* Middle: Logo */}
        <div className="flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-900 tracking-wide">
            RIVUS
          </span>
          cars!
        </div>

        {/* Right: Icons + User */}
        <div className="flex items-center space-x-6">
          <a
            href="/wishlist"
            className="relative text-gray-700 hover:text-indigo-600 transition duration-300"
          >
            <HeartIcon className="h-6 w-6" />
          </a>

          <a
            href="/cart"
            className="relative text-gray-700 hover:text-indigo-600 transition duration-300"
          >
            <ShoppingCartIcon className="h-6 w-6" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1">
                {cart.length}
              </span>
            )}
          </a>

          <div className="flex items-center ml-auto">
            {user ? (
              <>
                <span
                  onClick={() => navigate("/profile")}
                  className="mr-4 cursor-pointer hover:text-blue-500"
                >
                  Hello, {user?.name}
                </span>

                <button
                  onClick={logout}
                  className="bg-black text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <a
                href="/login"
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Sign In
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Dropdown Menu for small screens */}
      {menuOpen && (
        <div className="lg:hidden bg-white shadow-md border-t">
          <nav className="flex flex-col px-6 py-3 space-y-3 text-gray-700 font-medium">
            <a
              href="/"
              className="hover:text-indigo-600 transition duration-300"
            >
              Home
            </a>
            <a
              href="/about"
              className="hover:text-indigo-600 transition duration-300"
            >
              About Us
            </a>
            <a
              href="/marketplace"
              className="hover:text-indigo-600 transition duration-300"
            >
              Cars
            </a>
            {/* <a
              href="/testdrive"
              className="hover:text-indigo-600 transition duration-300"
            >
              Book A Drive
            </a> */}
            {/* Orders route in mobile dropdown */}
            <a
              href="/ordhistory"
              className="hover:text-indigo-600 transition duration-300"
              aria-label="Orders"
            >
              Orders
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
