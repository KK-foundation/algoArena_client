import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { Problem } from "./useProblemStore";

export interface Potd {
  id: string;
  date: Date;
  problemId: string;
  userId?: string | null;
  createdAt: Date;
  updatedAt: Date;
  problem: Problem;
  solvedUsers: string[];
}

interface PotdState {
  potd: Potd;
  isPotdGetting: boolean;

  getPotd: () => Promise<void>;
}

export const usePotdStore = create<PotdState>((set) => ({
  isPotdGetting: false,
  potd: null,

  getPotd: async () => {
    try {
      set({ isPotdGetting: true });
      const res = await axiosInstance.get("/potd/get-potd");
      set({ potd: res.data.data });
    } catch (error) {
      console.error("Error fetching POTD:", error);
    } finally {
      set({ isPotdGetting: false });
    }
  },
}));
