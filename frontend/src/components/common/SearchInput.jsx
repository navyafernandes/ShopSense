import { FaSearch } from "react-icons/fa";

function SearchInput({ value, onChange, placeholder }) {
  return (
    <div className="relative">

      <FaSearch
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="pl-11 pr-4 py-3 w-80 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

    </div>
  );
}

export default SearchInput;