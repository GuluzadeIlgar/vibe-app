"use client";

import { signIn } from "next-auth/react";

export function LoginButton() {
  return (
    <button
      onClick={() => signIn("google")}
      className="flex h-12 w-full items-center justify-center rounded-full bg-gradient-to-r from-purple-500 via-sky-500 to-emerald-400 px-6 text-sm font-semibold text-white shadow-lg shadow-purple-500/40 transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 md:w-[210px]"
    >
      Continue with Google
    </button>
  );
}

