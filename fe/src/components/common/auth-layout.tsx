import { useEffect } from "react"
import { matchPath, useLocation, Navigate, Outlet } from "react-router-dom"
import ROUTES from "@/routes"
import useAuthStore from "@/store/auth"
import Spinner from "@/widgets/spinner"




const AuthLayout = ()  => {
  const { HOME, LOGIN } = ROUTES;
  const location = useLocation();
  const { isAuthenticated, isLoading, init } = useAuthStore((state) => state);
  const publicRoutes = [HOME, LOGIN, "/u/:token"];
  const protectedRoutes = [`/chat`];
  const isProtectedRoute = protectedRoutes.some((route) =>matchPath(route, location.pathname));
  const isPublicRoute = publicRoutes.some((route) =>matchPath(route, location.pathname));

  useEffect(()=>{
    init();
  }, [init])

  if(isLoading) return <Spinner />
  
  if (isAuthenticated && isProtectedRoute || (!isAuthenticated && isPublicRoute)) {
    return <Outlet />;
  } else if (!isAuthenticated && isProtectedRoute) {
    return <Navigate to="/" state={{ from: location }} replace />;
  } else {
    console.log('homne last')
    return <Navigate to="/chat" />;
  }
}

export default AuthLayout