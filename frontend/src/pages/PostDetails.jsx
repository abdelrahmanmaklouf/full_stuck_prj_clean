import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Comments from "../components/Comments";

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/api/posts/${id}`);
      setPost(data.post || data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1>{post.title}</h1>
      <p>{post.content}</p>

      <hr />

      <Comments postId={id} />
    </div>
  );
}