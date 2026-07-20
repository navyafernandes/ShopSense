import { useEffect, useState } from "react";
import api from "../../services/api";

function ProductFormModal({
  product,
  onClose,
  onSuccess,
}) {
  const isEdit = !!product;

  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    category_id: "",
    product_name: "",
    description: "",
    brand: "",
    sku: "",
    thumbnail_url: "",
    price: "",
    discount_price: "",
    product_status: "ACTIVE",
  });

  useEffect(() => {
    fetchCategories();

    if (product) {
      setFormData({
        category_id: product.category_id,
        product_name: product.product_name,
        description: product.description || "",
        brand: product.brand || "",
        sku: product.sku || "",
        thumbnail_url: product.thumbnail_url || "",
        price: product.price,
        discount_price: product.discount_price || "",
        product_status: product.product_status,
      });
    }
  }, [product]);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories");
      setCategories(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {

      if (isEdit) {

        await api.put(
          `/products/${product.product_id}`,
          {
            product_name: formData.product_name,
            description: formData.description,
            brand: formData.brand,
            thumbnail_url: formData.thumbnail_url,
            price: Number(formData.price),
            discount_price: formData.discount_price
              ? Number(formData.discount_price)
              : null,
            product_status: formData.product_status,
          }
        );

      } else {

        await api.post("/products", {
          category_id: Number(formData.category_id),
          product_name: formData.product_name,
          description: formData.description,
          brand: formData.brand,
          sku: formData.sku,
          thumbnail_url: formData.thumbnail_url,
          price: Number(formData.price),
          discount_price: formData.discount_price
            ? Number(formData.discount_price)
            : null,
        });

      }

      onSuccess();
      onClose();

    } catch (err) {
      console.error(err);
      alert("Failed to save product.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl w-full max-w-2xl p-8">

        <h2 className="text-2xl font-bold mb-6">
          {isEdit ? "Edit Product" : "Add Product"}
        </h2>

        <div className="grid grid-cols-2 gap-4">

          {!isEdit && (
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className="border rounded-lg p-3"
            >
              <option value="">
                Select Category
              </option>

              {categories.map((cat) => (
                <option
                  key={cat.category_id}
                  value={cat.category_id}
                >
                  {cat.category_name}
                </option>
              ))}

            </select>
          )}

          <input
            name="product_name"
            placeholder="Product Name"
            value={formData.product_name}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            name="brand"
            placeholder="Brand"
            value={formData.brand}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          {!isEdit && (
            <input
              name="sku"
              placeholder="SKU"
              value={formData.sku}
              onChange={handleChange}
              className="border rounded-lg p-3"
            />
          )}

          <input
            name="price"
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            name="discount_price"
            type="number"
            placeholder="Discount Price"
            value={formData.discount_price}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            name="thumbnail_url"
            placeholder="Image URL"
            value={formData.thumbnail_url}
            onChange={handleChange}
            className="border rounded-lg p-3 col-span-2"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="border rounded-lg p-3 col-span-2"
          />

          {isEdit && (
            <select
              name="product_status"
              value={formData.product_status}
              onChange={handleChange}
              className="border rounded-lg p-3 col-span-2"
            >
              <option value="ACTIVE">
                ACTIVE
              </option>

              <option value="OUT_OF_STOCK">
                OUT OF STOCK
              </option>

              <option value="DISCONTINUED">
                DISCONTINUED
              </option>

            </select>
          )}

        </div>

        <div className="flex justify-end gap-4 mt-8">

          <button
            onClick={onClose}
            className="px-5 py-3 border rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-5 py-3 bg-indigo-600 text-white rounded-lg"
          >
            {isEdit ? "Update Product" : "Save Product"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductFormModal;