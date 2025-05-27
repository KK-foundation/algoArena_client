import React from "react";
import Code from "./Code";
// import Code from './Code'

const Solution = ({ problem }) => {
  return (
    <div className="p-4">
      {problem.editorial && (
        <div>
          <h1 className="text-2xl font-semibold">Editorial</h1>
          <br />
          <pre>{problem.editorial}</pre>
        </div>
      )}
      <br />
      <h1 className="text-2xl font-semibold">Code Solution</h1>
      <br />
      <Code solution={problem.referenceSolutions}/>
      <br />
    </div>
  );
};

export default Solution;

//  <div>
//         <h1 className="text-2xl font-semibold">Time & Space Complexity</h1>
//         <br />
//         <ul className="flex flex-col">
//           <li className="font-semibold ">Time complexity: O(n)</li>
//           <li className="font-semibold ">Space complexity: O(n) for the output array.</li>
//         </ul>
//       </div>
