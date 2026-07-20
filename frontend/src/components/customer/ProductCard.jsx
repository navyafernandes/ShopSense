import { ShoppingCart, Star } from "lucide-react";

function ProductCard({ product, onAddToCart, onViewDetails }) {
  const imageUrl = product.thumbnail_url?.startsWith("http")
    ? product.thumbnail_url
    : `http://localhost:8000${product.thumbnail_url}`;

  return (
    <div
      onClick={() => onViewDetails(product.product_id)}
      className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Product Image */}
      <div className="h-60 overflow-hidden bg-slate-100">
        <img
          src={imageUrl}
          alt={product.product_name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/400x400?text=No+Image";
          }}
        />
      </div>

      {/* Product Info */}
      <div className="p-5">
        <p className="text-sm text-slate-500">{product.brand}</p>

        <h3 className="mt-1 line-clamp-2 text-lg font-semibold text-slate-800">
          {product.product_name}
        </h3>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-1">
          <Star size={16} className="fill-yellow-400 text-yellow-400" />

          <span className="text-sm text-slate-600">
            {Number(product.rating) > 0
              ? Number(product.rating).toFixed(1)
              : "No ratings yet"}
          </span>
        </div>

        {/* Price */}
        <div className="mt-4 flex items-center gap-3">
          <span className="text-2xl font-bold text-indigo-600">
            ₹{Number(product.discount_price).toLocaleString("en-IN")}
          </span>

          {Number(product.discount_price) < Number(product.price) && (
            <span className="text-sm text-slate-400 line-through">
              ₹{Number(product.price).toLocaleString("en-IN")}
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product.product_id);
          }}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-medium text-white transition hover:bg-indigo-700"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;