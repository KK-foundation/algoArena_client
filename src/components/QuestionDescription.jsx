import React from "react";

const QuestionDescription = () => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Concatenation of Array</h1>
        <p className="font-semibold">Solved</p>
      </div>
      <br />
      <div>
        <span className="px-4 py-1 border rounded-full text-green-500 font-bold border-gray-500">
          Easy
        </span>
      </div>
      <br />
      <div>
        <p>
          You are given an integer array <code>nums</code> of length{" "}
          <code>n</code>. Create an array <code>ans</code> of length{" "}
          <code>2n</code> where <code>ans[i] == nums[i]</code> and{" "}
          <code>ans[i + n] == nums[i]</code> for <code>0 &lt;= i &lt; n</code>{" "}
          (0-indexed).<br></br>
          Specifically, <code>ans</code> is the concatenation of two{" "}
          <code>nums</code> arrays.<br></br>
          Return the array <code>ans</code>.
        </p>
      </div>
      <br />
      <div className="flex flex-col gap-8">
        <div>
          <h3 className="font-bold mb-2">Example 1 :</h3>
          <div  className="bg-[#212326] px-2 py-4 rounded-md flex">
            <code>Input: nums = [1,4,1,2] <br /> Output: [1,4,1,2,1,4,1,2]</code>
          </div>
        </div>
        <div>
          <h3 className="font-bold mb-2">Example 2 :</h3>
          <div  className="bg-[#212326] px-2 py-4 rounded-md flex">
            <code>Input: nums = [1,4,1,2] <br /> Output: [1,4,1,2,1,4,1,2]</code>
          </div>
        </div>
      </div>
      <br />
      <div>
        <h3 className="font-bold mb-2">Constraints :</h3>
        <ul className="flex flex-col gap-2 rounded-full">
          <li className="px-4 py-1 w-fit rounded-lg bg-[#212326]">1 &lt;= nums.length &lt;= 1000</li>
          <li className="px-4 py-1  w-fit rounded-lg bg-[#212326]">1 &lt;= nums.length &lt;= 1000</li>
        </ul>
      </div>
    </div>
  );
};

export default QuestionDescription;
