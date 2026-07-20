import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package } from "lucide-react";

import api from "../../services/api";
import LoadingSpinner from "../common/LoadingSpinner";

function TopProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/analytics/products");

      // Show only top 5
      setProducts(response.data.slice(0, 5));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

      <div className="flex justify-between items-center mb-5">

        <div className="flex items-center gap-2">

          <Package
            size={20}
            className="text-indigo-600"
          />

          <h2 className="text-lg font-semibold text-slate-900">
            Top Products
          </h2>

        </div>

        <Link
          to="/products"
          className="text-sm text-indigo-600 hover:underline"
        >
          View All
        </Link>

      </div>

      <div className="space-y-4">

        {products.map((product, index) => (

          <div
            key={product.product_name}
            className="flex justify-between items-center border-b border-slate-100 pb-3 last:border-none"
          >

            <div>

              <p className="font-semibold text-slate-800">
                #{index + 1} {product.product_name}
              </p>

              <p className="text-sm text-slate-500">
                {product.units_sold} Units Sold
              </p>

            </div>

            <p className="font-bold text-green-600">
              ₹{Number(product.revenue).toLocaleString("en-IN")}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default TopProducts;