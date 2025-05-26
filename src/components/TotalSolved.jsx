import React from "react";

const TotalSolved = () => {
  return (
    <div className="bg-[#2f3136] flex flex-col justify-center items-center p-4 gap-4 shadow-md">
      <div className="w-28 border rounded-full h-28 flex justify-center items-center">
        <span className="text-2xl font-bold p-2">
          <span className="text-[#2041dc]">500</span>/<span className="text-[#00ad5f]">500</span>
        </span>
      </div>
      <div className="flex gap-5">
        <span className="bg-[#7eb99f] uppercase font-bold px-2 rounded-full py-1 text-green-900">easy : 12</span>
        <span className="bg-[#d5c28e] uppercase font-bold px-2 rounded-full py-1 text-yellow-800">medium : 12</span>
        <span className="bg-[#ce8d9a] uppercase font-bold px-2 rounded-full py-1 text-red-500">hard : 12</span>
      </div>
    </div>
  );
};

export default TotalSolved;
