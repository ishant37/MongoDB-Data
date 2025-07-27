import React, { useState } from "react";
import {
  Mail,
  Eye,
  EyeOff,
  Lock,
  User,
  MessageSquare
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const SignupPage = () => {
  const { signup } = useAuthStore();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const validateForm = () => {
    const { fullName, email, password } = formData;
    if (!fullName || !email || !password) {
      return false;
    }
    // Add more validation logic as needed
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success= validateForm();
    if (success) {
      await signup(formData);
    } else {
      console.error("Form validation failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-gray-800 text-white w-full max-w-md rounded-xl p-8 shadow-lg">
        <div className="flex justify-center mb-6">
          <div className="bg-violet-600 p-3 rounded-full">
            <MessageSquare className="text-white" />
          </div>
        </div>
        <h2 className="text-center text-2xl font-semibold mb-1">Create Account</h2>
        <p className="text-center text-sm text-gray-400 mb-6">Get started with your free account</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div className="relative">
            <User className="absolute top-3.5 left-3 text-gray-400" size={20} />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full bg-gray-900 text-white pl-10 pr-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:border-violet-500"
              required
            />
          </div>

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
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-violet-500 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
