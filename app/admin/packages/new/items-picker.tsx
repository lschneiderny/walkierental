"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

interface ItemsPickerProps {
  rentals: Array<{ id: string; name: string }>;
}

interface SelectedItem {
  productId: string;
  quantity: number;
}

export default function ItemsPicker({ rentals }: ItemsPickerProps) {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

  const addItem = () => {
    if (rentals.length > 0) {
      setSelectedItems([...selectedItems, { productId: rentals[0].id, quantity: 1 }]);
    }
  };

  const removeItem = (index: number) => {
    setSelectedItems(selectedItems.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: "productId" | "quantity", value: string | number) => {
    const updated = [...selectedItems];
    if (field === "productId") {
      updated[index].productId = value as string;
    } else {
      updated[index].quantity = Number(value);
    }
    setSelectedItems(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium">Package Items</label>
        <button
          type="button"
          onClick={addItem}
          className="flex items-center gap-2 rounded-lg bg-primary hover:bg-primary-dark text-white px-3 py-1.5 text-sm transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Item
        </button>
      </div>

      {selectedItems.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-black/10 dark:border-white/10 rounded-lg">
          <p className="text-sm text-foreground/60">No items added yet</p>
          <p className="text-xs text-foreground/40 mt-1">Click &quot;Add Item&quot; to include products in this package</p>
        </div>
      ) : (
        <div className="space-y-3">
          {selectedItems.map((item, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-black/5 dark:bg-white/5 rounded-lg">
              <select
                value={item.productId}
                onChange={(e) => updateItem(index, "productId", e.target.value)}
                className="flex-1 border border-black/10 dark:border-white/10 rounded-lg px-3 py-2 bg-transparent focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {rentals.map((rental) => (
                  <option key={rental.id} value={rental.id} className="bg-background text-foreground">
                    {rental.name}
                  </option>
                ))}
              </select>
              <div className="flex items-center gap-2">
                <label className="text-sm text-foreground/60">Qty:</label>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateItem(index, "quantity", e.target.value)}
                  className="w-20 border border-black/10 dark:border-white/10 rounded-lg px-2 py-2 bg-transparent focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                aria-label="Remove item"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <input
        type="hidden"
        name="items"
        value={JSON.stringify(selectedItems)}
      />
    </div>
  );
}
