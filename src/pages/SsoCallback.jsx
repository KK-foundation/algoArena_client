import { useSignIn } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import toast from "daisyui/components/toast";

const SsoCallback = () => {
  const { signIn } = useSignIn();
  const navigate = useNavigate();
  const { socialAuth } = useAuthStore();

  useEffect(() => {
    const completeSignIn = async () => {
      try {
        const res = await signIn?.handleRedirectCallback();
        const user = res?.createdSession?.user;

        if (!user) throw new Error("User not found");

        const email = user.emailAddresses?.[0]?.emailAddress;
        const name =
          (user.firstName || "Anonymous") + (user.lastName || "Anonymous");

        const response = await socialAuth({ email, name });

        if (response.data.success) {
          navigate("/");
        } else {
          navigate("/login");
        }
      } catch (error) {
        toast.error(error.response.data.message);
        navigate("/login");
      }
    };

    completeSignIn();
  }, [signIn, navigate]);
  return <p className="text-center text-white">Signing you in...</p>;
};

export default SsoCallback;
