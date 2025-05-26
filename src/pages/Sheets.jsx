import React from "react";
import SheetCard from "../components/SheetCard";

const Sheets = () => {
  return (
    <div className="w-[90%] lg:w-[80%] m-auto mt-4">
      <div>
        <h1 className="text-2xl font-bold">All Sheets</h1>
        <br />
        <div>
          <div className="flex justify-end">
            <input
              type="text"
              placeholder="Enter title or number"
              className="w-[60%] flex px-4 py-2 bg-[#13181c] outline-none rounded-lg shadow-lg border"
            />
          </div>
          <br />
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
            {[0, 0, 0, 0, 0, 0].map(() => (
              <SheetCard />
            ))}
          </div>
          <div className="w-full flex justify-center items-center mt-3">
            <span className="font-bold cursor-pointer hover:underline">
              see more
            </span>
          </div>
          <br />
          <br />
        </div>
      </div>
    </div>
  );
};

export default Sheets;
