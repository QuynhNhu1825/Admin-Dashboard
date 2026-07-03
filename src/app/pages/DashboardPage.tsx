import {
  Box,
  Card,
  CardContent,
  LinearProgress,
  Typography,
} from "@mui/material";
import {
  People,
  Description,
  Work,
  Timeline,
  TrendingUp,
} from "@mui/icons-material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const stats = [
  {
    title: "Tổng người dùng",
    value: "1,234",
    change: "+12.5%",
    icon: People,
    color: "#F59E0B",
  },
  {
    title: "Prompts",
    value: "456",
    change: "+8.2%",
    icon: Description,
    color: "#FBBF24",
  },
  {
    title: "Nghề nghiệp",
    value: "89",
    change: "+3.1%",
    icon: Work,
    color: "#6B7280",
  },
  {
    title: "Khảo sát hoàn thành",
    value: "2,345",
    change: "+15.3%",
    icon: Timeline,
    color: "#9CA3AF",
  },
];

const surveyData = [
  { month: "T1", count: 120 },
  { month: "T2", count: 145 },
  { month: "T3", count: 180 },
  { month: "T4", count: 210 },
  { month: "T5", count: 195 },
  { month: "T6", count: 230 },
];

const careerTrendData = [
  { month: "T1", users: 80 },
  { month: "T2", users: 95 },
  { month: "T3", users: 120 },
  { month: "T4", users: 140 },
  { month: "T5", users: 135 },
  { month: "T6", users: 160 },
];

const personalityData = [
  { name: "Nhà lãnh đạo", value: 28, color: "#F59E0B" },
  { name: "Nhà sáng tạo", value: 24, color: "#FBBF24" },
  { name: "Nhà phân tích", value: 22, color: "#FCD34D" },
  { name: "Nhà hỗ trợ", value: 26, color: "#9E9E9E" },
];

const recentActivities = [
  {
    user: "Nguyễn Văn A",
    action: "đã hoàn thành khảo sát tính cách",
    time: "2 phút trước",
  },
  {
    user: "Admin",
    action: 'đã thêm prompt mới "Phân tích kỹ năng"',
    time: "15 phút trước",
  },
  {
    user: "Trần Thị B",
    action: "đã đăng ký tài khoản mới",
    time: "1 giờ trước",
  },
  {
    user: "Admin",
    action: "đã cập nhật dữ liệu thị trường cho ngành IT",
    time: "2 giờ trước",
  },
  {
    user: "Lê Văn C",
    action: "đã hoàn thành khảo sát nghề nghiệp",
    time: "3 giờ trước",
  },
];

const orange = "#F59E0B";
const amber = "#FBBF24";
const yellow = "#FCD34D";
const gray = "#9E9E9E";
const borderColor = "#e5e7eb";
const textMain = "#111827";
const textMuted = "#6b7280";

function ChartCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Card
      elevation={0}
      sx={{
        border: `1px solid ${borderColor}`,
        borderRadius: "18px",
        bgcolor: "#fff",
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Typography sx={{ fontSize: 18, fontWeight: 700, color: textMain }}>
          {title}
        </Typography>

        <Typography sx={{ fontSize: 14, color: textMuted, mt: 0.5, mb: 2 }}>
          {description}
        </Typography>

        {children}
      </CardContent>
    </Card>
  );
}

export function DashboardPage() {
  return (
    <Box>
      <Box sx={{ mb: 2.5 }}>
        <Typography
          sx={{
            fontSize: 30,
            fontWeight: 700,
            color: textMain,
            letterSpacing: "-0.03em",
          }}
        >
          Dashboard
        </Typography>

        <Typography sx={{ color: textMuted, mt: 0.5, fontSize: 15 }}>
          Tổng quan hệ thống và các chỉ số quan trọng
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 2,
          mb: 2.5,
        }}
      >
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card
              key={stat.title}
              elevation={0}
              sx={{
                border: `1px solid ${borderColor}`,
                borderRadius: "18px",
                bgcolor: "#fff",
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 2,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: textMuted,
                    }}
                  >
                    {stat.title}
                  </Typography>

                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: "10px",
                      bgcolor: stat.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon sx={{ color: "#fff", fontSize: 20 }} />
                  </Box>
                </Box>

                <Typography
                  sx={{
                    fontSize: 30,
                    fontWeight: 800,
                    color: textMain,
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </Typography>

                <Typography sx={{ fontSize: 13, color: "#16a34a", mt: 1 }}>
                  {stat.change} so với tháng trước
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "1fr 1fr",
          },
          gap: 2,
          mb: 2.5,
        }}
      >
        <ChartCard
          title="Hoạt động khảo sát"
          description="Số lượng khảo sát hoàn thành theo tháng"
        >
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={surveyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill={orange} radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Xu hướng ngành nghề"
          description="Số người dùng quan tâm theo tháng"
        >
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={careerTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="users"
                stroke={orange}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Phân tích nhóm tính cách"
          description="Phân bố tính cách phổ biến (%)"
        >
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={personalityData}
                cx="50%"
                cy="42%"
                label={false}
                outerRadius={78}
                dataKey="value"
              >
                {personalityData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>

              <Tooltip />

              <Legend
                verticalAlign="bottom"
                iconType="circle"
                wrapperStyle={{
                  fontSize: 13,
                  paddingTop: 8,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Hiệu suất AI"
          description="Các chỉ số hiệu suất hệ thống AI"
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 1 }}>
            {[
              {
                label: "Độ chính xác",
                value: "94.2%",
                percent: 94.2,
                color: orange,
              },
              {
                label: "Thời gian phản hồi",
                value: "1.2s",
                percent: 85,
                color: amber,
              },
              {
                label: "Mức độ hài lòng",
                value: "4.7/5.0",
                percent: 94,
                color: "#6B7280",
              },
            ].map((item) => (
              <Box key={item.label}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography sx={{ fontSize: 14, color: textMain }}>
                    {item.label}
                  </Typography>

                  <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
                    {item.value}
                  </Typography>
                </Box>

                <LinearProgress
                  variant="determinate"
                  value={item.percent}
                  sx={{
                    height: 8,
                    borderRadius: 999,
                    bgcolor: "#f3f4f6",
                    "& .MuiLinearProgress-bar": {
                      bgcolor: item.color,
                      borderRadius: 999,
                    },
                  }}
                />
              </Box>
            ))}
          </Box>
        </ChartCard>
      </Box>

      <Card
        elevation={0}
        sx={{
          border: `1px solid ${borderColor}`,
          borderRadius: "18px",
          bgcolor: "#fff",
        }}
      >
        <CardContent sx={{ p: 2.5 }}>
          <Typography sx={{ fontSize: 18, fontWeight: 700, color: textMain }}>
            Hoạt động gần đây
          </Typography>

          <Typography sx={{ fontSize: 14, color: textMuted, mt: 0.5, mb: 2 }}>
            Các hoạt động mới nhất trong hệ thống
          </Typography>

          <Box>
            {recentActivities.map((activity, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 2,
                  pb: 2,
                  mb: 2,
                  borderBottom:
                    index === recentActivities.length - 1
                      ? "none"
                      : `1px solid ${borderColor}`,
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: orange,
                    mt: 0.8,
                    flexShrink: 0,
                  }}
                />

                <Box>
                  <Typography sx={{ fontSize: 14, color: textMain }}>
                    <Box component="span" sx={{ fontWeight: 700 }}>
                      {activity.user}
                    </Box>{" "}
                    {activity.action}
                  </Typography>

                  <Typography sx={{ fontSize: 12, color: textMuted, mt: 0.5 }}>
                    {activity.time}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}