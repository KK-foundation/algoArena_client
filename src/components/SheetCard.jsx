import React from "react";
import { Link } from "react-router-dom";

const SheetCard = () => {
  return (
    <Link to={"/sheet/123"}>
      <div className="flex flex-col gap-3 hover:bg-[#13181c] p-4  rounded-lg bg-[#303133] shadow-lg cursor-pointer">
        <h2 className="font-bold text-2xl">Google Interviwe question</h2>
        <p className="text-sm tracking-wide line-clamp-3 overflow-hidden text-ellipsis w-full font-semibold">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui
          explicabo enim amet fugit. Non beatae possimus veritatis ad, saepe
          dicta reprehenderit et dolorum modi animi cupiditate pariatur cum
          facilis eveniet?
        </p>
        <span className="font-bold">Total : 250</span>
      </div>
    </Link>
  );
};

export default SheetCard;
