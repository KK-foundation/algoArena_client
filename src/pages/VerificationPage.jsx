import React, { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const VerificationPage = () => {
  const [invalidError, setInvalidError] = useState(false);
  const { checkAuth, verify, isSigninUp } = useAuthStore();
  const navigate = useNavigate();
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const [verifyNumber, setVerifyNumber] = useState({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
  });

  const verificationHandler = async (e) => {
    e.preventDefault();
    const verificationNumber = Object.values(verifyNumber).join("");

    if (verificationNumber.length !== 6) {
      setInvalidError(true);
      return;
    }

    const res = await verify({ otp: verificationNumber });

    if (res.data.success) {
      await checkAuth();
      navigate("/login");
    } else {
      setInvalidError(true);
    }
  };

  const handleInputChange = (index, value) => {
    setInvalidError(false);
    if (!/^\d?$/.test(value)) return; // only allow a single digit

    const newVerifyNumber = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifyNumber);

    if (value && index < 5) {
      inputRefs[index + 1].current?.focus();
    } else if (!value && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasteData.length === 6) {
      const newVerifyNumber = {};
      pasteData.split("").forEach((char, index) => {
        newVerifyNumber[index] = char;
        inputRefs[index].current.value = char;
      });
      setVerifyNumber(newVerifyNumber);
      inputRefs[5].current?.focus();
    }
    e.preventDefault();
  };

  return (
    <>
      <Navbar />
      <main className="w-[90%] lg:w-[80%] m-auto h-screen flex justify-center items-center">
        <form className="border bg-[#2f3136] p-5 rounded-md flex flex-col items-center w-[60%] lg:w-[30%]">
          <img src="/logo.png" alt="logo" className="w-24" />
          <span className="uppercase font-bold text-2xl">Algo Arena</span>
          <br />
          <br />
          <div className="m-auto flex items-center justify-around gap-2" onPaste={handlePaste}>
            {Object.keys(verifyNumber).map((key, index) => (
              <input
                type="text"
                key={key}
                ref={inputRefs[index]}
                className={`w-[40px] h-[40px] bg-transparent border-[3px] rounded-[10px] flex items-center text-black dark:text-white justify-center text-[18px] font-Poppins outline-none text-center ${
                  invalidError
                    ? "shake border-red-500"
                    : "dark:border-white border-[#0000004a]"
                }`}
                maxLength={1}
                value={verifyNumber[key]}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
            ))}
          </div>
          <button
            onClick={(e) => verificationHandler(e)}
            className="bg-white text-black w-full rounded-md mt-4 px-4 py-1"
            disabled={isSigninUp}
          >
            {isSigninUp ? "Loading..." : "Verify"}
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

export default VerificationPage;
