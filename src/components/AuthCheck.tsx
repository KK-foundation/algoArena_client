import { Outlet } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { useProblemStore } from "@/store/useProblemStore";
import { useQueryStore } from "@/store/useQueryStore";

function AuthCheck() {
  const navigate = useNavigate();
  const { checkAuth, authUser, isCheckingAuth } = useAuthStore();
  const {getAllProblems} = useProblemStore();
  const userInfo = localStorage.getItem("userInfo");
  const {page} = useQueryStore();
  
 

  useEffect(() => {
    checkAuth();
    if (!userInfo && !authUser) {
      navigate("/signin");
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    if (userInfo) {
      getAllProblems(page);
    }
  },[getAllProblems]);

  console.log(page)
  return (
    <>
      <Outlet />
    </>
  );
}

export default AuthCheck;
