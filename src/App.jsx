import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Layout from "./layout/Layout";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import VerificationPage from "./pages/VerificationPage";
// import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import SsoCallback from "./pages/SsoCallback";
import Profile from "./pages/Profile";
import Problems from "./pages/Problems";
import Sheets from "./pages/Sheets";
import SheetDetail from "./pages/SheetDetail";
import ProblemDetail from "./pages/ProblemDetail";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  return (
    <div className="bg-[#212326] w-full h-full text-[#e0e0e0]">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route
            path="/profile"
            element={authUser ? <Profile /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/problems"
            element={authUser ? <Problems /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/problem/:problemId"
            element={authUser ? <ProblemDetail /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/sheets"
            element={authUser ? <Sheets /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/sheet/:sheetId"
            element={authUser ? <SheetDetail /> : <Navigate to={"/login"} />}
          />
        </Route>
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/verify"
          element={!authUser ? <VerificationPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/forgot-password"
          element={!authUser ? <ForgotPassword /> : <Navigate to={"/"} />}
        />
        <Route
          path="/reset-password/:token"
          element={!authUser ? <ResetPassword /> : <Navigate to={"/"} />}
        />
        <Route
          path="/sso-callback"
          element={!authUser ? <SsoCallback /> : <Navigate to={"/"} />}
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
