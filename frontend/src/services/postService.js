import api from "./api";

export const getPosts = () => api.get("/posts");

export const getPost = (id) => api.get(`/posts/${id}`);

// like toggle
export const toggleLike = (postId) =>
  api.post(`/posts/${postId}/like`);

export const createPost = (data) => api.post("/posts", data);

export const deletePost = (id) => api.delete(`/posts/${id}`);