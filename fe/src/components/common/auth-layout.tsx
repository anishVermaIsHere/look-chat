import { type ReactNode } from "react"
import { matchPath, useLocation, Navigate, Outlet } from "react-router-dom"
import ROUTES from "@/routes"
import useAuthStore from "@/store/auth"




const AuthLayout = ({ children }: { children?: ReactNode })  => {
  const { HOME, LOGIN } = ROUTES;
  const location = useLocation();
  const { isAuthenticated } = useAuthStore((state) => state);
  const publicRoutes = [HOME, LOGIN, "/u/:token"];
  const protectedRoutes = [`/chat`];
  const isProtectedRoute = protectedRoutes.some((route) =>matchPath(route, location.pathname));
  const isPublicRoute = publicRoutes.some((route) =>matchPath(route, location.pathname));
    
  
  if (isAuthenticated && isProtectedRoute || (!isAuthenticated && isPublicRoute)) {
    return <Outlet />;
  } else if (!isAuthenticated && isProtectedRoute) {
    return <Navigate to="/" state={{ from: location }} replace />;
  } else {
    return <Navigate to="/" />;
  }
}

export default AuthLayout