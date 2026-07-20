import { useEffect, useState } from "react";
import api from "../../services/api";

import StatCard from "../../components/StatCard";
import RevenueChart from "../../components/RevenueChart";

import TopVendors from "../../components/dashboard/TopVendors";
import TopProducts from "../../components/dashboard/TopProducts";
import RecentTransactions from "../../components/dashboard/RecentTransactions";

import {
  IndianRupee,
  ShoppingCart,
  Users,
  Store,
  Package,
} from "lucide-react";

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [revenueTrend, setRevenueTrend] = useState([]);

  useEffect(() => {
    fetchDashboardSummary();
    fetchRevenueTrend();
  }, []);

  const fetchDashboardSummary = async () => {
    try {
      const response = await api.get("/analytics/admin/dashboard");
      setSummary(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRevenueTrend = async () => {
    try {
      const response = await api.get("/analytics/revenue-trend");
      setRevenueTrend(response.data);
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

      {/* Welcome Section */}
      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-900">
          Marketplace Performance
        </h1>

        <p className="mt-2 text-slate-500">
          Here's what's happening in your marketplace today.
        </p>

      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">

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
          title="Customers"
          value={summary.total_customers}
          icon={<Users size={22} />}
        />

        <StatCard
          title="Vendors"
          value={summary.total_vendors}
          icon={<Store size={22} />}
        />

        <StatCard
          title="Products"
          value={summary.total_products}
          icon={<Package size={22} />}
        />

      </div>

      {/* Revenue Chart */}
      <RevenueChart revenueTrend={revenueTrend} />

      {/* Top Vendors & Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <TopVendors />
        <TopProducts />
      </div>

      {/* Recent Transactions */}
      <div className="mt-8">
        <RecentTransactions />
      </div>

    </div>
  );
}

export default Dashboard;