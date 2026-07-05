import { useState, useEffect } from "react";
import {
  Add,
  Delete,
  Edit,
  EmojiEvents,
  MonetizationOn,
  Search,
  TrendingUp,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { apiRequest } from "../services/api";

interface DuLieuThiTruong {
  maDL: string;
  maNghe: string;
  loai: "Luong" | "ChungChi" | "CoHoi";
  tieuDe: string;
  giaTri: string;
  metaData: string;
  ngayCapNhat: string;
}

const initialFormState = {
  maNghe: "",
  loai: "ChungChi" as "Luong" | "ChungChi" | "CoHoi",
  tieuDe: "",
  giaTri: "",
  metaData: "{}",
};

const orange = "#f59e0b";
const orangeDark = "#d97706";
const orangeLight = "#fef3c7";
const borderColor = "#e5e7eb";
const textMain = "#111827";
const textMuted = "#6b7280";

export function MarketDataPage() {
  const [data, setData] = useState<DuLieuThiTruong[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] =
    useState<"all" | "Luong" | "ChungChi" | "CoHoi">("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingData, setEditingData] = useState<DuLieuThiTruong | null>(null);
  const [formData, setFormData] = useState(initialFormState);

  const refreshData = async () => {
    try {
      const res = await apiRequest("/admin/market-data");
      if (res.success) {
        setData(res.data || []);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const filteredData = data.filter((item) => {
    const matchesSearch =
      (item.maNghe || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.tieuDe || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.giaTri || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTab = activeTab === "all" || item.loai === activeTab;

    return matchesSearch && matchesTab;
  });

  const handleAdd = async () => {
    try {
      await apiRequest("/admin/market-data", {
        method: "POST",
        body: JSON.stringify(formData)
      });
      await refreshData();
      setIsAddDialogOpen(false);
      setFormData(initialFormState);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (item: DuLieuThiTruong) => {
    setEditingData(item);
    setFormData({
      maNghe: item.maNghe,
      loai: item.loai,
      tieuDe: item.tieuDe,
      giaTri: item.giaTri,
      metaData: item.metaData,
    });
  };

  const handleUpdate = async () => {
    if (!editingData) return;
    try {
      await apiRequest(`/admin/market-data/${editingData.maDL}`, {
        method: "PUT",
        body: JSON.stringify(formData)
      });
      await refreshData();
      setEditingData(null);
      setFormData(initialFormState);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa dữ liệu này?")) {
      try {
        await apiRequest(`/admin/market-data/${id}`, {
          method: "DELETE"
        });
        await refreshData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "ChungChi":
        return <EmojiEvents sx={{ fontSize: 16 }} />;
      case "Luong":
        return <MonetizationOn sx={{ fontSize: 16 }} />;
      case "CoHoi":
        return <TrendingUp sx={{ fontSize: 16 }} />;
      default:
        return null;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "ChungChi":
        return "Chứng chỉ";
      case "Luong":
        return "Mức lương";
      case "CoHoi":
        return "Cơ hội";
      default:
        return type;
    }
  };

  const getTypeChipColor = (type: string) => {
    switch (type) {
      case "ChungChi":
        return {
          bgcolor: orangeLight,
          color: "#92400e",
        };
      case "Luong":
        return {
          bgcolor: "#dcfce7",
          color: "#15803d",
        };
      case "CoHoi":
        return {
          bgcolor: "#e0f2fe",
          color: "#0369a1",
        };
      default:
        return {
          bgcolor: "#f3f4f6",
          color: textMuted,
        };
    }
  };

  const isFormValid =
    formData.maNghe.trim() &&
    formData.tieuDe.trim() &&
    formData.giaTri.trim() &&
    formData.metaData.trim();

  const renderFormFields = () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.2, mt: 1 }}>
      <TextField
        fullWidth
        size="small"
        label="Mã nghề nghiệp"
        placeholder="Nhập ID nghề nghiệp, VD: 101"
        value={formData.maNghe}
        onChange={(e) => setFormData({ ...formData, maNghe: e.target.value })}
        sx={inputSx}
      />

      <FormControl fullWidth size="small" sx={inputSx}>
        <InputLabel>Loại dữ liệu</InputLabel>
        <Select
          label="Loại dữ liệu"
          value={formData.loai}
          onChange={(e) =>
            setFormData({
              ...formData,
              loai: e.target.value as "Luong" | "ChungChi" | "CoHoi",
            })
          }
        >
          <MenuItem value="ChungChi">Chứng chỉ</MenuItem>
          <MenuItem value="Luong">Mức lương</MenuItem>
          <MenuItem value="CoHoi">Cơ hội</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        size="small"
        label="Tiêu đề"
        placeholder="VD: Mức lương Junior"
        value={formData.tieuDe}
        onChange={(e) => setFormData({ ...formData, tieuDe: e.target.value })}
        sx={inputSx}
      />

      <TextField
        fullWidth
        size="small"
        label="Giá trị hiển thị"
        placeholder="VD: 8 - 18 Triệu"
        value={formData.giaTri}
        onChange={(e) => setFormData({ ...formData, giaTri: e.target.value })}
        sx={inputSx}
      />

      <TextField
        fullWidth
        size="small"
        label="Dữ liệu logic MetaData JSON"
        placeholder='VD: {"min": 8000000, "max": 18000000}'
        value={formData.metaData}
        onChange={(e) =>
          setFormData({ ...formData, metaData: e.target.value })
        }
        sx={inputSx}
      />

      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1 }}>
        {(["ChungChi", "Luong", "CoHoi"] as const).map((type) => {
          const active = formData.loai === type;
          return (
            <Button
              key={type}
              type="button"
              variant={active ? "contained" : "outlined"}
              startIcon={getTypeIcon(type)}
              onClick={() => setFormData({ ...formData, loai: type })}
              sx={{
                textTransform: "none",
                borderRadius: "10px",
                fontWeight: 700,
                boxShadow: "none",
                borderColor: active ? orange : borderColor,
                bgcolor: active ? orange : "#fff",
                color: active ? "#fff" : textMain,
                "&:hover": {
                  bgcolor: active ? orangeDark : orangeLight,
                  borderColor: orange,
                  boxShadow: "none",
                },
              }}
            >
              {getTypeLabel(type)}
            </Button>
          );
        })}
      </Box>
    </Box>
  );

  return (
    <Box>
      <Box
        sx={{
          mb: 2.5,
          display: "flex",
          alignItems: { xs: "flex-start", md: "center" },
          justifyContent: "space-between",
          gap: 2,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: 30,
              fontWeight: 700,
              color: textMain,
              letterSpacing: "-0.03em",
            }}
          >
            Quản lý Dữ liệu Thị trường
          </Typography>

          <Typography sx={{ color: textMuted, mt: 0.5, fontSize: 15 }}>
            Quản lý thông tin chứng chỉ, mức lương và cơ hội việc làm theo ngành nghề
          </Typography>
        </Box>

        <Button
          size="small"
          variant="contained"
          startIcon={<Add sx={{ fontSize: 18 }} />}
          onClick={() => setIsAddDialogOpen(true)}
          sx={{
            bgcolor: orange,
            color: "#fff",
            borderRadius: "10px",
            px: 1.8,
            py: 0.8,
            fontSize: 14,
            textTransform: "none",
            fontWeight: 700,
            minHeight: 38,
            boxShadow: "none",
            transform: "translateX(-16px)",
            "&:hover": {
              bgcolor: orangeDark,
              boxShadow: "none",
            },
          }}
        >
          Thêm dữ liệu
        </Button>
      </Box>

      <Dialog
        open={isAddDialogOpen}
        onClose={() => {
          setIsAddDialogOpen(false);
          setFormData(initialFormState);
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ fontWeight: 700, color: textMain }}>
          Thêm dữ liệu thị trường
          <Typography sx={{ color: textMuted, fontSize: 14, mt: 0.5 }}>
            Nhập thông tin dữ liệu thị trường mới
          </Typography>
        </DialogTitle>

        <DialogContent>{renderFormFields()}</DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            variant="outlined"
            onClick={() => {
              setIsAddDialogOpen(false);
              setFormData(initialFormState);
            }}
            sx={cancelButtonSx}
          >
            Hủy
          </Button>

          <Button
            variant="contained"
            onClick={handleAdd}
            disabled={!isFormValid}
            sx={primaryButtonSx}
          >
            Thêm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={!!editingData}
        onClose={() => {
          setEditingData(null);
          setFormData(initialFormState);
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ fontWeight: 700, color: textMain }}>
          Cập nhật dữ liệu thị trường
          <Typography sx={{ color: textMuted, fontSize: 14, mt: 0.5 }}>
            Chỉnh sửa thông tin dữ liệu
          </Typography>
        </DialogTitle>

        <DialogContent>{renderFormFields()}</DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            variant="outlined"
            onClick={() => {
              setEditingData(null);
              setFormData(initialFormState);
            }}
            sx={cancelButtonSx}
          >
            Hủy
          </Button>

          <Button
            variant="contained"
            onClick={handleUpdate}
            disabled={!isFormValid}
            sx={primaryButtonSx}
          >
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>

      <Card
        elevation={0}
        sx={{
          border: `1px solid ${borderColor}`,
          borderRadius: "18px",
          bgcolor: "#fff",
          mb: 3,
        }}
      >
        <CardContent sx={{ p: 2.5 }}>
          <Typography sx={{ fontSize: 18, fontWeight: 700, color: textMain }}>
            Tra cứu dữ liệu
          </Typography>

          <Typography sx={{ fontSize: 14, color: textMuted, mt: 0.5, mb: 2 }}>
            Tìm kiếm theo mã nghề, tiêu đề hoặc giá trị
          </Typography>

          <TextField
            fullWidth
            size="small"
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: "#9ca3af" }} />
                  </InputAdornment>
                ),
              },
            }}
            sx={inputSx}
          />
        </CardContent>
      </Card>

      <Card
        elevation={0}
        sx={{
          border: `1px solid ${borderColor}`,
          borderRadius: "18px",
          bgcolor: "#fff",
        }}
      >
        <CardContent sx={{ p: 2.5 }}>
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 700,
              color: textMain,
              mb: 2,
            }}
          >
            Danh sách dữ liệu ({filteredData.length})
          </Typography>

          <Tabs
            value={activeTab}
            onChange={(_, value) => setActiveTab(value)}
            sx={{
              mb: 2,
              minHeight: 38,
              "& .MuiTabs-indicator": {
                bgcolor: orange,
              },
              "& .MuiTab-root": {
                textTransform: "none",
                minHeight: 38,
                fontWeight: 700,
                color: textMuted,
              },
              "& .Mui-selected": {
                color: `${orange} !important`,
              },
            }}
          >
            <Tab value="all" label="Tất cả" />
            <Tab value="ChungChi" label="Chứng chỉ" />
            <Tab value="Luong" label="Mức lương" />
            <Tab value="CoHoi" label="Cơ hội" />
          </Tabs>

          <TableContainer
            component={Paper}
            elevation={0}
            sx={{
              border: `1px solid ${borderColor}`,
              borderRadius: "14px",
              overflow: "hidden",
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "#f9fafb" }}>
                  {["Mã nghề", "Loại", "Tiêu đề", "Giá trị", "Cập nhật", "Thao tác"].map(
                    (head) => (
                      <TableCell
                        key={head}
                        align={head === "Thao tác" ? "right" : "left"}
                        sx={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: "#4b5563",
                          borderBottom: `1px solid ${borderColor}`,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {head}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredData.map((item) => (
                  <TableRow
                    key={item.maDL}
                    hover
                    sx={{
                      "& td": {
                        borderBottom: `1px solid ${borderColor}`,
                      },
                      "&:last-child td": {
                        borderBottom: 0,
                      },
                    }}
                  >
                    <TableCell>
                      <Typography sx={{ fontSize: 14, fontWeight: 700, color: textMain }}>
                        {item.maNghe}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Chip
                        icon={getTypeIcon(item.loai) as React.ReactElement}
                        label={getTypeLabel(item.loai)}
                        size="small"
                        variant="filled"
                        sx={{
                          ...getTypeChipColor(item.loai),
                          fontWeight: 700,
                          "& .MuiChip-icon": {
                            color: "inherit",
                          },
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <Typography sx={{ fontSize: 14, color: textMain, fontWeight: 600 }}>
                        {item.tieuDe}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={item.giaTri}
                        size="small"
                        sx={{
                          bgcolor: "#f3f4f6",
                          color: textMain,
                          fontWeight: 700,
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <Typography sx={{ fontSize: 13, color: textMuted }}>
                        {new Date(item.ngayCapNhat).toLocaleDateString("vi-VN")}
                      </Typography>
                    </TableCell>

                    <TableCell align="right">
                      <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                        <Button
                          variant="text"
                          size="small"
                          onClick={() => handleEdit(item)}
                          sx={{
                            minWidth: 36,
                            color: orange,
                            "&:hover": {
                              bgcolor: orangeLight,
                            },
                          }}
                        >
                          <Edit sx={{ fontSize: 18 }} />
                        </Button>

                        <Button
                          variant="text"
                          size="small"
                          onClick={() => handleDelete(item.maDL)}
                          sx={{
                            minWidth: 36,
                            color: "#dc2626",
                            "&:hover": {
                              bgcolor: "#fee2e2",
                            },
                          }}
                        >
                          <Delete sx={{ fontSize: 18 }} />
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}

                {filteredData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <Box sx={{ py: 5, textAlign: "center" }}>
                        <Typography sx={{ color: textMuted }}>
                          Không tìm thấy dữ liệu.
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}

const inputSx = {
  "& .MuiOutlinedInput-root": {
    height: 40,
    borderRadius: "10px",
    bgcolor: "#fff",

    "& fieldset": {
      borderColor,
    },

    "&:hover fieldset": {
      borderColor: orange,
    },

    "&.Mui-focused fieldset": {
      borderColor: orange,
      borderWidth: "1px",
    },
  },

  "& .MuiInputBase-input": {
    padding: "8px 12px",
    fontSize: 14,
  },

  "& .MuiSelect-select": {
    padding: "8px 12px",
    fontSize: 14,
  },

  "& .MuiInputLabel-root": {
    fontSize: 14,
    top: "-6px",
  },

  "& .MuiInputLabel-shrink": {
    top: 0,
  },
};

const primaryButtonSx = {
  bgcolor: orange,
  textTransform: "none",
  borderRadius: "10px",
  fontWeight: 700,
  boxShadow: "none",
  "&:hover": {
    bgcolor: orangeDark,
    boxShadow: "none",
  },
};

const cancelButtonSx = {
  textTransform: "none",
  borderRadius: "10px",
  fontWeight: 700,
  borderColor,
  color: textMain,
};