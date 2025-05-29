import { Trash } from "lucide-react";
// import { useState } from "react";
import { Link } from "react-router-dom";
// import { useSheetStore } from "../store/useSheetStore";

const SheetCard = ({ sheet }) => {
  
  return (
    <div
      className="bg-inherit relative rounded-lg"
      
    >
      <Link to={`/sheet/${sheet.id}`}>
        <div className="flex flex-col gap-3  p-4  rounded-lg bg-[#303133] shadow-lg cursor-pointer hover:bg-[#13181c]">
          <h2 className="font-bold text-2xl">{sheet.name}</h2>
          <span className="bg-[#13181c] w-fit px-4 py-1 rounded-lg capitalize">
            {sheet.visibility}
          </span>
          <p className="text-sm tracking-wide line-clamp-3 overflow-hidden text-ellipsis w-full font-semibold">
            {sheet.description}
          </p>
          <span className="font-bold">Total : {sheet?.problems.length}</span>
        </div>
      </Link>
    </div>
  );
};

export default SheetCard;
