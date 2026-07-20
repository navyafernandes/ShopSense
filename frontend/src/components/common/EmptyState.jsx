import { FaBoxOpen } from "react-icons/fa";

function EmptyState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-slate-500">

      <FaBoxOpen
        size={48}
        className="mb-4 text-slate-300"
      />

      <p className="text-lg font-medium">
        {message}
      </p>

    </div>
  );
}

export default EmptyState;