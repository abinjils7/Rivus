/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "sonner";
import AuthContext from "./Authcontext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user } = useContext(AuthContext);
  const [refreshCart, setrefreshCart] = useState("");
  let alreadyInCart = {};

  useEffect(() => {
    if (!user || !user.id) {
      // Optionally show a message or loading spinner
      return;
    }

    console.log("test for fetch carts");

    const fetchCart = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/cart/${user.id}`, {
          withCredentials: true,
        });
        setCart(Array.isArray(res.data.cart) ? res.data.cart : []);
      } catch (err) {
        setCart([]);
        toast.error("Failed to load cart");
      }
    };

    fetchCart();

    console.log("test for fetch carts finished working");
  }, [user]);

  const addToCart = async (product) => {
    if (!user) return toast.error("Please login first");

    try {
      const res = await axios.post(
        "http://localhost:5000/cart",
        {
          userId: user.id,
          productId: product._id,
          quantity: 1,
        },
        { withCredentials: true }
      );

      const message = await res.data.message;

      toast.info(message);

      if (message === "Already in cart") return;

      const item = res.data.data;
      const newItem = {
        ...item.productId,
        quantity: item.quantity,
      };

      setCart((prev) => [...prev, newItem]);
    } catch (err) {
      console.error("Failed to add to cart:", err);
      toast.error("Could not add to cart");
    }
  };

  const clearCart = async () => {
    axios.delete("http://localhost:5000/cart/clear-cart", {
      data: { userId: user.id },
      withCredentials: true, // ✅ added
    });
    console.log("cart was cleard");
  };

  const removeFromCart = async (productId) => {
    if (!user) return toast.error("Please login first");

    try {
      await axios.delete(`http://localhost:5000/cart`, {
        data: { userId: user.id, productId },
        withCredentials: true, // ✅ added
      });

      setCart((prev) => prev.filter((item) => item._id !== productId));
      toast.success("Removed from cart");
    } catch (err) {
      console.error("❌ Failed to remove from cart:", err);
      toast.error("Could not remove from cart");
    }
  };

  const updateQuantity = async (productId, change) => {
    const item = cart.find((i) => i.productId._id === productId);
    if (!item) return;

    try {
      const newQuantity = Math.max(1, (item.quantity || 1) + change);

      await axios.put(
        "http://localhost:5000/cart",
        {
          userId: user.id,
          productId,
          change,
        },
        { withCredentials: true } // ✅ added
      );

      setCart((prev) =>
        prev.map((i) =>
          i.productId._id === productId ? { ...i, quantity: newQuantity } : i
        )
      );

      toast.success("Quantity updated");
    } catch (err) {
      console.error("Failed to update quantity:", err);
      toast.error("Could not update quantity");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        alreadyInCart,
        clearCart,
        refreshCart,
        setrefreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
