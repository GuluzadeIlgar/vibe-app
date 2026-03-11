"use client";

import type { Toast as ToastType } from "../types";

type Props = { toast: ToastType };

export function Toast({ toast }: Props) {
  if (!toast) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 rounded-xl border px-4 py-3 text-sm font-medium shadow-lg transition-all duration-300 ease-out sm:bottom-8 sm:right-8"
      style={{
        backgroundColor: toast.type === "success" ? "#ecfdf5" : "#fef2f2",
        borderColor: toast.type === "success" ? "#a7f3d0" : "#fecaca",
        color: toast.type === "success" ? "#065f46" : "#991b1b",
      }}
    >
      <span>{toast.message}</span>
    </div>
  );
}
