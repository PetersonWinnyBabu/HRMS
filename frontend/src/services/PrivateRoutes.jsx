import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const token = localStorage.getItem("auth_token");
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoutes;
