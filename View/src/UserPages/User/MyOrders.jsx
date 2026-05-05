import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import WishlistContext from "../../ContextAPI/WishlistContext";
import axios from "axios";
import AuthContext from "../../ContextAPI/Authcontext";

function MyOrders() {
  const { user } = useContext(AuthContext);
  const { cancelOrder } = useContext(WishlistContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const userId = user?.id || user?._id;

    if (!userId) {
      setOrders([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    axios
      .get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}//orders/${userId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Fetch error:", err);
        setOrders([]);
        setLoading(false);
      });
  }, [user]);

  const filteredOrders =
    filterStatus === "all"
      ? orders
      : orders.filter(
          (order) =>
            (order.status || "").toLowerCase() === filterStatus.toLowerCase()
        );

  const getStatusClass = (status) => {
    switch ((status || "").toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "delivered":
        return "bg-green-100 text-green-800 border border-green-200";
      case "canceled":
      case "cancelled":
        return "bg-red-100 text-red-800 border border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // -------------------------------------------------
  //                LOADING SCREEN
  // -------------------------------------------------
  if (loading) {
    return (
      <div className="min-h-screen bg-white py-8 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <div className="text-gray-600">Loading your orders...</div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------
  //                MAIN UI
  // -------------------------------------------------
  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600 mt-2">Manage and track your orders</p>
        </div>

        {/* No Orders */}
        {orders.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-200">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No orders yet
              </h3>
              <p className="text-gray-600 mb-6">
                You haven't placed any orders yet.
              </p>
              <Link
                to="/"
                className="inline-flex items-center px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Filters */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-gray-700 mr-3">
                  Filter by:
                </span>

                {[
                  { key: "all", label: "All Orders" },
                  { key: "pending", label: "Pending" },
                  { key: "delivered", label: "Delivered" },
                  { key: "cancelled", label: "Cancelled" },
                ].map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setFilterStatus(filter.key)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      filterStatus === filter.key
                        ? "bg-black text-white shadow-sm"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders List */}
            <div className="space-y-6">
              {filteredOrders.map((order) => (
                <div
                  key={order._id || order.id}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
                >
                  {/* Header */}
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold text-gray-900">
                            Order #{order._id || order.id}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(
                              order.status
                            )}`}
                          >
                            {(order.status || "Unknown")
                              .charAt(0)
                              .toUpperCase() +
                              (order.status || "Unknown").slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Placed on {formatDate(order.orderDate)}
                        </p>
                      </div>

                      <div className="text-left sm:text-right mt-4 sm:mt-0">
                        <p className="text-2xl font-bold text-gray-900">
                          ₹{order.totalPrice || order.total}
                        </p>
                        <p className="text-sm text-gray-600">Total Amount</p>
                      </div>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="p-6 space-y-4">
                    {order.items.map((item, idx) => (
                      <div
                        key={item._id || idx}
                        className="flex flex-col sm:flex-row sm:items-start gap-4 py-4 border-b last:border-b-0"
                      >
                        <div className="w-full sm:w-20 h-40 sm:h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                          <img
                            src={
                              item.productId?.image || "/placeholder-image.jpg"
                            }
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">
                            {item.productId?.name}
                          </h4>

                          <div className="mt-1 space-y-1">
                            {item.productId?.brand && (
                              <p className="text-sm text-gray-600">
                                Brand: {item.productId.brand}
                              </p>
                            )}

                            {item.productId?.model && (
                              <p className="text-sm text-gray-600">
                                Model: {item.productId?.model}
                              </p>
                            )}

                            <div className="flex gap-4 flex-wrap">
                              <p className="text-sm text-gray-600">
                                Quantity: {item.quantity}
                              </p>

                              {item.productId?.size && (
                                <p className="text-sm text-gray-600">
                                  Size: {item.productId?.size}
                                </p>
                              )}

                              {item.productId?.color && (
                                <p className="text-sm text-gray-600">
                                  Color: {item.productId?.color}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="text-left sm:text-right mt-2 sm:mt-0">
                          <p className="text-lg font-semibold text-gray-900">
                            ₹
                            {(
                              item.productId?.price * item.quantity
                            ).toLocaleString("en-IN")}
                          </p>
                          <p className="text-sm text-gray-600">
                            ₹{item.productId?.price} each
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="bg-gray-50 px-6 py-4 border-t">
                    <div className="flex justify-end">
                      {(order.status || "").toLowerCase() === "pending" && (
                        <button
                          onClick={() => cancelOrder(order._id || order.id)}
                          className="px-6 py-2 bg-white text-red-600 border border-red-300 rounded-lg hover:bg-red-50"
                        >
                          Cancel Order
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No results for filter */}
            {filteredOrders.length === 0 && (
              <div className="text-center py-12 bg-gray-50 rounded-2xl border">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No orders found
                </h3>
                <p className="text-gray-600">
                  No orders match the selected status filter.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default MyOrders;
