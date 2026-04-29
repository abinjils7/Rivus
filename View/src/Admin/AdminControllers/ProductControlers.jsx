/* eslint-disable react-refresh/only-export-components */
import React, { createContext } from "react";
import axios from "axios";
import { Toaster, toast } from "sonner";
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const ProductContext = createContext();

export default function ProductControlers({ children }) {
  async function deleteProductDB(productId) {
    try {
      console.log("from the funtion remove", productId);
      await axios.delete(`${BASE_URL}/Admin`, {
        data: { productId },
        withCredentials: true, // ✅ added to send cookies
      });
      console.log("Deleted", productId);
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Failed to delete product:", error);
      toast.error("Failed to delete product. Please try again.");
      throw error;
    }
  }

  async function addCarsDB(formdata) {
    try {
      await axios.post(`${BASE_URL}/Admin`, formdata, {
        withCredentials: true, // ✅ added here too
      });
      toast.success("Product added successfully");
    } catch (error) {
      console.error("Failed to add product:", error);
      toast.error("Failed to add product. Please try again.");
      throw error; // Re-throw to let calling component handle it
    }
  }

  async function editProductDB(productId, updatedData) {
    console.log("recevd data for update", updatedData);
    try {
      const res = await axios.patch(
        `${BASE_URL}/Admin/product`,
        { ...updatedData, productId },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success("Product updated!");
      return res.data;
    } catch (err) {
      console.error("Failed to update product:", err);
      toast.error("Failed to update product.");
      throw err;
    }
  }

  return (
    <ProductContext.Provider
      value={{ deleteProductDB, addCarsDB, editProductDB }}
    >
      {children}
    </ProductContext.Provider>
  );
}

{
  /* <ProductControlers>
  <component>
</ProductControlers> */
}
