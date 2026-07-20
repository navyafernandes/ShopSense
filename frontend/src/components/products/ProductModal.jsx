import StatusBadge from "../common/StatusBadge";

function ProductModal({ product, onClose }) {
  if (!product) return null;

  const hasDiscount =
    product.discount_price &&
    Number(product.discount_price) < Number(product.price);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden">

        {/* Header */}

        <div className="flex justify-between items-center p-6 border-b">

          <h2 className="text-2xl font-bold">
            Product Details
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-slate-500 hover:text-slate-700"
          >
            ×
          </button>

        </div>

        {/* Body */}

        <div className="grid md:grid-cols-2 gap-8 p-8">

          {/* Image */}

          <div>

            {product.thumbnail_url ? (
              <img
                src={product.thumbnail_url}
                alt={product.product_name}
                className="rounded-xl w-full h-72 object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            ) : (
              <div className="rounded-xl bg-slate-100 h-72 flex items-center justify-center text-slate-400">
                No Image
              </div>
            )}

          </div>

          {/* Details */}

          <div className="space-y-4">

            <div>

              <h3 className="text-2xl font-bold">
                {product.product_name}
              </h3>

              <p className="text-slate-500">
                {product.brand}
              </p>

            </div>

            <div>

              <p>
                <strong>Vendor:</strong>{" "}
                {product.vendor_name}
              </p>

              <p>
                <strong>Category:</strong>{" "}
                {product.category_name}
              </p>

              <p>
                <strong>SKU:</strong>{" "}
                {product.sku || "-"}
              </p>

            </div>

            <div>

              {hasDiscount ? (
                <>
                  <p className="text-slate-400 line-through">
                    ₹{Number(product.price).toLocaleString("en-IN")}
                  </p>

                  <p className="text-3xl font-bold">
                    ₹{Number(product.discount_price).toLocaleString("en-IN")}
                  </p>
                </>
              ) : (
                <p className="text-3xl font-bold">
                  ₹{Number(product.price).toLocaleString("en-IN")}
                </p>
              )}

            </div>

            <StatusBadge
              status={product.product_status}
            />

            <div>

              <h4 className="font-semibold mb-2">
                Description
              </h4>

              <p className="text-slate-600">
                {product.description || "No description available."}
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductModal;