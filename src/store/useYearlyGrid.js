import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../libs/axios";

export const useYearlyGrid = create((set) => ({
  isContributionGetting: false,
  contributions: [],
  years: [],

  getYears: async () => {
    try {
      const res = await axiosInstance.get("/yearlyGrid/get-years");
      set({ years: res.data.data });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  getContributions: async (year) => {
    try {
      set({ isContributionGetting: true });
      const res = await axiosInstance.get(`/yearlyGrid/contributions/${year}`);
      set({ contributions: res.data.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isContributionGetting: false });
    }
  },
}));
