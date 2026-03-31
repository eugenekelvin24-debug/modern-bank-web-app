import axios from "axios";
import { isTokenExpired } from "../utils/auth";
import toast from "react-hot-toast"; 

const api = axios.create({
  baseURL: "https://trust-bank-api-mp7p.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// --- 1. REQUEST INTERCEPTOR (Token Logic) ---
api.interceptors.request.use((config) => {
  if (config.url.includes("/auth")) return config;

  const token = localStorage.getItem("token");
  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("token");
    // No toast here to avoid annoying users during a normal redirect
    window.location.href = "/login";
    return config;
  }

  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// --- 2. RESPONSE INTERCEPTOR (Toast Logic) ---
api.interceptors.response.use(
  (response) => {
    if (
      response.config.method === "post" &&
      response.config.url.includes("/transfer")
    ) {
      toast.success("Transfer completed successfully! 🏦", {
        id: "transfer-success",
      });
    }
    return response;
  },
  (error) => {
    if (!error.response) {
      // ONLY trigger the Retry toast if the server is unreachable
      toast.error("Server Offline. Click to retry.", {
        id: "server-offline",
        duration: 5000,
        onClick: () => window.location.reload(),
      });
    } else {
      const status = error.response.status;
      const message =
        error.response.data?.detail || "An unexpected error occurred.";

      if (status === 401) {
        toast.error("Session expired. Please log in again.", {
          id: "session-expired",
        });
      } else if (status >= 500) {
        toast.error("Server Error: Please try again later.", {
          id: "server-error",
        });
      } else {
        toast.error(message, { id: message });
      }
    }
    return Promise.reject(error);
  },
);

// --- API Methods ---
export const loginUser = (email, password) =>
  api.post("/auth", { email, password });

export const getAccountOverview = async () => {
  const response = await api.get("/account-overview/");
  return response.data;
};

export const getAccounts = () => api.get("/accounts/");

export const recentContacts = async (search = "") => {
  const res = await api.get(`/recent-contacts/?search=${search}`);
  return res.data;
};

export const getTransactions = (search) =>
  api.get(`/transactions/?search=${search || ""}`);

export const userSummary = async () => {
  const res = await api.get("/user-summary/");
  return res.data;
};

export const getAnalytics = async () => {
  const res = await api.get("/analytics/");
  return res.data;
};

export const getUser = async () => {
  const res = await api.get("/user/");
  return res.data;
};

export default api;
