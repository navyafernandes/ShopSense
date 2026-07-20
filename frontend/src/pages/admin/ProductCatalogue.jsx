import { useEffect, useMemo, useState } from "react";
import api from "../../services/api";

import ProductCard from "../../components/products/ProductCard";
import ProductModal from "../../components/products/ProductModal";

function ProductCatalogue() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products/catalogue");
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
        product.brand?.toLowerCase().includes(term) ||
        product.vendor_name.toLowerCase().includes(term)
      );
    });
  }, [products, search]);

  return (
    <div className="p-8">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Product Catalogue
          </h1>

          <p className="text-slate-500 mt-2">
            Browse products across the marketplace
          </p>
        </div>

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-xl px-4 py-3 w-80"
        />

      </div>

      <div className="mb-6 text-slate-600">
        Total Products:{" "}
        <span className="font-semibold">
          {filteredProducts.length}
        </span>
      </div>

      {loading ? (
        <div className="text-slate-500">
          Loading products...
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

  {filteredProducts.map((product) => (

    <ProductCard
    key={product.product_id}
    product={product}
    onView={setSelectedProduct}
/>

  ))}

</div>
      )}

      {selectedProduct && (
    <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
    />
)}

    </div>
  );
}

export default ProductCatalogue;