import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import toast from "daisyui/components/toast";

export const useProblemStore = create((set) => ({
  problems: [],
  problem: null,
  solvedProblems: [],
  isProblemsLoading: false,
  isProblemLoading: false,
  createdByUserProblems: [],

  // get all problems
  getAllProblems: async () => {
    try {
      set({ isProblemsLoading: true });
      const res = await axiosInstance.get("/problems/get-all-problems");
      set({ problems: res.data.data });
    } catch (error) {
      toast.error(error.response.message);
    } finally {
      set({ isProblemsLoading: false });
    }
  },
  getSolvedProblemByUser: async () => {
    try {
      const res = await axiosInstance.get("/problems/get-solved-problems");
      set({ solvedProblems: res.data.data });
    } catch (error) {
      toast.error(error.response.message);
    }
  },
  getAllProblemCreatedByUser: async () => {
    try {
      const res = await axiosInstance.get("/problems/problem-created-by-user");
      set({
        createdByUserProblems: res.data.data,
      });
    } catch (error) {
      toast.error(error.response.message);
    }
  },
  getProblemById: async (id) => {
    try {
      set({ isProblemLoading: true });
      const res = await axiosInstance.get(`/problems/get-problem/${id}`);
      set({ problem: res.data.data });
    } catch (error) {
      toast.error(error.response.message);
    } finally {
      set({ isProblemLoading: false });
    }
  },
}));
