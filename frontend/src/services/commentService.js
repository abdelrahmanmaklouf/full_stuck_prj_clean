import api from "./api";

// get comments by post
export const getComments = (postId) =>
  api.get(`/comments?postId=${postId}`);

// add comment
export const addComment = (data) =>
  api.post("/comments", data);