import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import PostDetails from "../pages/PostDetails";
import CreatePost from "../pages/CreatePost";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/create" element={<CreatePost />} />
      </Routes>
    </BrowserRouter>
  );
}