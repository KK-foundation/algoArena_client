import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { z } from "zod";
import { useAuthStore } from "../store/useAuthStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import toast from "daisyui/components/toast";

const ForgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

const ForgotPassword = () => {
  const { isSigninUp, forgotPassword } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await forgotPassword(data);
      if (res.data.success) {
        toast.success("Check your email");
      }
    } catch (error) {
      console.log(error);
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
                type="email"
                placeholder="Email address"
                className="bg-[#13181c] px-4 py-2 rounded-lg w-full"
                {...register("email")}
              />
              {errors.data && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.data.message}
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="bg-white text-black w-full rounded-md mt-4 px-4 py-1 cursor-pointer"
            disabled={isSigninUp}
          >
            {isSigninUp ? "Loading..." : "Forgot Password"}
          </button>
          <br />
          <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
            Go back to sign in?
            <Link to={"/login"}>
              <span className="text-[#2190ff] pl-1 cursor-pointer">
                Sign in
              </span>
            </Link>
          </h5>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default ForgotPassword;
