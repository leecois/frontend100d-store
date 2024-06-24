import { ThemeToggle } from "@/components/theme-toggle";
import H4 from "@/components/typo/H4";
import { NavLink, useNavigate } from "react-router-dom";
import { UserCircle as CircleUser } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

const Navbar = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  const handleMyAccount = () => {
    navigate("/setting");
  };

  return (
    <header className="fixed top-0 w-full flex items-center justify-between px-8 md:px-16 lg:px-32 h-16 z-10 border-b bg-white shadow-md">
      <NavLink to="/">
        <H4 className="text-gray-900 font-bold">Watch Store</H4>
      </NavLink>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full shadow-md hover:shadow-lg transition-shadow">
                <CircleUser className="h-6 w-6 text-gray-700" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white shadow-lg rounded-md">
              <DropdownMenuLabel className="font-semibold text-gray-800">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="border-gray-200" />
              <DropdownMenuItem onSelect={handleMyAccount} className="hover:bg-gray-100">
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="border-gray-200" />
              <DropdownMenuItem onSelect={handleLogout} className="hover:bg-gray-100">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <NavLink
              to="/auth/login"
              className="h-10 w-24 flex items-center justify-center rounded-md text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Login
            </NavLink>
            <NavLink
              to="/auth/signup"
              className="h-10 w-24 flex items-center justify-center rounded-md text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Sign Up
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
