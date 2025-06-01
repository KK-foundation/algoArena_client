import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "sonner";
import { User } from "@/store/useAuthStore";
import { FormData } from "@/pages/CreateProblemPage";
interface Sheet {
  id: string;
  name: string;
  description: string;
  userId: string;
  visibility: string;
  createdAt: string;
  updatedAt: string;
  problems: Problem[];
  user: User;
}

interface ProblemSolved {
  id: string;
  userId: string;
  problemId: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  problem: Problem;
}

interface ProblemInSheet {
  id: string;
  sheetId: string;
  problemId: string;
  createdAt: string;
  updatedAt: string;
  sheet: Sheet;
  problem: Problem;
}

interface Submission {
  id: string;
  userId: string;
  problemId: string;
  sourceCode: string;
  language: string;
  stdin: string;
  stdout: string;
  stderr: string;
  compileOutput: string;
  status: string;
  memory: string;
  time: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  problem: Problem;
}

export interface Example {
  input: string;
  output: string;
  explanation: string;
}

export interface Example {
  input: string;
  output: string;
  explanation: string;
}

export interface Examples {
  [key: string]: Example;
}

export interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  tags: string[];
  userId: string;
  examples: Examples;
  constraints: string;
  hints: string;
  editorial: {
    code: string;
    explanation: string;
    language: string;
  };
  privateTestcases: string;
  publicTestcases: string;
  codeSnippets: string;
  referenceSolutions: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  submission: Submission[];
  solvedBy: ProblemSolved[];
  problemsSheets: ProblemInSheet[];
  message: string;
}
interface pagination {
  problems: Problem[];
  pagination: {
    currentPage: string;
    totalPages: string;
    totalProblems: string;
    start: string;
    end: string;
    message: string;
  };
}

interface ProblemState {
  problems: pagination;
  problem: Problem;
  solvedProblems: ProblemSolved[];
  isProblemsLoading: boolean;
  isProblemLoading: boolean;
  isCreatingProblem: boolean;
  createdByUserProblems: Problem[];


  getAllProblems: (page: number) => Promise<void>;
  getSolvedProblemByUser: () => Promise<void>;
  getAllProblemCreatedByUser: () => Promise<void>;
  getProblemById: (id: string) => Promise<void>;
  createProblem: (problem: FormData) => Promise<any>;
}

export const useProblemStore = create<ProblemState>((set) => ({
  problems: null,
  problem: null,
  solvedProblems: [],
  isProblemsLoading: false,
  isProblemLoading: false,
  createdByUserProblems: [],
  isCreatingProblem:false,

  // get all problems
  getAllProblems: async (page) => {
    try {
      set({ isProblemsLoading: true });
      const res = await axiosInstance.get(
        `/problems/get-all-problems?page=${page}`
      );
      set({ problems: res.data.data });
      // return res;
    } catch (error) {
      toast.error(error.response.message);
    } finally {
      set({ isProblemsLoading: false });
    }
  },
  getSolvedProblemByUser: async () => {
    try {
      const res = await axiosInstance.get("/problems/get-solved-problems");
      set({ solvedProblems: res.data.data });
    } catch (error) {
      toast.error(error.response.message);
    }
  },
  getAllProblemCreatedByUser: async () => {
    try {
      const res = await axiosInstance.get("/problems/problem-created-by-user");
      set({
        createdByUserProblems: res.data.data,
      });
    } catch (error) {
      toast.error(error.response.message);
    }
  },
  getProblemById: async (id) => {
    try {
      set({ isProblemLoading: true });
      const res = await axiosInstance.get(`/problems/get-problem/${id}`);
      set({ problem: res.data.data });
    } catch (error) {
      toast.error(error.response.message);
    } finally {
      set({ isProblemLoading: false });
    }
  },
  createProblem: async (problem) => {
    try {
      set({ isCreatingProblem: true });
      const res = await axiosInstance.post("/problems/create-problem", problem);
      toast.success(res.data.message);
      return res.data;
    } catch (error) {
      toast.error(error.response.data.message || "Failed to create problem");
      throw error;
    } finally {
      set({ isCreatingProblem: false });
    }
  },
}));
