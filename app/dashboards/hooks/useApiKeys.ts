"use client";

import { useCallback, useEffect, useState } from "react";
import * as keysApi from "../api/keys";
import type { ApiKey } from "../types";

export function useApiKeys(showToast: (message: string, type: "success" | "error") => void) {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [nameInput, setNameInput] = useState("");
  const [usageInput, setUsageInput] = useState("0");

  useEffect(() => {
    keysApi.fetchKeys().then((data) => {
      setApiKeys(
        data.map((k) => ({ ...k, revealed: false })),
      );
    });
  }, []);

  const resetForm = useCallback(() => {
    setEditingId(null);
    setNameInput("");
    setUsageInput("0");
  }, []);

  const openModal = useCallback(() => {
    resetForm();
    setIsModalOpen(true);
  }, [resetForm]);

  const closeModal = useCallback(() => {
    resetForm();
    setIsModalOpen(false);
  }, [resetForm]);

  const startEdit = useCallback((key: ApiKey) => {
    setEditingId(key.id);
    setNameInput(key.name);
    setUsageInput(String(key.usage));
    setIsModalOpen(true);
  }, []);

  const createKey = useCallback(async () => {
    if (!nameInput.trim()) return;
    const usage = Number.isNaN(Number(usageInput)) ? 0 : Math.max(0, Number(usageInput));
    try {
      const created = await keysApi.createKey({ name: nameInput.trim(), usage });
      setApiKeys((prev) => [{ ...created, revealed: false }, ...prev]);
      showToast("API key created", "success");
      closeModal();
    } catch (e) {
      showToast(e instanceof Error ? e.message : "Failed to create API key", "error");
    }
  }, [nameInput, usageInput, showToast, closeModal]);

  const updateKey = useCallback(async () => {
    if (!editingId || !nameInput.trim()) return;
    const usage = Number.isNaN(Number(usageInput)) ? 0 : Math.max(0, Number(usageInput));
    try {
      const updated = await keysApi.updateKey(editingId, { name: nameInput.trim(), usage });
      setApiKeys((prev) =>
        prev.map((k) => (k.id === updated.id ? { ...updated, revealed: k.revealed } : k)),
      );
      showToast("API key updated", "success");
      closeModal();
    } catch (e) {
      showToast(e instanceof Error ? e.message : "Failed to update API key", "error");
    }
  }, [editingId, nameInput, usageInput, showToast, closeModal]);

  const removeKey = useCallback(
    async (id: string) => {
      try {
        await keysApi.deleteKey(id);
        setApiKeys((prev) => prev.filter((k) => k.id !== id));
        showToast("API key deleted", "success");
        if (editingId === id) closeModal();
      } catch (e) {
        showToast(e instanceof Error ? e.message : "Failed to delete API key", "error");
      }
    },
    [showToast, editingId, closeModal],
  );

  const toggleReveal = useCallback((id: string) => {
    setApiKeys((prev) =>
      prev.map((k) => (k.id === id ? { ...k, revealed: !k.revealed } : k)),
    );
  }, []);

  const copyKey = useCallback(
    async (id: string) => {
      const key = apiKeys.find((k) => k.id === id)?.key;
      if (!key) {
        showToast("Key not found", "error");
        return;
      }
      try {
        if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(key);
          showToast("Copied to clipboard", "success");
          return;
        }
        const textarea = document.createElement("textarea");
        textarea.value = key;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        showToast("Copied to clipboard", "success");
      } catch {
        showToast("Copy failed", "error");
      }
    },
    [apiKeys, showToast],
  );

  return {
    apiKeys,
    isModalOpen,
    isEditing: editingId !== null,
    editingId,
    nameInput,
    usageInput,
    setNameInput,
    setUsageInput,
    openModal,
    closeModal,
    resetForm,
    startEdit,
    createKey,
    updateKey,
    removeKey,
    toggleReveal,
    copyKey,
  };
}
