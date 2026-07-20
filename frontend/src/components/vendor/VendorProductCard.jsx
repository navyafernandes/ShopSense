import { FaImage } from "react-icons/fa";
import StatusBadge from "../common/StatusBadge";
import { Pencil, Trash2, Eye } from "lucide-react";

function VendorProductCard({
  product,
  onView,
  onEdit,
  onDelete,
}) {
  const hasDiscount =
    product.discount_price &&
    Number(product.discount_price) < Number(product.price);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition">

      {/* Product Image */}
      <div className="h-52 bg-slate-100 flex items-center justify-center">

        {product.thumbnail_url ? (
          <img
            src={product.thumbnail_url}
            alt={product.product_name}
            className="h-full w-full object-cover"
          />
        ) : (
          <FaImage
            size={40}
            className="text-slate-400"
          />
        )}

      </div>

      {/* Body */}
      <div className="p-5">

        <h2 className="text-xl font-bold">
          {product.product_name}
        </h2>

        <p className="text-slate-500">
          {product.brand || "No Brand"}
        </p>

        <div className="mt-4 space-y-2 text-sm">

          <p>
            <span className="font-semibold">
              SKU:
            </span>{" "}
            {product.sku || "-"}
          </p>

        </div>

        {/* Price */}

        <div className="mt-5">

          {hasDiscount ? (
            <>
              <p className="text-slate-400 line-through">
                ₹{Number(product.price).toLocaleString("en-IN")}
              </p>

              <p className="text-2xl font-bold">
                ₹{Number(product.discount_price).toLocaleString("en-IN")}
              </p>
            </>
          ) : (
            <p className="text-2xl font-bold">
              ₹{Number(product.price).toLocaleString("en-IN")}
            </p>
          )}

        </div>

        <div className="mt-5 flex items-center justify-between">

          <StatusBadge
            status={product.product_status}
          />

          <div className="flex gap-3">

            <button
              onClick={() => onView(product)}
              className="text-indigo-600 hover:text-indigo-700"
              title="View"
            >
              <Eye size={20} />
            </button>

            <button
              onClick={() => onEdit(product)}
              className="text-amber-600 hover:text-amber-700"
              title="Edit"
            >
              <Pencil size={20} />
            </button>

            <button
              onClick={() => onDelete(product)}
              className="text-red-600 hover:text-red-700"
              title="Delete"
            >
              <Trash2 size={20} />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default VendorProductCard;