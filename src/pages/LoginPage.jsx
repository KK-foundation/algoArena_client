import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaEye, FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { z } from "zod";
import { useAuthStore } from "../store/useAuthStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useSignIn } from "@clerk/clerk-react";

const LoginSchema = z.object({
  data: z.string().min(1, "Email or username is required"),
  password: z.string().min(6, "Password must be atleast of 6 characters"),
});

const LoginPage = () => {
  const { isLoggingIn, login } = useAuthStore();
  const [visibility, setVisibility] = useState(false);
  const navigate = useNavigate();
  const { signIn, isLoaded: signInLoaded } = useSignIn();
  const [oauthLoading, setOauthLoading] = useState(false);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await login(data);
      if (res.data.message) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSocial = async (provider) => {
    if (!signInLoaded || oauthLoading) return;

    setOauthLoading(true);

    try {
      const user = await signIn.authenticateWithRedirect({
        strategy: `oauth_${provider}`, // "oauth_google" | "oauth_github"
        redirectUrl: "/sso-callback", // where step 3 lives
        redirectUrlComplete: "/", // where to land after success
      });
      console.log(user)
    } catch (error) {
      console.error(error);
      setOauthLoading(false);
    }
  };
  return (
    <>
      <Navbar />
      <main className="w-[90%] lg:w-[80%] m-auto h-screen flex justify-center items-center">
        <form
          className="border bg-[#2f3136] p-5 rounded-md flex flex-col items-center w-[60%] lg:w-[30%]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <img src="/logo.png" alt="logo" className="w-24" />
          <span className="uppercase font-bold text-2xl">Algo Arena</span>
          <br />
          <br />
          <div className="flex flex-col gap-4 w-full">
            <div className="w-full">
              <input
                type="text"
                placeholder="Username or Email address"
                className="bg-[#13181c] px-4 py-2 rounded-lg w-full"
                {...register("data")}
              />
              {errors.data && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.data.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <div className="bg-[#13181c] flex items-center justify-between rounded-lg">
                <input
                  type={visibility ? "text" : "password"}
                  placeholder="Password"
                  className="bg-[#13181c] px-4 py-2 rounded-lg w-full"
                  {...register("password")}
                />
                <span
                  className="pr-4 cursor-pointer"
                  onClick={() => setVisibility((prev) => !prev)}
                >
                  {visibility ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="bg-white text-black w-full rounded-md mt-4 px-4 py-1 cursor-pointer"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? "Loading..." : "Login"}
          </button>
          <Link to={"/forgot-password"}>
            <p className="w-full flex justify-end pt-1 opacity-60 cursor-pointer hover:underline">
              Forgot Password?
            </p>
          </Link>
          <br />
          <div>
            <span className="opacity-60">create an account?</span>
            <Link to={"/signup"}>
              <span className="cursor-pointer pl-2 font-semibold opacity-100 hover:underline">
                Sign up
              </span>
            </Link>
          </div>

          <br />
          <p className="opacity-60">or you can sign in with</p>
          <div className="flex mt-2 gap-4">
            <FaGoogle className="text-2xl cursor-pointer" onClick={() => handleSocial('google')}/>
            <FaGithub className="text-2xl cursor-pointer" onClick={() => handleSocial('github')}/>
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default LoginPage;
