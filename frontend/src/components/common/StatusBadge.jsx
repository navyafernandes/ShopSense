function StatusBadge({ status }) {

  const styles = {
    // Vendor
    PENDING: "bg-yellow-100 text-yellow-700",
    APPROVED: "bg-green-100 text-green-700",
    REJECTED: "bg-red-100 text-red-700",

    // Product
    ACTIVE: "bg-green-100 text-green-700",
    OUT_OF_STOCK: "bg-orange-100 text-orange-700",
    DISCONTINUED: "bg-slate-200 text-slate-700",


     SUCCESS: "bg-green-100 text-green-700",
     FAILED: "bg-red-100 text-red-700",
     REFUNDED: "bg-purple-100 text-purple-700",

    CONFIRMED: "bg-blue-100 text-blue-700",
    SHIPPED: "bg-indigo-100 text-indigo-700",
    DELIVERED: "bg-green-100 text-green-700",
    CANCELLED: "bg-red-100 text-red-700",
    };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status.replaceAll("_", " ")}
    </span>
  );
}

export default StatusBadge;