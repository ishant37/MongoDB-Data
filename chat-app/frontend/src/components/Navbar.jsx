// Navbar.jsx
import React from "react";
import { LogOut, Settings, User, MessageCircle } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { logout, authUser } = useAuthStore();

  return (
    <nav className="flex items-center justify-between bg-gray-900 text-white px-6 py-3 shadow">
      {/* Logo Section */}
      <div className="flex items-center space-x-2">
        <MessageCircle size={20} />
        <span className="text-lg font-semibold">
          Talkative<span className="ml-1">🧏‍♀️</span>
        </span>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-1 hover:text-gray-300 cursor-pointer">
          <Settings size={18} />
          <span>Settings</span>
        </div>

        {authUser && (
          <>
            <div className="flex items-center space-x-1 hover:text-gray-300 cursor-pointer">
              <User size={18} />
              <span>Profile</span>
            </div>
            <div
              onClick={logout}
              className="flex items-center space-x-1 hover:text-gray-300 cursor-pointer"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
