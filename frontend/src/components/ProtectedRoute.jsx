import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  try {
    const decoded = jwtDecode(token);

    if (
      allowedRoles &&
      !allowedRoles.includes(decoded.role)
    ) {
      return <Navigate to="/" replace />;
    }

    return children;

  } catch (error) {
    localStorage.removeItem("access_token");
    return <Navigate to="/" replace />;
  }
}

export default ProtectedRoute;