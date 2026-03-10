import React, { useState } from "react";
import { User } from "lucide-react";
import { RiLockPasswordLine, RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Logging in with:", identifier, password);
    setIsLoading(true);

    setTimeout(() => {
      console.log("Logged in!");
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 font-sans p-4">
      <div className="w-full max-w-md">
        {/* Form Container*/}
        <form
          onSubmit={handleLogin}
          className="bg-slate-800/50 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-slate-700 h-full w-full space-y-6"
        >
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Welcome <span className="text-indigo-600">Back</span>
            </h1>
            <p className="text-slate-400 text-sm">
              Securely access your banking dashboard
            </p>
          </div>

          <div className="space-y-4">
            {/* Email/Mobile Input */}
            <div className="relative group">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors"
                size={20}
              />
              <input
                type="text"
                placeholder="Email or Mobile Number"
                name="identifier"
                id="identifier"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="block w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-600 text-white transition-all required"
              />
            </div>
            <p className="text-xs text-slate-500 px-1">
              We'll send a verification code to this address or number.
            </p>

            {/* Password Input */}
            <div className="relative group">
              <RiLockPasswordLine
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors"
                size={20}
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-600 text-white transition-all placeholder:text-slate-500"
                required
              />
              {/* Password Toggle */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
              >
                {showPassword ? (
                  <RiEyeLine size={20} />
                ) : (
                  <RiEyeOffLine size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <a
              href="#"
              className="text-sm text-yellow-500 hover:text-yellow-400 font-medium transition-colors"
            >
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center 
    ${isLoading ? "bg-indigo-800 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-800"}`}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              "Continue"
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 py-2">
            <div className="h-[1px] flex-grow bg-slate-700"></div>
            <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">
              Or continue with
            </span>
            <div className="h-[1px] flex-grow bg-slate-700"></div>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className="flex items-center justify-center gap-2 border border-slate-600 rounded-xl py-2.5 hover:bg-slate-700 transition-colors text-white text-sm font-medium"
            >
              <FcGoogle size={20} /> Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 border border-slate-600 rounded-xl py-2.5 hover:bg-slate-700 transition-colors text-white text-sm font-medium"
            >
              <FaApple size={20} /> Apple
            </button>
          </div>

          {/* Footer */}
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
