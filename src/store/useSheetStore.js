import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import toast from "react-hot-toast";

export const useSheetStore = create((set, get) => ({
  sheets: [],
  sheetCreatedByUser: [],
  currentSheet: null,
  isLoading: false,
  error: null,

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
      const res = await axiosInstance.get(
        "/sheets/sheet-created-By-user"
      );
      set({ sheetCreatedByUser: res.data.data });
    } catch (error) {
      toast.error(error.response.message);
    }
  },
}));
