import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { AxiosResponse } from "axios";

// Define types for user and payloads
export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  image?: string;
  role?: string;
  localPassword?: string;
  bio?: string;
  currentStreak?: number;
  maxStreak?: number;
  lastSubmission?: Date | string;
  isVerified?: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  problems?: any[]; // Replace `any` with specific problem type if available
  submission?: any[]; // Replace `any` with specific submission type if available
  problemSolved?: number;
  sheets?: any[]; // Replace with actual type if available
  links?: {
    [key: string]: string;
  };
  yearlyGrid?: {
    [year: string]: {
      [day: string]: number;
    };
  };
  achievements?: any[]; // Replace with actual achievement type if available
  badges?: any[]; // Replace with actual badge type if available
  xp?: string;
  level?: string;
  tier?: string;
  hintsUsed?: number;
  editorialUsed?: number;
}

interface SignupData {
  name: string;
  username: string;
  email: string;
  password: string;
}

interface LoginData {
  data: string;
  password: string;
}

interface OtpData {
  otp: string;
}

interface ResetPasswordData {
  token: string;
  password: string;
}

interface SocialAuthData {
  provider: string;
  token: string;
}

interface ForgotPasswordData {
  email: string;
}

interface AuthState {
  authUser: User | null;
  isSigninUp: boolean;
  isLoggingIn: boolean;
  isCheckingAuth: boolean;

  checkAuth: () => Promise<void>;
  signup: (data: SignupData) => Promise<AxiosResponse<any> | void>;
  verify: (otp: OtpData) => Promise<AxiosResponse<any> | void>;
  signin: (data: LoginData) => Promise<AxiosResponse<any> | void>;
  forgotPassword: (
    data: ForgotPasswordData
  ) => Promise<AxiosResponse<any> | void>;
  resetPassword: (
    data: ResetPasswordData
  ) => Promise<AxiosResponse<any> | void>;
  socialAuth: (data: SocialAuthData) => Promise<AxiosResponse<any> | void>;
  logout: () => Promise<AxiosResponse<any> | void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  authUser: null,
  isSigninUp: false,
  isLoggingIn: false,
  isCheckingAuth: false,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data.data });
    } catch (error) {
      if (error.response?.status === 401) {
        try {
          await axiosInstance.get("/refresh-token");
          const res = await axiosInstance.get("/auth/check");
          set({ authUser: res.data.data });
        } catch (refreshError) {
          set({ authUser: null });
          console.log("Refresh token failed:", refreshError);
        }
      } else {
        set({ authUser: null });
        console.log("Auth check error:", error);
      }
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigninUp: true });

    try {
      const res = await axiosInstance.post("/auth/register", data, {
        withCredentials: true,
      });
      return res;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isSigninUp: false });
    }
  },

  verify: async (otp) => {
    set({ isSigninUp: true });

    try {
      const res = await axiosInstance.post("/auth/verify-account", otp);
      return res;
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigninUp: false });
    }
  },

  signin: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      localStorage.setItem("userInfo", JSON.stringify(res.data.data));
      return res;
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  forgotPassword: async (data) => {
    set({ isSigninUp: true });
    try {
      const res = await axiosInstance.post("/auth/forgot-password", data);
      if (res.data.success) {
        toast.success("Check your email");
      }
      return res;
    } catch (error) {
      toast.error("didn't find your email");
      console.log(error);
    } finally {
      set({ isSigninUp: false });
    }
  },

  resetPassword: async (data) => {
    set({ isSigninUp: true });
    try {
      console.log(data);
      const res = await axiosInstance.post("/auth/reset-password", data);
      return res;
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigninUp: false });
    }
  },

  socialAuth: async (data) => {
    set({ isSigninUp: true });
    try {
      const res = await axiosInstance.post("/auth/social-auth", data);
      return res;
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigninUp: false });
    }
  },

  logout: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      localStorage.removeItem("userInfo");
      return res;
    } catch (error) {
      console.log(error);
      toast.error("Error logging out");
    }
  },
}));
