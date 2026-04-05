import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public Pages
import Home from "./pages/Home";
import CreatePostPage from "./pages/CreatePost";
import Login from "./pages/Login";

// Public Layout
import Layout from "./layout/Layout";

// Admin Layout
import AdminLayout from "./admin/layout/AdminLayout";

// Admin Pages
import PostsList from "./admin/pages/Posts/PostsList";
import CreatePost from "./admin/pages/Posts/CreatePost";
import EditPost from "./admin/pages/Posts/EditPost";
import Comments from "./admin/pages/Comments";
import Categories from "./admin/pages/Categories";
import TagsAdmin from "./admin/pages/TagsAdmin";

// Protected Route
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ================= */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePostPage />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* ================= ADMIN ================= */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="posts" element={<PostsList />} />
          <Route path="posts/new" element={<CreatePost />} />
          <Route path="posts/edit/:id" element={<EditPost />} />

          <Route path="comments" element={<Comments />} />
          <Route path="categories" element={<Categories />} />
          <Route path="tags" element={<TagsAdmin />} />
        </Route>

        {/* ================= 404 ================= */}
        <Route path="*" element={<h2>Page Not Found</h2>} />

      </Routes>
    </BrowserRouter>
  );
}