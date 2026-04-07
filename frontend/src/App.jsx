import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import PostDetails from "./pages/PostDetails";

// Admin Pages
import AdminDashboard from "./admin/pages/Dashboard";
import PostsList from "./admin/pages/Posts/PostsList";
import CreatePostAdmin from "./admin/pages/PostsAdmin";
import EditPost from "./admin/pages/Posts/EditPost";

// Layout (Unified)
import MainLayout from "./layout/MainLayout";

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

        {/* 🧱 Unified Layout لكل الصفحات */}
        <Route path="/" element={<MainLayout />}>
          
          {/* 🏠 Public Pages */}
          <Route index element={<Home />} />
          <Route path="posts/:id" element={<PostDetails />} />

          {/* 🔓 Auth Pages */}
          <Route
            path="login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          {/* 👤 User Protected */}
          <Route
            path="create"
            element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }
          />

          {/* 👑 Admin Protected */}
          <Route
            path="admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          <Route
            path="admin/posts"
            element={
              <AdminRoute>
                <PostsList />
              </AdminRoute>
            }
          />

          <Route
            path="admin/posts/create"
            element={
              <AdminRoute>
                <CreatePostAdmin />
              </AdminRoute>
            }
          />

          <Route
            path="admin/posts/edit/:id"
            element={
              <AdminRoute>
                <EditPost />
              </AdminRoute>
            }
          />

        </Route>

        {/* ❌ Fallback */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;