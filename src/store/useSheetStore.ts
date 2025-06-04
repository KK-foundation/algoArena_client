import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";

export const useSheetStore = create((set, get) => ({
  mySheets: [],
  publicSheets: [],
  currentSheet: null,
  isSheetCreating: false,
  isGettingSheets: false,
  isGettingSheetById: false,
  isUpdatingSheet: false,
  isGettingSheetById: false,

  handleError: (error) => {
    const message = error?.response?.data?.message || "Something went wrong!";
    toast.error(message);
  },

  updateSheetInStore: (updatedSheet) => {
    const mySheets = get().mySheets;
    const updatedSheets = mySheets.map((sheet) =>
      sheet.id === updatedSheet.id ? { ...sheet, ...updatedSheet } : sheet
    );
    set({ mySheets: updatedSheets });
  },

  createSheet: async (finalData) => {
    try {
      set({ isSheetCreating: true });
      const res = await axiosInstance.post("/sheets/create-sheet", finalData);
      set((state) => ({ mySheets: [...state.mySheets, res.data.data] }));
      return res;
    } catch (error) {
      get().handleError(error);
    } finally {
      set({ isSheetCreating: false });
    }
  },

  getAllPublicSheets: async () => {
    try {
      set({ isGettingSheets: true });
      const res = await axiosInstance.get("sheets/public");
      set({ publicSheets: res.data.data });
      return res;
    } catch (error) {
      get().handleError(error);
    } finally {
      set({ isGettingSheets: false });
    }
  },

  getAllMySheets: async () => {
    try {
      set({ isGettingSheets: true });
      const res = await axiosInstance.get("sheets/my-sheets");
      set({ mySheets: res.data.data });
      return res;
    } catch (error) {
      get().handleError(error);
    } finally {
      set({ isGettingSheets: false });
    }
  },

  getMySheetById: async (sheetId) => {
    try {
      set({ isGettingSheetById: true });
      const res = await axiosInstance.get(`sheets/${sheetId}`);
      set({ currentSheet: res.data.data });
      return res;
    } catch (error) {
      get().handleError(error);
    } finally {
      set({ isGettingSheetById: false });
    }
  },

  updateSheet: async (sheetId,formData) => {
    try {
      set({ isUpdatingSheet: true });
      const res = await axiosInstance.post(`sheets/update-sheet/${sheetId}`, formData);
      get().updateSheetInStore(res.data.data);
      return res;
    } catch (error) {
      get().handleError(error);
    } finally {
      set({ isUpdatingSheet: false });
    }
  },

  deleteSheet: async (sheetId) => {
    try {
      await axiosInstance.delete(`sheets/${sheetId}`);
      const mySheets = get().mySheets;
      const updatedSheets = mySheets.filter((item) => item.id !== sheetId);
      set({ mySheets: updatedSheets });
    } catch (error) {
      get().handleError(error);
    }
  },

  addProblemsInSheets: async (sheetId, problemIds) => {
    try {
      const res = await axiosInstance.post(`sheets/add-problems/${sheetId}`, problemIds);
      get().updateSheetInStore(res.data.data);
    } catch (error) {
      get().handleError(error);
    }
  },

  removeProblemsInSheets: async (sheetId, problemIds) => {
    try {
      const res = await axiosInstance.post(`/remove-problems/${sheetId}`, problemIds);
      get().updateSheetInStore(res.data.data);
    } catch (error) {
      get().handleError(error);
    }
  },

  getSheetById: async (sheetId) => {
    try {
      set({isGettingSheetById:true});
      const res = await axiosInstance.get(`/sheets/get-sheet-by-id/${sheetId}`)
      set({currentSheet: res.data.data});
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({isGettingSheetById: false});
    }
  },
  liked: async (userId,sheetId) => {
    try {
      await axiosInstance.post("/sheets/liked",{userId,sheetId});
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

}));
