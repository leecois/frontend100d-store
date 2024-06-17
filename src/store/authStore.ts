import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  login: (token: string) => {
    localStorage.setItem("token", token);
    set({ isLoggedIn: true });
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ isLoggedIn: false });
  },
  checkAuth: () => {
    const token = localStorage.getItem("token");
    set({ isLoggedIn: !!token });
  },
}));
