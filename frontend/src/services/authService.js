
import api from "./api";

export const login = (data) => api.post("/auth/login", data);