import React from "react";
import SheetCard from "../components/SheetCard";
import ProblemCard from "../components/ProblemCard";

const Problems = () => {
  return (
    <div className="w-[90%] lg:w-[80%] m-auto mt-4">
      {/* Playlist */}
      <div className="flex justify-between">
        <h3 className="text-2xl font-bold">Sheets</h3>
        <p className="hover:underline cursor-pointer">See all</p>
      </div>
      <br />
      <div className="flex flex-col gap-4">
        <SheetCard />
        <div className="grid lg:grid-cols-2 gap-4">
          <SheetCard />
          <SheetCard />
        </div>
      </div>
      <br />
      <br />
      {/* Problems */}
      <div>
        <div>
          <div className="flex justify-end">
            <input
              type="text"
              placeholder="Enter title or number"
              className="w-[60%] flex px-4 py-2 bg-[#13181c] outline-none rounded-lg shadow-lg border"
            />
          </div>
        </div>
        <br />
        <h3 className="text-2xl font-bold mb-2">Problems</h3>
        <div className="flex flex-col gap-4">
          {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(() => (
            <ProblemCard />
          ))}
        </div>
        <div className="w-full flex justify-center items-center">
          <span className="font-bold cursor-pointer hover:underline">see more</span>
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default Problems;
