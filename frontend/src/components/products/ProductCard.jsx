import StatusBadge from "../common/StatusBadge";
import { FaImage } from "react-icons/fa";

function ProductCard({ product, onView }) {
  const hasDiscount =
    product.discount_price &&
    Number(product.discount_price) < Number(product.price);

  const discountPercent = hasDiscount
    ? Math.round(
        ((Number(product.price) - Number(product.discount_price)) /
          Number(product.price)) *
          100
      )
    : 0;

  const imageUrl = product.thumbnail_url
    ? product.thumbnail_url.startsWith("http")
      ? product.thumbnail_url
      : `http://127.0.0.1:8000${product.thumbnail_url}`
    : "https://via.placeholder.com/400x300?text=No+Image";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition duration-300">
      {/* Product Image */}
      <div className="h-52 bg-slate-100 flex items-center justify-center">
        {product.thumbnail_url ? (
          <img
            src={imageUrl}
            alt={product.product_name}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/400x300?text=No+Image";
            }}
          />
        ) : (
          <FaImage className="text-slate-400" size={40} />
        )}
      </div>

      <div className="p-5">
        <h2 className="text-lg font-bold text-slate-900">
          {product.product_name}
        </h2>

        <p className="text-slate-500">
          {product.brand || "No Brand"}
        </p>

        <div className="mt-4 space-y-2 text-sm">
          <p>
            <span className="font-semibold">Vendor:</span>{" "}
            {product.vendor_name}
          </p>

          <p>
            <span className="font-semibold">Category:</span>{" "}
            {product.category_name}
          </p>
        </div>

        {/* Price */}
        <div className="mt-5">
          {hasDiscount ? (
            <>
              <p className="text-slate-400 line-through">
                ₹{Number(product.price).toLocaleString("en-IN")}
              </p>

              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-slate-900">
                  ₹{Number(product.discount_price).toLocaleString("en-IN")}
                </p>

                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                  {discountPercent}% OFF
                </span>
              </div>
            </>
          ) : (
            <p className="text-2xl font-bold text-slate-900">
              ₹{Number(product.price).toLocaleString("en-IN")}
            </p>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between">
          <StatusBadge status={product.product_status} />

          <button
            onClick={() => onView(product)}
            className="text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;