import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { user, loading, token } = useAuth();

  if (loading) return <p>Loading...</p>;

  // لو مفيش login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // لو user مش موجود أو مش admin
  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}