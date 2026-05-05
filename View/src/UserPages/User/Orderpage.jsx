import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../ContextAPI/Cartcontext";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthContext from "../../ContextAPI/Authcontext";
import axios from "axios";

function OrderPage() {
  const { cart, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const totalPrice = cart.reduce(
    (sum, item) => sum + Math.min(item.productId.price * 0.01, 3000) * item.quantity,
    0
  );
  const totalQuantity = cart.length;
  const notOnlyWhitespace = (value) =>
    typeof value === "string" && value.trim().length > 0;

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters")
      .required("Name is required")
      .test(
        "no-whitespace",
        "Name cannot be empty or only spaces",
        notOnlyWhitespace
      )
      .test(
        "no-numbers",
        "Name cannot contain numbers",
        (v) => !/\d/.test(v || "")
      )
      .test(
        "no-special-chars",
        "Name cannot contain special characters",
        (v) => !/[^a-zA-Z\s]/.test(v || "")
      ),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required")
      .test(
        "no-whitespace",
        "Email cannot be empty or only spaces",
        notOnlyWhitespace
      ),
    address: Yup.string()
      .min(10, "Address must be at least 10 characters")
      .required("Address is required")
      .test(
        "no-whitespace",
        "Address cannot be empty or only spaces",
        notOnlyWhitespace
      ),
    city: Yup.string()
      .min(2, "City must be at least 2 characters")
      .required("City is required")
      .test(
        "no-whitespace",
        "City cannot be empty or only spaces",
        notOnlyWhitespace
      )
      .test(
        "no-numbers",
        "City cannot contain numbers",
        (v) => !/\d/.test(v || "")
      ),
    state: Yup.string()
      .min(2, "State must be at least 2 characters")
      .required("State is required")
      .test(
        "no-whitespace",
        "State cannot be empty or only spaces",
        notOnlyWhitespace
      )
      .test(
        "no-numbers",
        "State cannot contain numbers",
        (v) => !/\d/.test(v || "")
      ),
    pincode: Yup.string()
      .matches(/^\d{6}$/, "Pincode must be exactly 6 digits")
      .required("Pincode is required")
      .test(
        "no-whitespace",
        "Pincode cannot be empty or only spaces",
        notOnlyWhitespace
      ),
    paymentMethod: Yup.string()
      .required("Payment method is required")
      .test(
        "no-whitespace",
        "Payment method cannot be empty or only spaces",
        notOnlyWhitespace
      ),
  });

  const formik = useFormik({
    initialValues: {
      name: user?.name || "",
      email: user?.email || "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      paymentMethod: "credit-card",
    },
    validationSchema,
    onSubmit: async (values) => {
      const userId = user?.id || user?._id;
      if (!userId) {
        alert("Please log in to place an order");
        return;
      }
      setIsProcessing(true);
      try {
        const items = cart.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        }));
        const orderData = {
          userId,
          userName: values.name,
          userEmail: values.email,
          address: values.address,
          city: values.city,
          state: values.state,
          pincode: values.pincode,
          paymentMethod: values.paymentMethod,
          items,
          totalQuantity,
          totalPrice,
          orderDate: new Date().toISOString(),
          status: "pending",
        };

        const response = await axios.post(
          "http://localhost:5000/orders",
          orderData,
          {
            withCredentials: true, // 🔥 Auto-pass cookies/token
          }
        );

        if (response.status === 201) {
          setOrderId(response.data.id || response.data._id || "");
          setOrderSuccess(true);
          clearCart();
        } else {
          throw new Error("Failed to place order. Status: " + response.status);
        }
      } catch (error) {
        if (error.response) {
          alert("Backend error: " + JSON.stringify(error.response.data));
        } else {
          alert("App error: " + error.message);
        }
      } finally {
        setIsProcessing(false);
      }
    },
  });

  if (cart.length === 0 && !orderSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Add some items before placing an order.
          </p>
          <button
            onClick={() => navigate("/cart")}
            className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Back to Cart
          </button>
        </div>
      </div>
    );
  }

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Order Placed Successfully!
          </h2>
          <p className="text-gray-600 mb-4">Thank you for your order.</p>
          <p className="text-sm text-gray-500 mb-6">
            Order ID: <span className="font-medium">{orderId}</span>
          </p>
          <div className="space-y-3">
            <button
              onClick={() => navigate("/")}
              className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => navigate("/ordhistory")}
              className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              View Order History
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Complete Your Order
          </h1>
          <p className="text-gray-600">
            Review your items and shipping details
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Order Summary */}
          <div className="lg:w-2/5">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={item.productId.image}
                        alt={item.productId.brand}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium text-gray-900 text-sm">
                        {item.productId.brand}
                      </h3>
                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        $
                        {(
                          item.productId.price * 0.01 * item.quantity
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-4 mt-4 flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">
                  Total
                </span>
                <span className="text-lg font-bold text-gray-900">
                  ${totalPrice.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
          {/* Customer Information Form */}
          <div className="lg:w-3/5">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Shipping Information
              </h2>
              <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition 
                      ${
                        formik.touched.name && formik.errors.name
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter your full name"
                    />
                    {formik.touched.name && formik.errors.name && (
                      <p className="mt-1 text-sm text-red-600">
                        {formik.errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition 
                      ${
                        formik.touched.email && formik.errors.email
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter your email"
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {formik.errors.email}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Address *
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    rows="3"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition
                    ${
                      formik.touched.address && formik.errors.address
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter your complete address"
                  ></textarea>
                  {formik.touched.address && formik.errors.address && (
                    <p className="mt-1 text-sm text-red-600">
                      {formik.errors.address}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formik.values.city}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition
                      ${
                        formik.touched.city && formik.errors.city
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="City"
                    />
                    {formik.touched.city && formik.errors.city && (
                      <p className="mt-1 text-sm text-red-600">
                        {formik.errors.city}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      State *
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formik.values.state}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition
                      ${
                        formik.touched.state && formik.errors.state
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="State"
                    />
                    {formik.touched.state && formik.errors.state && (
                      <p className="mt-1 text-sm text-red-600">
                        {formik.errors.state}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="pincode"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Pincode *
                    </label>
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      value={formik.values.pincode}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      maxLength={6}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition
                      ${
                        formik.touched.pincode && formik.errors.pincode
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="6 digits"
                    />
                    {formik.touched.pincode && formik.errors.pincode && (
                      <p className="mt-1 text-sm text-red-600">
                        {formik.errors.pincode}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">
                    Payment Method *
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {["credit-card", "debit-card", "cash-on-delivery"].map(
                      (pm) => (
                        <label
                          key={pm}
                          className={`flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition
                          ${
                            formik.values.paymentMethod === pm
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={pm}
                            checked={formik.values.paymentMethod === pm}
                            onChange={formik.handleChange}
                            className="sr-only"
                          />
                          <span className="text-sm font-medium capitalize mt-2">
                            {pm.replace(/-/g, " ")}
                          </span>
                        </label>
                      )
                    )}
                  </div>
                  {formik.touched.paymentMethod &&
                    formik.errors.paymentMethod && (
                      <p className="mt-2 text-sm text-red-600">
                        {formik.errors.paymentMethod}
                      </p>
                    )}
                </div>
                {Object.keys(formik.errors).length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-2">
                    <ul className="list-disc list-inside text-sm text-red-700">
                      {Object.entries(formik.errors).map(([field, error]) => (
                        <li key={field}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => navigate("/cart")}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Back to Cart
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
                  >
                    {isProcessing
                      ? "Processing..."
                      : `Pay $${totalPrice.toLocaleString()}`}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
