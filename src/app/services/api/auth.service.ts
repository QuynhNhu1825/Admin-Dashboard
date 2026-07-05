import { API_BASE } from "./config";

export interface LoginUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export async function loginAdmin(
  email: string,
  password: string
): Promise<LoginUser | null> {
  const response = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: email, password }),
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  if (!data.success || !data.user) {
    return null;
  }

  if (data.user.role !== "admin") {
    alert("Tài khoản của bạn không có quyền truy cập trang quản trị!");
    return null;
  }

  return {
    id: data.user.id.toString(),
    email: data.user.email,
    name: data.profile?.fullName || "Admin User",
    role: data.user.role,
  };
}
