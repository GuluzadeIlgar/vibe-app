import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase";

type SearchParamsPromise = Promise<{
  apiKey?: string | string[] | undefined;
}>;

export default async function ProtectedPage({
  searchParams,
}: {
  searchParams: SearchParamsPromise;
}) {
  const params = await searchParams;
  const rawKey = params.apiKey;
  const apiKey = Array.isArray(rawKey) ? rawKey[0] : rawKey;

  let status: "missing" | "valid" | "invalid" = "missing";

  if (apiKey && typeof apiKey === "string") {
    const { data, error } = await supabaseAdmin
      .from("api_keys")
      .select("id")
      .eq("key", apiKey)
      .maybeSingle();

    if (!error && data) {
      status = "valid";
    } else {
      status = "invalid";
    }
  }

  const isValid = status === "valid";
  const isInvalid = status === "invalid";

  const bg = isValid ? "#ecfdf5" : isInvalid ? "#fef2f2" : "#eff6ff";
  const border = isValid ? "#a7f3d0" : isInvalid ? "#fecaca" : "#bfdbfe";
  const color = isValid ? "#065f46" : isInvalid ? "#991b1b" : "#1e3a8a";
  const message = isValid
    ? "Valid API key, /protected can be accessed."
    : isInvalid
      ? "Invalid API Key."
      : "No API key provided.";

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-slate-50 to-sky-50 px-4 py-6 font-sans text-slate-900 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900/80 dark:text-slate-50">
      <div className="mx-auto flex max-w-md flex-col gap-6 rounded-3xl bg-white/90 p-6 shadow-sm ring-1 ring-slate-100 dark:bg-slate-950/80 dark:ring-slate-800">
        <header className="space-y-1">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
            Protected
          </p>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            Protected Area
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            This page validates your API key against the keys stored in
            Supabase.
          </p>
        </header>

        <div
          className="rounded-xl border px-4 py-3 text-sm font-medium shadow-sm"
          style={{ backgroundColor: bg, borderColor: border, color }}
        >
          {message}
        </div>

        <div className="flex items-center justify-between pt-2 text-xs">
          <Link
            href="/playground"
            className="text-slate-500 underline-offset-4 hover:underline dark:text-slate-400"
          >
            ← Back to playground
          </Link>
          <Link
            href="/dashboards"
            className="text-slate-500 underline-offset-4 hover:underline dark:text-slate-400"
          >
            Go to dashboard →
          </Link>
        </div>
      </div>
    </div>
  );
}

