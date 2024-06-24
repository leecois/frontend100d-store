import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function GoogleCallback() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const user = urlParams.get("user");

    if (token && user) {
      const userObj = JSON.parse(decodeURIComponent(user));
      login(token, userObj);
      navigate("/");
    } else {
      navigate("/auth/login");
    }
  }, [login, navigate]);

  return <div>Loading...</div>;
}
