import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../libs/axios";

export const useUserStore = create((set) => ({
  isLoading: false,
  isUpLoadingImage: false,
  userInfo: null,
  totalSolved: null,
  yearlyGrid: [],
  streak: 0,

  uploadingImage: async (formData) => {
    try {
      set({ isUpLoadingImage: true });
      const res = await axiosInstance.post("/user/image", formData);
      return res;
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUpLoadingImage: false });
    }
  },
  updateProfile: async (data) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.post("/user/update-profile", data);
      return res;
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },
  getStreak: async () => {
    try {
      const res = await axiosInstance.get("/user/streak");
      set({streak: res.data.data});
      return res;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  getTotal: async () => {
    try {
      const res = await axiosInstance.get("/user/total-solved");
      set({totalSolved: res.data.data});
      return res;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
}));
