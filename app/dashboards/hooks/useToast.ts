"use client";

import { useCallback, useEffect, useState } from "react";
import type { Toast } from "../types";

export function useToast(duration = 3500) {
  const [toast, setToast] = useState<Toast>(null);

  const showToast = useCallback((message: string, type: "success" | "error") => {
    setToast({ message, type });
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), duration);
    return () => clearTimeout(t);
  }, [toast, duration]);

  return { toast, showToast };
}
