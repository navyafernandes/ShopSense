import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";

function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  const imageUrl = item.thumbnail_url
    ? item.thumbnail_url.startsWith("http")
      ? item.thumbnail_url
      : `http://127.0.0.1:8000${item.thumbnail_url}`
    : "https://via.placeholder.com/250x250?text=No+Image";

  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 flex flex-col md:flex-row gap-6 items-center">

      {/* Product Image */}
      <div className="w-40 h-40 flex-shrink-0">
        <img
          src={imageUrl}
          alt={item.product_name}
          className="w-full h-full object-cover rounded-xl"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/250x250?text=No+Image";
          }}
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 w-full">

        <h2 className="text-2xl font-bold text-slate-900">
          {item.product_name}
        </h2>

        <p className="text-slate-500 mt-2">
          Price
        </p>

        <p className="text-xl font-semibold text-indigo-600">
          ₹{Number(item.price).toLocaleString("en-IN")}
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-4 mt-6">

          <button
            onClick={onDecrease}
            className="bg-slate-200 hover:bg-slate-300 p-3 rounded-full transition"
          >
            <FaMinus />
          </button>

          <span className="text-xl font-bold w-10 text-center">
            {item.quantity}
          </span>

          <button
            onClick={onIncrease}
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full transition"
          >
            <FaPlus />
          </button>

        </div>

      </div>

      {/* Right Section */}
      <div className="text-right">

        <p className="text-slate-500">
          Subtotal
        </p>

        <p className="text-2xl font-bold text-green-600 mb-6">
          ₹{Number(item.subtotal).toLocaleString("en-IN")}
        </p>

        <button
          onClick={onRemove}
          className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-5 py-3 rounded-xl transition"
        >
          <FaTrash />
          Remove
        </button>

      </div>

    </div>
  );
}

export default CartItem;