import React, { useState } from "react";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { User } from "lucide-react";
import { RiLockPasswordLine, RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";

const SignUpPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setIsLoading(true);
    console.log("Registering:", { firstName, lastName, email, password });

    setTimeout(() => {
      console.log("Account Created!");
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 font-sans p-4">
      <div className="w-full max-w-md">
        {/* Form Container */}
        <form
          onSubmit={handleSignUp}
          className="bg-slate-800/50 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-slate-700 w-full space-y-6"
        >
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Create <span className="text-indigo-600">Account</span>
            </h1>
            <p className="text-slate-400 text-sm">
              Let's start your banking journey
            </p>
          </div>

          <div className="space-y-4">
            {/* Name Row */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* First Name */}
              <div className="relative group flex-1">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="First Name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-600 text-white transition-all placeholder:text-slate-500"
                />
              </div>
              {/* Last Name */}
              <div className="relative group flex-1">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-600 text-white transition-all placeholder:text-slate-500"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative group flex-1">
                  <HiOutlineEnvelope
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors"
                    size={18}
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-600 text-white transition-all placeholder:text-slate-500"
                  />
                </div>

                <div className="relative group flex-1">
                  <Phone
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors"
                    size={18}
                  />

                  <input
                    type="text"
                    placeholder="Mobile Number"
                    required
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-600 text-white transition-all placeholder:text-slate-500"
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="relative group">
              <RiLockPasswordLine
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors"
                size={20}
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-600 text-white transition-all placeholder:text-slate-500"
              />
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

            {/* Confirm Password */}
            <div className="relative group">
              <RiLockPasswordLine
                className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                  confirmPassword && password !== confirmPassword
                    ? "text-red-500"
                    : "text-slate-400 group-focus-within:text-indigo-600"
                }`}
                size={20}
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full pl-12 pr-4 py-3 bg-slate-900/50 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all placeholder:text-slate-500 text-white ${
                  confirmPassword && password !== confirmPassword
                    ? "border-red-500 focus:ring-red-500/50"
                    : "border-slate-600 focus:ring-indigo-600/50 focus:border-indigo-600"
                }`}
              />

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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center 
            ${isLoading ? "bg-indigo-800 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-800 text-slate-900"}`}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              "Create Account"
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 py-2">
            <div className="h-px flex grow bg-slate-700"></div>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
              Or signup with
            </span>
            <div className="h-px flex grow bg-slate-700"></div>
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
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 hover:underline font-semibold"
            >
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
