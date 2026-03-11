"use client";

type Props = {
  isOpen: boolean;
  onNavigatePlayground: () => void;
};

export function DashboardSidebar({ isOpen, onNavigatePlayground }: Props) {
  if (!isOpen) return null;
  return (
    <aside className="flex w-60 flex-shrink-0 flex-col rounded-3xl bg-white/80 p-4 shadow-sm ring-1 ring-slate-100 backdrop-blur-sm dark:bg-slate-950/80 dark:ring-slate-800">
      <div className="mb-6 flex items-center gap-2 px-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-sky-500 text-sm font-semibold text-white shadow-sm">
          V
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold tracking-tight">Vibe</span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            API Platform
          </span>
        </div>
      </div>

      <div className="mb-4 rounded-2xl bg-slate-900 px-3 py-3 text-xs text-slate-200 dark:bg-slate-900/70">
        <div className="mb-1 flex items-center justify-between">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-emerald-500">
            Personal
          </span>
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
        </div>
        <p className="text-xs font-medium">Researcher</p>
        <p className="mt-1 text-[11px] text-slate-300">
          Monthly plan • 0 / 1,000 credits used
        </p>
      </div>

      <nav className="flex-1 space-y-2 text-sm">
        <p className="px-2 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
          Pages
        </p>
        <button className="flex w-full items-center justify-between rounded-2xl bg-slate-900 px-3 py-2 text-slate-50 shadow-sm dark:bg-slate-900">
          <span className="flex items-center gap-2 text-xs font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Overview
          </span>
          <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-slate-300">
            Current
          </span>
        </button>
        <button
          className="flex w-full items-center rounded-2xl px-3 py-2 text-xs text-slate-600 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900/60"
          type="button"
          onClick={() => onNavigatePlayground()}
        >
          API Playground
        </button>
        <button className="flex w-full items-center rounded-2xl px-3 py-2 text-xs text-slate-600 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900/60">
          Use Cases
        </button>
        <button className="flex w-full items-center rounded-2xl px-3 py-2 text-xs text-slate-600 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900/60">
          Billing
        </button>
        <button className="flex w-full items-center rounded-2xl px-3 py-2 text-xs text-slate-600 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900/60">
          Settings
        </button>
      </nav>

      <div className="mt-4 rounded-2xl bg-slate-100 px-3 py-3 text-[11px] text-slate-600 dark:bg-slate-900/60 dark:text-slate-400">
        <p className="font-medium">Remote MCP</p>
        <p className="mt-1">
          Connect directly to your remote MCP server and start calling tools
          from the browser.
        </p>
      </div>

      <a
        href="/"
        className="mt-4 inline-flex items-center justify-between rounded-2xl bg-slate-900 px-3 py-2 text-xs font-medium text-slate-50 shadow-sm dark:bg-slate-50 dark:text-slate-900"
      >
        <span>← Back to home</span>
      </a>
    </aside>
  );
}
