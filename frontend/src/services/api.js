import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Global error handling
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.response?.status;

    console.error("API Error:", err.response?.data || err.message);

    if (status === 401) {
      localStorage.removeItem("token");

      // redirect to login
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(err);
  }
);

export default api;


//import axios from "axios";

// const api = axios.create({
//   baseURL: "https://fullstuckprjclean-production.up.railway.app/api",
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// export default api;