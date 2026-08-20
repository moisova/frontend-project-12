import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const PrivateRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default PrivateRoute;
