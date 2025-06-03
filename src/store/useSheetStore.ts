import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";

export const useSheetStore = create((set, get) => ({
  mySheets: [],
  publicSheets: [],
  isSheetCreating: false,
  isGettingSheets: false,

  createSheet: async (finalData) => {
    try {
      set({ isSheetCreating: true });
      const res = await axiosInstance.post("/sheets/create-sheet", finalData);
      const sheets = get().mySheets;
      set({ mySheets: [...sheets, res.data.data] });
      return res;
    } catch (error) {
      toast.error(error.response.data.message);
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
      toast.error(error.response.data.message);
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
      toast.error(error.response.data.message);
    } finally {
      set({ isGettingSheets: false });
    }
  },
}));
