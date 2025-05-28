import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import toast from "react-hot-toast";

export const useSheetStore = create((set, get) => ({
  sheets: [],
  sheetCreatedByUser: [],
  currentSheet: null,
  isLoading: false,
  isLoadingSheetById: false,
  error: null,

  createSheet: async (data) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.post("/sheets/create-sheet", data);
      set({ currentSheet: res.data.data });
    } catch (error) {
      toast.error(error.response.message);
    } finally {
      set({ isLoading: false });
    }
  },
  getSheetById: async (sheetId) => {
    try {
      set({ isLoadingSheetById: true });
      const res = await axiosInstance.get(`/sheets/${sheetId}`);
      set({ currentSheet: res.data.data });
    } catch (error) {
      toast.error(error.response.message);
    } finally {
      set({ isLoadingSheetById: false });
    }
  },

  insertProblems: async (sheetId, problemIds) => {
    try {
      const res = await axiosInstance.post(`sheets/${sheetId}/add-problems`, {problemIds});
      toast.success(res.data.message)
      return res;
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message);
    }
  },
  removeProblem: async (sheetId, problemIds) => {
    try {
      const res = await axiosInstance.post(`/sheets/${sheetId}/remove-problem`,{problemIds});
      toast.success(res.data.message);
      return res;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  deleteSheet: async (sheetId) => {
    try {
      const res = await axiosInstance.delete(`/sheets/${sheetId}`);

      toast.success(res.data.message);
      return res;
    } catch (error) {
      toast.error(error.response.data.success);
    }
  },

  getTopThreeSheets: async () => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.get("/sheets/top-three-sheet");
      console.log(response);
      return response.data;
    } catch (error) {
      toast.error(error.response.message);
    } finally {
      set({ isLoading: false });
    }
  },
  getSheetCreatedByUser: async () => {
    try {
      const res = await axiosInstance.get("/sheets/sheet-created-By-user");
      set({ sheetCreatedByUser: res.data.data });
    } catch (error) {
      toast.error(error.response.message);
    }
  },
  getAllSheets : async () => {
    try {
      set({isLoading: true})
      const res = await axiosInstance.get("/sheets");
      set({sheets: res.data.data});
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({isLoading: false});
    }
  }
}));
