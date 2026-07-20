import {
  Package,
  Warehouse,
  AlertTriangle,
  Pencil,
} from "lucide-react";

function InventoryCard({
  inventory,
  onEdit,
}) {
  const getStatus = () => {
    if (inventory.stock_quantity === 0) {
      return {
        text: "Out of Stock",
        color: "bg-red-100 text-red-700",
      };
    }

    if (
      inventory.stock_quantity <=
      inventory.reorder_level
    ) {
      return {
        text: "Low Stock",
        color: "bg-yellow-100 text-yellow-700",
      };
    }

    return {
      text: "In Stock",
      color: "bg-green-100 text-green-700",
    };
  };

  const status = getStatus();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition">

      {/* Product Name */}

      <div className="flex items-center gap-3">

        <Package
          size={24}
          className="text-indigo-600"
        />

        <div>

          <h2 className="text-xl font-bold">
            {inventory.product_name}
          </h2>

          <p className="text-slate-500">
            Product ID: {inventory.product_id}
          </p>

        </div>

      </div>

      {/* Inventory Details */}

      <div className="mt-6 space-y-4">

        <div className="flex justify-between">

          <span className="text-slate-500">
            Stock Quantity
          </span>

          <span className="font-semibold">
            {inventory.stock_quantity}
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-slate-500">
            Reorder Level
          </span>

          <span className="font-semibold">
            {inventory.reorder_level}
          </span>

        </div>

        <div className="flex justify-between items-center">

          <span className="flex items-center gap-2 text-slate-500">

            <Warehouse size={16} />

            Warehouse

          </span>

          <span className="font-semibold">

            {inventory.warehouse_location || "-"}

          </span>

        </div>

      </div>

      {/* Status */}

      <div className="mt-6 flex items-center justify-between">

        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${status.color}`}
        >
          {status.text}
        </span>

        <button
          onClick={() => onEdit(inventory)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          <Pencil size={16} />
          Update
        </button>

      </div>

    </div>
  );
}

export default InventoryCard;