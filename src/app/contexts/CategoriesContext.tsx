import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { apiRequest } from "../services/api";

export interface Category {
  id: string;
  tenDanhMuc: string;
  moTa: string;
  trangThai: number; // 1: Hoạt động, 0: Khóa
}

interface CategoriesContextType {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  activeCategories: Category[];
  refreshCategories: () => Promise<void>;
}

const CategoriesContext = createContext<CategoriesContextType | null>(null);

export function CategoriesProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([]);

  const refreshCategories = async () => {
    try {
      const res = await apiRequest("/admin/categories");
      if (res.success) {
        setCategories(res.categories || []);
      }
    } catch (e) {
      console.error("Refresh categories error:", e);
    }
  };

  useEffect(() => {
    refreshCategories();
  }, []);

  const activeCategories = categories.filter(
    (category) => category.trangThai === 1
  );

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        setCategories,
        activeCategories,
        refreshCategories,
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