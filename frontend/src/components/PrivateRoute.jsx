import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ roleRequired }) => {
  const role = localStorage.getItem("role");

  return role === roleRequired ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
