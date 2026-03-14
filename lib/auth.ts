import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { supabaseAdmin } from "@/lib/supabase";

const clientId = process.env.GOOGLE_CLIENT_ID?.trim();
const clientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim();
const secret = (process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET)?.trim();
const url = process.env.NEXTAUTH_URL?.trim();

if (!clientId || !clientSecret) {
  throw new Error(
    "Missing Google OAuth env vars. Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to .env.local"
  );
}
if (!secret) {
  throw new Error(
    "Missing NEXTAUTH_SECRET. Add NEXTAUTH_SECRET to .env.local (e.g. run: openssl rand -hex 32)"
  );
}
if (!url) {
  throw new Error(
    "Missing NEXTAUTH_URL. Add NEXTAUTH_URL to .env.local (e.g. NEXTAUTH_URL=http://localhost:3000)"
  );
}

export const authOptions: NextAuthOptions = {
  secret,
  ...(url && { url }),
  providers: [
    GoogleProvider({
      clientId,
      clientSecret,
    }),
  ],
  callbacks: {
    async signIn({ user, profile }) {
      if (!user.email) return true;
      try {
        const googleProfile = profile as { given_name?: string; family_name?: string } | undefined;
        const name = googleProfile?.given_name ?? user.name?.split(" ")[0] ?? null;
        const surname =
          googleProfile?.family_name ??
          (user.name?.split(" ").slice(1).join(" ") || null) ??
          null;
        await supabaseAdmin.from("users").upsert(
          {
            email: user.email,
            name,
            surname,
            picture: user.image ?? null,
          },
          { onConflict: "email" }
        );
      } catch (err) {
        console.error("[auth] Failed to sync user to Supabase:", err);
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.name ?? session.user.name ?? undefined;
        session.user.email = token.email ?? session.user.email ?? undefined;
        session.user.image = token.picture ?? session.user.image ?? undefined;
      }
      return session;
    },
  },
};

