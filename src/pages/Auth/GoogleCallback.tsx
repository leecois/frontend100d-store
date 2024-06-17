import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function GoogleCallback() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      login(token);
      navigate("/");
    } else {
      navigate("/auth/login");
    }
  }, [navigate]);

  return <div>Loading...</div>;
}
