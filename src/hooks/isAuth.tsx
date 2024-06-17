import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

const RedirectIfAuthenticated = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return isLoggedIn ? <Navigate to="/" /> : <Outlet />;
};

export default RedirectIfAuthenticated;
