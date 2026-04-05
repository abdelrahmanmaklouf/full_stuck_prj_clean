import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../services/postService";
import Comments from "../components/Comments";

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const res = await getPost(id);
      setPost(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{post.title}</h1>
      <p>{post.content}</p>

      <hr />

      <Comments postId={id} />
    </div>
  );
}