import axios from "axios";
import React, { createContext, useState } from "react";

import { toast } from "sonner";

// eslint-disable-next-line react-refresh/only-export-components
export const OrderContext = createContext();

export default function OrderController({ children }) {
  async function setOrderStatus(id, status) {
    if (!id || !status) {
      console.error(" setOrderStatus called without both id and status!", {
        id,
        status,
      });
      throw new Error("Order ID and status must both be provided");
    }

    console.log(" Sending PATCH with:", { id, status });

    try {
      const res = await axios.patch(
        "http://localhost:5000/Admin",
        { id, status },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // ✅ added to send cookies
        }
      );
      console.log(" Order status updated successfully:", res.data);
      return res.data;
    } catch (err) {
      // Log details from axios error response if present
      if (err.response) {
        console.error(" Failed to update order status:", err.response.data);
      } else {
        console.error(" Network or config error:", err.message);
      }
      throw err;
    }
  }

  const [orders, setOrders] = useState([]);

  async function fetchOrders() {
    try {
      const res = await axios.get(`http://localhost:5000/Admin/order`, {
        withCredentials: true,
      });
      setOrders(res.data);
    } catch (error) {
      console.error("Failed to load orders:", error);
      toast.error("Failed to load orders. Please try again.");
      throw error;
    }
  }
  return (
    <OrderContext.Provider value={{ setOrderStatus, orders, fetchOrders }}>
      {children}
    </OrderContext.Provider>
  );
}
