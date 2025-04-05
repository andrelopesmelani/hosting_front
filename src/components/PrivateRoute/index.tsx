import { Navigate, Outlet } from "react-router-dom";

interface Props {
  allowedRoles: number[];
}

const PrivateRoute = ({ allowedRoles }: Props) => {
  const token = localStorage.getItem("auth");
  const role = parseInt(localStorage.getItem("role") || "-1");

  if (!token) return <Navigate to="/" replace />;
  if (!allowedRoles.includes(role)) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default PrivateRoute;
