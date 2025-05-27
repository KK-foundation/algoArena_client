import { create } from "zustand";

export const useUserStore = create((set) =>({
  isLoading:false,
  userInfo: null,
  totalSolved:[],
  yearlyGrid:[],
  streak: 0,

  
}))