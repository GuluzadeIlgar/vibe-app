"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export function UserProfile() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        Loading your profile...
      </p>
    );
  }

  if (!session?.user) {
    return null;
  }

  const { name, email, image } = session.user;

  return (
    <div className="flex items-center gap-4 rounded-xl border border-black/5 bg-zinc-50 px-4 py-3 dark:border-white/10 dark:bg-zinc-900">
      {image && (
        <Image
          src={image}
          alt={name ?? "User avatar"}
          width={40}
          height={40}
          className="h-10 w-10 rounded-full object-cover"
        />
      )}
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          {name ?? "Signed in user"}
        </span>
        {email && (
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            {email}
          </span>
        )}
      </div>
      <button
        onClick={() => signOut()}
        className="ml-auto rounded-full bg-zinc-900 px-3.5 py-1.5 text-xs font-semibold text-zinc-50 shadow-md shadow-zinc-900/50 transition hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
      >
        Sign out
      </button>
    </div>
  );
}

