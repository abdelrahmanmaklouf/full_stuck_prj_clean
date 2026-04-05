import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "../admin/pages/AdminLayout";

import Dashboard from "../admin/pages/Dashboard";
import PostsAdmin from "../admin/pages/PostsAdmin";
import CommentsAdmin from "../admin/pages/CommentsAdmin";
import CategoriesAdmin from "../admin/pages/CategoriesAdmin";
import TagsAdmin from "../admin/pages/TagsAdmin";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="posts" element={<PostsAdmin />} />
          <Route path="comments" element={<CommentsAdmin />} />
          <Route path="categories" element={<CategoriesAdmin />} />
          <Route path="tags" element={<TagsAdmin />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}