import { useEffect, useState } from "react";
import api from "../../services/api";

export default function TagsAdmin() {
  const [tags, setTags] = useState([]);
  const [name, setName] = useState("");

  const fetchTags = async () => {
    const res = await api.get("/tags");
    setTags(res.data);
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const addTag = async () => {
    await api.post("/tags", { name });
    setName("");
    fetchTags();
  };

  const deleteTag = async (id) => {
    await api.delete(`/tags/${id}`);
    fetchTags();
  };

  return (
    <div>
      <h2>Tags</h2>

      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={addTag}>Add</button>

      {tags.map((t) => (
        <div key={t.id}>
          {t.name}
          <button onClick={() => deleteTag(t.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}