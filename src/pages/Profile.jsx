import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import YearlyActivityGrid from "../components/ContributionGrid";
import TotalSolved from "../components/TotalSolved";
import Streak from "../components/Streak";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import ProfileCard from "../components/ProfileCard";
import SolvedProblem from "../components/SolvedProblem";
import MyProblem from "../components/MyProblem";
import MySheet from "../components/MySheet";

const Profile = () => {
  const { authUser } = useAuthStore();
  const [active, setActive] = useState("3");
  return (
    <div className="w-[90%] lg:w-[80%] m-auto mt-4">
      {/* profile  */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-6 lg:auto-rows-[minmax(100px,auto)]">
        {/* ProfileCard: takes 2 columns and spans 2 rows */}
        <div className="lg:col-span-2 lg:row-span-2">
          <ProfileCard />
        </div>

        {/* YearlyActivityGrid: top-right, spans 4 columns */}
        <div className="lg:col-span-4">
          <YearlyActivityGrid
            submissions={["2025-01-01", "2025-05-22", "2025-05-21"]}
          />
        </div>

        {/* TotalSolved: below YearlyActivityGrid */}
        <div className="lg:col-span-2">
          <TotalSolved />
        </div>

        {/* Streak: beside TotalSolved */}
        <div className="lg:col-span-2">
          <Streak />
        </div>
      </div>
      {/*  */}
      <br />
      <div>
        <div className="">
          <ul className="flex gap-3">
            <li
              className={`${
                active === "1" ? "bg-[#13181c]" : "bg-[#2f3136]"
              } px-4 py-1 rounded-md cursor-pointer`}
              onClick={() => setActive("1")}
            >
              Solved Problem
            </li>
            <li
              className={`${
                active === "2" ? "bg-[#13181c]" : "bg-[#2f3136]"
              } px-4 py-1 rounded-md cursor-pointer`}
              onClick={() => setActive("2")}
            >
              My Problem
            </li>
            <li
              className={`${
                active === "3" ? "bg-[#13181c]" : "bg-[#2f3136]"
              } px-4 py-1 rounded-md cursor-pointer`}
              onClick={() => setActive("3")}
            >
              My Sheet
            </li>
          </ul>
        </div>
        <br />
        {active === "1" && <SolvedProblem />}
        {active === "2" && <MyProblem />}
        {active === "3" && <MySheet />}
      </div>
      <br />
    </div>
  );
};

export default Profile;
