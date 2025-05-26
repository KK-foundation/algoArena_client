import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaEye, FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useAuthStore } from "../store/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const SignUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const SignUpPage = () => {
  const [visibility, setVisibility] = useState(false);
  const { signup, isSigninUp } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await signup(data);
      if (res.data.success) {
        navigate("/verify");
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
                type="text"
                placeholder="Name"
                className="bg-[#13181c] px-4 py-2 rounded-lg w-full"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <input
                type="text"
                placeholder="Username"
                className="bg-[#13181c] px-4 py-2 rounded-lg w-full"
                {...register("username")}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <input
                type="email"
                placeholder="Email address"
                className="bg-[#13181c] px-4 py-2 rounded-lg w-full"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <div className="bg-[#13181c] flex items-center justify-between rounded-lg">
                <input
                  type={`${!visibility ? "text" : "password"}`}
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
            disabled={isSigninUp}
            className="bg-white text-black w-full rounded-md mt-4 px-4 py-1 cursor-pointer"
          >
            {isSigninUp ? "Loading..." : "Sign Up"}
          </button>
          <br />
          <div>
            <span className="opacity-60">Have an account?</span>
            <Link to={"/login"}>
              <span className="cursor-pointer pl-2 font-semibold opacity-100 hover:underline">
                Login
              </span>
            </Link>
          </div>

          <br />
          <p className="opacity-60">or you can sign in with</p>
          <div className="flex mt-2 gap-4">
            <FaGoogle className="text-2xl" />
            <FaGithub className="text-2xl" />
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default SignUpPage;
