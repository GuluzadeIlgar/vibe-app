"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Toast } from "./components/Toast";
import { DashboardSidebar } from "./components/DashboardSidebar";
import { ApiKeysSection } from "./components/ApiKeysSection";
import { ApiKeyModal } from "./components/ApiKeyModal";
import { useToast } from "./hooks/useToast";
import { useApiKeys } from "./hooks/useApiKeys";

export default function DashboardsPage() {
  const { toast, showToast } = useToast();
  const keys = useApiKeys(showToast);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-slate-50 via-slate-50 to-sky-50 px-4 py-6 font-sans text-slate-900 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900/80 dark:text-slate-50">
      {/* Sidebar toggle pill, floating near the sidebar */}
      <button
        type="button"
        onClick={() => setSidebarOpen((open) => !open)}
        className={`fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium shadow-lg transition md:flex ${
          sidebarOpen
            ? "border-slate-900 bg-slate-900 text-slate-50"
            : "border-slate-300 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        }`}
      >
        <span
          className={`flex h-5 w-5 items-center justify-center rounded-full border text-[11px] ${
            sidebarOpen
              ? "border-slate-200 bg-slate-800 text-slate-50"
              : "border-slate-300 bg-slate-50 text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
          }`}
        >
          {sidebarOpen ? "«" : "»"}
        </span>
        <span>{sidebarOpen ? "Hide sidebar" : "Show sidebar"}</span>
      </button>

      <Toast toast={toast} />

      <div className="mx-auto flex max-w-6xl gap-6">
        <DashboardSidebar
          isOpen={sidebarOpen}
          onNavigatePlayground={() => router.push("/playground")}
        />

        <main className="flex-1 space-y-6">
          <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
                Pages / Overview
              </p>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
                Overview
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Operational
              </span>
            </div>
          </header>

          <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-sky-500 via-sky-400 to-sky-600 text-slate-50 shadow-md">
            <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-3">
                <span className="inline-flex items-center rounded-full bg-sky-900/30 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em]">
                  Current plan
                </span>
                <h2 className="text-3xl font-semibold tracking-tight">
                  Researcher
                </h2>
                <div className="space-y-1 text-sm text-sky-50/90">
                  <p className="font-medium">API usage</p>
                  <p>Monthly plan • 0 / 1,000 credits</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-3">
                <button className="inline-flex items-center gap-2 rounded-full bg-slate-950/80 px-4 py-2 text-xs font-medium text-slate-50 shadow-sm ring-1 ring-sky-300/50 backdrop-blur">
                  Manage plan
                </button>
                <label className="flex items-center gap-2 text-xs text-sky-50/90">
                  <span className="relative inline-flex h-5 w-9 items-center rounded-full bg-slate-950/40">
                    <span className="ml-4 h-4 w-4 rounded-full bg-slate-50 shadow-sm" />
                  </span>
                  Pay as you go
                </label>
              </div>
            </div>
          </section>

          <ApiKeysSection
            apiKeys={keys.apiKeys}
            isEditing={keys.isEditing}
            onOpenModal={keys.openModal}
            onStartEdit={keys.startEdit}
            onToggleReveal={keys.toggleReveal}
            onCopy={keys.copyKey}
            onDelete={keys.removeKey}
          />
        </main>
      </div>

      {keys.isModalOpen && (
        <ApiKeyModal
          isEditing={keys.isEditing}
          nameInput={keys.nameInput}
          usageInput={keys.usageInput}
          onNameChange={keys.setNameInput}
          onUsageChange={keys.setUsageInput}
          onSubmit={keys.isEditing ? keys.updateKey : keys.createKey}
          onCancel={keys.closeModal}
        />
      )}
    </div>
  );
}
