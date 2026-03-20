import React, { useEffect, useState, useContext, useRef } from "react";
import { OrderContext } from "../../Admin/AdminControllers/OrderController";
import { toast } from "sonner";

export default function ViewOrdersHistory() {
  const [statusChanges, setStatusChanges] = useState({});
  const { setOrderStatus, orders, fetchOrders } = useContext(OrderContext);
  const [loading, setLoading] = useState(true);
  const ordersRef = useRef(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        await fetchOrders();
        setTimeout(() => scrollToOrders(), 300);
      } catch (error) {
        console.error("Failed to load orders:", error);
        toast.error("Failed to load orders. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  function handleDropdownChange(orderId, value) {
    setStatusChanges((prev) => ({ ...prev, [orderId]: value }));
  }

  async function handleUpdateClick(orderId) {
    const newStatus = statusChanges[orderId];
    if (!newStatus) return;

    try {
      await setOrderStatus(orderId, newStatus);
      toast.success("Order status updated successfully");
      await fetchOrders();
      setStatusChanges((prev) => {
        const updated = { ...prev };
        delete updated[orderId];
        return updated;
      });
    } catch (error) {
      console.error("Failed to update order status:", error);
      toast.error("Failed to update order status. Please try again.");
    }
  }

  const scrollToOrders = () => {
    if (ordersRef.current) {
      ordersRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Hero Section */}
      <div className="text-center py-12 px-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl shadow-sm mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Order Management
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Track and manage all customer orders, update delivery status, and
          monitor order history.
        </p>
        <button
          onClick={scrollToOrders}
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          View Orders
        </button>
      </div>

      {/* Orders Section */}
      <div ref={ordersRef} className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Order History ({orders.length})
        </h2>
        <div className="flex items-center text-sm text-gray-500">
          <span className="mr-2">Scroll to explore</span>
          <svg
            className="w-5 h-5 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>

      {/* Orders Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6)
            .fill(0)
            .map((_, idx) => (
              <div
                key={idx}
                className="animate-pulse bg-gray-50 rounded-2xl border p-6"
              >
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-3"></div>
                <div className="h-5 bg-gray-200 rounded w-2/3 mb-2"></div>
              </div>
            ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-2xl shadow-sm">
          <svg
            className="w-20 h-20 text-gray-300 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <p className="text-gray-500 text-xl mb-2">No orders found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
          {orders.map((order, index) => (
            <div
              key={order._id || index}
              className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md border flex flex-col opacity-0 animate-fade-in"
              style={{
                animationDelay: `${index * 80}ms`,
                animationFillMode: "forwards",
              }}
            >
              <div className="flex justify-between items-center border-b pb-3 mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Order #{order._id}
                </h3>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {order.totalQuantity} item
                  {order.totalQuantity !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="mb-4">
                <p className="text-gray-700 text-sm mb-2">
                  <strong>Customer:</strong> {order.customer?.name || "N/A"}
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Total:</strong> ₹{order.totalPrice?.toLocaleString()}
                </p>
              </div>

              {/* Status */}
              <div className="mb-4">
                <label className="text-gray-700 text-sm font-medium">
                  Delivery Status:
                </label>
                <div className="flex gap-2 mt-2">
                  <select
                    value={
                      statusChanges[order._id] ?? order.status ?? "pending"
                    }
                    onChange={(e) =>
                      handleDropdownChange(order._id, e.target.value)
                    }
                    className="flex-1 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-black"
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                  <button
                    onClick={() => handleUpdateClick(order._id)}
                    className="bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-800 text-sm font-medium"
                  >
                    Update
                  </button>
                </div>
              </div>

              {/* Items */}
              <div className="mt-auto pt-4 border-t">
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Order Items:
                </h4>
                <ul className="space-y-3">
                  {order.items.map((item, idx) => (
                    <li
                      key={item._id || idx}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            item.productId?.image || "/placeholder-image.jpg"
                          }
                          alt={item.productId?.name}
                          className="w-10 h-10 object-cover rounded-lg border"
                          onError={(e) => {
                            e.target.src = "/placeholder-image.jpg";
                          }}
                        />
                        <span className="text-gray-800 text-sm font-medium">
                          {item.productId?.name}
                        </span>
                      </div>
                      <span className="text-gray-600 text-sm bg-gray-100 px-2 py-1 rounded-full">
                        x {item.productId?.quantity}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && orders.length > 3 && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-110 z-10"
          aria-label="Scroll to top"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}

      <style>{`
        @keyframes fadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          transform: translateY(20px);
          animation: fadeIn 0.6s ease forwards;
        }
      `}</style>
    </div>
  );
}
