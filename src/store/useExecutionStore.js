import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import toast from "react-hot-toast";

export const useExecutionStore = create((set) => ({
  isExecuting: false,
  isExecutingRun: false,
  isPlaygroundCodeExecuting: false,
  playgroundResult: null,
  playgroundWrong: null,
  submitResult: null,
  testCaseResult: null,

  executeSubmit: async (source_code, language_id, problemId) => {
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
  playground: async (data) => {
    console.log(data)
    try {
      set({ isPlaygroundCodeExecuting: true });
      const res = await axiosInstance.post("/playground", {
        code:data.code,
        language_id:data.language_id,
      });
      set({ playgroundResult: res.data.data });
    } catch (error) {
      toast.error(error.response.data.message);
      set({playgroundWrong:"source code invalid : Code is incorrect make sure you submit right code"})
    } finally {
      set({ isPlaygroundCodeExecuting: false });
    }
  },
}));
