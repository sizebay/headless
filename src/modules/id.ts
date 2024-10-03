import api from "../api/index.ts";

export default async function getUserId(): Promise<string> {
  try {
    const { data } = await api.get("/api/me/session-id");

    return data;
  } catch (_error) {
    return "";
  }
}
