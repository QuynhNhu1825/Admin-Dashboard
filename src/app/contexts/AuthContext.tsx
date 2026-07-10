import React, { createContext, useContext, useState, ReactNode } from 'react';
import { loginAdmin } from '../services/api';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("admin_user");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("admin_token");
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const result = await loginAdmin(email, password);
      if (!result) {
        return false;
      }

      localStorage.setItem("admin_user", JSON.stringify(result.user));
      localStorage.setItem("admin_token", result.token);
      setUser(result.user);
      setToken(result.token);
      return true;
    } catch (error) {
      console.error("Lỗi đăng nhập admin:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("admin_user");
    localStorage.removeItem("admin_token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!user && !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
