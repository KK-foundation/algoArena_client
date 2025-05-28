import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-[#2f3136] px-12 py-4">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-[30%]">
          <img src="/logo.png" alt="logo" className="w-24" />
          <span className="uppercase text-2xl font-bold tracking-tight">
            Algo Arena
          </span>
          <p className="tracking-widest">
            Algo Arena is a platform where you can practice interview question
            and all question hand picked very list of question you see that is
            create by all prev user that get his/her dream job
          </p>
        </div>
        <div className="lg:w-[70%] flex flex-col lg:flex-row mt-8 gap-10 lg:gap-0 justify-around">
          <div>
            <h1 className="text-lg font-bold">Social</h1>
            <Link to={"https://discord.gg/VjH6Z8zBmw"}>
              <span className="text-[#2143db] block font-semibold cursor-pointer hover:underline">
                Discord
              </span>
            </Link>
            <Link to={"https://www.instagram.com/kunal011010/"}>
              <span className="text-[#2143db] block font-semibold cursor-pointer hover:underline">
                instagram
              </span>
            </Link>
            <Link to={"https://x.com/Kunal_098"}>
              <span className="text-[#2143db] block font-semibold cursor-pointer hover:underline">
                X
              </span>
            </Link>
            <Link to={"https://www.linkedin.com/in/kunal003/"}>
              <span className="text-[#2143db] block font-semibold cursor-pointer hover:underline">
                linkedin
              </span>
            </Link>
          </div>
          <div>
            <h1 className="text-lg font-bold">Contact us</h1>
            <span>support@algoarena.com</span>
          </div>
          <div className="">
            <h1 className="text-lg font-bold">Legal</h1>

            <Link to={"/"}>
              <span className="text-[#2143db] block font-semibold cursor-pointer hover:underline">
                Privacy Policy
              </span>
            </Link>
            <Link to={"/"}>
              <span className="text-[#2143db] block font-semibold cursor-pointer hover:underline">
                Terms of Service
              </span>
            </Link>
          </div>
        </div>
      </div>
      <hr className="mt-4 mb-4" />
      <p className="text-center">
        Copyright © 2025 algoarena.com All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
