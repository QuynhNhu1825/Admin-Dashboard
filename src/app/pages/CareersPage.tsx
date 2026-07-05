import { useState, useEffect } from "react";
import { useCategories } from "../contexts/CategoriesContext";
import {
  Add,
  Delete,
  Edit,
  Search,
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

interface Career {
  id: string;
  tenNghe: string;
  categoryId: string;
  moTa: string;
  kyNangCanThiet: string;
  trangThai: number;
  ngayTao: string;
}

const orange = "#f59e0b";
const orangeDark = "#d97706";
const orangeLight = "#fef3c7";
const borderColor = "#e5e7eb";
const textMain = "#111827";
const textMuted = "#6b7280";

export function CareersPage() {
  const { categories } = useCategories();

  const [careers, setCareers] = useState<Career[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategoryId, setFilterCategoryId] = useState("");
  const [filterTrangThai, setFilterTrangThai] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingCareer, setEditingCareer] = useState<Career | null>(null);

  const [formData, setFormData] = useState({
    tenNghe: "",
    categoryId: categories[0]?.id ?? "",
    moTa: "",
    kyNangCanThiet: "",
    trangThai: 1,
  });

  const refreshCareers = async () => {
    try {
      const res = await apiRequest("/admin/careers");
      if (res.success) {
        setCareers(res.careers || []);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    refreshCareers();
  }, []);

  const getCategoryName = (id: string) =>
    categories.find((c) => c.id === id)?.tenDanhMuc ?? "—";

  const filtered = careers.filter((career) => {
    const catName = getCategoryName(career.categoryId).toLowerCase();

    const matchSearch =
      (career.tenNghe || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      catName.includes(searchTerm.toLowerCase());

    const matchCategory = filterCategoryId
      ? career.categoryId === filterCategoryId
      : true;

    const matchStatus =
      filterTrangThai !== ""
        ? career.trangThai === Number(filterTrangThai)
        : true;

    return matchSearch && matchCategory && matchStatus;
  });

  const resetForm = () => {
    setFormData({
      tenNghe: "",
      categoryId: categories[0]?.id ?? "",
      moTa: "",
      kyNangCanThiet: "",
      trangThai: 1,
    });
  };

  const handleAdd = async () => {
    try {
      await apiRequest("/admin/careers", {
        method: "POST",
        body: JSON.stringify(formData)
      });
      await refreshCareers();
      setIsAddOpen(false);
      resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (career: Career) => {
    setEditingCareer(career);
    setFormData({
      tenNghe: career.tenNghe,
      categoryId: career.categoryId,
      moTa: career.moTa,
      kyNangCanThiet: career.kyNangCanThiet,
      trangThai: career.trangThai,
    });
  };

  const handleUpdate = async () => {
    if (!editingCareer) return;
    try {
      await apiRequest(`/admin/careers/${editingCareer.id}`, {
        method: "PUT",
        body: JSON.stringify(formData)
      });
      await refreshCareers();
      setEditingCareer(null);
      resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa nghề nghiệp này?")) {
      try {
        await apiRequest(`/admin/careers/${id}`, {
          method: "DELETE"
        });
        await refreshCareers();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const isFormValid =
    formData.tenNghe.trim() &&
    formData.moTa.trim() &&
    formData.kyNangCanThiet.trim();

  const renderForm = () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.2, mt: 1 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 2,
        }}
      >
        <TextField
          label="Tên nghề"
          required
          fullWidth
          value={formData.tenNghe}
          onChange={(e) =>
            setFormData({ ...formData, tenNghe: e.target.value })
          }
          placeholder="VD: Lập trình viên Front-end"
          sx={inputSx}
        />

        <FormControl fullWidth sx={inputSx}>
          <InputLabel>Danh mục ngành</InputLabel>
          <Select
            label="Danh mục ngành"
            value={formData.categoryId}
            onChange={(e) =>
              setFormData({ ...formData, categoryId: e.target.value })
            }
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.tenDanhMuc} {cat.trangThai === 0 ? "(Khóa)" : ""}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <TextField
        label="Mô tả"
        required
        fullWidth
        multiline
        rows={3}
        value={formData.moTa}
        onChange={(e) => setFormData({ ...formData, moTa: e.target.value })}
        placeholder="Mô tả công việc và trách nhiệm chính..."
        sx={inputSx}
      />

      <TextField
        label="Kỹ năng cần thiết"
        required
        fullWidth
        multiline
        rows={2}
        value={formData.kyNangCanThiet}
        onChange={(e) =>
          setFormData({ ...formData, kyNangCanThiet: e.target.value })
        }
        placeholder="VD: Python, Machine Learning, TensorFlow"
        sx={inputSx}
      />

      <TextField
        label="URL Hình ảnh"
        fullWidth
        onChange={(e) => setFormData({ ...formData })}
        placeholder="https://example.com/image.jpg"
        sx={inputSx}
      />
      <FormControl fullWidth sx={inputSx}>
        <InputLabel>Trạng thái</InputLabel>
        <Select
          label="Trạng thái"
          value={formData.trangThai}
          onChange={(e) =>
            setFormData({ ...formData, trangThai: Number(e.target.value) })
          }
        >
          <MenuItem value={1}>Hoạt động</MenuItem>
          <MenuItem value={0}>Khóa</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );

  return (
    <Box>
      <Box
        sx={{
          mb: 3,
          display: "flex",
          alignItems: { xs: "flex-start", md: "center" },
          justifyContent: "space-between", pr: 2,
          gap: 2,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: 32,
              fontWeight: 700,
              color: textMain,
              letterSpacing: "-0.03em",
            }}
          >
            Quản lý Nghề nghiệp
          </Typography>

          <Typography sx={{ color: textMuted, mt: 0.5, fontSize: 15 }}>
            Quản lý danh sách nghề nghiệp trong hệ thống
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setIsAddOpen(true)}
          sx={{
            transform: "translateX(-20px)",
            bgcolor: orange,
            color: "#fff",
            borderRadius: "10px",
            px: 1.6,
            py: 0.7,
            textTransform: "none",
            fontWeight: 700,
            boxShadow: "none",
            "&:hover": {
              bgcolor: orangeDark,
              boxShadow: "none",
            },
          }}
        >
          Thêm nghề nghiệp
        </Button>
      </Box>

      <Dialog
        open={isAddOpen}
        onClose={() => {
          setIsAddOpen(false);
          resetForm();
        }}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle sx={{ fontWeight: 700, color: textMain }}>
          Thêm nghề nghiệp mới
          <Typography sx={{ color: textMuted, fontSize: 14, mt: 0.5 }}>
            Nhập thông tin chi tiết cho nghề nghiệp cần thêm vào hệ thống.
          </Typography>
        </DialogTitle>

        <DialogContent>{renderForm()}</DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            variant="outlined"
            onClick={() => {
              setIsAddOpen(false);
              resetForm();
            }}
            sx={cancelButtonSx}
          >
            Hủy
          </Button>

          <Button
            variant="contained"
            disabled={!isFormValid}
            onClick={handleAdd}
            sx={primaryButtonSx}
          >
            Thêm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={!!editingCareer}
        onClose={() => {
          setEditingCareer(null);
          resetForm();
        }}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle sx={{ fontWeight: 700, color: textMain }}>
          Cập nhật nghề nghiệp
          <Typography sx={{ color: textMuted, fontSize: 14, mt: 0.5 }}>
            Chỉnh sửa thông tin chi tiết của nghề nghiệp.
          </Typography>
        </DialogTitle>

        <DialogContent>{renderForm()}</DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            variant="outlined"
            onClick={() => {
              setEditingCareer(null);
              resetForm();
            }}
            sx={cancelButtonSx}
          >
            Hủy
          </Button>

          <Button
            variant="contained"
            disabled={!isFormValid}
            onClick={handleUpdate}
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
            Tra cứu nghề nghiệp
          </Typography>

          <Typography sx={{ fontSize: 14, color: textMuted, mt: 0.5, mb: 2 }}>
            Tìm kiếm và lọc theo danh mục, trạng thái
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "1fr 220px 180px",
              },
              gap: 2,
            }}
          >
            <TextField
              fullWidth
              size="small"
              placeholder="Tìm theo tên nghề, danh mục..."
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

            <FormControl fullWidth  size="small" sx={inputSx}>
              <InputLabel>Danh mục</InputLabel>
              <Select
                label="Danh mục"
                value={filterCategoryId}
                onChange={(e) => setFilterCategoryId(e.target.value)}
              >
                <MenuItem value="">Tất cả danh mục</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.tenDanhMuc}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth  size="small" sx={inputSx}>
              <InputLabel>Trạng thái</InputLabel>
              <Select
                label="Trạng thái"
                value={filterTrangThai}
                onChange={(e) => setFilterTrangThai(e.target.value)}
              >
                <MenuItem value="">Tất cả trạng thái</MenuItem>
                <MenuItem value="1">Hoạt động</MenuItem>
                <MenuItem value="0">Khóa</MenuItem>
              </Select>
            </FormControl>
          </Box>
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
        <CardContent sx={{ p: 3 }}>
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 700,
              color: textMain,
              mb: 2,
            }}
          >
            Danh sách nghề nghiệp ({filtered.length})
          </Typography>

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
                  {[
                    "Tên nghề",
                    "Danh mục",
                    "Mô tả",
                    "Kỹ năng cần thiết",
                    "Trạng thái",
                    "Ngày tạo",
                    "Thao tác",
                  ].map((head) => (
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
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {filtered.map((career) => (
                  <TableRow
                    key={career.id}
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
                      <Typography
                        sx={{
                          fontSize: 14,
                          fontWeight: 700,
                          color: textMain,
                          minWidth: 150,
                        }}
                      >
                        {career.tenNghe}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={getCategoryName(career.categoryId)}
                        size="small"
                        sx={{
                          bgcolor: orangeLight,
                          color: "#92400e",
                          fontWeight: 700,
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <Typography
                        title={career.moTa}
                        sx={{
                          maxWidth: 200,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          color: textMuted,
                          fontSize: 14,
                        }}
                      >
                        {career.moTa}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography
                        title={career.kyNangCanThiet}
                        sx={{
                          maxWidth: 220,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          color: textMain,
                          fontSize: 14,
                        }}
                      >
                        {career.kyNangCanThiet}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={career.trangThai === 1 ? "Hoạt động" : "Khóa"}
                        size="small"
                        sx={{
                          bgcolor:
                            career.trangThai === 1 ? "#dcfce7" : "#fee2e2",
                          color:
                            career.trangThai === 1 ? "#15803d" : "#b91c1c",
                          fontWeight: 700,
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <Typography
                        sx={{
                          color: textMuted,
                          fontSize: 14,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {career.ngayTao}
                      </Typography>
                    </TableCell>

                    <TableCell align="right">
                      <Stack
                        direction="row"
                        spacing={0.5}
                        justifyContent="flex-end"
                      >
                        <Button
                          variant="text"
                          size="small"
                          onClick={() => handleEdit(career)}
                          sx={{
                            minWidth: 36,
                            color: orange,
                            "&:hover": { bgcolor: orangeLight },
                          }}
                        >
                          <Edit sx={{ fontSize: 18 }} />
                        </Button>

                        <Button
                          variant="text"
                          size="small"
                          onClick={() => handleDelete(career.id)}
                          sx={{
                            minWidth: 36,
                            color: "#dc2626",
                            "&:hover": { bgcolor: "#fee2e2" },
                          }}
                        >
                          <Delete sx={{ fontSize: 18 }} />
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}

                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8}>
                      <Box sx={{ py: 5, textAlign: "center" }}>
                        <Typography sx={{ color: textMuted }}>
                          Không tìm thấy nghề nghiệp nào.
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