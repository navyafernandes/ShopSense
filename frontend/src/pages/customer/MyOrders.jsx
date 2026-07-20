import { useEffect, useState } from "react";
import api from "../../services/api";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get("/orders");
      setOrders(response.data);
    } catch (error) {
      console.error(error);
      alert("Unable to load orders.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "PAID":
        return "bg-blue-100 text-blue-700";
      case "SHIPPED":
        return "bg-purple-100 text-purple-700";
      case "DELIVERED":
        return "bg-green-100 text-green-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-lg">
        Loading orders...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold">
          No Orders Yet
        </h2>

        <p className="text-gray-500 mt-3">
          Start shopping to place your first order.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-8">
        My Orders
      </h1>

      <div className="space-y-6">

        {orders.map((order) => (

          <div
            key={order.order_id}
            className="bg-white rounded-2xl shadow-md p-6"
          >

            <div className="flex justify-between items-center">

              <div>

                <h2 className="text-xl font-semibold">
                  Order #{order.order_id}
                </h2>

                <p className="text-gray-500 mt-1">
                  {new Date(order.order_date).toLocaleString()}
                </p>

              </div>

              <span
                className={`px-4 py-2 rounded-full font-semibold ${getStatusColor(order.order_status)}`}
              >
                {order.order_status}
              </span>

            </div>

            <hr className="my-5" />

            <div className="grid md:grid-cols-2 gap-6">

              <div>

                <p className="text-gray-500">
                  Total Amount
                </p>

                <p className="text-2xl font-bold text-green-600">
                  ₹{Number(order.total_amount).toLocaleString("en-IN")}
                </p>

              </div>

              <div>

                <p className="text-gray-500">
                  Shipping Address
                </p>

                <p className="font-medium">
                  {order.shipping_address}
                </p>

              </div>

            </div>

            {order.tracking_number && (

              <div className="mt-5">

                <p className="text-gray-500">
                  Tracking Number
                </p>

                <p className="font-semibold">
                  {order.tracking_number}
                </p>

              </div>

            )}

          </div>

        ))}

      </div>

    </div>
  );
}

export default MyOrders;