import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import AdminDashboard from "./admin/pages/Dashboard";
import EditPost from "./admin/pages/Posts/EditPost";

// Admin Pages
import PostsList from "./admin/pages/Posts/PostsList";
import CreatePostAdmin from "./admin/pages/PostsAdmin";

// أضف الاستيراد
import PostDetails from "./pages/PostDetails";


// Layouts
import MainLayout from "./layout/MainLayout";
import AdminLayout from "./admin/layout/AdminLayout";

// Guards
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import PublicRoute from "./routes/PublicRoute";

// Auth
import { useAuth } from "./context/AuthContext";

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <BrowserRouter>
      <Routes>

        {/* 🏠 Landing Page (Public Open) */}
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<PostDetails />} />

        {/* 🔓 Public Auth Pages */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* 👤 Protected User Area */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/create" element={<CreatePost />} />
        </Route>

        {/* 👑 Admin Area */}
        <Route
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/posts" element={<PostsList />} />
          <Route path="/admin/posts/create" element={<CreatePostAdmin />} />
          <Route path="/admin/posts/edit/:id" element={<EditPost />} />
        </Route>

        {/* ❌ Fallback */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;