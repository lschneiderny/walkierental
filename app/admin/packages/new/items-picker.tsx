"use client";

export default function ItemsPicker({ rentals }: { rentals: { id: string; name: string }[] }) {
  const addSelected = () => {
    const rows = Array.from(document.querySelectorAll('.pkg-row')) as HTMLElement[];
    const items: any[] = [];
    rows.forEach((row) => {
      const cb = row.querySelector('.cb') as HTMLInputElement;
      const qtyInput = row.querySelector('.qty') as HTMLInputElement;
      const productId = cb.getAttribute('data-productid');
      if (cb?.checked && productId) items.push({ productId, quantity: Number(qtyInput.value || 1) });
    });
    const input = document.querySelector('#items-json') as HTMLInputElement;
    if (input) input.value = JSON.stringify(items);
  };

  return (
    <fieldset className="border border-black/10 dark:border-white/10 rounded-lg p-4">
      <legend className="text-sm">Include rental items</legend>
      <p className="text-xs text-black/60 dark:text-white/60 mb-2">
        Select items and set quantities, then click "Add selected" to populate the items JSON.
      </p>
      <div className="max-h-64 overflow-auto space-y-2">
        {rentals.map((r) => (
          <div key={r.id} className="pkg-row flex items-center gap-2">
            <input type="checkbox" data-productid={r.id} className="cb" />
            <span className="flex-1">{r.name}</span>
            <input type="number" min={1} defaultValue={1} className="qty w-20 border rounded px-2 py-1 bg-transparent" />
          </div>
        ))}
      </div>
      <button type="button" className="mt-2 rounded bg-black text-white dark:bg-white dark:text-black px-3 py-1 text-xs" onClick={addSelected}>
        Add selected
      </button>
      <input id="items-json" name="items" type="hidden" />
    </fieldset>
  );
}
