import {
  Box,
  Card,
  CardContent,
  LinearProgress,
  Typography,
} from "@mui/material";
import {
  TrendingUp,
  People,
  Bolt,
  TrackChanges,
} from "@mui/icons-material";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const careerTrendData = [
  { month: "T1", IT: 150, Marketing: 80, Finance: 60, Healthcare: 40 },
  { month: "T2", IT: 170, Marketing: 95, Finance: 70, Healthcare: 45 },
  { month: "T3", IT: 190, Marketing: 110, Finance: 75, Healthcare: 50 },
  { month: "T4", IT: 210, Marketing: 120, Finance: 80, Healthcare: 55 },
  { month: "T5", IT: 230, Marketing: 130, Finance: 85, Healthcare: 60 },
  { month: "T6", IT: 260, Marketing: 145, Finance: 90, Healthcare: 65 },
];

const personalityData = [
  { name: "Nhà lãnh đạo", value: 320, color: "#F59E0B" },
  { name: "Nhà sáng tạo", value: 280, color: "#FBBF24" },
  { name: "Nhà phân tích", value: 260, color: "#FCD34D" },
  { name: "Nhà hỗ trợ", value: 340, color: "#9E9E9E" },
];

const aiPerformanceData = [
  { month: "T1", accuracy: 89, responseTime: 1.8, satisfaction: 4.2 },
  { month: "T2", accuracy: 91, responseTime: 1.6, satisfaction: 4.4 },
  { month: "T3", accuracy: 92, responseTime: 1.5, satisfaction: 4.5 },
  { month: "T4", accuracy: 93, responseTime: 1.3, satisfaction: 4.6 },
  { month: "T5", accuracy: 94, responseTime: 1.2, satisfaction: 4.7 },
  { month: "T6", accuracy: 95, responseTime: 1.1, satisfaction: 4.8 },
];

const surveyActivityData = [
  { week: "T1", completed: 45, started: 60 },
  { week: "T2", completed: 52, started: 68 },
  { week: "T3", completed: 61, started: 75 },
  { week: "T4", completed: 58, started: 70 },
];

const orange = "#F59E0B";
const amber = "#FBBF24";
const yellow = "#FCD34D";
const gray = "#9E9E9E";
const borderColor = "#e5e7eb";
const textMain = "#111827";
const textMuted = "#6b7280";

const metricCards = [
  {
    title: "Tổng quan hệ thống",
    value: "98.5%",
    desc: "Uptime hệ thống",
    icon: TrackChanges,
    bg: orange,
  },
  {
    title: "Người dùng hoạt động",
    value: "1,234",
    desc: "+18.2% tháng này",
    icon: People,
    bg: amber,
  },
  {
    title: "Độ chính xác AI",
    value: "95%",
    desc: "+1.2% so với T5",
    icon: Bolt,
    bg: "#6b7280",
  },
  {
    title: "Xu hướng tăng trưởng",
    value: "+24%",
    desc: "So với cùng kỳ",
    icon: TrendingUp,
    bg: gray,
  },
];

const detailedStats = [
  { label: "Tỷ lệ hoàn thành khảo sát", value: "87%", percent: 87, color: orange },
  { label: "Độ chính xác gợi ý nghề nghiệp", value: "92%", percent: 92, color: amber },
  { label: "Mức độ hài lòng người dùng", value: "4.8/5.0", percent: 96, color: "#6b7280" },
  { label: "Thời gian phản hồi trung bình", value: "1.1s", percent: 78, color: gray },
  { label: "Tỷ lệ người dùng quay lại", value: "64%", percent: 64, color: orange },
  { label: "Tỷ lệ chuyển đổi", value: "71%", percent: 71, color: amber },
];

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
      <CardContent sx={{ p: 3 }}>
        <Typography sx={{ fontSize: 20, fontWeight: 700, color: textMain }}>
          {title}
        </Typography>
        <Typography sx={{ fontSize: 14, color: textMuted, mt: 0.5, mb: 3 }}>
          {description}
        </Typography>
        {children}
      </CardContent>
    </Card>
  );
}

export function AnalyticsPage() {
  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography
          sx={{
            fontSize: 32,
            fontWeight: 700,
            color: textMain,
            letterSpacing: "-0.03em",
          }}
        >
          Thống kê & Phân tích
        </Typography>

        <Typography sx={{ color: textMuted, mt: 0.5, fontSize: 15 }}>
          Phân tích chi tiết các chỉ số và xu hướng
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
          mb: 3,
        }}
      >
        {metricCards.map((item) => {
          const Icon = item.icon;

          return (
            <Card
              key={item.title}
              elevation={0}
              sx={{
                border: `1px solid ${borderColor}`,
                borderRadius: "18px",
                bgcolor: "#fff",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 2,
                  }}
                >
                  <Typography sx={{ fontSize: 14, fontWeight: 600, color: textMuted }}>
                    {item.title}
                  </Typography>

                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: "10px",
                      bgcolor: item.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon sx={{ color: "#fff", fontSize: 20 }} />
                  </Box>
                </Box>

                <Typography sx={{ fontSize: 30, fontWeight: 800, color: textMain }}>
                  {item.value}
                </Typography>
                <Typography sx={{ fontSize: 13, color: "#16a34a", mt: 0.5 }}>
                  {item.desc}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" }, gap: 2, mb: 3 }}>
        <ChartCard
          title="Phân tích xu hướng ngành nghề"
          description="Số người dùng quan tâm đến các lĩnh vực theo tháng"
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={careerTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="IT" stroke={orange} strokeWidth={2} />
              <Line type="monotone" dataKey="Marketing" stroke={amber} strokeWidth={2} />
              <Line type="monotone" dataKey="Finance" stroke={yellow} strokeWidth={2} />
              <Line type="monotone" dataKey="Healthcare" stroke={gray} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Phân tích nhóm tính cách phổ biến"
          description="Phân bố các nhóm tính cách trong hệ thống"
        >
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={personalityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={75}
                dataKey="value"
              >
                {personalityData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" }, gap: 2, mb: 3 }}>
        <ChartCard
          title="Theo dõi hiệu suất AI"
          description="Các chỉ số hiệu suất của hệ thống AI theo tháng"
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={aiPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="accuracy" stroke={orange} strokeWidth={2} name="Độ chính xác (%)" />
              <Line yAxisId="right" type="monotone" dataKey="satisfaction" stroke={gray} strokeWidth={2} name="Mức độ hài lòng" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Thống kê hoạt động khảo sát"
          description="So sánh số khảo sát bắt đầu và hoàn thành"
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={surveyActivityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="started" fill={yellow} name="Bắt đầu" radius={[8, 8, 0, 0]} />
              <Bar dataKey="completed" fill={orange} name="Hoàn thành" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
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
        <CardContent sx={{ p: 3 }}>
          <Typography sx={{ fontSize: 20, fontWeight: 700, color: textMain }}>
            Chi tiết thống kê
          </Typography>
          <Typography sx={{ fontSize: 14, color: textMuted, mt: 0.5, mb: 3 }}>
            Các chỉ số chi tiết theo từng mảng
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(3, 1fr)",
              },
              gap: 3,
            }}
          >
            {detailedStats.map((item) => (
              <Box key={item.label}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography sx={{ fontSize: 14, color: textMain }}>
                    {item.label}
                  </Typography>
                  <Typography sx={{ fontSize: 14, fontWeight: 700, color: textMain }}>
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
        </CardContent>
      </Card>
    </Box>
  );
}