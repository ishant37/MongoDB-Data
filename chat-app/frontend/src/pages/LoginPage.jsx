import React, { useState } from "react";
import {
  Mail,
  Eye,
  EyeOff,
  Lock,
  LogIn
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const LoginPage = () => {
  const { login } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const validateForm = () => {
    const { email, password } = formData;
    if (!email || !password) {
      return false;
    }
    // Add more validation logic as needed
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login form submitted:", formData);
    const success=validateForm();
    if (success) {
      login(formData);
    } else {
      console.error("Form validation failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-gray-800 text-white w-full max-w-md rounded-xl p-8 shadow-lg">
        <div className="flex justify-center mb-6">
          <div className="bg-violet-600 p-3 rounded-full">
            <LogIn className="text-white" />
          </div>
        </div>
        <h2 className="text-center text-2xl font-semibold mb-1">Login to your account</h2>
        <p className="text-center text-sm text-gray-400 mb-6">Welcome back! Please enter your details</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute top-3.5 left-3 text-gray-400" size={20} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full bg-gray-900 text-white pl-10 pr-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:border-violet-500"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute top-3.5 left-3 text-gray-400" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full bg-gray-900 text-white pl-10 pr-10 py-2 rounded-md border border-gray-700 focus:outline-none focus:border-violet-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-3.5 right-3 text-gray-400 hover:text-gray-200"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 rounded-md transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Don't have an account?{" "}
          <a href="/signup" className="text-violet-500 hover:underline">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
