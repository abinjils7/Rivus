import { useNavigate } from "react-router-dom";
import { CartContext } from "../../ContextAPI/Cartcontext";
import { useContext } from "react";
import { toast } from "sonner";

function Cart() {
  const { cart, updateQuantity, removeFromCart, totalQuantity } =
    useContext(CartContext);

  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.productId?.price || 0) * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      toast.info("Your cart is empty. Add some items first!");
      return;
    }
    navigate("/orderpage");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {cart.length > 0 ? (
        cart.map((item) => (
          <div
            key={item._id}
            className="mb-4 p-4 border border-gray-300 rounded-lg shadow-sm flex gap-4"
          >
            {item.productId?.image && (
              <img
                src={item.productId.image}
                alt={item.productId.name}
                className="w-32 h-24 object-cover rounded"
              />
            )}

            <div className="flex-1">
              <h3 className="text-lg font-semibold">
                {item.productId?.brand || item.productId?.name}
              </h3>
              <p className="text-gray-700">
                Price: ₹{item.productId?.price?.toLocaleString() || 0}
              </p>
              <p className="text-gray-700">Qty: {item.quantity}</p>
              <p className="font-medium mt-1">
                Subtotal: ₹{(item.productId?.price || 0) * item.quantity}
              </p>

              <div className="flex items-center gap-2 mt-3">
                <button
                  onClick={() => updateQuantity(item.productId._id, 1)}
                  className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800"
                >
                  +
                </button>
                <button
                  onClick={() => updateQuantity(item.productId._id, -1)}
                  className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800"
                >
                  -
                </button>
                <button
                  onClick={() => removeFromCart(item.productId._id)}
                  className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600">Your cart is empty.</p>
      )}

      <hr className="my-4" />
      <p className="text-lg">Total Items: {totalQuantity}</p>
      <p className="text-xl font-bold">
        Total Price: ₹{totalPrice.toLocaleString()}
      </p>

      <button
        onClick={handlePlaceOrder}
        className="mt-4 px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
      >
        Place Order
      </button>
    </div>
  );
}


export default Cart;
