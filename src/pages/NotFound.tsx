import { NavLink } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-lg">Page Not Found</p>
      <NavLink to="/" className="mt-4 text-blue-600">
        Go back to Home
      </NavLink>
    </div>
  );
};

