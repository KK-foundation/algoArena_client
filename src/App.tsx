import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProblemsPage from "./pages/ProblemsPage";
import SheetsPage from "./pages/SheetsPage";
import ContestsPage from "./pages/ContestsPage";
import InterviewPage from "./pages/InterviewPage";
import ProblemSolvePage from "./pages/ProblemSolvePage";
import CreateProblemPage from "./pages/CreateProblemPage";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import Index from "./pages/Index";
import { Outlet } from "react-router-dom";
import AuthCheck from "./components/AuthCheck";
import VerifyAccountPage from "./pages/VerifyAccountPage";
import CreateSheetPage from "./pages/CreateSheetPage";
import InterviewSessionPage from "./pages/InterviewSessionPage";
import InterviewAnalysisPage from "./pages/InterviewAnalysisPage";
import SheetProblemManagerPage from "./pages/SheetProblemManagerPage";
const queryClient = new QueryClient();

const App = () => {
  // const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/verify-account" element={<VerifyAccountPage />} />
            <Route element={<AuthCheck />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/problems" element={<ProblemsPage />} />
              <Route path="/problems/create" element={<CreateProblemPage />} />
              <Route path="/sheets" element={<SheetsPage />} />
              <Route path="/sheets/create" element={<CreateSheetPage />} />
              <Route path="/sheet/:sheetId" element={<SheetProblemManagerPage />} />

              <Route path="/contests" element={<ContestsPage />} />
              <Route path="/interview" element={<InterviewPage />} />
              <Route
                path="/interview-session"
                element={<InterviewSessionPage />}
              />
              <Route
                path="/interview-analysis"
                element={<InterviewAnalysisPage />}
              />
              <Route path="/problem/:id" element={<ProblemSolvePage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/signin" element={<SignInPage />} />
            </Route>
            <Route path="/signup" element={<SignUpPage />} />

            {/* <Route
              path="/signin"
              element={
                !userInfo ? <SignInPage /> : <Navigate to={"/dashboard"} />
              }
            />
            <Route
              path="/signup"
              element={
                !userInfo ? <SignUpPage /> : <Navigate to={"/dashboard"} />
              } /> */}
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
