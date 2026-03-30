import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User } from "lucide-react";
import { RiLockPasswordLine, RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { loginUser } from "../api/api";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("admin@bank.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // toast.promise handles the loading, success, and error states in one go
    await toast.promise(
      loginUser(email, password).then((res) => {
        const data = res.data;
        localStorage.setItem("token", data.access_token);
        navigate("/");
        return res; // Pass response to the 'success' message if needed
      }),
      {
        loading: "Authenticating...",
        success: "Welcome back! 🏦",
        error: (err) => {
          // Update the local error box while the toast shows the error
          if (err.response?.status === 401) setError("Wrong password");
          else if (err.response?.status === 404) setError("User not found");
          else setError("Connection failed");

          return err.response?.data?.detail || "Login failed";
        },
      },
    );

    setIsLoading(false);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 font-sans p-4">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleLogin}
          className="bg-slate-800/50 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-slate-700 space-y-6"
        >
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Welcome <span className="text-indigo-600">Back</span>
            </h1>
            <p className="text-slate-400 text-sm">
              Securely access your banking dashboard
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-400 text-sm p-3 rounded-lg text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="relative group">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600"
                size={20}
              />
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                required
              />
            </div>

            <div className="relative group">
              <RiLockPasswordLine
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600"
                size={20}
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? (
                  <RiEyeLine size={20} />
                ) : (
                  <RiEyeOffLine size={20} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-xl font-bold flex items-center justify-center transition-all ${isLoading ? "bg-indigo-800 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}`}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              "Continue"
            )}
          </button>

          <p className="text-center text-slate-400 text-sm">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-600 hover:underline font-semibold"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
