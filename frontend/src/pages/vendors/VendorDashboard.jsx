import { useEffect, useState } from "react";
import api from "../../services/api";

import StatCard from "../../components/StatCard";

import {
  IndianRupee,
  ShoppingCart,
  Package,
  TrendingUp,
} from "lucide-react";

function VendorDashboard() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await api.get("/vendor/dashboard");
      setSummary(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!summary) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <h2 className="text-xl font-semibold text-slate-600">
          Loading Dashboard...
        </h2>
      </div>
    );
  }

  return (
    <div>

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-900">
          Business Overview
        </h1>

        <p className="mt-2 text-slate-500">
          Monitor your products, sales and business performance.
        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          title="Revenue"
          value={`₹${Number(summary.total_revenue).toLocaleString("en-IN")}`}
          icon={<IndianRupee size={22} />}
        />

        <StatCard
          title="Orders"
          value={summary.total_orders}
          icon={<ShoppingCart size={22} />}
        />

        <StatCard
          title="Products"
          value={summary.total_products}
          icon={<Package size={22} />}
        />

        <StatCard
          title="Units Sold"
          value={summary.products_sold}
          icon={<TrendingUp size={22} />}
        />

      </div>

    </div>
  );
}

export default VendorDashboard;