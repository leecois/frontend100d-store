import { ThemeToggle } from "@/components/theme-toggle";
import H4 from "@/components/typo/H4";
import { NavLink } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

import { useAuthStore } from "@/store/authStore";

const Navbar = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <header className="fixed top-0 overflow-hidden w-full flex items-center justify-between px-4 h-16 z-10 border-b">
      <NavLink to="/">
        <H4>Watch Store</H4>
      </NavLink>

      <div className="flex items-center justify-center gap-4">
        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src="path/to/avatar.jpg" alt="User Avatar" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={handleLogout}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <NavLink
              to="/auth/login"
              className="h-10 w-20 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
            >
              Login
            </NavLink>
            <NavLink
              to="/auth/signup"
              className="h-10 w-20 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
            >
              SignUp
            </NavLink>
          </>
        )}
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Navbar;
