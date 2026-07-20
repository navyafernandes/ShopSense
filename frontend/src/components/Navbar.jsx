import { FaBell, FaUserCircle } from "react-icons/fa";

function Navbar() {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between">

      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className="text-slate-500 mt-1">
          {today}
        </p>
      </div>

      <div className="flex items-center gap-6">

        <button className="relative text-slate-500 hover:text-slate-800 transition">

          <FaBell size={20} />

          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>

        </button>

        <div className="flex items-center gap-3">

          <FaUserCircle
            size={34}
            className="text-slate-500"
          />

          <div>

            <p className="font-semibold">
              Admin
            </p>

            <p className="text-sm text-slate-500">
              Marketplace Manager
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;