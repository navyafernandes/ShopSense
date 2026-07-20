import { Package, User, CalendarDays, IndianRupee } from "lucide-react";

function OrderCard({ order, onUpdate }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-blue-100 text-blue-700";

      case "SHIPPED":
        return "bg-yellow-100 text-yellow-700";

      case "DELIVERED":
        return "bg-green-100 text-green-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 hover:shadow-lg transition">

      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-bold text-slate-800">
          Order #{order.order_id}
        </h2>

        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
            order.order_status
          )}`}
        >
          {order.order_status}
        </span>
      </div>

      <div className="space-y-4">

        <div className="flex items-center gap-3">
          <User size={18} className="text-indigo-600" />
          <div>
            <p className="text-xs text-slate-500">Customer</p>
            <p className="font-medium">{order.customer_name}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Package size={18} className="text-indigo-600" />
          <div>
            <p className="text-xs text-slate-500">Product</p>
            <p className="font-medium">{order.product_name}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <IndianRupee size={18} className="text-indigo-600" />
          <div>
            <p className="text-xs text-slate-500">Amount</p>
            <p className="font-medium">
              ₹{Number(order.amount).toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <CalendarDays size={18} className="text-indigo-600" />
          <div>
            <p className="text-xs text-slate-500">Order Date</p>
            <p className="font-medium">
              {new Date(order.order_date).toLocaleDateString("en-IN")}
            </p>
          </div>
        </div>

        <div>
          <p className="text-xs text-slate-500">Quantity</p>
          <p className="font-medium">{order.quantity}</p>
        </div>

      </div>

      <button
        onClick={() => onUpdate(order)}
        className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl transition"
      >
        Update Status
      </button>

    </div>
  );
}

export default OrderCard;