import { API_BASE } from "./config";

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const userStr = localStorage.getItem("admin_user");
  let userId = "";
  if (userStr) {
    try {
      const u = JSON.parse(userStr);
      userId = u.id || "";
    } catch (e) {}
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (userId) {
    headers["x-user-id"] = userId.toString();
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      ...headers,
      ...(options.headers as Record<string, string> || {}),
    },
  });

  if (!response.ok) {
    const errText = await response.text();
    let errJson;
    try {
      errJson = JSON.parse(errText);
    } catch (e) {}
    throw new Error(errJson?.message || errText || "API Error");
  }

  return response.json();
}
