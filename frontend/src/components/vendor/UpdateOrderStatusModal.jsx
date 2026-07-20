import { useState, useEffect } from "react";
import api from "../../services/api";

function UpdateOrderStatusModal({ isOpen, onClose, order, onSuccess }) {
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (order) {
      setStatus(order.order_status);
    }
  }, [order]);

  if (!isOpen || !order) return null;

  const handleUpdate = async () => {
    try {
      await api.put(
        `/vendor/orders/${order.order_id}/status`,
        {
          order_status: status,
        }
      );

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to update order status.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">

        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Update Order Status
        </h2>

        <div className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Order ID
            </label>

            <input
              value={order.order_id}
              disabled
              className="w-full border rounded-lg px-3 py-2 bg-slate-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Status
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="CONFIRMED">CONFIRMED</option>
              <option value="SHIPPED">SHIPPED</option>
              <option value="DELIVERED">DELIVERED</option>
            </select>
          </div>

        </div>

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg border hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Save
          </button>

        </div>

      </div>

    </div>
  );
}

export default UpdateOrderStatusModal;