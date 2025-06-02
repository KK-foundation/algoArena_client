import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";


export const useLeaderboardStore  = create((set) => ({
  isLeaderboardGetting: false,
  leaderboard: [],

  getLeaderboard : async () => {
    try {
      set({isLeaderboardGetting: true});
      const res = await axiosInstance.get("user/leaderboard");
      set({leaderboard: res.data.data});
    } catch (error) {
      toast.error(error.response.message);
    } finally {
      set({isLeaderboardGetting: false})
    }
  }
})) 