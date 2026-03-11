import Link from "next/link";

export default function PlaygroundPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-slate-50 to-sky-50 px-4 py-6 font-sans text-slate-900 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900/80 dark:text-slate-50">
      <div className="mx-auto flex max-w-md flex-col gap-6 rounded-3xl bg-white/90 p-6 shadow-sm ring-1 ring-slate-100 dark:bg-slate-950/80 dark:ring-slate-800">
        <header className="space-y-1">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
            Tools / Playground
          </p>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            API Key Playground
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Enter an API key to check if it can access the protected area.
          </p>
        </header>

        <form action="/protected" method="GET" className="space-y-4 text-sm">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
              API key
            </label>
            <input
              name="apiKey"
              required
              placeholder="Paste an API key here"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-mono text-slate-900 shadow-sm outline-none transition focus:border-slate-900 focus:ring-1 focus:ring-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:focus:border-slate-100 dark:focus:ring-slate-100"
            />
          </div>

          <div className="flex items-center justify-between pt-2 text-xs">
            <Link
              href="/dashboards"
              className="text-slate-500 underline-offset-4 hover:underline dark:text-slate-400"
            >
              ← Back to dashboard
            </Link>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-xs font-medium text-slate-50 shadow-sm transition hover:bg-slate-800 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200"
            >
              Validate key
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

