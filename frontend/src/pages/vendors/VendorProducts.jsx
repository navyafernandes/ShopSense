import { useEffect, useMemo, useState } from "react";
import api from "../../services/api";

import VendorProductCard from "../../components/vendor/VendorProductCard";
import VendorProductDetailsModal from "../../components/vendor/VendorProductDetailsModal";
import ProductFormModal from "../../components/vendor/ProductFormModal";
import DeleteProductModal from "../../components/vendor/DeleteProductModal";

function VendorProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [deletingProduct, setDeletingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/vendor/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const term = search.toLowerCase();

      return (
        product.product_name.toLowerCase().includes(term) ||
        product.brand?.toLowerCase().includes(term)
      );
    });
  }, [products, search]);

  const handleAdd = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (productId) => {
    try {
      await api.delete(`/products/${productId}`);

      fetchProducts();

      setDeletingProduct(null);

    } catch (error) {
      console.error(error);
      alert("Failed to delete product.");
    }
  };

  return (
    <div className="p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold text-slate-900">
            My Products
          </h1>

          <p className="text-slate-500 mt-2">
            Manage your products and keep your catalogue up to date.
          </p>

        </div>

        <div className="flex gap-4">

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-xl px-4 py-3 w-80"
          />

          <button
            onClick={handleAdd}
            className="bg-indigo-600 text-white px-5 py-3 rounded-xl hover:bg-indigo-700 transition"
          >
            + Add Product
          </button>

        </div>

      </div>

      {/* Product Count */}

      <div className="mb-6">

        <span className="text-slate-500">
          Showing
        </span>

        <span className="font-semibold mx-2">
          {filteredProducts.length}
        </span>

        <span className="text-slate-500">
          products
        </span>

      </div>

      {/* Products */}

      {loading ? (

        <div className="text-slate-500">
          Loading products...
        </div>

      ) : filteredProducts.length === 0 ? (

        <div className="text-center text-slate-500 py-20">
          No products found.
        </div>

      ) : (

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {filteredProducts.map((product) => (

            <VendorProductCard
              key={product.product_id}
              product={product}
              onView={setSelectedProduct}
              onEdit={handleEdit}
              onDelete={setDeletingProduct}
            />

          ))}

        </div>

      )}

      {/* View Details */}

      {selectedProduct && (

        <VendorProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />

      )}

      {/* Add / Edit Product */}

      {showForm && (

        <ProductFormModal
          product={editingProduct}
          onClose={() => setShowForm(false)}
          onSuccess={fetchProducts}
        />

      )}

      {/* Delete Product */}

      {deletingProduct && (

        <DeleteProductModal
          product={deletingProduct}
          onClose={() => setDeletingProduct(null)}
          onDelete={handleDelete}
        />

      )}

    </div>
  );
}

export default VendorProducts;