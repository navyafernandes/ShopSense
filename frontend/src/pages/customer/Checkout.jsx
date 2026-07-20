import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState({
    items: [],
    total_amount: 0,
  });

  const [shippingAddress, setShippingAddress] = useState("");

  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await api.get("/cart");
      setCart(response.data);
    } catch (error) {
      console.error(error);
      alert("Unable to load cart.");
    } finally {
      setLoading(false);
    }
  };

  const placeOrder = async () => {
    if (!shippingAddress.trim()) {
      alert("Please enter your shipping address.");
      return;
    }

    try {
      setPlacingOrder(true);

      const response = await api.post("/orders", {
        shipping_address: shippingAddress,
      });

      const orderId = response.data.order.order_id;

      alert("Order placed successfully!");

      navigate("/customer/payment", {
        state: {
          orderId,
          totalAmount: response.data.order.total_amount,
        },
      });
    } catch (error) {
      console.error(error);
      alert("Unable to place order.");
    } finally {
      setPlacingOrder(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-8">
        Checkout
      </h1>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Shipping Address */}

        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-xl font-semibold mb-4">
            Shipping Address
          </h2>

          <textarea
            rows="8"
            placeholder="Enter your complete delivery address..."
            value={shippingAddress}
            onChange={(e) =>
              setShippingAddress(e.target.value)
            }
            className="w-full border rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

        </div>

        {/* Order Summary */}

        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-xl font-semibold mb-5">
            Order Summary
          </h2>

          <div className="space-y-4">

            {cart.items.map((item) => (
              <div
                key={item.cart_item_id}
                className="flex justify-between border-b pb-3"
              >
                <div>
                  <p className="font-semibold">
                    {item.product_name}
                  </p>

                  <p className="text-slate-500 text-sm">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <p className="font-semibold">
                  ₹
                  {Number(item.subtotal).toLocaleString(
                    "en-IN"
                  )}
                </p>
              </div>
            ))}

          </div>

          <div className="mt-8 border-t pt-5 flex justify-between">

            <h3 className="text-xl font-bold">
              Total
            </h3>

            <h3 className="text-2xl font-bold text-green-600">
              ₹
              {Number(cart.total_amount).toLocaleString(
                "en-IN"
              )}
            </h3>

          </div>

          <button
            onClick={placeOrder}
            disabled={placingOrder}
            className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold transition disabled:bg-gray-400"
          >
            {placingOrder
              ? "Placing Order..."
              : "Place Order"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default Checkout;