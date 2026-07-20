function DeleteProductModal({
  product,
  onClose,
  onDelete,
}) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-xl">

        <h2 className="text-2xl font-bold text-red-600">
          Delete Product
        </h2>

        <p className="mt-5 text-slate-600">
          Are you sure you want to delete
        </p>

        <p className="font-bold text-lg mt-2">
          {product.product_name}?
        </p>

        <p className="text-sm text-slate-500 mt-4">
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-4 mt-8">

          <button
            onClick={onClose}
            className="px-5 py-3 border rounded-lg hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            onClick={() => onDelete(product.product_id)}
            className="px-5 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteProductModal;