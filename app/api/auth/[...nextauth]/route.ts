import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

const nextAuth = NextAuth(authOptions);

async function handler(
  req: Request,
  context: { params: Promise<{ nextauth: string[] }> }
) {
  try {
    return await nextAuth(req, context);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    console.error("[NextAuth]", message, e);
    return new Response(
      `Server config error: ${message}. Check .env.local has NEXTAUTH_SECRET, NEXTAUTH_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET and restart the dev server.`,
      { status: 500, headers: { "Content-Type": "text/plain" } }
    );
  }
}

export { handler as GET, handler as POST };
