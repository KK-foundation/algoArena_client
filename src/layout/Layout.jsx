import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuthStore } from "../store/useAuthStore";
import { Loader } from "lucide-react";

const Layout = () => {
  const { authUser, checkAuth,isCheckingAuth } = useAuthStore();
   useEffect(() => {
    if (!authUser) {
      checkAuth();
    }
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
