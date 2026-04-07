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
      const { data } = await api.get(`/posts/${id}`);
      setPost(data.post || data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p style={styles.center}>Loading...</p>;
  if (!post) return <p style={styles.center}>Post not found</p>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>{post.title}</h1>

        <p style={styles.content}>{post.content}</p>

        <hr style={{ margin: "20px 0" }} />

        <Comments postId={id} />
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "800px",
    margin: "auto",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  },
  title: {
    marginBottom: "15px",
  },
  content: {
    lineHeight: "1.6",
    color: "#444",
  },
  center: {
    textAlign: "center",
    marginTop: "50px",
  },
};