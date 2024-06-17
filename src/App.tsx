import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Auth from "@/pages/Auth";
import Navbar from "@/components/navbar";
import Providers from "@/components/providers";
import ProtectedRoute from "@/components/protected-route";

import { Login } from "@/pages/Auth/Login";
import { SignUp } from "@/pages/Auth/Signup";
import { GoogleCallback } from "@/pages/Auth/GoogleCallback";
import { useAuthStore } from "@/store/authStore";
import RedirectIfAuthenticated from "./hooks/isAuth";
import { useEffect } from "react";

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Providers>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<RedirectIfAuthenticated />}>
            <Route path="/auth" element={<Auth />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<SignUp />} />
          </Route>
          <Route path="/auth/google/callback" element={<GoogleCallback />} />
        </Routes>
      </BrowserRouter>
    </Providers>
  );
}

export default App;
