import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

const ProtectedRoute = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return isLoggedIn ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default ProtectedRoute;
