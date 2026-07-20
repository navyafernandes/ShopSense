import { useState, useEffect } from "react";
import api from "../../services/api";

function UpdateInventoryModal({
  inventory,
  onClose,
  onSuccess,
}) {
  const [formData, setFormData] = useState({
    stock_quantity: "",
    reorder_level: "",
    warehouse_location: "",
  });

  useEffect(() => {
    if (inventory) {
      setFormData({
        stock_quantity: inventory.stock_quantity,
        reorder_level: inventory.reorder_level,
        warehouse_location:
          inventory.warehouse_location || "",
      });
    }
  }, [inventory]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await api.put(
        `/inventory/${inventory.product_id}`,
        {
          stock_quantity: Number(
            formData.stock_quantity
          ),
          reorder_level: Number(
            formData.reorder_level
          ),
          warehouse_location:
            formData.warehouse_location,
        }
      );

      onSuccess();
      onClose();

    } catch (error) {
      console.error(error);
      alert("Failed to update inventory.");
    }
  };

  if (!inventory) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8">

        <h2 className="text-2xl font-bold mb-6">
          Update Inventory
        </h2>

        <div className="space-y-5">

          <div>

            <label className="block mb-2 font-medium">
              Stock Quantity
            </label>

            <input
              type="number"
              name="stock_quantity"
              value={formData.stock_quantity}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Reorder Level
            </label>

            <input
              type="number"
              name="reorder_level"
              value={formData.reorder_level}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Warehouse Location
            </label>

            <input
              type="text"
              name="warehouse_location"
              value={formData.warehouse_location}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="Enter warehouse"
            />

          </div>

        </div>

        <div className="flex justify-end gap-4 mt-8">

          <button
            onClick={onClose}
            className="px-5 py-3 border rounded-lg hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-5 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>
  );
}

export default UpdateInventoryModal;