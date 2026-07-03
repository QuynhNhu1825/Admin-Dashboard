import { Outlet, Navigate, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { AppSidebar } from "./AppSidebar";
import {
  Box,
  Breadcrumbs,
  Link,
  Typography,
} from "@mui/material";

export function AppLayout() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const getPageTitle = (pathname: string) => {
    const routes: Record<string, string> = {
      "/": "Dashboard",
      "/prompts": "Quản lý Prompt",
      "/categories": "Danh mục ngành",
      "/careers": "Nghề nghiệp",
      "/questions": "Ngân hàng câu hỏi",
      "/market-data": "Dữ liệu thị trường",
      "/accounts": "Quản lý tài khoản",
      "/analytics": "Thống kê & Phân tích",
      "/settings": "Cấu hình & Bảo trì",
    };

    return routes[pathname] || "Dashboard";
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#f8fafc",
      }}
    >
      <AppSidebar />

      <Box
        sx={{
          flex: 1,
          ml: "280px",
          minHeight: "100vh",
          bgcolor: "#f8fafc",
        }}
      >
        <Box
          component="header"
          sx={{
            height: 64,
            px: 3,
            display: "flex",
            alignItems: "center",
            bgcolor: "#fff",
            borderBottom: "1px solid #e5e7eb",
            position: "sticky",
            top: 0,
            zIndex: 1000,
          }}
        >
          <Breadcrumbs sx={{ fontSize: 14 }}>
            <Link
              underline="hover"
              color="#6b7280"
              sx={{ cursor: "pointer", fontSize: 14 }}
            >
              Trang chủ
            </Link>

            <Typography sx={{ color: "#111827", fontSize: 14, fontWeight: 600 }}>
              {getPageTitle(location.pathname)}
            </Typography>
          </Breadcrumbs>
        </Box>

        <Box
          component="main"
          sx={{
            p: 3,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}