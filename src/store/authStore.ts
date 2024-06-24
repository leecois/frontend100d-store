import { create } from "zustand";

interface User {
  _id: string;
  membername: string;
  email: string;
  YOB: number;
  isAdmin: boolean;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,
  login: (token: string, user: User) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    set({ isLoggedIn: true, user });
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ isLoggedIn: false, user: null });
  },
  checkAuth: () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      set({ isLoggedIn: true, user: JSON.parse(user) });
    } else {
      set({ isLoggedIn: false, user: null });
    }
  },
}));
