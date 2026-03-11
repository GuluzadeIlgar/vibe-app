export type ApiKey = {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  usage: number;
  revealed: boolean;
};

export type ApiKeyPayload = Omit<ApiKey, "id" | "createdAt" | "revealed">;

export type Toast = { message: string; type: "success" | "error" } | null;
