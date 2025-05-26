import React from "react";
import { Link } from "react-router-dom";

const ProblemCard = () => {
  return (
    <Link to={"/problem/123"}>
      <div className="flex justify-between bg-[#303133] hover:bg-[#13181c] px-1 py-2 rounded-lg shadow-xl">
        <div className="flex gap-2 w-[80%] ">
          <p className="font-semibold">1.</p>
          <p className="whitespace-nowrap overflow-hidden text-ellipsis w-full font-semibold">
            Find First and Last Position of Element in Sorted Array Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Sint odit nisi
            voluptatibus aut veniam deserunt, consequuntur explicabo commodi
            voluptatum, laborum libero quod, qui culpa. Voluptate earum deserunt
            recusandae quia quam.
          </p>
        </div>
        <span className="text-green-400 font-bold">Easy</span>
      </div>
    </Link>
  );
};

export default ProblemCard;
