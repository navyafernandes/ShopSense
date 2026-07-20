import { useEffect, useMemo, useState } from "react";

import api from "../../services/api";

import PageHeader from "../../components/common/PageHeader";
import SearchInput from "../../components/common/SearchInput";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import EmptyState from "../../components/common/EmptyState";
import StatusBadge from "../../components/common/StatusBadge";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await api.get("/transactions");
      setTransactions(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredTransactions = useMemo(() => {
    const term = search.toLowerCase();

    return transactions.filter((transaction) => {
      return (
        transaction.order_id.toString().includes(term) ||
        transaction.customer_name.toLowerCase().includes(term) ||
        transaction.vendor_name.toLowerCase().includes(term)
      );
    });
  }, [transactions, search]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-8">

      <PageHeader
        title="Marketplace Transactions"
        subtitle="Monitor orders and payments across the marketplace"
      >
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search orders..."
        />
      </PageHeader>

      {filteredTransactions.length === 0 ? (
        <EmptyState message="No transactions found." />
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-slate-200">

          <table className="w-full">

            <thead className="bg-slate-50">

              <tr className="text-left">

                <th className="px-6 py-4">Order</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Vendor</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Payment</th>
                <th className="px-6 py-4">Order Status</th>
                <th className="px-6 py-4">Date</th>

              </tr>

            </thead>

            <tbody>

              {filteredTransactions.map((transaction) => (

                <tr
                  key={transaction.order_id}
                  className="border-t hover:bg-slate-50 transition"
                >

                  <td className="px-6 py-4 font-semibold">
                    #{transaction.order_id}
                  </td>

                  <td className="px-6 py-4">
                    {transaction.customer_name}
                  </td>

                  <td className="px-6 py-4">
                    {transaction.vendor_name}
                  </td>

                  <td className="px-6 py-4 font-semibold">
                    ₹
                    {Number(
                      transaction.total_amount
                    ).toLocaleString("en-IN")}
                  </td>

                  <td className="px-6 py-4">

                    <div className="space-y-1">

                      <p className="text-sm font-medium">
                        {transaction.payment_method || "-"}
                      </p>

                      <StatusBadge
                        status={
                          transaction.payment_status || "PENDING"
                        }
                      />

                    </div>

                  </td>

                  <td className="px-6 py-4">
                    <StatusBadge
                      status={transaction.order_status}
                    />
                  </td>

                  <td className="px-6 py-4 text-slate-500">

                    {transaction.payment_date
                      ? new Date(
                          transaction.payment_date
                        ).toLocaleDateString("en-IN")
                      : "-"}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}

export default Transactions;