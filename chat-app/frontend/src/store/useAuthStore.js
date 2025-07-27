import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,


  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    //   get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    }
    finally {
      set({ isCheckingAuth: false });
    }
  },



    signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      
      toast.success("Signup successful!");
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("Signup failed. Please try again.");
    } finally {
      set({ isSigningUp: false });
    }
    },


    login: async (data) => {
  set({ isLoggingIn: true });
  try {
    const res = await axiosInstance.post("/auth/login", data); // data must include email + password
    set({ authUser: res.data });
    toast.success("Login successful!");
  } catch (error) {
    console.error("Error during login:", error);
    toast.error("Login failed. Please check your credentials.");
  } finally {
    set({ isLoggingIn: false });
  }
},



    logout: async () => {
      set({ isLoggingOut: true });
      try {
        await axiosInstance.post("/auth/logout");
        set({ authUser: null });
        toast.success("Logout successful!");
      } catch (error) {
        console.error("Error during logout:", error);
        toast.error("Logout failed. Please try again.");
      } finally {
        set({ isLoggingOut: false });
      }
    },

    updateProfile: async (formData) => {
      set({ isUpdatingProfile: true });
      try {
        const res = await axiosInstance.put("/auth/update-profile", data);
        set({ authUser: res.data });
        toast.success("Profile updated successfully!");
      } catch (error) {
        console.error("Error during profile update:", error);
        toast.error("Profile update failed. Please try again.");
      } finally {
        set({ isUpdatingProfile: false });
      }
    }
}));
