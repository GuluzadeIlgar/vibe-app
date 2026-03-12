 "use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LoginButton } from "./components/LoginButton";
import { UserProfile } from "./components/UserProfile";

export default function Home() {
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-zinc-950 via-black to-zinc-900 font-sans text-zinc-50">
      {/* Animated background orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-0 h-72 w-72 animate-pulse rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute bottom-[-6rem] right-[-4rem] h-80 w-80 animate-pulse rounded-full bg-sky-500/25 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 animate-[pulse_6s_ease-in-out_infinite] rounded-full bg-emerald-500/15 blur-3xl" />
      </div>

      <main className="relative flex min-h-[70vh] w-full max-w-5xl flex-col gap-12 rounded-3xl border border-white/5 bg-zinc-950/70 p-8 shadow-[0_0_80px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:p-10 lg:p-14">
        {/* Header / logo */}
        <header className="flex w-full items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-sky-500 text-lg font-semibold">
              V
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-wide text-zinc-100">
                Vibe
              </span>
              <span className="text-xs text-zinc-400">
                AI-friendly API key manager
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowHowItWorks(true)}
            className="rounded-full bg-zinc-100 px-5 py-2 text-xs font-semibold text-zinc-900 shadow-md shadow-zinc-900/40 transition hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            How it works
          </button>
        </header>

        {/* Hero + profile */}
        <section className="flex flex-col gap-10 lg:flex-row lg:items-center">
          <div className="flex-1 space-y-6">
            <h1 className="bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-400 bg-clip-text text-4xl font-semibold leading-tight tracking-tight text-transparent sm:text-5xl lg:text-6xl">
              Own your AI API keys,{" "}
              <span className="inline-block bg-gradient-to-r from-purple-400 via-sky-400 to-emerald-300 bg-clip-text text-transparent">
                securely and in style.
              </span>
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
              Vibe is a personal dashboard for developers working with AI APIs.
              Connect with Google, generate and rotate keys, and keep all your
              AI credentials in one clean, trackable place.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <LoginButton />
              <Link
                href="/dashboards"
                className="flex h-12 items-center justify-center rounded-full bg-zinc-100 px-6 text-sm font-semibold text-zinc-900 shadow-md shadow-zinc-900/40 transition hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
              >
                Go to dashboard
              </Link>
              <span className="text-xs text-zinc-500">
                No passwords. Just Google.
              </span>
            </div>

            <div className="mt-4">
              <UserProfile />
            </div>
          </div>

          <div className="flex-1">
            <div className="relative mx-auto max-w-sm rounded-3xl border border-white/5 bg-gradient-to-b from-zinc-900/80 to-black/80 p-5 shadow-[0_0_60px_rgba(59,130,246,0.35)]">
              <div className="mb-3 flex items-center justify-between text-xs text-zinc-500">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Realtime key status
                </span>
                <span>v0.1 · Private beta</span>
              </div>
              <div className="space-y-3 text-xs text-zinc-300">
                <div className="flex items-center justify-between rounded-2xl bg-zinc-900/80 px-3 py-2">
                  <div className="space-y-0.5">
                    <p className="font-medium text-zinc-100">OpenAI · prod</p>
                    <p className="text-[11px] text-zinc-500">
                      Last rotated 3 days ago
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-semibold text-emerald-300">
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-zinc-900/60 px-3 py-2">
                  <div className="space-y-0.5">
                    <p className="font-medium text-zinc-100">Anthropic · lab</p>
                    <p className="text-[11px] text-zinc-500">
                      2 keys linked · sandbox
                    </p>
                  </div>
                  <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[11px] font-semibold text-amber-300">
                    Limited
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-zinc-900/40 px-3 py-2">
                  <div className="space-y-0.5">
                    <p className="font-medium text-zinc-100">Custom provider</p>
                    <p className="text-[11px] text-zinc-500">
                      Plug any HTTP-based AI API
                    </p>
                  </div>
                  <span className="rounded-full bg-zinc-700/50 px-2 py-0.5 text-[11px] font-semibold text-zinc-200">
                    Coming soon
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How to use section */}
        <section className="grid gap-6 border-t border-white/5 pt-8 sm:grid-cols-3">
          <div className="space-y-2">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
              What is Vibe?
            </h2>
            <p className="text-sm leading-relaxed text-zinc-400">
              Vibe is a minimal, opinionated control center for your personal AI
              projects. It keeps API keys discoverable, separated by use case,
              and ready to plug into prototypes and experiments.
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
              How to use it
            </h2>
            <ol className="space-y-1.5 text-sm text-zinc-400">
              <li>1. Sign in with Google using the button above.</li>
              <li>2. Open the dashboard to create and label API keys.</li>
              <li>
                3. Copy keys into your local `.env` files or CI secrets.
              </li>
              <li>4. Rotate or revoke keys anytime from the dashboard.</li>
            </ol>
          </div>
          <div className="space-y-2">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
              Owner & credits
            </h2>
            <p className="text-sm text-zinc-400">
              Designed and built by{" "}
              <span className="inline-block bg-gradient-to-r from-purple-400 via-sky-400 to-emerald-300 bg-clip-text text-base font-semibold text-transparent">
                Ilgar Guluzade
              </span>
              . This project showcases a modern Next.js app router stack with
              Google SSO, typed API routes, and a clean, portfolio-ready UI.
            </p>
          </div>
        </section>

        {/* Modal: How it works */}
        {showHowItWorks && (
          <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-zinc-950/95 p-6 shadow-2xl">
              <button
                onClick={() => setShowHowItWorks(false)}
                className="absolute right-4 top-4 rounded-full border border-zinc-700/70 bg-zinc-900/80 px-2 py-0.5 text-xs text-zinc-400 transition hover:border-zinc-500 hover:text-zinc-200"
              >
                Close
              </button>
              <h3 className="mb-3 text-lg font-semibold text-zinc-50">
                How Vibe manages your keys
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-zinc-400">
                Under the hood, Vibe is a simple but carefully structured API
                key manager. It focuses on clarity and developer ergonomics
                rather than heavy infrastructure.
              </p>
              <ul className="mb-4 space-y-2 text-sm text-zinc-300">
                <li>• Google SSO via NextAuth for frictionless sign-in.</li>
                <li>• Typed Next.js route handlers for key CRUD operations.</li>
                <li>
                  • A clean dashboard to view, label, and organize your keys.
                </li>
                <li>
                  • Designed as a portfolio piece to demonstrate modern full‑stack
                  patterns.
                </li>
              </ul>
              <p className="text-xs text-zinc-500">
                Tip: When presenting this app, walk through the login, show how
                keys are created and organized, and briefly mention the
                technologies used (Next.js App Router, TypeScript, Google SSO,
                Tailwind).
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
