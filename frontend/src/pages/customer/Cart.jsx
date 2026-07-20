import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import CartItem from "../../components/customer/CartItem";

function Cart() {
  const [cart, setCart] = useState({
    items: [],
    total_amount: 0,
  });

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);

      const response = await api.get("/cart");

      setCart(response.data);
    } catch (error) {
      console.error("Failed to load cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (cartItemId, currentQty, change) => {
    const newQty = currentQty + change;

    if (newQty < 1) return;

    try {
      await api.put(`/cart/items/${cartItemId}`, {
        quantity: newQty,
      });

      fetchCart();
    } catch (error) {
      console.error(error);
      alert("Unable to update quantity.");
    }
  };

  const removeItem = async (cartItemId) => {
    const confirmDelete = window.confirm(
      "Remove this item from your cart?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/cart/items/${cartItemId}`);

      fetchCart();
    } catch (error) {
      console.error(error);
      alert("Unable to remove item.");
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-slate-500">
        Loading cart...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          My Cart
        </h1>

        <p className="text-slate-500 mt-2">
          Review your selected products
        </p>
      </div>

      {cart.items.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-10 text-center">
          <h2 className="text-2xl font-semibold mb-3">
            Your cart is empty
          </h2>

          <p className="text-slate-500 mb-6">
            Browse products and add something to your cart.
          </p>

          <button
            onClick={() => navigate("/customer/products")}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {cart.items.map((item) => (
              <CartItem
                key={item.cart_item_id}
                item={item}
                onIncrease={() =>
                  updateQuantity(
                    item.cart_item_id,
                    item.quantity,
                    1
                  )
                }
                onDecrease={() =>
                  updateQuantity(
                    item.cart_item_id,
                    item.quantity,
                    -1
                  )
                }
                onRemove={() =>
                  removeItem(item.cart_item_id)
                }
              />
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow mt-8 p-6 flex flex-col md:flex-row justify-between items-center">
            <div>
              <p className="text-slate-500">
                Total Amount
              </p>

              <h2 className="text-3xl font-bold">
                ₹
                {Number(cart.total_amount).toLocaleString(
                  "en-IN"
                )}
              </h2>
            </div>

            <button
              onClick={() => navigate("/customer/checkout")}
              className="mt-6 md:mt-0 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;