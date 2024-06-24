import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Auth from "@/pages/Auth";
import Navbar from "@/components/navbar";
import Providers from "@/components/providers";

import { Login } from "@/pages/Auth/Login";
import { SignUp } from "@/pages/Auth/Signup";
import { GoogleCallback } from "@/pages/Auth/GoogleCallback";
import { useAuthStore } from "@/store/authStore";
import RedirectIfAuthenticated from "./hooks/isAuth";
import { useEffect } from "react";
import WatchDetail from "./pages/WatchDetail";
import { Setting } from "./pages/Setting";
import { ResetPassword } from "./pages/ResetPassword";
import { ChangePassword } from "./pages/ChangePassword";

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
          <Route>
            <Route path="/" element={<Home />} />
            <Route path="/watch/:id" element={<WatchDetail />} />
            <Route path="/setting" element={<Setting />} />
           
            <Route path="/change-password" element={<ChangePassword />} />
          </Route>
          <Route element={<RedirectIfAuthenticated />}>
            <Route path="/auth" element={<Auth />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<SignUp />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>
          <Route path="/auth/google/callback" element={<GoogleCallback />} />
        </Routes>
      </BrowserRouter>
    </Providers>
  );
}

export default App;
