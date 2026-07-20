import StatusBadge from "../common/StatusBadge";

function VendorProductDetailsModal({
  product,
  onClose,
}) {
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
            className="text-3xl text-slate-500 hover:text-slate-700"
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
              />
            ) : (
              <div className="h-72 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                No Image
              </div>
            )}

          </div>

          {/* Details */}

          <div className="space-y-4">

            <div>

              <h3 className="text-3xl font-bold">
                {product.product_name}
              </h3>

              <p className="text-slate-500">
                {product.brand || "No Brand"}
              </p>

            </div>

            <div className="space-y-2">

              <p>
                <strong>SKU:</strong>{" "}
                {product.sku || "-"}
              </p>

              <p>
                <strong>Price:</strong>{" "}

                {hasDiscount ? (
                  <>
                    <span className="line-through text-slate-400 mr-2">
                      ₹{Number(product.price).toLocaleString("en-IN")}
                    </span>

                    <span className="font-bold">
                      ₹{Number(product.discount_price).toLocaleString("en-IN")}
                    </span>
                  </>
                ) : (
                  <>₹{Number(product.price).toLocaleString("en-IN")}</>
                )}

              </p>

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

export default VendorProductDetailsModal;