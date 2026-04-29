import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "sonner";
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
import AuthContext from "./Authcontext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user || !user.id) return;
    console.log(user.name, "from wishlist ###FOR FETCH WISHLIST", user.id);

    const fetchWishlist = async () => {
      try {
        const userId = user.id;
        const res = await axios.get(
          `${BASE_URL}/wishlist/${userId}`,
          {
            withCredentials: true,
          }
        );
        setWishlist(res.data.wishlist);
      } catch (err) {
        console.error("Failed to fetch wishlist:", err);
        toast.error("Could not load wishlist");
      }
    };

    fetchWishlist();
  }, [user]);

  const addToWishlist = async (product) => {
    if (!user) return toast.error("Login required");
    console.log("user is and product id from context", product._id, user.id);
    console.log(product);
    if (
      wishlist.some(
        (item) =>
          item?.productId?._id?.toString?.() === product?._id?.toString?.() ||
          item?.productId?.toString?.() === product?._id?.toString?.()
      )
    ) {
      return toast.error("Already in wishlist");
    }

    try {
      const res = await axios.post(
        `${BASE_URL}/wishlist`,
        {
          userId: user.id,
          productId: product._id,
        },
        { withCredentials: true }
      );

      setWishlist((prev) => [...prev, res.data]);
      toast.success("Added to wishlist");
    } catch (err) {
      console.error("Add failed:", err);
      toast.error("Failed to add to wishlist");
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!user) return toast.error("Login required");
    console.log("id receved for remove from wishlist", productId);
    try {
      await axios.delete(`${BASE_URL}/wishlist`, {
        data: { productId },
        withCredentials: true,
      });
      setWishlist((prev) =>
        prev.filter((item) => item.productId !== productId)
      );
      toast.success("Removed from wishlist");
    } catch (err) {
      console.error("Remove failed:", err);
      toast.error("Failed to remove from wishlist");
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContext;
