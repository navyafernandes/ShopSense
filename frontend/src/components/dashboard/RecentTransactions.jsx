import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Receipt } from "lucide-react";

import api from "../../services/api";
import LoadingSpinner from "../common/LoadingSpinner";
import StatusBadge from "../common/StatusBadge";

function RecentTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await api.get("/transactions");

      // Show latest 5 transactions
      setTransactions(response.data.slice(0, 5));
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
          <Receipt
            size={20}
            className="text-indigo-600"
          />

          <h2 className="text-lg font-semibold">
            Recent Transactions
          </h2>
        </div>

        <Link
          to="/transactions"
          className="text-sm text-indigo-600 hover:underline"
        >
          View All
        </Link>

      </div>

      <div className="space-y-4">

        {transactions.map((transaction) => (

          <div
            key={transaction.order_id}
            className="flex justify-between items-center border-b border-slate-100 pb-3 last:border-none"
          >

            <div>

              <p className="font-semibold">
                Order #{transaction.order_id}
              </p>

              <p className="text-sm text-slate-500">
                {transaction.customer_name}
              </p>

            </div>

            <div className="text-right">

              <p className="font-semibold">
                ₹
                {Number(
                  transaction.total_amount
                ).toLocaleString("en-IN")}
              </p>

              <StatusBadge
                status={
                  transaction.payment_status || "PENDING"
                }
              />

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default RecentTransactions;