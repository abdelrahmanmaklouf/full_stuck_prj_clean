import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PublicRoute({ children }) {
  const { token, user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (token) {
    if (user?.role === "admin") {
      return <Navigate to="/admin" />;
    }
    return <Navigate to="/" />;
  }

  return children;
}