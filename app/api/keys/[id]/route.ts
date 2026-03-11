import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

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

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await req.json();
  const { name, usage } = body as {
    name?: string;
    usage?: number;
  };

  const updates: Record<string, unknown> = {};
  if (name !== undefined) updates.name = name;
  if (usage !== undefined) updates.usage = usage;

  const { data, error } = await supabaseAdmin
    .from("api_keys")
    .update(updates)
    .eq("id", id)
    .select("id,name,key,usage,created_at")
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: error?.message ?? "Failed to update API key." },
      { status: 500 },
    );
  }

  return NextResponse.json(toClientShape(data as ApiKeyRow));
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const { error } = await supabaseAdmin.from("api_keys").delete().eq("id", id);

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 },
    );
  }

  return new Response(null, { status: 204 });
}

