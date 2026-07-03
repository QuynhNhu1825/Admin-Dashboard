import {
  Dashboard as DashboardIcon,
  Description,
  Work,
  Folder,
  HelpOutline,
  TrendingUp,
  People,
  BarChart,
  Settings,
  Logout,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const menuItems = [
  { title: "Dashboard", icon: DashboardIcon, path: "/" },
  { title: "Quản lý Prompt", icon: Description, path: "/prompts" },
  { title: "Danh mục ngành", icon: Folder, path: "/categories" },
  { title: "Nghề nghiệp", icon: Work, path: "/careers" },
  { title: "Ngân hàng câu hỏi", icon: HelpOutline, path: "/questions" },
  { title: "Dữ liệu thị trường", icon: TrendingUp, path: "/market-data" },
  { title: "Quản lý tài khoản", icon: People, path: "/accounts" },
  { title: "Thống kê & Phân tích", icon: BarChart, path: "/analytics" },
  { title: "Cấu hình & Bảo trì", icon: Settings, path: "/settings" },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box
      sx={{
        width: 280,
        height: "100vh",
        bgcolor: "#fff",
        borderRight: "1px solid #e5e7eb",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 1200,
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar
            variant="rounded"
            sx={{
              width: 36,
              height: 36,
              bgcolor: "#f59e0b",
              borderRadius: "10px",
            }}
          >
            <DashboardIcon sx={{ color: "#fff", fontSize: 20 }} />
          </Avatar>

          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: 15, color: "#111827" }}>
              Admin Dashboard
            </Typography>
            <Typography sx={{ fontSize: 12, color: "#6b7280" }}>
              Hệ thống quản lý
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider />

      <Box sx={{ flex: 1, p: 2, overflowY: "auto" }}>
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 700,
            color: "#9ca3af",
            textTransform: "uppercase",
            mb: 1,
            px: 1,
          }}
        >
          Menu chính
        </Typography>

        <List sx={{ p: 0 }}>
          {menuItems.map((item) => {
            const active = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <ListItemButton
                key={item.path}
                onClick={() => navigate(item.path)}
                sx={{
                  mb: 0.5,
                  borderRadius: "10px",
                  px: 1.5,
                  py: 1,
                  color: active ? "#92400e" : "#4b5563",
                  bgcolor: active ? "#fef3c7" : "transparent",
                  border: active ? "1px solid #fbbf24" : "1px solid transparent",
                  "&:hover": {
                    bgcolor: active ? "#fde68a" : "#f9fafb",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 36, color: "inherit" }}>
                  <Icon sx={{ fontSize: 20 }} />
                </ListItemIcon>

                <ListItemText
                  primary={item.title}
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: active ? 700 : 500,
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Box>

      <Divider />

      <Box sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>
            {user?.name || "Admin"}
          </Typography>
          <Typography
            sx={{
              fontSize: 12,
              color: "#6b7280",
              maxWidth: 190,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {user?.email || "admin@example.com"}
          </Typography>
        </Box>

        <IconButton
          onClick={handleLogout}
          sx={{
            width: 36,
            height: 36,
            color: "#6b7280",
            "&:hover": {
              color: "#dc2626",
              bgcolor: "#fee2e2",
            },
          }}
        >
          <Logout sx={{ fontSize: 20 }} />
        </IconButton>
      </Box>
    </Box>
  );
}