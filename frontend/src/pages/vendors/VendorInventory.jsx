import { useEffect, useMemo, useState } from "react";
import api from "../../services/api";

import InventoryCard from "../../components/vendor/InventoryCard";
import UpdateInventoryModal from "../../components/vendor/UpdateInventoryModal";

function VendorInventory() {
  const [inventory, setInventory] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [editingInventory, setEditingInventory] = useState(null);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await api.get("/vendor/inventory");
      setInventory(response.data);
    } catch (error) {
      console.error("Failed to fetch inventory:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredInventory = useMemo(() => {
    return inventory.filter((item) =>
      item.product_name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [inventory, search]);

  return (
    <div className="p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold text-slate-900">
            My Inventory
          </h1>

          <p className="text-slate-500 mt-2">
            Monitor stock levels and update inventory for your products.
          </p>

        </div>

        <input
          type="text"
          placeholder="Search inventory..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-xl px-4 py-3 w-80"
        />

      </div>

      {/* Inventory Count */}

      <div className="mb-6">

        <span className="text-slate-500">
          Showing
        </span>

        <span className="font-semibold mx-2">
          {filteredInventory.length}
        </span>

        <span className="text-slate-500">
          inventory items
        </span>

      </div>

      {/* Inventory Grid */}

      {loading ? (

        <div className="text-slate-500">
          Loading inventory...
        </div>

      ) : filteredInventory.length === 0 ? (

        <div className="text-center py-20 text-slate-500">
          No inventory found.
        </div>

      ) : (

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {filteredInventory.map((item) => (

            <InventoryCard
              key={item.product_id}
              inventory={item}
              onEdit={setEditingInventory}
            />

          ))}

        </div>

      )}

      {/* Update Inventory */}

      {editingInventory && (

        <UpdateInventoryModal
          inventory={editingInventory}
          onClose={() => setEditingInventory(null)}
          onSuccess={fetchInventory}
        />

      )}

    </div>
  );
}

export default VendorInventory;