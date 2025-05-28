import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import toast from "react-hot-toast";

export const useExecutionStore = create((set) => ({
  isExecuting: false,
  isExecutingRun: false,
  submitResult: null,
  testCaseResult: null,

  executeSubmit: async (
    source_code,
    language_id,
    problemId
  ) => {
    try {
      set({ isExecuting: true });
      const res = await axiosInstance.post("/execute-code/submit", {
        source_code,
        language_id,
        problemId,
      });

      set({ submitResult: res.data.data });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.message);
    } finally {
      set({ isExecuting: false });
    }
  },
  executeRun: async (source_code, language_id, problemId) => {
    try {
      set({ isExecutingRun: true });
      const res = await axiosInstance.post("/execute-code/run", {
        source_code,
        language_id,
        problemId,
      });

      set({ testCaseResult: res.data.data });
    } catch (error) {
      toast.error(error.response.message);
    } finally {
      set({ isExecutingRun: false });
    }
  },
}));
