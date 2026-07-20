import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trophy } from "lucide-react";

import api from "../../services/api";
import LoadingSpinner from "../common/LoadingSpinner";

function TopVendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const response = await api.get("/analytics/vendors");

      // Show only top 5
      setVendors(response.data.slice(0, 5));
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

          <Trophy
            size={20}
            className="text-amber-500"
          />

          <h2 className="text-lg font-semibold text-slate-900">
            Top Vendors
          </h2>

        </div>

        <Link
          to="/vendors"
          className="text-sm text-indigo-600 hover:underline"
        >
          View All
        </Link>

      </div>

      <div className="space-y-4">

        {vendors.map((vendor, index) => (

          <div
            key={vendor.vendor_name}
            className="flex justify-between items-center border-b border-slate-100 pb-3 last:border-none"
          >

            <div>

              <p className="font-semibold text-slate-800">
                #{index + 1} {vendor.vendor_name}
              </p>

              <p className="text-sm text-slate-500">
                {vendor.orders} Orders
              </p>

            </div>

            <p className="font-bold text-green-600">
              ₹{Number(vendor.revenue).toLocaleString("en-IN")}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default TopVendors;