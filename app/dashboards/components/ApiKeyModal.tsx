"use client";

type Props = {
  isEditing: boolean;
  nameInput: string;
  usageInput: string;
  onNameChange: (value: string) => void;
  onUsageChange: (value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
};

export function ApiKeyModal({
  isEditing,
  nameInput,
  usageInput,
  onNameChange,
  onUsageChange,
  onSubmit,
  onCancel,
}: Props) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/40 px-4 py-8 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-slate-100 dark:bg-slate-950 dark:ring-slate-800">
        <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-50">
          {isEditing ? "Update API key" : "Create a new API key"}
        </h2>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          {isEditing
            ? "Update the name and usage limit. You can delete the key at any time."
            : "Enter a name and usage limit. A secret key will be generated for you."}
        </p>

        <div className="mt-4 space-y-4 text-sm">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
              Key name
            </label>
            <input
              value={nameInput}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="A unique name for this key"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-900 focus:ring-1 focus:ring-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:focus:border-slate-100 dark:focus:ring-slate-100"
            />
          </div>

          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-300">
              Usage limit
              <span className="text-[11px] font-normal text-slate-400 dark:text-slate-500">
                (monthly requests)
              </span>
            </label>
            <input
              type="number"
              min={0}
              value={usageInput}
              onChange={(e) => onUsageChange(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-900 focus:ring-1 focus:ring-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:focus:border-slate-100 dark:focus:ring-slate-100"
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2 text-xs">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-medium text-slate-500 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSubmit}
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-xs font-medium text-slate-50 shadow-sm transition hover:bg-slate-800 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200"
          >
            {isEditing ? "Save changes" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
