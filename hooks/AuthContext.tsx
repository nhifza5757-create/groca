"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => { success: boolean; error?: string };
  register: (name: string, email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "groca_user";

// Demo ke liye — real backend/database nahi hai, isliye "registered users"
// list bhi localStorage mein hi rakhte hain taake login/register dono kaam karein.
const USERS_KEY = "groca_registered_users";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        // ignore corrupt data
      }
    }
  }, []);

  const getRegisteredUsers = (): Record<string, { name: string; password: string }> => {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
    } catch {
      return {};
    }
  };

  const register = (name: string, email: string, password: string) => {
    const users = getRegisteredUsers();
    if (users[email]) {
      return { success: false, error: "Is email se pehle hi account bana hua hai." };
    }
    users[email] = { name, password };
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    const newUser = { name, email };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    setUser(newUser);
    return { success: true };
  };

  const login = (email: string, password: string) => {
    const users = getRegisteredUsers();
    const record = users[email];
    if (!record || record.password !== password) {
      return { success: false, error: "Email ya password galat hai." };
    }
    const loggedInUser = { name: record.name, email };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}