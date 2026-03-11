import { randomBytes } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

function generateApiKey(): string {
  return "Ilgar_" + randomBytes(24).toString("hex");
}

type ApiKeyRow = {
  id: string;
  name: string;
  key: string;
  usage: number | null;
  created_at: string;
};

function toClientShape(row: ApiKeyRow) {
  return {
    id: row.id,
    name: row.name,
    key: row.key,
    usage: row.usage ?? 0,
    createdAt: row.created_at,
  };
}

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("api_keys")
    .select("id,name,key,usage,created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 },
    );
  }

  const rows = (data ?? []) as ApiKeyRow[];
  return NextResponse.json(rows.map(toClientShape));
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, usage } = body as {
    name?: string;
    usage?: number;
  };

  if (!name || typeof name !== "string" || !name.trim()) {
    return NextResponse.json(
      { error: "Name is required." },
      { status: 400 },
    );
  }

  const key = generateApiKey();
  const usageNum =
    typeof usage === "number" && !Number.isNaN(usage) ? Math.max(0, usage) : 0;

  const { data, error } = await supabaseAdmin
    .from("api_keys")
    .insert({
      name: name.trim(),
      key,
      usage: usageNum,
    })
    .select("id,name,key,usage,created_at")
    .single();

  if (error || !data) {
    console.error("[POST /api/keys] Supabase error:", error);
    return NextResponse.json(
      { error: error?.message ?? "Failed to create API key." },
      { status: 500 },
    );
  }

  return NextResponse.json(toClientShape(data as ApiKeyRow), { status: 201 });
}

