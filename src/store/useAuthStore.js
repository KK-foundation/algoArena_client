import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigninUp: false,
  isLoggingIn: false,
  isCheckingAuth: false,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data.data });
    } catch (error) {
      if (error.response?.status === 401) {
        try {
          await axiosInstance.get("/refresh-token");
          const res = await axiosInstance.get("/auth/check");
          set({ authUser: res.data.data });
        } catch (refreshError) {
          set({ authUser: null });
          console.log("Refresh token failed:", refreshError);
        }
      } else {
        set({ authUser: null });
        console.log("Auth check error:", error);
      }
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigninUp: true });

    try {
      const res = await axiosInstance.post("/auth/register", data, {
        withCredentials: true,
      });
      return res;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isSigninUp: false });
    }
  },

  verify: async (otp) => {
    set({ isSigninUp: true });

    try {
      const res = await axiosInstance.post("/auth/verify-account", otp);
      return res;
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigninUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      localStorage.setItem("userInfo", JSON.stringify(res.data.data));
      return res;
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  forgotPassword: async (data) => {
    set({ isSigninUp: true });
    try {
      const res = await axiosInstance.post("/auth/forgot-password", data);
      if(res.data.success) {
        toast.success("Check your email");
      }
      return res;
    } catch (error) {
      toast.error("didn't find your email");
      console.log(error);
    } finally {
      set({ isSigninUp: false });
    }
  },

  resetPassword: async (data) => {
    set({ isSigninUp: true });
    try {
      console.log(data);
      const res = await axiosInstance.post("/auth/reset-password", data);
      return res;
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigninUp: false });
    }
  },

  socialAuth: async (data) => {
    set({ isSigninUp: true });
    try {
      const res = await axiosInstance.post("/auth/social-auth", data);
      return res;
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigninUp: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      localStorage.removeItem("userInfo");
    } catch (error) {
      console.log(error);
      toast.error("Error logging out");
    }
  },
}));
