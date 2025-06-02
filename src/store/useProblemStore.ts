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

interface PaginationData {
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

interface FilterQuery {
  search?: string;
  difficulty?: string;
  tags?: string;
  filter?: string;
}

interface ProblemState {
  problems: PaginationData | null;
  problem: Problem | null;
  solvedProblems: ProblemSolved[];
  createdByUserProblems: Problem[];
  top3Problems: Problem[];
  companiesChallenges: any[];
  filteredProblems: Problem[];
  tags: string[];
  isCreatingProblem: boolean;
  isProblemsLoading: boolean;
  isProblemLoading: boolean;
  isTop3ProblemsLoading: boolean;

  createProblem: (problem: FormData) => Promise<any>;
  getProblemById: (id: string) => Promise<void>;
  getAllProblems: (page: number) => Promise<void>;
  getSolvedProblemByUser: () => Promise<void>;
  getAllProblemCreatedByUser: () => Promise<void>;
  getTop3Problems: () => Promise<void>;
  getAllCompaniesChallenges: () => Promise<any>;
  getAllTags: () => Promise<any>;
  applyFilters: (query: FilterQuery,currentUserId:string) => void;
}

export const useProblemStore = create<ProblemState>((set, get) => ({
  problems: null,
  problem: null,
  solvedProblems: [],
  createdByUserProblems: [],
  top3Problems: [],
  companiesChallenges: [],
  filteredProblems: [],
  tags: [],
  isProblemsLoading: false,
  isProblemLoading: false,
  isCreatingProblem: false,
  isTop3ProblemsLoading: false,

  createProblem: async (problem) => {
    try {
      set({ isCreatingProblem: true });
      const res = await axiosInstance.post("/problems/create-problem", problem);
      toast.success(res.data.message);
      return res.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create problem");
      throw error;
    } finally {
      set({ isCreatingProblem: false });
    }
  },

  getAllProblems: async (page) => {
    try {
      set({ isProblemsLoading: true });
      const res = await axiosInstance.get(
        `/problems/get-all-problems?page=${page}`
      );
      set({ problems: res.data.data });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch problems");
    } finally {
      set({ isProblemsLoading: false });
    }
  },

  getProblemById: async (id) => {
    try {
      set({ isProblemLoading: true });
      const res = await axiosInstance.get(`/problems/get-problem/${id}`);
      set({ problem: res.data.data });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch problem");
    } finally {
      set({ isProblemLoading: false });
    }
  },

  getSolvedProblemByUser: async () => {
    try {
      const res = await axiosInstance.get("/problems/get-solved-problems");
      set({ solvedProblems: res.data.data });
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to fetch solved problems"
      );
    }
  },

  getAllProblemCreatedByUser: async () => {
    try {
      const res = await axiosInstance.get("/problems/problem-created-by-user");
      set({ createdByUserProblems: res.data.data });
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to fetch created problems"
      );
    }
  },

  getTop3Problems: async () => {
    try {
      set({ isTop3ProblemsLoading: true });
      const res = await axiosInstance.get("/problems/get-most-solved-3problem");
      set({ top3Problems: res.data.data });
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to fetch top problems"
      );
    } finally {
      set({ isTop3ProblemsLoading: false });
    }
  },

  getAllCompaniesChallenges: async () => {
    try {
      const res = await axiosInstance.get(
        "/problems/get-all-companies-challenges"
      );
      set({ companiesChallenges: res.data.data });
      return res.data.data;
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to fetch challenges"
      );
      throw error;
    }
  },

  getAllTags: async () => {
    try {
      const res = await axiosInstance.get("/problems/get-all-tags");
      set({ tags: res.data.data });
      return res.data.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch tags");
      throw error;
    }
  },

  applyFilters: (query,currentUserId) => {
    const all = get().problems?.problems ?? [];
    let filtered = [...all];

    if (query.search) {
      const s = query.search.toLowerCase();
      filtered = filtered.filter((p) => p.title.toLowerCase().includes(s));
    }

    if (query.difficulty) {
      filtered = filtered.filter(
        (p) => p.difficulty.toLowerCase() === query.difficulty.toLowerCase()
      );
    }

    if (query.tags) {
      const tagList = query.tags.split(",").map((t) => t.trim().toLowerCase());
      filtered = filtered.filter((p) =>
        tagList.every((tag) => p.tags.map((t) => t.toLowerCase()).includes(tag))
      );
    }

    if (query.filter) {
      const filterList = query.filter
        .split(",")
        .map((f) => f.trim().toLowerCase());

      filtered = filtered.filter((p) => {
        const isSolved = p.solvedBy?.includes(currentUserId); // boolean

        if (filterList.includes("solved") && isSolved) return true;
        if (filterList.includes("unsolved") && !isSolved) return true;
        return false;
      });
    }

    set({ filteredProblems: filtered });
  },
}));
