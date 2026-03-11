"use client";

import type { ApiKey } from "../types";

type Props = {
  apiKeys: ApiKey[];
  isEditing: boolean;
  onOpenModal: () => void;
  onStartEdit: (key: ApiKey) => void;
  onToggleReveal: (id: string) => void;
  onCopy: (id: string) => void;
  onDelete: (id: string) => void;
};

export function ApiKeysSection({
  apiKeys,
  isEditing,
  onOpenModal,
  onStartEdit,
  onToggleReveal,
  onCopy,
  onDelete,
}: Props) {
  return (
    <section className="space-y-4 rounded-3xl bg-white/90 p-5 shadow-sm ring-1 ring-slate-100 backdrop-blur-sm dark:bg-slate-950/80 dark:ring-slate-800">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            API Keys
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Create, rotate, and delete keys used by your applications.
          </p>
        </div>
        <button
          type="button"
          onClick={onOpenModal}
          className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-50 shadow-sm transition hover:bg-slate-800 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200"
        >
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-800 text-[11px] dark:bg-slate-900 dark:text-slate-50">
            +
          </span>
          {isEditing ? "New key" : "New API key"}
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>
            {apiKeys.length} key{apiKeys.length === 1 ? "" : "s"}
          </span>
        </div>

        {apiKeys.length === 0 ? (
          <div className="flex items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400">
            No API keys yet. Create your first key above.
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white text-sm shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <table className="min-w-full border-separate border-spacing-0 text-left">
              <thead className="bg-slate-50 text-xs uppercase tracking-[0.16em] text-slate-500 dark:bg-slate-900/70 dark:text-slate-400">
                <tr>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Usage</th>
                  <th className="px-4 py-3 font-medium">Key</th>
                  <th className="hidden px-4 py-3 font-medium md:table-cell">
                    Created
                  </th>
                  <th className="px-4 py-3 text-right font-medium">Options</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {apiKeys.map((k) => (
                  <tr
                    key={k.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-900/70"
                  >
                    <td className="px-4 py-3 align-middle text-slate-900 dark:text-slate-50">
                      {k.name}
                    </td>
                    <td className="px-4 py-3 align-middle text-[11px] text-slate-600 dark:text-slate-300">
                      {k.usage}
                    </td>
                    <td className="px-4 py-3 align-middle font-mono text-[11px] text-slate-700 dark:text-slate-300">
                      {k.revealed
                        ? k.key
                        : k.key.replace(/.(?=.{4})/g, "•")}
                    </td>
                    <td className="hidden px-4 py-3 align-middle text-[11px] text-slate-500 dark:text-slate-400 md:table-cell">
                      {new Date(k.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 align-middle">
                      <div className="flex justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onToggleReveal(k.id);
                          }}
                          aria-label={k.revealed ? "Hide key" : "Show key"}
                          className="cursor-pointer inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-[11px] text-slate-600 transition hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:bg-slate-900"
                        >
                          {k.revealed ? (
                            <span className="relative h-3 w-5">
                              <span className="absolute inset-0 rounded-full border border-slate-500 border-b-0 border-t-[1.5px]" />
                              <span className="absolute left-1/2 top-1/2 h-4 w-[1.5px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-slate-500" />
                            </span>
                          ) : (
                            <span className="h-3 w-5 rounded-full border border-slate-400 border-b-0 border-t-[1.5px]" />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onCopy(k.id);
                          }}
                          aria-label="Copy key"
                          className="cursor-pointer inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-[11px] text-slate-600 transition hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:bg-slate-900"
                        >
                          <span className="relative h-3 w-3">
                            <span className="absolute inset-0 rounded-[4px] border border-slate-500 bg-transparent" />
                            <span className="absolute -right-1 -bottom-1 h-3 w-3 rounded-[4px] border border-slate-400 bg-transparent" />
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onStartEdit(k);
                          }}
                          aria-label="Edit key"
                          className="cursor-pointer inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-[11px] text-slate-600 transition hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:bg-slate-900"
                        >
                          <span className="h-3 w-3 rotate-45 rounded-[2px] border-b-2 border-r-2 border-slate-500" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onDelete(k.id);
                          }}
                          aria-label="Delete key"
                          className="cursor-pointer inline-flex h-8 w-8 items-center justify-center rounded-full border border-red-100 bg-red-50 text-[11px] text-red-700 transition hover:border-red-200 hover:bg-red-100 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300 dark:hover:border-red-700 dark:hover:bg-red-950/70"
                        >
                          <span className="h-3 w-3 rounded-[2px] border-[1.5px] border-current" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
