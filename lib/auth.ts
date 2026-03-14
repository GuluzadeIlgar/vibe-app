import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const secret = process.env.NEXTAUTH_SECRET;

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

export const authOptions: NextAuthOptions = {
  secret,
  trustHost: true,
  providers: [
    GoogleProvider({
      clientId,
      clientSecret,
    }),
  ],
  callbacks: {
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

