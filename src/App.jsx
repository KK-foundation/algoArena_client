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
import SsoCallback from "./pages/SsoCallback";
import Profile from "./pages/Profile";
import Problems from "./pages/Problems";
import Sheets from "./pages/Sheets";
import SheetDetail from "./pages/SheetDetail";
import ProblemDetail from "./pages/ProblemDetail";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

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
  console.log("App")
  return (
    <div className="bg-[#212326] w-full h-full text-[#e0e0e0]">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route
            path="/profile/:username"
            element={userInfo ? <Profile /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/problems"
            element={userInfo ? <Problems /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/problem/:problemId"
            element={userInfo ? <ProblemDetail /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/sheets"
            element={userInfo ? <Sheets /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/sheet/:sheetId"
            element={userInfo ? <SheetDetail /> : <Navigate to={"/login"} />}
          />
        </Route>
        <Route
          path="/login"
          element={!userInfo ? <LoginPage /> : <Navigate to={"/problems"} />}
        />
        <Route
          path="/signup"
          element={!userInfo ? <SignUpPage /> : <Navigate to={"/problems"} />}
        />
        <Route
          path="/verify"
          element={!userInfo ? <VerificationPage /> : <Navigate to={"/problems"} />}
        />
        <Route
          path="/forgot-password"
          element={!userInfo ? <ForgotPassword /> : <Navigate to={"/problems"} />}
        />
        <Route
          path="/reset-password/:token"
          element={!userInfo ? <ResetPassword /> : <Navigate to={"/problems"} />}
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
