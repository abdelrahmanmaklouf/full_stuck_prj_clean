import { useState } from "react";
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      // خزّن التوكن
      localStorage.setItem("token", res.data.token);

      alert("Login successful");

      // تحويل لصفحة home
      window.location.href = "/";
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}