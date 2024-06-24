import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useAuthStore } from "@/store/authStore";

// Components
import Navbar from "@/components/navbar";
import Providers from "@/components/providers";
import RedirectIfAuthenticated from "./hooks/isAuth";

// Pages
import Home from "@/pages/Home";
import Auth from "@/pages/Auth";
import WatchDetail from "./pages/WatchDetail";
import { Setting } from "./pages/Setting";
import { Login } from "@/pages/Auth/Login";
import { SignUp } from "@/pages/Auth/Signup";
import { GoogleCallback } from "@/pages/Auth/GoogleCallback";
import { ResetPassword } from "./pages/ResetPassword";
import { ChangePassword } from "./pages/ChangePassword";
import { NotFound } from "./pages/NotFound";

const ErrorFallback = ({ error }: { error: Error }) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
};

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Providers>
        <BrowserRouter>
          <Navbar />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/watch/:id" element={<WatchDetail />} />
              <Route path="/setting" element={<Setting />} />
              <Route path="/change-password" element={<ChangePassword />} />

              <Route element={<RedirectIfAuthenticated />}>
                <Route path="/auth" element={<Auth />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/signup" element={<SignUp />} />
                <Route path="/reset-password" element={<ResetPassword />} />
              </Route>

              <Route
                path="/auth/google/callback"
                element={<GoogleCallback />}
              />

              {/* Catch-all route for 404 Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </Providers>
    </ErrorBoundary>
  );
}

export default App;
