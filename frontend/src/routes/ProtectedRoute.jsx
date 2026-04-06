import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { token, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}