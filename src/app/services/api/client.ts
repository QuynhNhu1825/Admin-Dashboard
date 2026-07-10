import { API_BASE } from "./config";

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem("admin_token");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
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
    
    // Handle unauthorized errors
    if (response.status === 401) {
      localStorage.removeItem("admin_user");
      localStorage.removeItem("admin_token");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
      throw new Error("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại");
    }
    
    throw new Error(errJson?.message || errText || "API Error");
  }

  return response.json();
}
