import React from "react";
import Code from "./Code";
// import Code from './Code'

const Solution = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Iteration</h1>
      <br />
      <Code />
      <br />
      <div>
        <h1 className="text-2xl font-semibold">Time & Space Complexity</h1>
        <br />
        <ul className="flex flex-col">
          <li className="font-semibold ">Time complexity: O(n)</li>
          <li className="font-semibold ">Space complexity: O(n) for the output array.</li>
        </ul>
      </div>
    </div>
  );
};

export default Solution;
