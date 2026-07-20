import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";
import ProductCard from "../../components/customer/ProductCard";

function CustomerProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter(
      (product) =>
        product.product_name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        product.brand
          .toLowerCase()
          .includes(search.toLowerCase())
    );
  }, [products, search]);

  const handleViewDetails = (productId) => {
    navigate(`/customer/products/${productId}`);
  };

  const handleAddToCart = async (productId) => {
    try {
      await api.post("/cart/items", {
        product_id: productId,
        quantity: 1,
      });

      alert("Product added to cart!");
    } catch (error) {
      console.error(error);
      alert("Unable to add product.");
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900">
          Explore Products
        </h1>

        <p className="mt-2 text-slate-500">
          Discover products from trusted vendors.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-8 max-w-md">
        <Search
          className="absolute left-3 top-3 text-slate-400"
          size={18}
        />

        <input
          type="text"
          placeholder="Search by name or brand..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-slate-300 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Products */}
      {filteredProducts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 p-12 text-center text-slate-500">
          No products found.
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.product_id}
              product={product}
              onViewDetails={handleViewDetails}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomerProducts;