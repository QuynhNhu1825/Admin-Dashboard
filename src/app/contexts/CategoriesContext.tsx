import { createContext, useContext, useState, ReactNode } from "react";

export interface Category {
  id: string;
  tenDanhMuc: string;
  moTa: string;
  trangThai: number; // 1: Hoạt động, 0: Khóa
}

const initialCategories: Category[] = [
  {
    id: "1",
    tenDanhMuc: "Công nghệ thông tin",
    moTa: "Các ngành nghề liên quan đến lập trình, phần mềm và hệ thống mạng.",
    trangThai: 1,
  },
  {
    id: "2",
    tenDanhMuc: "Marketing",
    moTa: "Các ngành nghề liên quan đến tiếp thị, truyền thông và quảng cáo.",
    trangThai: 1,
  },
  {
    id: "3",
    tenDanhMuc: "Tài chính - Ngân hàng",
    moTa: "Nhóm ngành liên quan đến quản lý tài chính, kế toán và đầu tư.",
    trangThai: 1,
  },
  {
    id: "4",
    tenDanhMuc: "Y tế - Sức khỏe",
    moTa: "Các ngành liên quan đến y học, dược phẩm và chăm sóc sức khỏe.",
    trangThai: 1,
  },
  {
    id: "5",
    tenDanhMuc: "Giáo dục",
    moTa: "Giảng dạy, đào tạo và nghiên cứu học thuật.",
    trangThai: 1,
  },
  {
    id: "6",
    tenDanhMuc: "Kỹ thuật - Xây dựng",
    moTa: "Thiết kế, thi công và quản lý công trình xây dựng.",
    trangThai: 0,
  },
];

interface CategoriesContextType {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  activeCategories: Category[];
}

const CategoriesContext = createContext<CategoriesContextType | null>(null);

export function CategoriesProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  const activeCategories = categories.filter(
    (category) => category.trangThai === 1
  );

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        setCategories,
        activeCategories,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}

export function useCategories() {
  const context = useContext(CategoriesContext);

  if (!context) {
    throw new Error("useCategories must be used inside CategoriesProvider");
  }

  return context;
}