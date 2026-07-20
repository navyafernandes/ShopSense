import { ArrowUpRight } from "lucide-react";

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-lg transition-all duration-300">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-slate-500 text-sm font-medium">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2 text-slate-900">
            {value}
          </h2>

        </div>

        <div className="h-14 w-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
          {icon}
        </div>

      </div>

      <div className="mt-5 flex items-center gap-2 text-sm text-emerald-600">

        <ArrowUpRight size={16} />

        <span>Live Marketplace Data</span>

      </div>

    </div>
  );
}

export default StatCard;